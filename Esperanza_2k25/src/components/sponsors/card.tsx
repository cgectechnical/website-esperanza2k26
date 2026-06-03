import React from 'react';
import Image from 'next/image';
import bg from "@/assets/background/HexagonWhite.png";
import { sedgwick } from "@/utils/fonts";

export interface CardData {
  id: number;
  title: string;
  imageUrl: string;
  redirectURL?: string;
}

const Card: React.FC<CardData> = ({ title, imageUrl, redirectURL }) => {
  const handleclick=()=>{
    if (redirectURL) {
      window.open(redirectURL, "_blank");
    }
  }
  return (
    <div
    onClick={handleclick}
     className="group bg-gray-650 rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden transform transition-all duration-350 hover:shadow-[0_5px_20px_rgba(128,2,196,0.7)] hover:-translate-y-1 sm:hover:-translate-y-2 w-full hover:cursor-pointer">
      {/* Image Container */}
      
      <div className="relative max-h-[300px] overflow-hidden flex items-center justify-center bg-white/10 p-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full max-h-[250px] object-contain transform transition-transform duration-500 group-hover:scale-105 sm:group-hover:scale-110"
            width={400}
            height={300}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-[250px] flex items-center justify-center text-gray-500">
            No logo available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 via-gray-400/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-350"/>
      </div>
      
      {/* Title Section */}
      <div className="relative p-3 sm:p-6 transform transition-all duration-350 overflow-hidden h-20 sm:h-28">
        <Image
          src={bg}
          alt="Card background"
          fill
          className="object-cover -z-10"
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-gray-200 to-[rgba(128,2,196,1)] transform scale-0 group-hover:scale-100 transition-transform duration-350 rounded-full"/>
        
        <h3 className={`${sedgwick.className} relative text-sm sm:text-xl font-extrabold text-center text-gray-200 group-hover:text-transparent group-hover:bg-gradient-to-r from-gray-100 to-[rgba(128,2,196,1)] group-hover:bg-clip-text transition-all duration-350 py-1 sm:py-2`}>
          {title}
        </h3>
        
        <div className="absolute bottom-0 left-0 w-full h-[1px] sm:h-[2px] bg-gradient-to-r from-gray-300 via-[rgba(128,2,196,1)] to-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350"/>
      </div>
    </div>
  );
};

export const CardContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full px-3 py-4 sm:px-4 sm:py-6">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
