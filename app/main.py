from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# Import our database and models
from . import models, database

# --- CONFIGURATION ---
SECRET_KEY = "super-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Setup Database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="PropTrust VR API")

# Allow Frontend to talk to Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_password_hash(password):
    return pwd_context.hash(password)

# --- PYDANTIC MODELS (Request Bodies) ---
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    role: str

class PropertyCreate(BaseModel):
    title: str
    description: str
    price: int
    location: str
    bedrooms: int
    bathrooms: int
    area_sqft: int
    image_url: str 

class AgreementCreate(BaseModel):
    property_id: int
    seller_id: int
    buyer_email: str
    final_price: int

class AgreementUpdate(BaseModel):
    status: str
    digital_signature: str = None
    contract_hash: str = None

class CommentCreate(BaseModel):
    property_id: int
    user_name: str
    text: str

# --- ENDPOINTS ---

@app.get("/")
def read_root():
    return {"status": "active", "message": "Backend is Running!"}

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(user.password)
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_pw, 
        role=user.role
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    return {"access_token": user.email, "token_type": "bearer", "role": user.role}

@app.post("/properties")
def create_property(prop: PropertyCreate, db: Session = Depends(database.get_db)):
    # Hardcoded owner_id=1 for testing
    new_prop = models.Property(
        title=prop.title,
        description=prop.description,
        price=prop.price,
        location=prop.location,
        bedrooms=prop.bedrooms,
        bathrooms=prop.bathrooms,
        area_sqft=prop.area_sqft,
        image_url=prop.image_url,
        owner_id=1,
        views=0,
        likes=0
    )
    db.add(new_prop)
    db.commit()
    db.refresh(new_prop)
    return {"message": "Property Listed Successfully!", "id": new_prop.id}

# UPDATED: Includes Seller Name fetching
@app.get("/properties")
def get_properties(db: Session = Depends(database.get_db)):
    properties = db.query(models.Property).all()
    results = []
    for p in properties:
        # Fetch Owner Name
        owner = db.query(models.User).filter(models.User.id == p.owner_id).first()
        owner_name = owner.full_name if owner else "Unknown Seller"
        
        # Convert to dict to append owner_name
        p_dict = p.__dict__
        p_dict["owner_name"] = owner_name
        results.append(p_dict)
    return results

@app.get("/properties/{property_id}")
def get_property(property_id: int, db: Session = Depends(database.get_db)):
    prop = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Increment View Count
    current_views = int(prop.views) if prop.views else 0
    prop.views = current_views + 1
    db.commit()
    db.refresh(prop)
    
    return prop

# NEW: Like Property
@app.post("/properties/{property_id}/like")
def like_property(property_id: int, db: Session = Depends(database.get_db)):
    prop = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    
    current_likes = int(prop.likes) if prop.likes else 0
    prop.likes = current_likes + 1
    db.commit()
    return {"likes": prop.likes}

# NEW: Post Comment
@app.post("/comments")
def post_comment(comment: CommentCreate, db: Session = Depends(database.get_db)):
    new_comment = models.Comment(
        property_id=comment.property_id,
        user_name=comment.user_name,
        text=comment.text,
        timestamp=str(datetime.now().strftime("%Y-%m-%d %H:%M"))
    )
    db.add(new_comment)
    db.commit()
    return new_comment

# NEW: Get Comments
@app.get("/comments/{property_id}")
def get_comments(property_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.Comment).filter(models.Comment.property_id == property_id).all()

@app.get("/seller/metrics")
def get_seller_metrics(db: Session = Depends(database.get_db)):
    properties = db.query(models.Property).filter(models.Property.owner_id == 1).all()
    
    total_views = 0
    total_listings = len(properties)
    
    for prop in properties:
        v = int(prop.views) if prop.views else 0
        total_views += v
        
    return {
        "total_views": total_views,
        "total_listings": total_listings,
        "engagement_rate": "High" if total_views > 5 else "Low"
    }

# --- AGREEMENT ENDPOINTS ---

@app.post("/agreements")
def create_agreement(offer: AgreementCreate, db: Session = Depends(database.get_db)):
    new_offer = models.Agreement(
        buyer_email=offer.buyer_email,
        property_id=offer.property_id,
        seller_id=offer.seller_id,
        status="pending",
        date_created=str(datetime.now().date()),
        final_price=offer.final_price,
        digital_signature="",
        contract_hash=""
    )
    db.add(new_offer)
    db.commit()
    return {"message": "Offer Sent Successfully!"}

@app.get("/seller/agreements")
def get_seller_agreements(db: Session = Depends(database.get_db)):
    # Hardcoded seller_id=1 for demo
    agreements = db.query(models.Agreement).filter(models.Agreement.seller_id == 1).all()
    return agreements

@app.put("/agreements/{agreement_id}")
def update_agreement_status(agreement_id: int, update: AgreementUpdate, db: Session = Depends(database.get_db)):
    offer = db.query(models.Agreement).filter(models.Agreement.id == agreement_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    offer.status = update.status
    
    # If signing, save secure hashes
    if update.digital_signature:
        offer.digital_signature = update.digital_signature
        offer.contract_hash = update.contract_hash
        
    db.commit()
    return {"message": f"Agreement {update.status}"}