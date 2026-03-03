"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { BarChart3, Home, Plus, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function SellerDashboard() {
  // 1. State for Real Metrics & Offers
  const [metrics, setMetrics] = useState({ 
    total_views: 0, 
    total_listings: 0, 
    engagement_rate: '-' 
  });
  const [agreements, setAgreements] = useState([]); // Stores the offers
  const [loading, setLoading] = useState(true);

  // 2. Fetch Real Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Metrics
        const metricsRes = await axios.get('http://127.0.0.1:8000/seller/metrics');
        setMetrics(metricsRes.data);
        
        // Fetch Recent Offers
        const offersRes = await axios.get('http://127.0.0.1:8000/seller/agreements');
        setAgreements(offersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      // 1. Send update to backend
      await axios.put(`http://127.0.0.1:8000/agreements/${id}`, {
        status: newStatus
      });

      // 2. Update UI instantly (Optimistic UI)
      setAgreements((prev: any) => 
        prev.map((offer: any) => 
          offer.id === id ? { ...offer, status: newStatus } : offer
        )
      );
      
      alert(`Offer ${newStatus}!`);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      
      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-green-500">
          <TrendingUp size={24} />
          <span className="text-xl font-bold tracking-tight text-white">
            Seller<span className="text-green-500">Hub</span>
          </span>
        </div>
        <div className="flex gap-4 items-center">
           <span className="text-gray-400 text-sm">Welcome, Bob Builder</span>
           <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center border border-green-500/30 text-green-400 font-bold">
             BB
           </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Performance Overview</h1>
            <p className="text-gray-400">Your AI-powered sales insights for today.</p>
          </div>
          {/* Link to Add Property Page */}
          <Link 
            href="/dashboard/seller/add-property" 
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-green-900/20"
          >
            <Plus size={20} /> Post New Property
          </Link>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Total Views */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
                <Users size={24} />
              </div>
              <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                <TrendingUp size={14} /> Live
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Profile Views</h3>
            <p className="text-3xl font-bold">{metrics.total_views}</p> 
          </div>

          {/* Card 2: Listings */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500">
                <Home size={24} />
              </div>
              <span className="text-gray-500 text-sm">Active</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Listed Properties</h3>
            <p className="text-3xl font-bold">{metrics.total_listings}</p>
          </div>

          {/* Card 3: Engagement */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg text-yellow-500">
                <BarChart3 size={24} />
              </div>
              <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                 {metrics.engagement_rate}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Engagement Score</h3>
            <p className="text-3xl font-bold">8.5%</p>
          </div>

          {/* Card 4 - AI Insight */}
          <div className="bg-gradient-to-br from-green-900/20 to-gray-900 border border-green-500/30 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 blur-[50px] rounded-full"></div>
            <div className="flex justify-between mb-4 relative z-10">
              <div className="bg-green-500 p-2 rounded-lg text-black">
                <TrendingUp size={20} />
              </div>
            </div>
            <h3 className="text-green-400 text-sm font-bold mb-1 relative z-10">AI Insight</h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10">
              "3BHK Villa" is receiving 40% more clicks than average. Consider increasing price by 2%.
            </p>
          </div>

        </div>

        {/* RECENT OFFERS SECTION */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" /> Recent Offers
        </h2>
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-10">
            {agreements.length === 0 ? (
                // Empty State for Offers
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                    <div className="bg-gray-800 p-4 rounded-full mb-3 text-gray-600">
                        <Clock size={24} />
                    </div>
                    No offers received yet.
                </div>
            ) : (
                // List of Offers
                <div className="divide-y divide-gray-800">
                    {agreements.map((offer: any) => (
                        <div key={offer.id} className="p-6 flex justify-between items-center hover:bg-gray-800/50 transition">
                            <div>
                                <div className="font-bold text-white mb-1 flex items-center gap-2">
                                    Property ID: #{offer.property_id}
                                    <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                                        {offer.date_created}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Buyer: <span className="text-blue-400 font-medium">{offer.buyer_email}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {/* Status Badge */}
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    offer.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                                    offer.status === 'accepted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                    'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}>
                                    {offer.status}
                                </span>
                                
                                {/* Action Buttons (Only for Pending) */}
                                {offer.status === 'pending' && (
    <div className="flex gap-2 ml-4">
        {/* ACCEPT BUTTON */}
        <button 
            onClick={() => handleUpdateStatus(offer.id, 'accepted')}
            className="p-2 bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white rounded-lg transition" 
            title="Accept Offer"
        >
            <CheckCircle size={18} />
        </button>

        {/* REJECT BUTTON */}
        <button 
            onClick={() => handleUpdateStatus(offer.id, 'rejected')}
            className="p-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition" 
            title="Reject Offer"
        >
            <XCircle size={18} />
        </button>
    </div>
)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </main>
    </div>
  );
}