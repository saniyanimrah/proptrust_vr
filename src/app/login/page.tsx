"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Prepare data for OAuth2 (Backend expects form-data)
      const params = new URLSearchParams();
      params.append('username', formData.email);
      params.append('password', formData.password);

      // 2. Send to Backend (Using 127.0.0.1 to avoid Network Errors)
      const response = await axios.post('http://127.0.0.1:8000/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      // 3. Save Token & Redirect
      const { access_token, role } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);

      alert(`Login Successful! Welcome back, ${role}.`);
      
      // 4. Redirect based on Role
      if (role === 'seller') {
        router.push('/dashboard/seller');
      } else {
        router.push('/dashboard/buyer');
      }

    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-[480px] w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-10">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
            <LogIn className="text-blue-500" size={30} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-400">Enter your credentials to access your dashboard.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition" 
                placeholder="name@company.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? "Signing In..." : "Sign In"} {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
            Don't have an account? <Link href="/register" className="text-blue-400 font-bold hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
}