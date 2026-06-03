"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import pic1 from "@/assets/galary/cultural/WhatsApp Image 2025-03-31 at 22.22.49_a2993b86.jpg";
import pic2 from "@/assets/galary/cultural/WhatsApp Image 2025-03-31 at 22.22.50_5222b856.jpg";
import pic3 from "@/assets/galary/cultural/bhut1.jpg";
import pic4 from "@/assets/galary/cultural/WhatsApp Image 2025-04-07 at 20.09.08_87185433.jpg";
import pic5 from "@/assets/galary/cultural/grp2.jpg";
import pic6 from "@/assets/galary/cultural/WhatsApp Image 2025-03-31 at 22.22.51_f4a3566c.jpg";
import pic7 from "@/assets/galary/cultural/bhut3.jpg";
import pic8 from "@/assets/galary/cultural/melody.jpg";
import pic9 from "@/assets/galary/cultural/grp1.jpg";
import pic10 from "@/assets/galary/cultural/drummer.jpg";
import pic11 from "@/assets/galary/cultural/dance1.jpg";
import pic12 from "@/assets/galary/cultural/dance2.jpg";
import pic13 from "@/assets/galary/cultural/esp.jpg";
import pic14 from "@/assets/galary/cultural/bhut2.jpg";
import pic15 from "@/assets/galary/cultural/grp3.jpg";

import newCultural1 from "@/assets/2k25/cultural/IMG20250422123622.jpg";
import newCultural2 from "@/assets/2k25/cultural/IMG_9437.jpg";
import newCultural3 from "@/assets/2k25/cultural/IMG_9501.jpg";
import newCultural4 from "@/assets/2k25/cultural/IMG_9695.jpg";

const galleryItems = [
  // 2k25 Cultural images first
  {
    id: 300,
    src: newCultural1,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 301,
    src: newCultural2,
    span: "col-span-2 sm:col-span-2"
  },
  {
    id: 302,
    src: newCultural3,
    span: "col-span-1 sm:col-span-1"
  },
  {
    id: 303,
    src: newCultural4,
    span: "col-span-2 sm:col-span-2"
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

export default function MasonryGallery() {
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