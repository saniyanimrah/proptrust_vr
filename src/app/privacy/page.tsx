import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last Updated: Jan 2026</p>
        <div className="space-y-6 text-gray-300">
            <p>1. <strong>Data Collection:</strong> We collect email addresses and property preferences to improve your VR experience.</p>
            <p>2. <strong>VR Data:</strong> We analyze gaze duration to help sellers understand which room features are most popular. This data is anonymized.</p>
            <p>3. <strong>Security:</strong> All transaction data is encrypted.</p>
        </div>
      </div>
    </div>
  );
}