"use client";

import { useState, useEffect } from "react";
import HexagonWhite from "@/assets/background/HexagonWhite.png";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import CulturalHeading from "@/assets/images/CulturalHeading.png";
import Hexagon from "@/assets/images/Hexagon.png";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { fetchAllEvents } from "@/actions/fetch.action";
import { CardDiv } from "@/components/Shared/Card";
import { sedgwick } from "@/utils/fonts";

const Cultural = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchAllEvents("cultural");
      setEvents(allEvents || []);
      setFilteredEvents(allEvents || []);
      setLoading(false);
    };
    loadEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredEvents(
        events.filter(
          (e) =>
            e.eventName.toLowerCase().includes(query) ||
            e.eventDescription.toLowerCase().includes(query) ||
            e.venue.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, events]);

  if (loading) {
    return (
      <div className="mt-[80px] min-h-[90vh] relative flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-[80px] min-h-[90vh] relative">
      <Image
        src={RadialBgRed}
        alt=""
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute  left-[50%] translate-x-[-50%]  z-[-1]"
      />
      <Image src={Hexagon} alt="" className="absolute " />
      <div className="flex justify-center relative pt-0">
        <Container>
          <Image
            src={CulturalHeading}
            alt=""
            className="w-[400px] sm:w-[500px] md:w-[800px] lg:w-[1000px] mt-0"
          />
        </Container>
      </div>
      <Container>
        <div className="mb-6 relative z-50">
          <Input
            placeholder="Search cultural events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 w-full"
            style={{ touchAction: 'manipulation' }}
          />
        </div>
        <div className="min-h-screen relative">
          <Image
            src={HexagonWhite}
            alt=""
            className="absolute left-[50%] translate-x-[-50%] opacity-50"
          />
          <Image
            src={Hexagon}
            alt=""
            className="absolute top-[20%] left-[25%] translate-x-[-50%] opacity-80"
          />
          <Image
            src={HexagonWhite}
            alt=""
            className="absolute top-[45%] left-[40%] translate-x-[-50%] opacity-70"
          />
          <div className="bg-white/50 h-full w-[1px] absolute top-0 left-[-8px] md:left-[50%] md:translate-x-[-50%] animate-pulse" />
          <div className=" flex flex-col gap-1">
          {filteredEvents?.map((event, i) => {
              if (i % 2 === 0) {
                return (
                  <CardDiv
                    reverseAlign
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    key={i}
                    DateContent={event.eventDate}
                    uniqueId={event.uniqueId!}
                    nonRegisterable={event.nonRegisterable}
                    poster={event.poster}
                    eventCategory="cultural"
                  />
                );
              } else {
                return (
                  <CardDiv
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    key={i}
                    DateContent={event.eventDate}
                    uniqueId={event.uniqueId!}
                    nonRegisterable={event.nonRegisterable}
                    poster={event.poster}
                    eventCategory="cultural"
                  />
                );
              }
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cultural;
