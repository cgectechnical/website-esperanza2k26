"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import img1 from "@/assets/clubs/capture.png";
import img2 from "@/assets/clubs/creativepen.png";
import img3 from "@/assets/clubs/gdsc.png";
import img4 from "@/assets/clubs/dance.png";
import img5 from "@/assets/clubs/debate.png";
import img6 from "@/assets/clubs/game.png";
import img7 from "@/assets/clubs/doubthub.jpg";
import img8 from "@/assets/clubs/melody.png";
import img9 from "@/assets/clubs/pep.png";
import img10 from "@/assets/clubs/quilaxy.png";
import img11 from "@/assets/clubs/rongmilanti.png";
import img12 from "@/assets/clubs/sports.png";
import img13 from "@/assets/clubs/techonicks.png";
import img14 from "@/assets/clubs/theatre.png";
import img15 from "@/assets/clubs/ct.png";
import img16 from "@/assets/clubs/Alokbarsha.png";
import img17 from "@/assets/clubs/Roboverse.png";
import ellipse8 from "@/assets/images/Ellipse8.png";
import { sedgwick } from "@/utils/fonts";
import AnimatedLine from "./AnimatedLine";

const CLUBS_DATA = [
  {
    id: 1,
    name: "Capture Club",
    image: img1,
    href: "https://www.instagram.com/cgec_capture_crew?igsh=YzVyN3hsNzh6dmJx",
    description: "Freezing moments and memories through the lens of passion.",
    color: "cyan",
  },
  {
    id: 2,
    name: "Creative Pen Club",
    image: img2,
    href: "https://www.instagram.com/creativepenscgec?igsh=cWlweG13dGNzNXBo",
    description:
      "Letting imaginations run wild through words, poetry, and storytelling.",
    color: "red",
  },
  {
    id: 3,
    name: "GDSC CGE Club",
    image: img3,
    href: "https://www.linkedin.com/company/gdsc-cgec/",
    description:
      "Empowering students to grow and innovate through real-world tech solutions.",
    color: "emerald",
  },
  {
    id: 4,
    name: "Dance Club",
    image: img4,
    href: "https://www.instagram.com/nrityanirvana.cgec?igsh=MWRhdjdienBza2I5bA%3D%3D",
    description:
      "Expressing emotions through graceful moves and vibrant dance forms.",
    color: "pink",
  },
  {
    id: 5,
    name: "Debate Club",
    image: img5,
    href: "https://www.instagram.com/cgecdebateclub?igsh=MWd0djFpcDY2YnJrOQ%3D%3D",
    description:
      "Sharpening minds with the art of argument, logic, and reasoning.",
    color: "blue",
  },
  {
    id: 6,
    name: "Gamers Creed Club",
    image: img6,
    href: "https://www.instagram.com/gamers_creed_cgec_?igsh=MTdwZWdsZXliOXhnZA%3D%3D",
    description:
      "Uniting gaming enthusiasts for epic virtual battles and strategy showdowns.",
    color: "amber",
  },
  {
    id: 7,
    name: "Doubthub Club",
    image: img7,
    href: "https://www.linkedin.com/company/cgec-doubthub/",
    description:
      "A collaborative space where queries meet clarity and concepts become crystal clear.",
    color: "indigo",
  },
  {
    id: 8,
    name: "Melodies Club",
    image: img8,
    href: "https://www.instagram.com/melodies_of_cgec?igsh=OHAwbjByZ3l1ejIz",
    description: "Weaving magic with music, one soulful note at a time.",
    color: "teal",
  },
  {
    id: 9,
    name: "Pep Talks Club",
    image: img9,
    href: "https://www.instagram.com/cgec_pep_talks?igsh=MXg4YWhmdXA3c3kwNw%3D%3D",
    description:
      "Igniting minds through powerful speeches and thought-provoking discussions.",
    color: "fuchsia",
  },
  {
    id: 10,
    name: "Quilaxy Club",
    image: img10,
    href: "https://www.instagram.com/quilaxycgec?igsh=MXNoMGF3YjR4anl5aA%3D%3D",
    description:
      "Exploring the cosmos of quizzing with curiosity and quick wit.",
    color: "sky",
  },
  {
    id: 11,
    name: "Rongmilanti Club",
    image: img11,
    href: "https://www.instagram.com/rongmilanti2024?igsh=MWk5ajNnZzNmdzhkMA%3D%3D",
    description:
      "Celebrating diversity and creativity through colorful cultural fusions.",
    color: "rose",
  },
  {
    id: 12,
    name: "Sports Club",
    image: img12,
    href: "https://www.instagram.com/cgec_sport_club?igsh=MzRrdWdjNGU5N2ps",
    description:
      "Fueling passion, discipline, and teamwork through thrilling games and athletic spirit.",
    color: "lime",
  },
  {
    id: 13,
    name: "Techonicks Club",
    image: img13,
    href: "https://www.linkedin.com/company/techonicks/",
    description:
      "Driving innovation and technical brilliance through teamwork and technical extravaganzas.",
    color: "violet",
  },
  {
    id: 14,
    name: "Pratibimba Theatre Club",
    image: img14,
    href: "https://www.instagram.com/pratibimba.official__cgec?igsh=YzdxYzdxZ3ljdGpr",
    description:
      "Bringing stories to life with powerful performances and theatrical excellence.",
    color: "yellow",
  },
  {
    id: 15,
    name: "CGEC Times Club",
    image: img15,
    href: "https://www.instagram.com/the_cgec_times?igsh=cnBrcGVmNzRxYWt6",
    description:
      "The heartbeat of campus news, capturing every moment, voice, and vibe of CGEC.",
    color: "green",
  },
  {
    id: 16,
    name: "Alokbarsha Astro Club",
    image: img16,
    href: "#",
    description: "Exploring the cosmos, stars, and celestial wonders together.",
    color: "purple",
  },
  {
    id: 17,
    name: "Roboverse Robotics Club",
    image: img17,
    href: "#",
    description: "Building robots, innovation, and the future of technology.",
    color: "cyan",
  },
];

