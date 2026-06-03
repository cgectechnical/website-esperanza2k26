"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import e2 from "@/assets/images/e1.png";
import s2 from "@/assets/images/s1.png";
import p2 from "@/assets/images/p1.png";
import e3 from "@/assets/images/e4.png";
import r2 from "@/assets/images/r1.png";
import pyramid2 from "@/assets/images/pyramid1.png";
import n2 from "@/assets/images/n1.png";
import z2 from "@/assets/images/z1.png";
import a2 from "@/assets/images/a1.png";
import k25 from "@/assets/images/k251.png";

const EspAnimation = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center front">
        <div className="flex items-center box-border ">
          <span className="letter">
            <Image src={e2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={s2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={p2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={e3} alt="" priority />
          </span>
          <span className="letter">
            <Image src={r2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={pyramid2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={n2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={z2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={a2} alt="" priority />
          </span>
          <span className="letter">
            <Image src={k25} alt="" priority />
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 150, scale: 0.7 }}
        animate={{ opacity: 1, y: -40, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.5,
        }}
        style={{ perspective: 1800 }}
        className="relative"
      >
        <div
          className="relative"
          style={{
            transform: "rotateX(65deg) rotateY(0deg) rotateZ(35deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute -left-4 -top-4 -right-4 -bottom-4 translate-y-[20px] rounded-[2rem] bg-black/60 blur-2xl" />

          <div
            className="relative w-[180px] h-[340px] sm:w-[220px] sm:h-[420px] md:w-[250px] md:h-[480px] cursor-pointer"
            onClick={() => setIsMuted(!isMuted)}
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-[2.3rem] blur-xl opacity-90 animate-pulse" />

            <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 border-4 border-gray-300 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-[8px] rounded-[1.6rem] bg-gradient-to-b from-gray-700 to-gray-900 overflow-hidden border-2 border-gray-500">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/2k26-intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 items-center pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-8 h-2 rounded-full bg-gray-800" />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-gray-600 pointer-events-none" />
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .letter{
            width: auto;
            height: max-content;
            position: relative;
            }
        .front span{
	text-shadow: #f22d2d 1px 0vh 10px;
	margin:4px;
	animation: amin 6.6s linear infinite;
}
@keyframes amin{
	0%{
		opacity: 1;
        
	}
	50%{
		opacity: 0;
       
	}
	100%{
		opacity: 1;
        
	}
}
            .front span:nth-child(1){
                animation-delay: 0.6s;
            }
.front span:nth-child(2){
  animation-delay: 1.2s;
  
}
.front span:nth-child(3){
  animation-delay: 1.8s;
  
}
.front span:nth-child(4){
  animation-delay: 2.4s;
  
}
.front span:nth-child(5){
  animation-delay: 3.0s;
  
}
.front span:nth-child(6){
  animation-delay: 3.6s;
  
}
.front span:nth-child(7){
  animation-delay: 4.2s;
  
}
.front span:nth-child(8){
  animation-delay: 4.8s;
  
}
.front span:nth-child(9){
  animation-delay: 5.4s;
  
}
  .front span:nth-child(10){
  animation-delay: 6s;
  
}

.front:hover{
	cursor:pointer;
}
.front span:hover{
	animation: step-end;
}
        `}</style>
    </div>
  );
};

export default EspAnimation;
