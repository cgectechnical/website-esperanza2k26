"use client";
import Link from "next/link";
import banner from "@/assets/images/image8.png";
//import banner2 from "@/assets/images/ESPERANZA.png";
import star3 from "@/assets/images/Star 3.png";
import group12 from "@/assets/images/Group12.png";
//import { section } from "framer-motion/client";
import Image from "next/image";
import { sedgwick } from "@/utils/fonts";
import React, { useEffect, useRef } from 'react';
import AnimatedLine from "./AnimatedLine";


const PhotoContainer = () => {
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
          ESPERANZA
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
            ESPERANZA
          </text>
        </svg>
      </div>
      <AnimatedLine />


      <div className="flex flex-col md:flex-row gap-12 items-center">

<div className="flex-1 min-w-[250px] relative top-20 left-[-20] md:left-[-120]">
<div className='absolute z-[-1] w-[120%] top-[-200] left-[-100] '> 
  <Image
  src={star3}
  alt=""
  className=''
  />
  </div>
  <div className="border-white border-[1px]">
  <Image
    src={banner}
    alt="Sidhu"
    width={400}
    height={300}
    className="w-full shadow-md p-1 ml-5"
  />
  </div>
  
</div>

<div className="flex-1 min-w-[300px] relative top-20 left-[0] md:left-[40]">

<div className={`${sedgwick.className} text-base md:text-lg text-gray-200 leading-relaxed underdog space-y-4`}>

  <p>
    Welcome to{" "}
    <span className="bg-yellow-400/20 text-yellow-300 px-1">
      Esperanza’26
    </span>
    , the Tech Cum Cultural Fest of CGEC, from{" "}
    <span className="bg-pink-400/20 text-pink-300 px-1">
      16th–20th June 2026
    </span>.
  </p>

  <p>
    Three days of exciting{" "}
    <span className="bg-purple-400/20 text-purple-300 px-1">
      technical events
    </span>
    , followed by two days of vibrant{" "}
    <span className="bg-red-400/20 text-red-300 px-1">
      cultural celebrations
    </span>
    .
  </p>

  <p>
    Esperanza’26 says : —{" "}
    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-yellow-300/20 border border-amber-300/20 text-amber-200 tracking-[0.25em] uppercase text-sm backdrop-blur-md shadow-lg">
      "Where Technology Meets Culture & Innovation Meets Tradition"
    </span>
  </p>

  <p className="text-xl text-white">
    Create Memories. Create History.
  </p>

</div>


  <Link href="brochure/brochure.pdf" target="_blank" className="inline-block">
  <Image
  src={group12}
  alt=""
  width={270}
  className='pt-[50] w-[75%] md:w-full hover:scale-108 transition-transform duration-300 cursor-pointer'
  />
  </Link>
</div>
</div>
      
    </section>
  );
};

export default PhotoContainer;

//flex flex-col relative md:flex-row items-center justify-center pt-[8%]

