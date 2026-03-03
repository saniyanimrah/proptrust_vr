import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <div className="space-y-6 text-gray-300">
            <p>By using PropTrust VR, you agree to the following:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>You will not upload copyrighted content to property listings.</li>
                <li>Offers made through the platform are binding agreements.</li>
                <li>We reserve the right to suspend accounts for suspicious activity.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}