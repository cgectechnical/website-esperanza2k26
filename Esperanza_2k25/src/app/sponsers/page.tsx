"use client";
import { useEffect, useState } from "react";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import AboutUs from "@/assets/images/sponsors.png";

import Card, { CardContainer } from "@/components/sponsors/card";
import Hexagon from "@/assets/images/Hexagon.png";

import Container from "@/components/Shared/Container";
import { fetchAllSponsors } from "@/actions/fetch.action";
import Image from "next/image";

interface Sponsor {
  _id: string;
  name: string;
  logoUrl: string;
  website: string;
  description?: string;
}

const Sponsers = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      const data = await fetchAllSponsors();
      setSponsors(data);
      setLoading(false);
    };
    loadSponsors();
  }, []);

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
      {/* Cards Section */}

      <Container>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-gray-500 text-xl">
              Loading sponsors...
            </div>
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No sponsors yet. Check back soon!
          </div>
        ) : (
          <CardContainer>
            {sponsors.map((sponsor, index) => (
              <Card
                key={sponsor._id}
                id={index}
                title={sponsor.name}
                imageUrl={sponsor.logoUrl}
                redirectURL={sponsor.website}
              />
            ))}
          </CardContainer>
        )}
      </Container>
    </div>
  );
};

export default Sponsers;
