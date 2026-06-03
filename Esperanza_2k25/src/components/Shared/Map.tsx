"use client";

import { useState } from "react";
import { sedgwick } from "@/utils/fonts";
import MapImage from "@/assets/images/map.gif";
import Cgec from "@/assets/images/CGEC-Logo-colorful.jpg";
import Image from "next/image";
const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const locationInfo =
    "https://www.google.com/maps/place/Cooch+Behar+Government+Engineering+College/data=!4m2!3m1!1s0x0:0xe4952b5891bb2389?sa=X&ved=1t:2428&ictx=111";
  return (
    <>
      <div className="mb-8">
        <h3
          className={`${sedgwick.className} text-4xl xl:text-5xl mb-6 relative inline-block`}
        >
          ADDRESS
          <span className="absolute bottom-0 left-0 w-full h-1 bg-current"></span>
        </h3>
        <p className="text-lg xl:text-xl">
          <a
            href={locationInfo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sedgwick.className} text-blue-400 hover:underline `}
          >
            Cooch Behar Government Engineering College
            <br /> Vill-Harinchowrah, P.O-Ghughumari
            <br /> Dist-Cooch Behar, West Bengal, PIN-736170
          </a>
        </p>
      </div>
      <div onClick={() => window.open(locationInfo)} className="mt-8 lg:mt-12">
        <div className="bg-gray-900 hover:cursor-pointer rounded-3xl overflow-hidden border-2 border-white/20 h-[280px] lg:h-[350px] w-full relative">
          {/* Skeleton Loader */}
          {!mapLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse z-20"></div>
          )}
          <Image 
            src={MapImage} 
            alt="Map Image" 
            className="object-cover" 
            fill 
            onLoad={() => setMapLoaded(true)}
          />
          <div className="absolute z-10 top-1/5 left-1/8 transform -translate-x-1/2 -translate-y-1/2 size-30">
            <Image
              src={Cgec}
              alt="CGEC Logo"
              className="size-30 object-contain p-1 bg-white rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