const ClubItem = ({
  club,
  style,
}: {
  club: (typeof CLUBS_DATA)[0];
  style?: React.CSSProperties;
}) => {
  const colorMap: { [key: string]: string } = {
    cyan: "border-cyan-300/20 hover:border-cyan-300/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] active:shadow-[0_0_30px_rgba(103,232,249,0.7)] shadow-cyan-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,145,178,0.7)_120%)] text-cyan-200",
    red: "border-red-300/20 hover:border-red-300/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:shadow-[0_0_30px_rgba(248,113,113,0.7)] shadow-red-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(136,19,55,0.7)_120%)] text-red-200",
    emerald:
      "border-emerald-300/20 hover:border-emerald-300/60 hover:shadow-[0_0_20px_rgba(110,231,183,0.4)] active:shadow-[0_0_30px_rgba(167,243,208,0.7)] shadow-emerald-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,150,105,0.7)_120%)] text-emerald-200",
    pink: "border-pink-300/20 hover:border-pink-300/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:shadow-[0_0_30px_rgba(249,168,212,0.7)] shadow-pink-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(190,24,93,0.7)_120%)] text-pink-200",
    blue: "border-blue-300/20 hover:border-blue-300/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:shadow-[0_0_30px_rgba(147,197,253,0.7)] shadow-blue-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(29,78,216,0.7)_120%)] text-blue-200",
    amber:
      "border-amber-300/20 hover:border-amber-300/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:shadow-[0_0_30px_rgba(252,211,77,0.7)] shadow-amber-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(146,64,14,0.7)_120%)] text-amber-200",
    indigo:
      "border-indigo-300/20 hover:border-indigo-300/60 hover:shadow-[0_0_25px_rgba(129,140,248,0.5)] active:shadow-[0_0_35px_rgba(165,180,252,0.7)] shadow-indigo-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(67,56,202,0.7)_120%)] text-indigo-200",
    teal: "border-teal-300/20 hover:border-teal-300/60 hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] active:shadow-[0_0_30px_rgba(94,234,212,0.7)] shadow-teal-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,118,110,0.7)_120%)] text-teal-200",
    fuchsia:
      "border-fuchsia-300/20 hover:border-fuchsia-300/60 hover:shadow-[0_0_20px_rgba(232,121,249,0.5)] active:shadow-[0_0_30px_rgba(240,171,252,0.7)] shadow-fuchsia-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(162,28,175,0.7)_120%)] text-fuchsia-200",
    sky: "border-sky-300/20 hover:border-sky-300/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] active:shadow-[0_0_35px_rgba(125,211,252,0.7)] shadow-sky-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,105,161,0.7)_120%)] text-sky-200",
    rose: "border-rose-300/20 hover:border-rose-300/60 hover:shadow-[0_0_20px_rgba(251,113,133,0.5)] active:shadow-[0_0_30px_rgba(253,164,175,0.7)] shadow-rose-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(190,18,60,0.7)_120%)] text-rose-200",
    lime: "border-lime-300/20 hover:border-lime-300/60 hover:shadow-[0_0_20px_rgba(190,242,100,0.5)] active:shadow-[0_0_30px_rgba(217,249,157,0.7)] shadow-lime-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(63,98,18,0.7)_120%)] text-lime-200",
    violet:
      "border-violet-300/20 hover:border-violet-300/60 hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] active:shadow-[0_0_35px_rgba(196,181,253,0.7)] shadow-violet-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(109,40,217,0.7)_120%)] text-violet-200",
    yellow:
      "border-yellow-300/20 hover:border-yellow-300/60 hover:shadow-[0_0_20px_rgba(253,224,71,0.4)] active:shadow-[0_0_30px_rgba(254,249,195,0.6)] shadow-yellow-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(180,83,9,0.7)_120%)] text-yellow-200",
    green:
      "border-green-300/20 hover:border-green-300/60 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] active:shadow-[0_0_30px_rgba(134,239,172,0.6)] shadow-green-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(22,101,52,0.7)_120%)] text-green-200",
    purple:
      "border-purple-300/20 hover:border-purple-300/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] active:shadow-[0_0_30px_rgba(196,181,253,0.7)] shadow-purple-900/20 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(126,34,206,0.7)_120%)] text-purple-200",
  };

  const classes = colorMap[club.color] || colorMap.cyan;
  const borderClass = classes.split(" ").slice(0, 5).join(" ");
  const bgGradient = classes.split(" ").slice(6, 7).join(" ");
  const textColor = classes.split(" ").slice(7, 8).join(" ");

  return (
    <a
      href={club.href}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="absolute"
    >
      <div
        className={`relative w-[55px] h-[55px] md:w-[90px] md:h-[90px] ${borderClass} border-[1.5px] rounded-full hover:scale-[1.5] hover:z-[50] transition-all duration-450 ease-[cubic-bezier(0.33,1,0.68,1)] overflow-hidden group cursor-pointer shadow-xl will-change-transform`}
      >
        <Image
          src={club.image}
          alt={club.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-full transition-all duration-500 ease-out group-hover:scale-[1.6] group-hover:brightness-[0.95]"
        />
        <div
          className={`absolute inset-0 ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />
        <div className="absolute inset-0 flex items-center justify-center p-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-550 ease-[cubic-bezier(0.64,0,0.78,0)]">
          <p
            className={`text-[6px] md:text-[10px] font-medium text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide ${textColor}`}
          >
            {club.description}
          </p>
        </div>
      </div>
    </a>
  );
};

const ClubGrid = () => {
  const shadowRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

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
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const getCircularPosition = (
    index: number,
    total: number,
    radius: number,
  ) => {
    // Offset the starting angle to make it look more organic
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: "translate(-50%, -50%)",
    };
  };

  // Mobile Radii: Inner (75px), Outer (150px)
  // Desktop Radii: Inner (120px), Outer (240px)
  const innerRadius = isMobile ? 75 : 120;
  const outerRadius = isMobile ? 150 : 240;

  return (
    <section
      ref={sectionRef}
      className="pt-16 pb-0 px-4 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="relative inline-block mb-4 mx-auto w-full">
        <h1
          className={`${sedgwick.className} text-4xl sm:text-5xl md:text-8xl font-bold text-gray-200 text-center relative z-10`}
        >
          Our Clubs
        </h1>
        <svg
          ref={shadowRef}
          className={`${sedgwick.className} absolute top-7 left-0 w-full h-full pointer-events-none`}
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        >
          <text
            x="50%"
            y="80%"
            textAnchor="middle"
            className="text-4xl sm:text-5xl md:text-8xl"
            fill="transparent"
            stroke="#999999"
            strokeWidth="1"
          >
            Our Clubs
          </text>
        </svg>
      </div>
      <AnimatedLine />

      <div className="relative mt-12 md:mt-20 flex flex-col items-center justify-center min-h-[450px] md:min-h-[600px]">
        {/* Background Ellipse */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <Image
            src={ellipse8}
            alt=""
            width={isMobile ? 350 : 700}
            className="opacity-40 blur-3xl"
          />
        </div>

        {/* Circular Layout */}
        <div className="relative z-10 w-full h-[450px] md:h-[600px] flex items-center justify-center">
          {/* Center Club */}
          <ClubItem
            club={CLUBS_DATA[0]}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Inner Ring - 6 clubs */}
          {CLUBS_DATA.slice(1, 7).map((club, i) => (
            <ClubItem
              key={club.id}
              club={club}
              style={getCircularPosition(i, 6, innerRadius)}
            />
          ))}

          {/* Outer Ring - 10 clubs */}
          {CLUBS_DATA.slice(7, 17).map((club, i) => (
            <ClubItem
              key={club.id}
              club={club}
              style={getCircularPosition(i, 10, outerRadius)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubGrid;
