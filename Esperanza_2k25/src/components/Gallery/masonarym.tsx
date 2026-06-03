"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import newMore1 from "@/assets/2k25/more/IMG20250422120003.jpg";
import newMore2 from "@/assets/2k25/more/IMG20250422122557.jpg";
import newMore3 from "@/assets/2k25/more/IMG_9439.jpg";
import newMore4 from "@/assets/2k25/more/IMG_9462.jpg";
import newMore5 from "@/assets/2k25/more/IMG_9468.jpg";

const galleryItems = [
  { id: 100, src: newMore1 },
  { id: 101, src: newMore2 },
  { id: 102, src: newMore3 },
  { id: 103, src: newMore4 },
  { id: 104, src: newMore5 }
];

export default function MasonryGallerym() {
  return (
    <div className="p-2 sm:p-4">
      {/* Mobile: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mx-auto max-w-6xl">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative aspect-square overflow-hidden rounded-xl shadow-lg group ${
              // On mobile: all aspect square
              // On desktop: first take more space
              index === 0
                ? "md:col-span-2 md:aspect-[2/1]"
                : ""
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={item.src}
              alt={`Gallery item ${item.id}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            />
            {/* Red/black gradient border effect */}
            <div className="absolute inset-0 border-2 border-red-900/30 group-hover:border-red-500/70 transition-all duration-300 rounded-xl" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
