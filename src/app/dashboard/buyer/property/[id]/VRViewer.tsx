"use client";
import React from 'react';
// @ts-ignore 
import { Pannellum } from "pannellum-react";

interface VRViewerProps {
  imageUrl: string;
  onClose: () => void;
}
export default function VRViewer({ imageUrl, onClose }: VRViewerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
      
      {/* VR Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <span className="text-white font-bold bg-blue-600 px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(37,99,235,0.5)]">
           VR Mode Active
        </span>
        <button 
          onClick={onClose}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl backdrop-blur-md transition border border-white/10 font-medium"
        >
          Exit Tour ✕
        </button>
      </div>

      {/* The 360 Player */}
      <div className="flex-1 w-full h-full">
        <Pannellum
          width="100%"
          height="100%"
          image={imageUrl}
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          showZoomCtrl={false}
          onLoad={() => {
            console.log("360 Image Loaded");
          }}
        >
        </Pannellum>
      </div>

    </div>
  );
}