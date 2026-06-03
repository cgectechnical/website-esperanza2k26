"use client";

import { TeamMember } from "@/interfaces/team.interface";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";


export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: TeamMember[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [rotationCache, setRotationCache] = useState<number[]>([]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  // Cache random rotateY values after mount
  useEffect(() => {
    setRotationCache(
      testimonials.map(() => Math.floor(Math.random() * 21) - 10)
    );
  }, [testimonials]);

  return (
    <div className={`py-20 antialiased mx-auto`}>
      <div className="relative grid grid-cols-1 gap-4 sm:gap-8 md:gap-16 lg:gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotationCache[index] ?? 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotationCache[index] ?? 0,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotationCache[index] ?? 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-3xl overflow-hidden">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        draggable={false}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-800 flex items-center justify-center text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="mt-2 text-[1.1rem] text-gray-500 dark:text-neutral-500 ">
              {testimonials[active].year} - {testimonials[active].department}
            </p>
            <motion.p className="mt-4 text-lg text-gray-500 dark:text-neutral-300 capitalize">
              {testimonials[active].lead?.split(" ").map((word: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            <motion.div>
              <div className="flex justify-start gap-5 my-3 relative z-20">
                {testimonials[active].socials?.map((s: any, i: number) => {
                  let icon = null;
                  if (s.handler === "Facebook") {
                    icon = <FaFacebook size={35} color="white" />;
                  } else if (s.handler === "Instagram") {
                    icon = <FaInstagram size={35} color="white" />;
                  } else if (s.handler === "Github") {
                    icon = <FaGithub size={35} color="white" />;
                  } else {
                    icon = <FaLinkedin size={35} color="white" />;
                  }
                  return (
                    <Link target="_blank" key={i} href={s.link}>
                      {icon}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
          <div className="flex gap-4 pt-6 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
