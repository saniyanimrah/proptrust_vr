import Link from 'next/link';
import { ArrowLeft, Cuboid } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-6">About PropTrust VR</h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
            Founded in 2026, PropTrust VR is on a mission to democratize real estate access. We believe you shouldn't have to travel thousands of miles just to see if a home "feels right."
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
            By combining high-fidelity Virtual Reality with Generative AI, we allow buyers to not just view a space, but to reimagine it.
        </p>
        <div className="flex items-center gap-4 mt-12 p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="bg-blue-600 p-3 rounded-lg"><Cuboid size={32}/></div>
            <div>
                <h3 className="font-bold text-lg">Built with Modern Tech</h3>
                <p className="text-sm text-gray-400">Powered by Next.js 14, Python FastAPI, and WebGL.</p>
            </div>
        </div>
      </div>
    </div>
  );
}