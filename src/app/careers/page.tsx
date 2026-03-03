import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-3xl mx-auto text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-6">Join the Revolution</h1>
        <p className="text-gray-400 mb-12">We are always looking for visionary engineers and designers.</p>
        
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12">
            <h3 className="text-2xl font-bold mb-4">No Open Positions</h3>
            <p className="text-gray-500">We are currently fully staffed. Check back later!</p>
        </div>
      </div>
    </div>
  );
}