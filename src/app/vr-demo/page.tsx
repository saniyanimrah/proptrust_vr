import Link from 'next/link';
import { ArrowLeft, Cuboid, Monitor, Smartphone, Glasses } from 'lucide-react';

export default function VRDemoPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <h1 className="text-5xl font-bold mb-6 text-blue-500">How Our VR Works</h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          PropTrust VR utilizes advanced WebGL technology to render photorealistic 360° environments directly in your web browser. No plugins, no downloads, just instant immersion.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <Monitor className="text-blue-400 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">Desktop</h3>
                <p className="text-gray-400">Navigate using your mouse or trackpad. Click and drag to look around.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <Smartphone className="text-purple-400 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">Mobile</h3>
                <p className="text-gray-400">Use gyroscope controls. Physically turn your phone to look around the room.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <Glasses className="text-green-400 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-2">VR Headset</h3>
                <p className="text-gray-400">Enter full immersion mode with Oculus, HTC Vive, or Cardboard.</p>
            </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to try it?</h2>
            <Link href="/dashboard/buyer" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition">
                Browse VR Homes
            </Link>
        </div>
      </div>
    </div>
  );
}