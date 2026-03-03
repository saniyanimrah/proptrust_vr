import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-6xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 mb-16">Choose the plan that fits your real estate journey.</p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Free Tier */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-2">Buyer</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> Unlimited VR Tours</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> 5 GenAI Staging Credits</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> Make Offers</li>
                </ul>
                <Link href="/dashboard/buyer" className="block w-full text-center bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold transition">Get Started</Link>
            </div>

            {/* Seller Tier */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-blue-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                <h3 className="text-2xl font-bold text-white mb-2">Seller Pro</h3>
                <div className="text-4xl font-bold mb-6">$49<span className="text-sm text-gray-500 font-normal">/listing</span></div>
                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> 3D Model Generation</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> Unlimited AI Staging</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> Analytics Dashboard</li>
                </ul>
                <Link href="/dashboard/seller" className="block w-full text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition">List Property</Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-2">Agency</h3>
                <div className="text-4xl font-bold mb-6">Custom</div>
                <ul className="space-y-4 mb-8 text-gray-300">
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> White-label Platform</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> Dedicated Support</li>
                    <li className="flex gap-3"><CheckCircle size={20} className="text-blue-500"/> API Access</li>
                </ul>
                <button className="block w-full text-center bg-gray-800 hover:bg-gray-700 py-3 rounded-xl font-bold transition">Contact Sales</button>
            </div>
        </div>
      </div>
    </div>
  );
}