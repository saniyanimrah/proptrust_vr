"use client";
import { useState } from 'react';
import { User, CreditCard, Bell, Shield, LogOut, CheckCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock User Data
  const [user, setUser] = useState({
      name: "John Buyer",
      email: "buyer@demo.com",
      plan: "Free Tier"
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex">
      
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><SettingsIcon size={24} className="text-blue-500"/> Settings</h2>
        <nav className="space-y-2">
            <button onClick={() => setActiveTab('profile')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${activeTab === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-900'}`}>
                <User size={18}/> Profile
            </button>
            <button onClick={() => setActiveTab('membership')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${activeTab === 'membership' ? 'bg-blue-600' : 'hover:bg-gray-900'}`}>
                <Crown size={18}/> Membership
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${activeTab === 'notifications' ? 'bg-blue-600' : 'hover:bg-gray-900'}`}>
                <Bell size={18}/> Notifications
            </button>
            <Link href="/logout" className="w-full text-left p-3 rounded-xl flex items-center gap-3 hover:bg-red-900/20 text-red-400 mt-8">
                <LogOut size={18}/> Sign Out
            </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        
        {activeTab === 'profile' && (
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
                <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">JB</div>
                        <button className="text-blue-400 text-sm font-bold hover:underline">Change Avatar</button>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                            <input type="text" value={user.name} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                            <input type="email" value={user.email} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white" />
                        </div>
                    </div>
                    <button className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition">Save Changes</button>
                </div>
            </div>
        )}

        {activeTab === 'membership' && (
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Membership Plans</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Free Plan */}
                    <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 opacity-75">
                        <div className="text-xl font-bold mb-2">Basic Buyer</div>
                        <div className="text-3xl font-bold mb-6">$0<span className="text-sm font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-3 mb-8 text-gray-400 text-sm">
                            <li className="flex gap-2"><CheckCircle size={16}/> View VR Tours</li>
                            <li className="flex gap-2"><CheckCircle size={16}/> Contact Sellers</li>
                        </ul>
                        <button className="w-full py-3 bg-gray-800 rounded-xl font-bold cursor-not-allowed">Current Plan</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-6 rounded-3xl border border-blue-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-xl text-white">RECOMMENDED</div>
                        <div className="text-xl font-bold mb-2 text-white">Pro Access</div>
                        <div className="text-3xl font-bold mb-6 text-white">$29<span className="text-sm font-normal text-blue-200">/mo</span></div>
                        <ul className="space-y-3 mb-8 text-blue-100 text-sm">
                            <li className="flex gap-2"><CheckCircle size={16}/> Unlimited GenAI Staging</li>
                            <li className="flex gap-2"><CheckCircle size={16}/> Early Access to New Listings</li>
                            <li className="flex gap-2"><CheckCircle size={16}/> Verified Buyer Badge</li>
                        </ul>
                        <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-gray-100 transition">Upgrade Now</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

// Icon Helper
function SettingsIcon({size, className}: any) {
    return <Settings className={className} size={size} />;
}
import { Settings } from 'lucide-react';