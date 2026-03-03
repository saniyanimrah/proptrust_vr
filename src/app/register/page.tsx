"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { User, Store, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  
  // --- STATE ---
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");

    // 1. Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);

    try {
      // 2. CRITICAL FIX: Using 127.0.0.1 instead of localhost
      console.log("Sending data to backend...");
      
      const response = await axios.post('http://127.0.0.1:8000/register', {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role
      });

      console.log("Success:", response.data);
      alert("Account Created! Redirecting to Login...");
      router.push('/login');

    } catch (err: any) {
      console.error("Full Error Object:", err);
      
      if (err.code === "ERR_NETWORK") {
        setError("Backend is offline. Please run 'uvicorn app.main:app --reload' in the backend folder.");
      } else {
        setError(err.response?.data?.detail || "Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE */}
        <div className="md:w-5/12 bg-gray-800/50 p-10 border-r border-gray-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Who are you?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">Select your primary role.</p>
          
          <div className="space-y-5">
            <button type="button" onClick={() => setRole('buyer')} className={`w-full p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${role === 'buyer' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800'}`}>
              <div className={`p-3 rounded-full ${role === 'buyer' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}><User size={24} /></div>
              <div className="text-left"><p className={`text-lg font-bold ${role === 'buyer' ? 'text-white' : 'text-gray-300'}`}>I am a Buyer</p></div>
              {role === 'buyer' && <CheckCircle className="ml-auto text-blue-500" size={22} />}
            </button>

            <button type="button" onClick={() => setRole('seller')} className={`w-full p-5 rounded-xl border-2 flex items-center gap-4 transition-all ${role === 'seller' ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-gray-800'}`}>
              <div className={`p-3 rounded-full ${role === 'seller' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}><Store size={24} /></div>
              <div className="text-left"><p className={`text-lg font-bold ${role === 'seller' ? 'text-white' : 'text-gray-300'}`}>I am a Seller</p></div>
              {role === 'seller' && <CheckCircle className="ml-auto text-green-500" size={22} />}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-7/12 p-10 md:p-14 flex flex-col justify-center bg-gray-900">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          
          {/* ERROR BOX */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500" placeholder="Full Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500" placeholder="Email Address" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500" placeholder="Password" />

            <button type="submit" disabled={loading} className={`w-full mt-4 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg ${role === 'buyer' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
              {loading ? "Connecting..." : "Get Started Now"} {!loading && <ArrowRight size={22} />}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account? <Link href="/login" className="font-bold hover:underline text-blue-500">Log In Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}