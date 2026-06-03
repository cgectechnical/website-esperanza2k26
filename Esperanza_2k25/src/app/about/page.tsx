"use client";

import RadialBgRed from "@/assets/background/RadialBgRed.png";
import AboutUs from "@/assets/images/about us.png";

import contactUs from "@/assets/images/CONTACT US.png";
import Hexagon from "@/assets/images/Hexagon.png";
import Image from "next/image";
import ContactUsForm from "@/components/About/ContactUsForm";
import Container from "@/components/Shared/Container";
import Map from "@/components/Shared/Map";
import { sedgwick } from "@/utils/fonts";

const About = () => {
  return (
    <div className="mt-[80px] min-h-[90vh] relative overflow-hidden">
      <Image
        src={RadialBgRed}
        alt="background"
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-1/2 transform -translate-x-1/2 z-0"
      />
      <Image src={Hexagon} alt="hexagon decoration" className="absolute z-0" />

      {/* About Us Section */}
      <div className="flex flex-col items-center pt-0 pb-4 sm:pb-8 relative z-20">
        <Container>
          <div className="flex justify-center relative z-30 w-full max-w-[700px] mx-auto">
            <Image
              src={AboutUs}
              alt="about us"
              className="object-contain"
              priority
            />
          </div>
        </Container>
      </div>
      <Container>
        <div className={`${sedgwick.className} text-3xl`}>
          <h1 className={`text-6xl`}>
            About <span className="text-red-600">CGEC</span>
          </h1>
          <div className="mt-2">
            Cooch Behar Government Engineering College (CGEC), established in
            2016, is a premier institution under the Department of Higher
            Education, Government of West Bengal. Affiliated with the Maulana
            Abul Kalam Azad University of Technology (MAKAUT), CGEC offers
            cutting-edge undergraduate programs in various branches of
            engineering and technology.
            <br />
            <br />
            With a focus on academic excellence, research, and holistic
            development, CGEC empowers students to become industry-ready
            professionals and responsible innovators. The campus fosters a
            vibrant environment that blends technical learning with
            extracurricular pursuits, promoting growth both inside and
            outside the classroom.
          </div>
        </div>
        <Container>
          <Container>
            <video
              autoPlay
              loop
              playsInline
              muted
              onClick={(e) => {
                e.currentTarget.muted = !e.currentTarget.muted;
              }}
              className="
      w-[95%]
      max-w-6xl
      m-auto
      py-3
      rounded-3xl
      object-cover
      bg-black
      border-t-[0px]
      border-b-[0px]
      border-x-4
      border-t-red-600/60
      border-b-orange-500/70
      border-x-red-500/50
      shadow-[inset_0_20px_20px_-20px_rgba(255,60,0,0.5),inset_0_-20px_20px_-20px_rgba(255,120,0,0.5)]
      transition-all
      duration-500
      cursor-pointer
    "
            >
              <source src="/videos/espcgec.mp4" type="video/mp4" />
            </video>
          </Container>
        </Container>
        <div className={`${sedgwick.className} text-3xl mt-4`}>
          <h1 className={`text-6xl`}>
            About <span className="text-red-600">Esperanza</span>
          </h1>
          <div className="mt-2">
            Esperanza is the official annual techno-cultural fest of CGEC — a
            vibrant celebration of innovation, creativity, and talent. It serves
            as a dynamic platform where students from diverse backgrounds come
            together to showcase their skills in technology, culture, and art.
            <br />
            <br />
            With a wide array of events ranging from coding competitions,
            robotics challenges, and project expos to music, dance, drama, and
            literary contests — Esperanza reflects the spirit of CGEC: a
            community that thrives on passion, diversity, and collaboration.
            <br />
            <br />
            Each edition of Esperanza brings new energy, new ideas, and
            unforgettable experiences, making it the most anticipated
            event of the year.
          </div>
        </div>
      </Container>
      {/* Contact Us Section */}
      <div className="px-4 sm:px-8 py-10 relative z-10">
        <Container>
          <div className="flex justify-center mb-12 lg:mb-16">
            <Image
              src={contactUs}
              alt="contact us"
              className="object-contain w-full max-w-[600px]"
              priority
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 justify-between items-start w-full">
            {/* Left Column - Address & Map */}
            <div className="flex-1 w-full lg:max-w-[45%] xl:max-w-[40%]">
              <Map />
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex-1 w-full lg:max-w-[50%] xl:max-w-[55%]">
              <div className="mb-8">
                <h3
                  className={`${sedgwick.className} text-4xl xl:text-5xl mb-6 relative inline-block`}
                >
                  CONTACT US
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-current"></span>
                </h3>
                <h3 className={`${sedgwick.className} `}>
                  MAIL - cgectechnical42@gmail.com
                </h3>
              </div>

              <div className=" text-white px-3 py-6 sm:p-8 rounded-lg w-full">
                <h2
                  className={`${sedgwick.className} text-2xl sm:text-3xl font-bold mb-4 `}
                >
                  GET IN TOUCH
                </h2>
                <p className={`${sedgwick.className} text-lg sm:text-xl mb-6 `}>
                  We are here for you! How can we help?
                </p>

                <ContactUsForm />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default About;
