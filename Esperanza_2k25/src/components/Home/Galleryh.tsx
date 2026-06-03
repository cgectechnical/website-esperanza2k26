"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ploygon54 from "@/assets/images/Polygon54.png";
import ploygon52 from "@/assets/images/Polygon52.png";
import memoriesCollage from "@/assets/images/memories.jpg";
import { useRandomPositions } from "@/hooks/useRandomPositions";
import { sedgwick } from "@/utils/fonts";
import AnimatedLine from "./AnimatedLine";

export default function Gallery() {
  const router = useRouter();
  const shadowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const positions = useRandomPositions(12);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && shadowRef.current) {
          shadowRef.current.style.transition = "none";
          shadowRef.current.style.strokeDashoffset = "1000";
          void shadowRef.current.getBoundingClientRect();
          shadowRef.current.style.transition = "stroke-dashoffset 4s ease-in-out";
          shadowRef.current.style.strokeDashoffset = "0";
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
    <section
      ref={sectionRef}
      className="py-16 px-8 relative overflow-hidden"
    >
      {/* Header - same style as Cultural/Tech */}
      <div className="flex justify-center w-full">
        <div className="relative mb-4 w-full max-w-6xl">
          <h1
            className={`${sedgwick.className} text-5xl md:text-8xl font-bold text-gray-200 text-center relative z-10`}
          >
            Memories
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
              Memories
            </text>
          </svg>
        </div>
      </div>
      <AnimatedLine />

      <div className="absolute z-[-1] md:right-[-2]">
        <Image
          src={ploygon54}
          alt=""
          width={700}
        />
      </div>

      <div className="max-w-6xl mx-auto mt-12 relative">
        {/* Decorative animated border */}
        <motion.div
          className="absolute -inset-2 rounded-3xl border border-white/10"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 100, 100, 0.2)",
              "0 0 40px rgba(255, 100, 100, 0.3)",
              "0 0 20px rgba(255, 100, 100, 0.2)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Main collage image with beautiful frame */}
        <div className="relative">
          {/* Gradient glow behind image */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 rounded-3xl blur-2xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Image container with animated frame */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => router.push("/gallery")}
          >
            {/* Animated gradient border using framer-motion */}
            <motion.div
              className="absolute inset-0 p-[3px] rounded-3xl"
              animate={{
                background: [
                  "linear-gradient(45deg, #ef4444, #991b1b, #000000, #991b1b, #ef4444)",
                  "linear-gradient(90deg, #991b1b, #000000, #991b1b, #ef4444, #ef4444)",
                  "linear-gradient(135deg, #000000, #991b1b, #ef4444, #ef4444, #991b1b)",
                ],
                backgroundSize: ["300% 300%", "300% 300%", "300% 300%"],
                backgroundPosition: ["0% 50%", "50% 50%", "100% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />

            {/* Inner container */}
            <div className="relative rounded-[22px] p-1 m-[2px]">
              <Image
                src={memoriesCollage}
                alt="Esperanza Memories Collage"
                className="w-full h-auto rounded-[20px] object-cover"
                priority
              />

              {/* Animated particles overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {positions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    initial={{
                      x: `${pos.x}%`,
                      y: `${pos.y}%`,
                      opacity: 0
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [1, 1.5, 1],
                      transition: {
                        duration: 3 + (i * 0.2),
                        delay: i * 0.3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute z-[-1] -left-2 -translate-y-160">
        <Image
          src={ploygon52}
          alt=""
          width={900}
        />
      </div>
    </section>
  );
}
