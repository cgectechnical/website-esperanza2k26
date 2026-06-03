"use client";

import { useState, useEffect, use } from "react";
import { fetchEventByUniqueId } from "@/actions/fetch.action";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import { useSession } from "next-auth/react";
import RegisterButton from "@/components/Events/RegisterButton";
import Container from "@/components/Shared/Container";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { convertTo12HourFormat } from "@/utils/functions/timeConversion";
import { staticEventsData } from "@/utils/static/events";
import { Calendar, TimerIcon } from "lucide-react";
import { sedgwick } from "@/utils/fonts";
import Image from "next/image";
import PDFViewer from "@/components/Shared/PDFViewer";

export default function TechnicalEventPage({ params }: any) {
  const { data: session } = useSession();
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [event, setEvent] = useState<any>(null);
  
  const unwrappedParams = use(params) as { event: string };
  const uniqueId = Number(unwrappedParams.event);

  useEffect(() => {
    const loadEvent = async () => {
      const data = await fetchEventByUniqueId(uniqueId);
      setEvent(data);
    };
    loadEvent();
  }, [uniqueId]);
  
  if (!event) {
    return (
      <div className="min-h-[90vh] mt-[80px] relative flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  const staticPoster = staticEventsData.find((e) => e.uniqueId == uniqueId)?.poster;
  const poster = event?.poster && event.poster!== "" ? event.poster : staticPoster || "https://via.placeholder.com/400x400/333/fff?text=EVENT+POSTER";
  const words = event?.eventName.split(" ").map((w: string) => ({ text: w })) || [{ text: "Event" }];

  return (
    <div className={`mt-[80px] min-h-screen relative ${sedgwick.className}`}>
      <Image
        src={RadialBgRed}
        alt=""
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-[50%] translate-x-[-50%]  z-[-1]"
      />
      <Container>
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16">
          <Image
            src={poster!}
            alt={event?.eventName || ""}
            width={400}
            height={400}
            className="w-full sm:w-80 md:w-96 object-contain"
          />
          <div className="flex-1 flex-col gap-5 items-center">
            <TypewriterEffectSmooth words={words!} />
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <Calendar />
                <span>{event?.eventDate}</span>
              </div>
              <div className="flex gap-1 items-center">
                <TimerIcon />
                <span>{convertTo12HourFormat(event?.eventStartTime)}</span>
              </div>
              <div className="text-xl">{event?.eventDescription}</div>
              {event?.ruleBookLink && event.ruleBookLink!=="" && (
                <div className="w-full mt-4">
                  <h3 className="text-white text-xl mb-3 font-bold">Rule Book</h3>
                  <button
                    onClick={() => setPdfViewerOpen(true)}
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-800 text-white rounded-lg transition-colors font-bold"
                  >
                    View Rule Book
                  </button>
                </div>
              )}
              <div className="font-bold text-pink-600 ">
                Total Registrations : {event?.participants.length}
              </div>
              {!event?.nonRegisterable && (
                <RegisterButton
                  uniqueId={uniqueId}
                  userEmail={session?.user?.email as string}
                />
              )}
              <div className="flex flex-col gap-2">
                <span className="font-bold text-2xl">
                  {event?.leads && event.leads.length > 1
                    ? "Event Leads"
                    : "Event Lead"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {event?.leads.map((l: any, i: number) => (
                    <div
                      className="px-4 py-3 bg-black/30 backdrop-blur-sm"
                      key={i}
                    >
                      <div>{l.name}</div>
                      <div>
                        {l.year} {l.department}
                      </div>
                      <div>{l.contact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      {event?.ruleBookLink && (
        <PDFViewer
          pdfUrl={event.ruleBookLink}
          isOpen={pdfViewerOpen}
          onClose={() => setPdfViewerOpen(false)}
        />
      )}
    </div>
  );
}
