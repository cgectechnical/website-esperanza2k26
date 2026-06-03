"use client";
import espLogo from "@/assets/images/espLogo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <div className="rotate">
        <Image src={espLogo} alt="Esperanza 2026 Logo" width={60} height={65} />
      </div>
      <style>
        {`
        .rotate{
        animation: spin 4000ms linear infinite;
        }
        @keyframes spin {
            0% { 
            transform: rotateY(0deg);
            }
            50%{
            transform: rotateY(180deg);
            }
            100% { 
            transform: rotateY(360deg); 
            }
        }
        `}
      </style>
    </div>
  );
};

export default Logo;
