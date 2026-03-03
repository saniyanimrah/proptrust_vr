"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // 1. Clear any stored tokens (if you added auth later)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Redirect to Home
    setTimeout(() => {
        router.push('/');
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center flex-col text-white">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <h2 className="text-xl font-bold">Signing Out...</h2>
    </div>
  );
}