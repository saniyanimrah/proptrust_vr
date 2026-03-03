"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, Home, DollarSign, MapPin, FileText, ImageIcon, Layers } from 'lucide-react';
import Link from 'next/link';

export default function AddProperty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    description: '',
    image_url: 'https://pannellum.org/images/alma.jpg' // Default VR Image
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // 1. Convert strings to numbers to prevent 422 Errors
    const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        image_url: formData.image_url || "https://pannellum.org/images/alma.jpg",
        price: parseInt(formData.price) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area_sqft: parseInt(formData.area_sqft) || 0,
    };

    console.log("Sending Payload:", payload); // Debugging

    try {
      await axios.post('http://127.0.0.1:8000/properties', payload);
      alert("Property Listed Successfully!");
      router.push('/dashboard/seller'); // Send back to dashboard
    } catch (error: any) {
      console.error("Submission Error:", error);
      // Show exact error message from backend if available
      const errMsg = error.response?.data?.detail 
        ? JSON.stringify(error.response.data.detail) 
        : "Failed to list property. Check console.";
      alert(`Error: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard/seller" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition border border-gray-700">
                <ArrowLeft size={20} />
            </Link>
            <div>
                <h1 className="text-3xl font-bold">List New Property</h1>
                <p className="text-gray-400 text-sm">Fill in the details to publish your VR tour.</p>
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                    <Home size={20}/> Basic Details
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-400 mb-2">Property Title</label>
                        <input name="title" required onChange={handleChange} type="text" placeholder="e.g. Modern Sunset Villa" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><DollarSign size={14}/> Price ($)</label>
                        <input name="price" required onChange={handleChange} type="number" placeholder="500000" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><MapPin size={14}/> Location</label>
                        <input name="location" required onChange={handleChange} type="text" placeholder="Miami, FL" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition" />
                    </div>
                </div>
            </div>

            {/* Section 2: Specs */}
            <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-purple-400 flex items-center gap-2">
                    <Layers size={20}/> Specifications
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Bedrooms</label>
                        <input name="bedrooms" required onChange={handleChange} type="number" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Bathrooms</label>
                        <input name="bathrooms" required onChange={handleChange} type="number" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Area (Sqft)</label>
                        <input name="area_sqft" required onChange={handleChange} type="number" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition" />
                    </div>
                </div>
            </div>

            {/* Section 3: Description & Image */}
            <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                    <ImageIcon size={20}/> Media & Description
                </h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><FileText size={14}/> Description</label>
                        <textarea name="description" required onChange={handleChange} rows={4} className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-white focus:border-green-500 outline-none transition"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Image URL (For VR Demo)</label>
                        <div className="flex gap-3">
                             <input name="image_url" value={formData.image_url} onChange={handleChange} type="text" className="w-full bg-gray-950 border border-gray-700 rounded-xl p-4 text-gray-300 focus:border-green-500 outline-none transition" />
                             <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center"><Upload size={24} className="text-gray-400" /></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">*Using default Pannellum image for VR demo functionality.</p>
                    </div>
                </div>
            </div>

            <button disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 transition transform hover:scale-[1.01]">
                {loading ? "Publishing..." : <><Save size={24} /> Publish Listing Now</>}
            </button>

        </form>
      </div>
    </div>
  );
}