"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchAllBands } from "@/actions/fetch.action";
import { sedgwick } from "@/utils/fonts";
import AnimatedLine from "./AnimatedLine";

interface BandType {
  _id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

const Band = () => {
  const [bands, setBands] = useState<BandType[]>([]);
  const [loading, setLoading] = useState(true);
  const shadowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && shadowRef.current) {
          shadowRef.current.style.transition = "none";
          shadowRef.current.style.strokeDashoffset = "1000";

          void shadowRef.current.getBoundingClientRect();

          shadowRef.current.style.transition =
            "stroke-dashoffset 4s ease-in-out";
          shadowRef.current.style.strokeDashoffset = "0";
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
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

  useEffect(() => {
    const loadBands = async () => {
      const data = await fetchAllBands();
      setBands(data);
      setLoading(false);
    };
    loadBands();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-8 max-w-6xl mx-auto">
      {/* Band header - matching Technical/Cultural style */}
      <div className="relative inline-block mb-4 mx-auto w-full">
        <h1
          className={`${sedgwick.className} text-5xl md:text-8xl font-bold text-gray-200 text-center relative z-10`}
        >
          Band
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
            Band
          </text>
        </svg>
      </div>
      <div className="mb-8">
        <AnimatedLine />
      </div>

      <div className="space-y-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-gray-500 text-xl">
              Loading bands...
            </div>
          </div>
        ) : bands.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No bands yet. Check back soon!
          </div>
        ) : (
          bands.map((bandItem) => (
            <div
              key={bandItem._id}
              className="relative flex flex-col items-center"
            >
              {/* Band title and description grouped together */}
              <div className="text-center mb-8 max-w-2xl">
                <h3
                  className={`text-4xl md:text-5xl font-bold text-white mb-4 ${sedgwick.className}`}
                >
                  {bandItem.title}
                </h3>
                {bandItem.description && (
                  <p
                    className={`${sedgwick.className} text-base md:text-lg text-gray-200 leading-relaxed underdog`}
                  >
                    {bandItem.description}
                  </p>
                )}
              </div>

              {/* Then the banner/image with React-based animated frame */}
              <div className="relative inline-block w-full max-w-5xl">
                {/* Beautiful animated frame using framer-motion */}
                <motion.div
                  className="absolute -inset-3 rounded-2xl"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #ef4444, #991b1b, #000000, #991b1b, #ef4444)",
                      "linear-gradient(135deg, #ef4444, #991b1b, #000000, #991b1b, #ef4444)",
                      "linear-gradient(225deg, #ef4444, #991b1b, #000000, #991b1b, #ef4444)",
                      "linear-gradient(315deg, #ef4444, #991b1b, #000000, #991b1b, #ef4444)",
                    ],
                    backgroundSize: [
                      "300% 300%",
                      "300% 300%",
                      "300% 300%",
                      "300% 300%",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                />

                {/* Inner frame */}
                <div className="relative bg-black rounded-2xl p-2">
                  {bandItem.imageUrl ? (
                    <Image
                      src={bandItem.imageUrl}
                      alt={bandItem.title}
                      width={1920}
                      height={1080}
                      className="w-full min-w-[300px] h-auto max-h-[600px] object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Band;
