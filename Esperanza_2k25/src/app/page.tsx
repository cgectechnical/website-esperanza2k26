import dynamic from "next/dynamic";
import MarqueeText from "@/components/Home/EspStrip";
import Container from "@/components/Shared/Container";
import Header from "@/components/Shared/Header";
import { auth } from "@/auth";

// Immediately needed components
import HeroSection from "@/components/Home/HeroSection";
import EspAnimation from "@/components/Shared/EspAnim";

// Lazy load below-the-fold components
const PhotoContainer = dynamic(
  () => import("@/components/Home/PhotoContainer"),
);
const Band = dynamic(() => import("@/components/Home/Band"));
const Tech = dynamic(() => import("@/components/Home/Tech"));
const Cultural = dynamic(() => import("@/components/Home/Cultural"));
const ClubGrid = dynamic(() => import("@/components/Home/Club"));
const Gallery = dynamic(() => import("@/components/Home/Galleryh"));
const Timer = dynamic(() => import("@/components/Shared/Timer"));

const Home = async () => {
  const session = await auth();
  if (session) {
    console.log("User is logged in:", session);
  } else {
    console.log("User is not logged in");
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <div className="h-full">
        <HeroSection />
        <div
          className={`pt-[250px] flex items-center justify-center box-border h-screen px-4 sm:px-6 md:px-10 lg:px-14`}
        >
          <EspAnimation />
        </div>
      </div>

      <div className="bg-home-content-main">
        <MarqueeText />
        <Container>{null}</Container>
      </div>
      <div className="mt-16 md:mt-20">
        <PhotoContainer />
      </div>
      <div className="mt-16 md:mt-20">
        <Band />
      </div>
      <div className="mt-16 md:mt-20">
        <Tech />
      </div>
      <div className="mt-16 md:mt-20">
        <Cultural />
      </div>
      <div className="mt-16 md:mt-20">
        <ClubGrid />
      </div>
      <div className="mt-16 md:mt-20">
        <Gallery />
      </div>
      <div className="mt-16 md:mt-20">
        <Timer />
      </div>
    </div>
  );
};

export default Home;
