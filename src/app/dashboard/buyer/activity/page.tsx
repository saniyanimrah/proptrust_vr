"use client";
import { MessageCircle, Star } from 'lucide-react';

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Activity</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* My Comments */}
                <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400"><MessageCircle size={20}/> My Comments</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <div className="text-sm text-gray-400 mb-1">On <span className="text-white font-bold">Modern Sunset Villa</span></div>
                            <p className="text-gray-300 italic">"Is the furniture included in the price?"</p>
                            <div className="text-xs text-gray-500 mt-2">2 hours ago</div>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <div className="text-sm text-gray-400 mb-1">On <span className="text-white font-bold">Downtown Loft</span></div>
                            <p className="text-gray-300 italic">"Great lighting in the VR tour!"</p>
                            <div className="text-xs text-gray-500 mt-2">1 day ago</div>
                        </div>
                    </div>
                </div>

                {/* My Ratings */}
                <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400"><Star size={20}/> My Ratings</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <div>
                                <div className="font-bold">Estate Pro LLC</div>
                                <div className="text-xs text-gray-500">Seller Rating</div>
                            </div>
                            <div className="flex text-yellow-500"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                        </div>
                         <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                            <div>
                                <div className="font-bold">Beachfront Condo</div>
                                <div className="text-xs text-gray-500">Property Rating</div>
                            </div>
                            <div className="flex text-yellow-500"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star size={16}/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}