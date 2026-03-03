"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { User, MapPin, Star, ShieldCheck, Home, Mail, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SellerProfile() {
  const params = useParams();
  const [seller, setSeller] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock Seller Data (In real app, fetch from backend)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
        setSeller({
            id: params.id,
            name: "Estate Pro LLC",
            email: "contact@estatepro.com",
            phone: "+1 (555) 000-9999",
            rating: 4.8,
            reviews: 124,
            joined: "March 2024",
            verified: true,
            bio: "Premium real estate agency specializing in modern luxury villas and smart homes."
        });
        // Fetch real properties for this demo
        axios.get('http://127.0.0.1:8000/properties').then(res => {
            setListings(res.data); // In real app, filter by seller_id
        });
        setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading Seller Profile...</div>;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/dashboard/buyer" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Marketplace
        </Link>

        {/* SELLER HEADER CARD */}
        <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-[#0B0F19] shadow-xl">
                {seller.name.substring(0,2).toUpperCase()}
            </div>
            
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{seller.name}</h1>
                    {seller.verified && <ShieldCheck className="text-blue-500" size={24} />}
                </div>
                
                <div className="flex flex-wrap gap-6 text-gray-400 text-sm mb-6">
                    <div className="flex items-center gap-1"><Star className="text-yellow-500" size={16}/> {seller.rating} ({seller.reviews} Reviews)</div>
                    <div className="flex items-center gap-1"><MapPin size={16}/> Miami, FL</div>
                    <div className="flex items-center gap-1"><User size={16}/> Member since {seller.joined}</div>
                </div>

                <p className="text-gray-300 leading-relaxed max-w-2xl mb-6">{seller.bio}</p>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold transition">
                        <Mail size={18}/> Contact Seller
                    </button>
                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-bold transition border border-gray-700">
                        <Phone size={18}/> {seller.phone}
                    </button>
                </div>
            </div>
        </div>

        {/* SELLER LISTINGS */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Home className="text-blue-500"/> Active Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listings.map((prop) => (
                <div key={prop.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition">
                    <img src={prop.image_url} alt={prop.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">{prop.title}</h3>
                        <div className="text-blue-400 font-bold mb-4">${prop.price.toLocaleString()}</div>
                        <Link href={`/dashboard/buyer/property/${prop.id}`} className="block text-center bg-gray-800 hover:bg-gray-700 py-2 rounded-lg text-sm font-bold transition">
                            View Property
                        </Link>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}