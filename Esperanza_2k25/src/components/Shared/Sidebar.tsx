"use client";

import Link from "next/link";
import Hamburger from "./Hamburger";

import { useState } from "react";
import { sedgwick } from "@/utils/fonts";
const Sidebar = ({user}:any) => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

  return (
    <div>
      <Hamburger closeMenu={closeMenu} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <div
        className={`md:hidden transition-all duration-500 ease-in-out bg-black/90 backdrop-blur-md px-4 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4">
          {[
            { label: "Home", href: "/" },
            { label: "Team", href: "/team" },
            { label: "Gallery", href: "/gallery" },
            { label: "Sponser", href: "/sponsers" },
            { label: "Technical Events", href: "/events/technical" },
            { label: "Cultural Events", href: "/events/cultural" },
            { label: "About", href: "/about" },
            { label: user ? "Profile" : "Login", href: user ? "/profile" : "/login" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={closeMenu}
              className={`relative group text-white text-xl sm:text-2xl transition-all ${sedgwick.className}`}
              prefetch
            >
              <span className="group-hover:text-red-400 transition-colors duration-300">
                {link.label}
              </span>
              {/* Desktop hover animation */}
              <span className="hidden sm:block absolute -bottom-1 left-0 h-[2px] bg-red-400 w-0 transition-all duration-300 group-hover:w-full"></span>

              {/* Mobile: always show animated underline */}
              <span className="block sm:hidden absolute -bottom-1 left-1/2 w-0 h-[2px] bg-red-400 animate-grow-line"></span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
