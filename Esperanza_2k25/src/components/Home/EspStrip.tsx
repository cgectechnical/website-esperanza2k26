"use client";

import { useEffect, useState } from "react";
import logoesp from "@/assets/logo.png";
import Image from "next/image";
import { Underdog } from "next/font/google";
const underdog = Underdog({
  subsets: ["latin"],
  weight: ["400"],
})
export default function MarqueeText() {
  const text = "#ESPERANZA '26 "; 
  const letters = text.split(""); 
  const [activeLetter, setActiveLetter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLetter((prev) => (prev + 1) % letters.length);
    }, 400); 

    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <div className="w-full overflow-hidden bg-black py-4">
      <div className={`marquee text-white text-4xl font-bold tracking-wider flex items-center  ${underdog.className}`}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className="flex whitespace-nowrap items-center">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 mx-1 ${
                  index === activeLetter ? "opacity-100 shadow-glow" : "opacity-50"
                }`}
              >
                {letter} 
              </span>
            ))}
             <Image
              src={logoesp} 
              alt="Logo"
              width={50}
              height={70}
              className="mx-12"
              
            />
          </span>
        ))}
       
      </div>

      <style>{`
        .marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 10s linear infinite;
        }
          .marquee:hover{
          animation: step-end;
          cursor:pointer;
          }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
          
          .shadow-glow {
          text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8),
                       0px 0px 20px rgba(232, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}
