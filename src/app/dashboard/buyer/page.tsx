"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Home, Heart, MapPin, Bed, Bath, Move, Share2, MessageCircle, User, LogOut, Settings, ShieldCheck, Send, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// --- TYPES ---
interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  image_url: string;
  owner_id: number;
  owner_name?: string; // Real Seller Name
  likes: number;       // Real Likes
}

interface Comment {
  id: number;
  user_name: string;
  text: string;
  timestamp: string;
}

// --- PROPERTY CARD ---
function PropertyCard({ prop }: { prop: Property }) {
    const [likes, setLikes] = useState(prop.likes);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);

    // Fetch real comments when opening the drawer
    const fetchComments = async () => {
        if (!showComments) {
            const res = await axios.get(`http://127.0.0.1:8000/comments/${prop.id}`);
            setComments(res.data);
        }
        setShowComments(!showComments);
    };

    const handleLike = async () => {
        try {
            const res = await axios.post(`http://127.0.0.1:8000/properties/${prop.id}/like`);
            setLikes(res.data.likes);
        } catch (error) {
            console.error("Like failed", error);
        }
    };

    const handlePostComment = async (e: any) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        
        try {
            const res = await axios.post(`http://127.0.0.1:8000/comments`, {
                property_id: prop.id,
                user_name: "John Buyer", // Hardcoded for demo, normally from Auth
                text: commentText
            });
            setComments([...comments, res.data]);
            setCommentText("");
        } catch (error) {
            console.error("Comment failed", error);
        }
    };

    return (
        <div className="bg-[#111827] rounded-3xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col shadow-xl group">
            
            {/* 1. FIXED IMAGE SIZE (h-48 + object-cover) */}
            <div className="h-56 bg-gray-800 relative overflow-hidden">
                <img 
                    src={prop.image_url || "https://pannellum.org/images/alma.jpg"} 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> VR Ready
                </div>
            </div>

            {/* DETAILS */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{prop.title}</h3>
                        <div className="flex items-center gap-1 text-gray-400 text-sm"><MapPin size={14}/> {prop.location}</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-400">${prop.price.toLocaleString()}</div>
                </div>

                {/* Real Seller Name */}
                <div className="flex items-center gap-2 mb-4 p-2 bg-gray-800/50 rounded-lg border border-gray-700">
                    <ShieldCheck size={16} className="text-green-500"/>
                    <span className="text-sm text-gray-300">Listed by <span className="text-white font-bold">{prop.owner_name || "Unknown"}</span></span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-800 mb-4 text-center">
                    <div className="text-gray-400 text-sm flex justify-center gap-1"><Bed size={16}/> {prop.bedrooms}</div>
                    <div className="text-gray-400 text-sm flex justify-center gap-1"><Bath size={16}/> {prop.bathrooms}</div>
                    <div className="text-gray-400 text-sm flex justify-center gap-1"><Move size={16}/> {prop.area_sqft}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-4">
                    <button onClick={handleLike} className="flex gap-1 text-sm text-gray-400 hover:text-pink-500 transition">
                        <Heart size={18}/> {likes}
                    </button>
                    <button onClick={fetchComments} className="flex gap-1 text-sm text-gray-400 hover:text-blue-400 transition">
                        <MessageCircle size={18}/> Comment
                    </button>
                    <button className="flex gap-1 text-sm text-gray-400 hover:text-white ml-auto">
                        <Share2 size={18}/>
                    </button>
                </div>

                {/* Comment Box */}
                {showComments && (
                    <div className="mb-4 bg-gray-900 p-3 rounded-xl border border-gray-700 animate-in fade-in">
                        <div className="max-h-32 overflow-y-auto mb-2 space-y-2 custom-scrollbar">
                            {comments.length === 0 && <div className="text-xs text-gray-500 text-center">No comments yet.</div>}
                            {comments.map(c => (
                                <div key={c.id} className="text-xs text-gray-300">
                                    <span className="font-bold text-blue-400">{c.user_name}:</span> {c.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handlePostComment} className="flex gap-2">
                            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Ask a question..." className="flex-1 bg-gray-800 text-xs text-white p-2 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" />
                            <button type="submit" className="text-blue-500 hover:text-white"><Send size={14}/></button>
                        </form>
                    </div>
                )}

                <Link href={`/dashboard/buyer/property/${prop.id}`} className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-blue-900/20">
                    View Details & Offer
                </Link>
            </div>
        </div>
    );
}

// --- MAIN PAGE ---
export default function BuyerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch properties (now includes owner_name)
    axios.get('http://127.0.0.1:8000/properties').then(res => setProperties(res.data));
  }, []);

  const filtered = properties.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans">
      
      {/* NAVBAR */}
      <nav className="border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
             <div className="bg-blue-600 p-2 rounded-lg"><Home size={24}/></div>
             PropTrust<span className="text-blue-500">VR</span>
          </Link>

          <div className="relative">
             <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition border border-gray-700">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold">John Buyer</div>
                    <div className="text-[10px] text-blue-400">Premium Member</div>
                </div>
                <User size={20} />
                <ChevronDown size={14} className="text-gray-400"/>
             </button>
             
             {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    <Link href="/dashboard/buyer/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-800 text-gray-300">
                        <Settings size={16}/> Settings & Profile
                    </Link>
                    <Link href="/logout" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-900/20 text-red-400 border-t border-gray-800">
                        <LogOut size={16}/> Sign Out
                    </Link>
                </div>
             )}
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12 relative">
            <input 
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search properties..." 
                className="w-full bg-[#111827] border border-gray-700 rounded-full py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-none shadow-lg transition"
            />
            <Search className="absolute left-4 top-4 text-gray-500" size={20}/>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(prop => <PropertyCard key={prop.id} prop={prop} />)}
            
            {filtered.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    No properties found. Try a different search.
                </div>
            )}
        </div>
      </main>
    </div>
  );
}