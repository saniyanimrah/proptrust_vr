from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Integer)
    location = Column(String)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    area_sqft = Column(Integer)
    image_url = Column(String)
    views = Column(Integer, default=0)
    owner_id = Column(Integer) 
    status = Column(String, default="available")
    # NEW: Likes Counter
    likes = Column(Integer, default=0)

# NEW: Comment Model
class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer)
    user_name = Column(String)
    text = Column(String)
    timestamp = Column(String)

class Agreement(Base):
    __tablename__ = "agreements"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer)
    seller_id = Column(Integer)
    buyer_email = Column(String)
    status = Column(String, default="pending") 
    date_created = Column(String)
    final_price = Column(Integer)
    digital_signature = Column(String, nullable=True)
    contract_hash = Column(String, nullable=True)