import RadialBgRed from "@/assets/background/RadialBgRed.png";
import DeveloperHeading from "@/assets/images/developers.png";
import Hexagon from "@/assets/images/Hexagon.png";
import { CarouselCompoment } from "@/components/Shared/Carousel";
import Container from "@/components/Shared/Container";
import { developers } from "@/utils/static/developers";
import { sedgwick } from "@/utils/fonts";
import Image from "next/image";

const Developers = () => {
  return (
    <div className="min-h-screen mt-[80px]">
      <Image
        src={RadialBgRed}
        alt=""
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-[50%] translate-x-[-50%]  z-[-1]"
      />
      <Image src={Hexagon} alt="" className="absolute " />
      <div className="flex justify-center relative pt-0">
        <Container>
          <Image
            src={DeveloperHeading}
            alt=""
            className="w-[400px] sm:w-[500px] md:w-[800px] lg:w-[1000px] mt-0 mb-5"
          />
        </Container>
      </div>
      <div className="flex justify-between items-center">
        {/* Meet Our Developers */}

        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} px-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          Full Stack Developers
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <CarouselCompoment
          developers={developers.filter((d) => d.role === "full-stack")}
        />
      </Container>
      <div className="flex justify-between items-center">
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} px-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          Website & Data Management Executive
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <CarouselCompoment
          developers={developers.filter((d) => d.role === "website-data-management")}
        />
      </Container>
      <div className="flex justify-between items-center">
        {/* Meet Our Developers */}

        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} px-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          UI/UX Developers
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <CarouselCompoment
          developers={developers.filter((d) => d.role === "ui-ux")}
        />
      </Container>
      <div className="flex justify-between items-center">
        {/* Meet Our Developers */}

        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} px-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          Web Content Writer
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <CarouselCompoment
          developers={developers.filter((d) => d.role === "web-content-writer")}
        />
      </Container>
      <div className="flex justify-between items-center">
        {/* Meet Our Developers */}

        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} px-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          Video Editor
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <CarouselCompoment
          developers={developers.filter((d) => d.role === "videography")}
        />
      </Container>
    </div>
  );
};

export default Developers;
