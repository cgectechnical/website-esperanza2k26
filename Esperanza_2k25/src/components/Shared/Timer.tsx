"use client";
import { getRemainingTime } from "@/utils/functions/countdown";
import { Sedgwick_Ave_Display } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import AnimatedLine from "../Home/AnimatedLine";

const sedgwick = Sedgwick_Ave_Display({
  weight: "400",
  subsets: ["latin-ext"],
  variable: "--font-sedgwick",
});

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState<string | null>();
  const shadowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime("2026-06-16T00:00:00"));
    }, 1000);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && shadowRef.current) {
          shadowRef.current.style.transition = 'none';
          shadowRef.current.style.strokeDashoffset = '1000';
          void shadowRef.current.getBoundingClientRect();
          shadowRef.current.style.transition = 'stroke-dashoffset 4s ease-in-out';
          shadowRef.current.style.strokeDashoffset = '0';
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearInterval(interval);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!remainingTime)
    return (
      <section ref={sectionRef} className="py-16 px-8 max-w-6xl mx-auto">
        <div className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-red-800 text-center ${sedgwick.className}`}>
          Countdown is Loading
        </div>
      </section>
    );

  return (
    <section ref={sectionRef} className="py-16 px-8 max-w-6xl mx-auto">
      <div className="relative inline-block mb-8 mx-auto w-full">
        <h1
          className={`${sedgwick.className} text-5xl md:text-8xl font-bold text-gray-200 text-center relative z-10`}
        >
          Countdown
        </h1>
        <svg
          ref={shadowRef}
          className={`${sedgwick.className} absolute top-7 left-4 w-full h-full`}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
          }}
        >
          <text
            x="50%"
            y="80%"
            textAnchor="middle"
            className="text-5xl md:text-8xl"
            fill="transparent"
            stroke="#999999"
            strokeWidth="1"
          >
            Countdown
          </text>
        </svg>
      </div>

      <div className={`flex justify-center flex-col items-center gap-2 ${sedgwick.className}`}>
        <span className="text-xl md:text-2xl text-gray-200">Cant Wait to be the witness of some explosive things </span>
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-red-600 ${sedgwick.className}`}
        >
          {remainingTime}
        </h1>
      </div>
    </section>
  );
};

export default Timer;
