import RadialBgRed from "@/assets/background/RadialBgRed.png";
import TeamBg from "@/assets/images/Group 163057[1].png";
import meetOurDevelopers from "@/assets/images/meetOurDevelopers.png";
import Hexagon from "@/assets/images/Hexagon.png";

import Container from "@/components/Shared/Container";

import { TeamMemebrsCard } from "@/components/Teams/TeamMembersCard";
import { getPublicCrew } from "@/actions/crew.action";
import { sedgwick } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const Team = async () => {
  const teamMembers = await getPublicCrew();

  // Define the desired order
  const desiredOrder = ["technical", "cultural", "pending"];

  const allCategories = Array.from(
    new Set(teamMembers.flatMap((m) => m.category || [])),
  ).sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.toLowerCase());
    const indexB = desiredOrder.indexOf(b.toLowerCase());

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="mt-[80px] min-h-[90vh] relative overflow-hidden">
      <Image
        src={RadialBgRed}
        alt="background"
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-1/2 transform -translate-x-1/2 z-0"
      />
      <Image src={Hexagon} alt="hexagon decoration" className="absolute z-0" />

      <div className="flex flex-col items-center pt-2 pb-10 relative z-20">
        <Container>
          <div className="flex justify-center relative z-30 w-full max-w-[700px] mx-auto">
            <Image
              src={TeamBg}
              alt="about us"
              className="object-contain"
              priority
            />
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex justify-center relative z-50">
          <Link
            href="/developers"
            target="_blank"
            className="inline-block w-[90%] md:max-w-[300px] pb-15 m-auto animate-pulse duration-200 hover:animate-none"
          >
            <Image
              src={meetOurDevelopers}
              alt=""
              width={270}
              className="pt-[20] w-full m-auto hover:scale-108 transition-transform duration-300 cursor-pointer"
            />
          </Link>
        </div>
      </Container>
      <div className="flex justify-between items-center">
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
        <h1
          className={`${sedgwick.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center `}
        >
          Meet Our Student Body
        </h1>
        <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
      </div>
      <Container>
        <div className="flex justify-center">
          {teamMembers.filter((m) => m.lead).length > 0 ? (
            <AnimatedTestimonials
              testimonials={teamMembers.filter((m) => m.lead)}
            />
          ) : null}
        </div>
      </Container>

      {allCategories.map((category) => (
        <div key={category}>
          <div className="flex justify-between items-center pt-10">
            <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
            <h1
              className={`${sedgwick.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-center capitalize`}
            >
              {category} Team
            </h1>
            <div className="md:h-[80px] md:w-[200px] lg:h-[100px] lg:w-[350px] bg-white"></div>
          </div>
          <Container>
            <div className="flex gap-3 justify-center flex-wrap w-full mt-15">
              {teamMembers
                .filter((m) => (m.category || []).includes(category))
                .map((m, j) => {
                  return (
                    <div className="overflow-hidden" key={j}>
                      <TeamMemebrsCard member={m} />
                    </div>
                  );
                })}
            </div>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default Team;
