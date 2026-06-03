"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import techImg from "@/assets/images/Group49.png";
import babyrobot from "@/assets/images/babyrobot.png";
import explore from "@/assets/images/Group45.png";
import star3 from "@/assets/images/Star 2.png";
//import meetOurDevelopers from "@/assets/images/meetOurDevelopers.png"
import { sedgwick } from "@/utils/fonts";
import AnimatedLine from "./AnimatedLine";
const Tech = () => {
  const shadowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-8 max-w-6xl mx-auto">
      <div className="relative inline-block mb-4 mx-auto w-full">
        <h1 className={`${sedgwick.className} text-5xl md:text-8xl font-bold text-gray-200 text-center relative z-10`}>
          Technical Events
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
            Technical Events
          </text>
        </svg>
      </div>
      <AnimatedLine />

      
      <div className="flex flex-col md:flex-row gap-20 items-center">

        <div className="flex-1 min-w-[300px] relative top-20">
<p className={`${sedgwick.className} text-lg text-gray-200 leading-relaxed underdog`}>
  Welcome to Esperanza’26 — the Tech Cum Cultural Fest of Cooch Behar Government Engineering College (CGEC), from 16th–20th June 2026.

  Experience an exciting blend of technology, creativity, and culture. The first three days will feature technical events like{" "}
  
  <span className="bg-white/10 px-2 py-1 rounded-md text-white">
    hackathons, coding, robotics, esports, quizzes
  </span>
  
  {" "}and many more innovation-driven challenges.

  Esperanza’26 is not just a fest — it’s a celebration of talent, innovation, and unforgettable memories.
</p>
          <Link href="/events/technical" className="inline-block">
          <Image
            src={explore}
            alt=""
            width={270}
            className='pt-[50] w-[75%] md:w-full hover:scale-108 transition-transform duration-300 cursor-pointer'
          />
          </Link>
        </div>

        <div className="flex-1 min-w-[250px] relative top-20 left-0 md:left-40">
          <div className='absolute z-[-1] w-[180%] left-[-130] top-[-130] md:left-[-270] md:top-[-250]'>
            <Image
              src={star3}
              alt=""
              className=''
            />
          </div>
          <div>
            <Image
              src={techImg}
              alt="Technical Events"
              width={400}
              height={300}
              className="shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <Image
              src={babyrobot}
              alt="Robot Mascot"
              width={200}
              height={150}
              className="absolute left-0 bottom-0 hover:scale-110 transition-transform duration-300 cursor-pointer z-10"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))'
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tech;