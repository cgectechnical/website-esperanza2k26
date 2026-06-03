import React from "react";
import Image from "next/image";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import Hexagon from "@/assets/images/Hexagon.png";
import Container from "@/components/Shared/Container";
import GalleryHeading from "@/assets/images/GALLERY.png";
import TechGalary from "@/assets/images/techGalary.png";
import MasonryGallery from "@/components/Gallery/masonary";
import MasonryGalleryt from "@/components/Gallery/masonaryt";
import MasonryGallerym from "@/components/Gallery/masonarym";
import CulturalGalary from "@/assets/images/culturalGalary.png";

const galleryHeadingStyle = "";
const techGalleryStyle = "mt-20";

const About = () => {
  return (
    <div className="mt-[80px] min-h-[90vh] relative overflow-hidden">
      {/* Backgrounds */}
      <Image
        src={RadialBgRed}
        alt="background"
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-1/2 transform -translate-x-1/2 z-0"
      />
      <Image
        src={Hexagon}
        alt="hexagon decoration"
        className="absolute top-0 left-0 z-0"
      />

      {/* Gallery Heading Section */}
      <div className="flex flex-col items-center pt-0 relative z-20">
        <Container>
          <div
            className={`flex justify-center relative z-30 w-full max-w-[700px] mx-auto transition-all duration-300 ${galleryHeadingStyle}`}
          >
            <Image
              src={GalleryHeading}
              alt="Gallery Heading"
              className="object-contain"
              priority
            />
          </div>
        </Container>
      </div>

      {/* Gallery Section */}
      <div
        className={`px-4 sm:px-8 pb-4 sm:pb-6 relative z-10 transition-all duration-300`}
      >
        <Container>{null}</Container>
      </div>

      {/* More Masonry Gallery */}
      <div className="w-full mx-auto px-4 sm:px-8 pt-0 pb-10 relative z-10">
        <MasonryGallerym />
      </div>

      {/* Tech Gallery Section */}
      <div
        className={`px-4 sm:px-8 pb-8 sm:pb-10 relative z-10 transition-all duration-300 ${techGalleryStyle}`}
      >
        <Container>
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image
              src={TechGalary}
              alt="Tech Gallery"
              className="object-contain w-full max-w-[600px]"
              priority
            />
          </div>
        </Container>
      </div>

      {/* Tech Masonry Gallery */}
      <div className="w-full mx-auto px-4 sm:px-8 pt-0 pb-10 relative z-10">
        <MasonryGalleryt />
      </div>
      <div>
        <Image
          src={RadialBgRed}
          alt="background"
          className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-1/2 transform -translate-x-1/2 z-0"
        />
      </div>
      <div
        className={`px-4 sm:px-8 pb-8 sm:pb-10 relative z-10 transition-all duration-300 ${techGalleryStyle}`}
      >
        <Container>
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image
              src={CulturalGalary}
              alt="Tech Gallery"
              className="object-contain w-full max-w-[600px]"
              priority
            />
          </div>
        </Container>
      </div>

      {/* Masonry Gallery */}
      <div className="w-full mx-auto px-4 sm:px-8 pt-0 pb-10 relative z-10">
        <MasonryGallery />
      </div>
    </div>
  );
};

export default About;
