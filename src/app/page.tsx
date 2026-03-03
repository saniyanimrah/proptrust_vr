"use client";
import Link from 'next/link';
import { Cuboid, Sparkles, TrendingUp, Home, ArrowRight, Shield, Globe, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

// Small component to handle copying contact info
function ContactItem({ icon: Icon, text, copyValue }: { icon: any, text: string, copyValue: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(copyValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <li 
            onClick={handleCopy} 
            className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer group transition-all"
        >
            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition">
                {copied ? <Check size={16} className="text-white"/> : <Icon size={16}/>}
            </div>
            <span>{text}</span>
            <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-500 font-bold transition">
                {copied ? "Copied!" : "Click to copy"}
            </span>
        </li>
    );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* NAVBAR */}
      <nav className="w-full border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
             <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.5)]">
               <Cuboid size={24} />
             </div>
             <span className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition">
               PropTrust<span className="text-blue-500">VR</span>
             </span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
             <Link href="/about" className="hover:text-white transition hover:scale-105">About Us</Link>
             <Link href="/vr-demo" className="hover:text-white transition hover:scale-105">VR Demo</Link>
             <Link href="/pricing" className="hover:text-white transition hover:scale-105">Pricing</Link>
          </div>

          <div className="flex gap-4">
             <Link href="/login" className="px-5 py-2 rounded-full border border-gray-700 hover:bg-gray-800 hover:border-blue-500 transition text-sm font-bold">
               Log In
             </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-24 pb-32 text-center px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold mb-8 animate-in slide-in-from-bottom-4">
           <Sparkles size={16} /> Now with GenAI Staging
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-in slide-in-from-bottom-8">
           Walk Through Your Dream Home <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400">Before You Visit.</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-10">
           The world's first platform combining 360° VR Tours, GenAI Furniture Staging, and Secure Transactions.
        </p>
      </header>

      {/* ROLES SECTION (High Contrast) */}
      <section id="roles" className="py-12 bg-gray-950/50">
         <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Who are you?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                
                {/* BUYER CARD */}
                <Link href="/dashboard/buyer" className="group relative h-80 rounded-3xl overflow-hidden border border-gray-700 bg-gray-900 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
                    <img src="/buyer.jpg" alt="Buyer" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    
                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:-translate-y-2 transition duration-300">
                            <Home size={28} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2 text-white">I am a Buyer</h3>
                        <p className="text-gray-300 mb-6 font-medium text-sm">Browse VR tours & make offers.</p>
                        <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:gap-4 transition-all">
                            Browse Homes <ArrowRight size={20} />
                        </div>
                    </div>
                </Link>

                {/* SELLER CARD */}
                <Link href="/dashboard/seller" className="group relative h-80 rounded-3xl overflow-hidden border border-gray-700 bg-gray-900 hover:border-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
                    <img src="/seller.jpg" alt="Seller" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                    
                    <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:-translate-y-2 transition duration-300">
                            <TrendingUp size={28} />
                        </div>
                        <h3 className="text-3xl font-bold mb-2 text-white">I am a Seller</h3>
                        <p className="text-gray-300 mb-6 font-medium text-sm">List properties & track analytics.</p>
                        <div className="flex items-center gap-2 text-green-400 font-bold group-hover:gap-4 transition-all">
                            List Property <ArrowRight size={20} />
                        </div>
                    </div>
                </Link>

            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 border-t border-gray-800 bg-[#05080F] text-gray-400 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            
            <div className="col-span-1">
                <div className="flex items-center gap-2 text-white mb-4">
                    <Cuboid className="text-blue-600" size={24} />
                    <span className="text-xl font-bold">PropTrust<span className="text-blue-500">VR</span></span>
                </div>
                <p className="mb-6 leading-relaxed text-gray-500">The future of property buying. Secure, fast, and immersive.</p>
            </div>

            {/* Platform Links */}
            <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-3">
                    <li><Link href="/dashboard/buyer" className="hover:text-blue-500 transition">Browse Homes</Link></li>
                    <li><Link href="/dashboard/seller/add-property" className="hover:text-blue-500 transition">List Property</Link></li>
                    <li><Link href="/vr-demo" className="hover:text-blue-500 transition">VR Demo</Link></li>
                    <li><Link href="/pricing" className="hover:text-blue-500 transition">Pricing</Link></li>
                </ul>
            </div>

            {/* Company Links */}
            <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-3">
                    <li><Link href="/about" className="hover:text-blue-500 transition">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-blue-500 transition">Careers</Link></li>
                    <li><Link href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-blue-500 transition">Terms of Service</Link></li>
                </ul>
            </div>

            {/* Contact - Click to Copy */}
            <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <ul className="space-y-3">
                    <ContactItem icon={Mail} text="support@proptrust.com" copyValue="support@proptrust.com" />
                    <ContactItem icon={Phone} text="+1 (555) 123-4567" copyValue="+15551234567" />
                    <ContactItem icon={MapPin} text="123 Innovation Dr, Tech City" copyValue="123 Innovation Dr, Tech City" />
                </ul>
            </div>

        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-900 text-gray-600">
            &copy; 2026 PropTrust VR. All rights reserved.
        </div>
      </footer>

    </div>
  );
}