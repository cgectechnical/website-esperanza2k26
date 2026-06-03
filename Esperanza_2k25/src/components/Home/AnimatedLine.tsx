"use client";

import { motion } from "framer-motion";

const AnimatedLine = () => {
  return (
    <div className="flex justify-center w-full mt-4">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80%", opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-black rounded-full"
      />
    </div>
  );
};

export default AnimatedLine;
