"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import pic1 from "@/assets/Gallery/tech/teacher.jpg";
import pic2 from "@/assets/Gallery/tech/robo6.jpg";
import pic3 from "@/assets/Gallery/tech/lf3.jpg";
import pic4 from "@/assets/Gallery/tech/robo4.jpg";
import pic5 from "@/assets/Gallery/tech/sc.jpg";
import pic6 from "@/assets/Gallery/tech/chess.jpg";
import pic8 from "@/assets/Gallery/tech/hackathon.jpg";
import pic7 from "@/assets/Gallery/tech/hvdc-min.jpg";
import pic9 from "@/assets/Gallery/tech/skyplane.jpg";
import pic10 from "@/assets/Gallery/tech/robo5.jpg";
import pic11 from "@/assets/Gallery/tech/gaming.jpg";
import pic12 from "@/assets/Gallery/tech/plane2.jpg";
import pic13 from "@/assets/Gallery/tech/plane1.jpg";
import pic14 from "@/assets/Gallery/tech/lf2-min.jpg";
import pic15 from "@/assets/Gallery/tech/cube.jpg";

import newTech1 from "@/assets/2k25/tech/20250423_112131.jpg.jpeg";
import newTech2 from "@/assets/2k25/tech/20250424_191114.jpg.jpeg";
import newTech3 from "@/assets/2k25/tech/20250424_191712.jpg.jpeg";
import newTech4 from "@/assets/2k25/tech/IMG20250422160553.jpg";
import newTech5 from "@/assets/2k25/tech/IMG20250422163329_01.jpg.jpeg";
import newTech6 from "@/assets/2k25/tech/IMG_0140.jpg";
import newTech7 from "@/assets/2k25/tech/IMG_0142.jpg";
import newTech8 from "@/assets/2k25/tech/IMG_0145.jpg";
import newTech9 from "@/assets/2k25/tech/IMG_0148.jpg";
import newTech10 from "@/assets/2k25/tech/IMG_0156.jpg";
import newTech11 from "@/assets/2k25/tech/IMG_0157.jpg";
import newTech12 from "@/assets/2k25/tech/IMG_0177.jpg";
import newTech13 from "@/assets/2k25/tech/IMG_9676.jpg";

const galleryItems = [
  // 2k25 Tech images first
  {
    id: 200,
    src: newTech1,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 201,
    src: newTech2,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 202,
    src: newTech3,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 203,
    src: newTech4,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 204,
    src: newTech5,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 205,
    src: newTech6,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 206,
    src: newTech7,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 207,
    src: newTech8,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 208,
    src: newTech9,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 209,
    src: newTech10,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 210,
    src: newTech11,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 211,
    src: newTech12,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 212,
    src: newTech13,
    span: "col-span-2 sm:col-span-1"
  },
  
  // Old images
  {
    id: 1,
    src: pic1,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 2,
    src: pic2,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 3,
    src:pic3,
    span: "col-span-2 sm:col-span-2"
  },
  // Row 2
  {
    id: 4,
    src: pic4,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 5,
    src: pic5,
    span: "col-span-2 sm:col-span-2"
  },
  // Row 3
  {
    id: 6,
    src: pic6,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 7,
    src: pic7,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 8,
    src: pic8,
    span: "col-span-2 sm:col-span-1"
  },
  // Row 4
  {
    id: 9,
    src: pic9,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 10,
    src: pic10,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 11,
    src: pic11,
    span: "col-span-2 sm:col-span-1"
  },
  // Row 5
  {
    id: 12,
    src: pic12,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 13,
    src: pic13,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 14,
    src: pic14,
    span: "col-span-2 sm:col-span-1"
  },
  {
    id: 15,
    src: pic15,
    span: "col-span-2 sm:col-span-1"
  }
];

export default function MasonryGalleryt() {
  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mx-auto max-w-7xl">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className={`relative ${item.span} aspect-[4/3] group`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 border-2 border-neutral-800 z-10 rounded-lg transition-colors duration-300 group-hover:border-white" />
              <Image
                src={item.src}
                alt={`Gallery item ${item.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}