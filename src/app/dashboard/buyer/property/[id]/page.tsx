"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { MapPin, Bed, Bath, Move, Home, Cuboid, Ruler, X, Sparkles, Loader2, RotateCcw, CheckCircle, FileText, User, ChevronDown, LogOut, Settings, Heart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
// @ts-ignore
import dynamic from 'next/dynamic';

const Pannellum = dynamic(
  () => import("pannellum-react").then((mod) => mod.Pannellum),
  { ssr: false }
);

// --- ASSETS ---
const IMG_EMPTY = "https://pannellum.org/images/alma.jpg"; 
const IMG_FURNISHED = "https://pannellum.org/images/bma-1.jpg"; 
const FLOOR_PLAN_IMG = "https://i.pinimg.com/originals/3a/25/37/3a25372a36318026ba349d69533520dc.jpg";

export default function PropertyDetails() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // VR & AI States
  const [isVRActive, setIsVRActive] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState("Initializing...");
  const [showPlayer, setShowPlayer] = useState(false);

  // ML Dimensions State
  const [showDimensions, setShowDimensions] = useState(false);
  const [scanningDimensions, setScanningDimensions] = useState(false);

  // Agreement States
  const [offerStatus, setOfferStatus] = useState('none'); // 'none' | 'pending' | 'accepted' | 'sold'
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [signing, setSigning] = useState(false);
  const [currentAgreementId, setCurrentAgreementId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/properties/${params.id}`);
        setProperty(res.data);
        if(res.data.id === 2) setOfferStatus('sold'); // Mock sold status for ID 2
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProperty();
  }, [params.id]);

  // --- HANDLERS ---

  const handleEnterVR = () => {
      setIsVRActive(true);
      setTimeout(() => setShowPlayer(true), 100);
  };

  const handleExitVR = () => {
      console.log("Exiting VR...");
      setShowPlayer(false);
      setIsVRActive(false);
      setIsDecorated(false); // Reset decoration on exit
  };

  const handleGenerateFurniture = () => {
    setIsGenerating(true);
    setShowPlayer(false);
    setAiStatus("Scanning Room Geometry...");
    setTimeout(() => setAiStatus("Identifying Floor Plan..."), 1000);
    setTimeout(() => setAiStatus("Generating Modern Furniture..."), 2000);
    setTimeout(() => setAiStatus("Rendering Lighting & Shadows..."), 3000);

    setTimeout(() => {
        setIsDecorated(true);
        setIsGenerating(false);
        setShowPlayer(true);
    }, 4000);
  };

  const handleResetAI = () => {
      setShowPlayer(false);
      setTimeout(() => {
          setIsDecorated(false);
          setShowPlayer(true);
      }, 100);
  };

  const handleShowDimensions = () => {
      setShowDimensions(true);
      setScanningDimensions(true);
      setTimeout(() => setScanningDimensions(false), 2500);
  };

  // 1. MAKE OFFER (Starts the Chain)
  const handleMakeOffer = async () => {
    try {
        // Send to backend
        await axios.post('http://127.0.0.1:8000/agreements', {
            property_id: property.id,
            seller_id: property.owner_id || 1, 
            buyer_email: "buyer@demo.com",
            final_price: property.price
        });
        
        setOfferStatus('pending');
        // We simulate fetching the ID of the agreement we just made
        setCurrentAgreementId(Date.now()); 
        alert("Official Offer Sent! The seller has been notified.");

        // SIMULATION: Seller accepts after 5 seconds
        setTimeout(() => {
            setOfferStatus('accepted');
            alert("Update: The Seller has ACCEPTED your offer! You may now sign the agreement.");
        }, 5000);

    } catch (error) {
        alert("Error sending offer");
    }
  };

  // 2. SIGN AGREEMENT (The "Powerful" Part)
  const handleSignAgreement = async () => {
      setSigning(true);
      
      // Generate a "Fake" Secure Hash
      const secureHash = "0x" + Math.random().toString(16).substr(2) + "..." + Date.now().toString(16);
      const digitalSig = "SIGNED_BY_JOHN_BUYER_" + Date.now();

      // Send to backend
      try {
          // In a real app, we'd use the real ID. Here we mock the PUT request logic.
          // await axios.put(`http://127.0.0.1:8000/agreements/${currentAgreementId}`, { ... });
          
          setTimeout(() => {
              setSigning(false);
              setShowAgreementModal(false);
              setOfferStatus('sold');
              
              // Show the "Powerful" Success Message
              alert(`AGREEMENT SECURED ON BLOCKCHAIN.\n\nTransaction Hash: ${secureHash}\nStatus: IMMUTABLE\n\nCongratulations on your new home!`);
          }, 3000);
      } catch (e) {
          console.error(e);
      }
  };


  if (loading) return <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center"><Loader2 className="animate-spin mr-2"/> Loading Property...</div>;
  if (!property) return <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">Property Not Found</div>;

  const isSold = offerStatus === 'sold';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans relative selection:bg-blue-500/30">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard/buyer" className="flex items-center gap-2 text-xl font-bold">
             <div className="bg-blue-600 p-2 rounded-lg"><Home size={24}/></div>
             PropTrust<span className="text-blue-500">VR</span>
          </Link>
          <div className="relative">
             <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold">John Buyer</div>
                    <div className="text-[10px] text-blue-400">Premium Member</div>
                </div>
                <User size={20} />
                <ChevronDown size={14} className="text-gray-400"/>
             </button>
             {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-800 text-gray-300"><Settings size={16}/> Settings</Link>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-900/20 text-red-400 border-t border-gray-800"><LogOut size={16}/> Sign Out</Link>
                </div>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative h-[450px] bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl group">
            <img src={property.image_url} alt={property.title} className={`w-full h-full object-cover transition duration-500 ${isSold ? 'grayscale opacity-40' : 'opacity-80 group-hover:opacity-60'}`} />
            {isSold && <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-2 rounded-full z-10">SOLD</div>}
            
            {!isSold && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={handleEnterVR} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transform hover:scale-105 transition shadow-[0_0_40px_rgba(37,99,235,0.5)] z-10">
                        <Cuboid size={24} /> Enter VR Mode
                    </button>
                </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <button onClick={handleShowDimensions} className="p-4 bg-gray-900/80 hover:bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center gap-3 text-gray-300 font-bold transition hover:border-blue-500/50 hover:text-blue-400 group">
                <div className="bg-blue-900/30 p-2 rounded-xl group-hover:bg-blue-600 transition"><Ruler className="text-blue-500 group-hover:text-white" size={20} /></div>
                ML Room Dimensions
             </button>
             <button onClick={handleEnterVR} className="p-4 bg-gray-900/80 hover:bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center gap-3 text-gray-300 font-bold transition hover:border-purple-500/50 hover:text-purple-400 group">
                 <div className="bg-purple-900/30 p-2 rounded-xl group-hover:bg-purple-600 transition"><Sparkles className="text-purple-500 group-hover:text-white" size={20} /></div>
                 GenAI Staging Preview
             </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold">{property.title}</h1>
                <div className="text-3xl font-bold text-blue-400">${property.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-8 text-lg bg-gray-900/50 p-3 rounded-xl inline-flex border border-gray-800">
                <MapPin size={18} className="text-blue-500" /> {property.location}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 text-center"><span className="font-bold text-xl block">{property.bedrooms}</span> <span className="text-gray-500 text-sm">Beds</span></div>
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 text-center"><span className="font-bold text-xl block">{property.bathrooms}</span> <span className="text-gray-500 text-sm">Baths</span></div>
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 text-center"><span className="font-bold text-xl block">{property.area_sqft}</span> <span className="text-gray-500 text-sm">Sqft</span></div>
            </div>
            
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">About this home</h3>
            <p className="text-gray-300 leading-relaxed mb-10 text-lg">{property.description}</p>
          
            {/* TRANSACTION BUTTONS */}
            <div className="mt-auto sticky bottom-6">
                {isSold ? (
                    <button disabled className="w-full bg-gray-800 text-gray-500 font-bold py-5 rounded-2xl text-lg border border-gray-700 cursor-not-allowed flex items-center justify-center gap-2">
                        <CheckCircle size={24}/> Property Sold
                    </button>
                ) : offerStatus === 'accepted' ? (
                    <button onClick={() => setShowAgreementModal(true)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-5 rounded-2xl text-lg shadow-lg shadow-green-900/30 animate-pulse flex items-center justify-center gap-2">
                        <FileText size={24}/> Offer Accepted! Sign Agreement
                    </button>
                ) : (
                    <button onClick={handleMakeOffer} disabled={offerStatus === 'pending'} className={`w-full font-bold py-5 rounded-2xl text-lg shadow-lg transition flex items-center justify-center gap-2 ${offerStatus === 'pending' ? "bg-yellow-600/80 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"}`}>
                        {offerStatus === 'pending' ? <><Loader2 className="animate-spin"/> Offer Pending...</> : "Request Agreement / Make Offer"}
                    </button>
                )}
            </div>
        </div>
      </main>

      {/* --- VR MODAL --- */}
      {isVRActive && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col animate-in fade-in duration-300">
            {/* Header - Fixed Exit Button Z-Index */}
            <div className="absolute top-0 left-0 right-0 p-6 z-[10000] flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
                <div className="flex gap-3 pointer-events-auto">
                    <span className="text-white font-bold bg-blue-600 px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-2">
                     <Cuboid size={16}/> VR Mode
                    </span>
                    {isDecorated && (
                        <span className="text-white font-bold bg-purple-600 px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(147,51,234,0.5)] flex items-center gap-2">
                        <Sparkles size={14} /> AI Furniture
                        </span>
                    )}
                </div>
                {/* EXIT BUTTON: Added pointer-events-auto to ensure it catches clicks */}
                <button onClick={handleExitVR} className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl backdrop-blur-md transition border border-white/10 font-bold flex items-center gap-2 cursor-pointer pointer-events-auto z-[10001]">
                    <X size={20} /> Exit Tour
                </button>
            </div>

            {/* AI Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center gap-4 w-full max-w-md px-4 pointer-events-auto">
                {isGenerating && (
                    <div className="bg-black/80 backdrop-blur-xl border border-purple-500/50 p-6 rounded-2xl w-full text-center shadow-2xl">
                        <Loader2 className="animate-spin text-purple-500 mx-auto mb-3" size={32} />
                        <h3 className="text-white font-bold text-lg mb-1">AI Processing</h3>
                        <p className="text-purple-300 text-sm mb-3">{aiStatus}</p>
                        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full w-full animate-[progress_4s_ease-in-out_infinite]" style={{ width: '100%', transformOrigin: 'left', animation: 'grow 4s linear' }}></div>
                        </div>
                    </div>
                )}
                {!isGenerating && (
                    <div className="flex gap-4 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10">
                        {!isDecorated ? (
                            <button onClick={handleGenerateFurniture} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition transform hover:scale-105 cursor-pointer">
                                <Sparkles size={20} className="text-purple-600" /> GenAI Furnish
                            </button>
                        ) : (
                            <button onClick={handleResetAI} className="bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 px-6 py-3 rounded-full font-bold flex items-center gap-3 backdrop-blur-md cursor-pointer">
                                <RotateCcw size={20} /> Reset
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Player */}
            <div className="flex-1 w-full h-full relative bg-black">
                {showPlayer && (
                  <Pannellum
                      width="100%" height="100%"
                      image={isDecorated ? IMG_FURNISHED : IMG_EMPTY}
                      pitch={10} yaw={180} hfov={110}
                      autoLoad showZoomCtrl={false}
                  />
                )}
            </div>
        </div>
      )}

      {/* --- DIMENSIONS MODAL --- */}
      {showDimensions && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-[#111827] border border-blue-500/30 p-8 rounded-3xl max-w-4xl w-full relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                <button onClick={() => setShowDimensions(false)} className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-800 rounded-full transition"><X size={24}/></button>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Ruler className="text-blue-500"/> ML Room Analysis</h2>
                {scanningDimensions ? (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                        <Loader2 size={64} className="text-blue-500 animate-spin" />
                        <div><h3 className="text-xl font-bold">Scanning Spatial Data...</h3><p className="text-blue-300">Analyzing depth maps...</p></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 h-[400px]">
                        <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-blue-900/10">
                            <img src={FLOOR_PLAN_IMG} className="w-full h-full object-cover opacity-80" />
                            <div className="absolute top-4 left-4 bg-blue-600 text-xs font-bold px-3 py-1 rounded-full">ANALYSIS COMPLETE</div>
                            <div className="absolute top-1/3 left-1/4 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">12' 4"</div>
                            <div className="absolute bottom-1/4 right-1/3 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">16' 0"</div>
                        </div>
                        <div className="space-y-6 flex flex-col justify-center">
                            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                                <h4 className="text-blue-400 font-bold mb-2">Detected Dimensions</h4>
                                <ul className="space-y-2 text-lg">
                                    <li className="flex justify-between"><span>Length:</span> <span className="font-bold">16 ft 2 in</span></li>
                                    <li className="flex justify-between"><span>Width:</span> <span className="font-bold">12 ft 4 in</span></li>
                                    <li className="flex justify-between border-t border-blue-500/30 pt-2 mt-2"><span>Ceiling Height:</span> <span className="font-bold">9 ft 6 in</span></li>
                                </ul>
                            </div>
                            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex items-center gap-4">
                                <ShieldCheck className="text-green-500" size={32} />
                                <div><h4 className="font-bold text-green-400">Confidence Score: 98.5%</h4><p className="text-sm text-gray-400">Measurements are accurate.</p></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}

      {/* --- AGREEMENT MODAL --- */}
      {showAgreementModal && (
         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-[#111827] border border-green-500/30 p-8 rounded-3xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(34,197,94,0.2)] text-center">
                <button onClick={() => setShowAgreementModal(false)} className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-800 rounded-full transition"><X size={24}/></button>
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-900/50"><FileText size={32} className="text-white"/></div>
                <h2 className="text-3xl font-bold mb-4">Sign Purchase Agreement</h2>
                <p className="text-gray-400 mb-8 text-lg">The seller has accepted your offer. Please sign below.</p>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 h-48 overflow-y-auto text-left text-sm text-gray-500 mb-8 custom-scrollbar">
                    <p className="mb-4 font-bold">REAL ESTATE PURCHASE CONTRACT</p>
                    <p>This Agreement is made on {new Date().toLocaleDateString()}...</p>
                    <p>Property: {property.title} located at {property.location}</p>
                    <p>Agreed Price: ${property.price.toLocaleString()}</p>
                    <p className="mt-4">By clicking "Sign Digitally", you agree to all terms herein and authorize the immutable recording of this transaction.</p>
                </div>
                
                <button onClick={handleSignAgreement} disabled={signing} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-xl shadow-lg transition flex items-center justify-center gap-3">
                    {signing ? <><Loader2 className="animate-spin"/> Finalizing on Blockchain...</> : <><CheckCircle size={24}/> Sign Digitally & Close Deal</>}
                </button>
            </div>
         </div>
      )}

    </div>
  );
}