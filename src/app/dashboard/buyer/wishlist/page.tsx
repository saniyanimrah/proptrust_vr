"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // In real app, fetch from /users/me/favorites
    // Here we just fetch all props and slice 2 for demo
    axios.get('http://127.0.0.1:8000/properties').then(res => {
        setFavorites(res.data.slice(0, 2)); 
    });
  }, []);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Heart className="text-pink-500" fill="currentColor"/> My Wishlist</h1>
            
            {favorites.length === 0 ? (
                <div className="text-center text-gray-500 py-20">No saved homes yet.</div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {favorites.map(prop => (
                        <div key={prop.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden group">
                            <div className="h-48 relative">
                                <img src={prop.image_url} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <button onClick={() => removeFavorite(prop.id)} className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{prop.title}</h3>
                                <div className="text-sm text-gray-400 flex items-center gap-1 mb-2"><MapPin size={14}/> {prop.location}</div>
                                <div className="text-xl font-bold text-blue-400 mb-4">${prop.price.toLocaleString()}</div>
                                <Link href={`/dashboard/buyer/property/${prop.id}`} className="block text-center bg-gray-800 hover:bg-blue-600 text-white py-2 rounded-lg font-bold transition">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}