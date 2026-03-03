// File: frontend/src/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { Home, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800 text-white">
      
      {/* Logo Area */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Home className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">PropTrust VR</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 text-gray-300">
        <Link href="/" className="hover:text-blue-400 transition">Marketplace</Link>
        <Link href="/" className="hover:text-blue-400 transition">VR Demo</Link>
        <Link href="/" className="hover:text-blue-400 transition">About Us</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition">
          Log In
        </Link>
        <Link href="/register" className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition shadow-lg shadow-blue-900/50">
          <UserCircle className="w-4 h-4" />
          Get Started
        </Link>
      </div>
    </nav>
  );
}