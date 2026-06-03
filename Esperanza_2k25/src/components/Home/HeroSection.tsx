"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="absolute w-full h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-[95%] min-h-[95%] w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/bgvido.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* <div className="relative z-[1] text-center pt-[450px] underdog ">
        <h1 className="text-5xl font-bold">Welcome to Esperanza '25</h1>
        <p className="text-lg mt-4">The Ultimate Tech Extravaganza</p>
      </div> */}
      
    </section>
  );
}
