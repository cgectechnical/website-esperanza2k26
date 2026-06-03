"use client";

import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useSession } from "next-auth/react";

import { eventRegister } from "@/actions/eventRegister.action";
import { getSettings } from "@/actions/settings.action";
import CalenderBlank from "@/assets/icons/CalendarBlank.png";
import { staticEventsData } from "@/utils/static/events";
import { Saira_Condensed, Sedgwick_Ave_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import customSwal from "@/utils/swal";
import { useEffect, useState } from "react";

import img from "@/assets/images/ESPERANZA.png";
import Container from "./Container";
import { convertTo12HourFormat } from "@/utils/functions/timeConversion";

const sedgwick = Sedgwick_Ave_Display({
  subsets: ["latin"],
  weight: ["400"],
})
const saira_condensed = Saira_Condensed({
  subsets: ["vietnamese"],
  weight: ["700"],
});

function Card({
  eventName,
  eventDescription,
  uniqueId,
  nonRegisterable=false,
}: {
  eventName: string;
  eventDescription: string;
  uniqueId:number;
  nonRegisterable?:boolean
}) {

  const router = useRouter();
  const { data: session } = useSession();
  const [isRegOpen, setIsRegOpen] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const checkSettings = async () => {
      const settings = await getSettings();
      setIsRegOpen(settings.registrationEnabled);
    };
    checkSettings();
  }, []);

  const staticEvent = staticEventsData.find(
    (event) => event.uniqueId === uniqueId
  );

  const redirect = staticEvent?.redirect;
  const poster = staticEvent?.poster;

  const handleRegisterForEvent = async () => {
    if (isRegistering) return;
    
    if (!isRegOpen) {
      customSwal.fire({
        title: "Registration is closed",
        icon: "info",
        text: "Please contact the event coordinators for more information",
      });
      return;
    }

    if (!session?.user?.email) {
      customSwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You need to login first!",
        confirmButtonText: "Okay",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    setIsRegistering(true);
    const res = await eventRegister(uniqueId, session.user.email);
    setIsRegistering(false);
    
    if (res) {
      if (res.error) {
        customSwal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error || res.message,
          confirmButtonText: "Okay",
        });
      } else {
        customSwal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          confirmButtonText: "Okay",
        }).then(() => {
          router.refresh();
        });
      }
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-br from-black/30 via-[#0F0207] to-black/30 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[23rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          <div
            className={`font-bold text-white ${sedgwick.className} text-xl`}
          >
            {eventName}
          </div>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-300 text-sm max-w-sm mt-2 "
        >
          <div className={`${saira_condensed.className}`}>
            {eventDescription}
          </div>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={poster || img}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as={Link}
            href={redirect? redirect : ""}
            className={`${sedgwick.className} relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_4px_0_0_#581c87] hover:shadow-[0_2px_0_0_#581c87] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-xl text-xs`}
          >
            Read More ...
          </CardItem>
          {
            nonRegisterable ? null : <button
            className={`${sedgwick.className} relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-600 to-pink-700 shadow-[0_4px_0_0_#9d174d] hover:shadow-[0_2px_0_0_#9d174d] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-xl text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}

            onClick={handleRegisterForEvent}
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
          }
        </div>
      </CardBody>
    </CardContainer>
  );
}

export function CardDiv({
  reverseAlign,
  eventName,
  eventDescription,
  DateContent,
  uniqueId,
  nonRegisterable = false,
  poster,
  eventCategory,
}: {
  reverseAlign?: boolean;
  eventName: string;
  eventDescription: string;
  DateContent: string;
  uniqueId: number;
  nonRegisterable?: boolean;
  poster?: string;
  eventCategory?: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRegOpen, setIsRegOpen] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const checkSettings = async () => {
      const settings = await getSettings();
      setIsRegOpen(settings.registrationEnabled);
    };
    checkSettings();
  }, []);

  const staticEvent = staticEventsData.find((e) => e.uniqueId === uniqueId);
  const redirect = staticEvent?.redirect;
  const finalPoster = poster || staticEvent?.poster;

  const handleRegisterForEvent = async () => {
    if (isRegistering) return;

    if (!isRegOpen) {
      customSwal.fire({
        title: "Registration is closed",
        icon: "info",
        text: "Please contact the event coordinators for more information",
      });
      return;
    }

    if (!session?.user?.email) {
      customSwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You need to login first!",
        confirmButtonText: "Okay",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    setIsRegistering(true);
    const res = await eventRegister(uniqueId, session.user.email);
    setIsRegistering(false);

    if (res) {
      if (res.error) {
        customSwal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error || res.message,
          confirmButtonText: "Okay",
        });
      } else {
        customSwal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          confirmButtonText: "Okay",
        }).then(() => {
          router.refresh();
        });
      }
    }
  };

  return (
    <div
      className={`w-full bg-gradient-to-r from-black/40 via-black/30 to-black/40 rounded-xl my-4 overflow-hidden ${
        reverseAlign ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col flex gap-8 py-10 md:py-0 justify-between items-center`}
    >
      <div className="md:w-1/2 w-full flex flex-col gap-4 justify-center px-10 md:px-10">
        <div className="flex items-center gap-2">
          <Image
            src={CalenderBlank}
            alt="Calendar"
            width={20}
            height={20}
          />
          <p className={`text-gray-200 text-sm ${sedgwick.className}`}>
            {convertTo12HourFormat(DateContent)}
          </p>
        </div>
        <h1 className={`text-white text-3xl md:text-5xl ${sedgwick.className}`}>
          {eventName}
        </h1>
        <p
          className={`text-gray-200 text-sm md:text-lg ${saira_condensed.className}`}
        >
          {eventDescription}
        </p>
        <div className="flex gap-4">
          <Link
            href={redirect || (eventCategory ? `/events/${eventCategory}/${uniqueId}` : "#")}
            className={`${sedgwick.className} relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_4px_0_0_#581c87] hover:shadow-[0_2px_0_0_#581c87] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg`}
          >
            Read More...
          </Link>
          {nonRegisterable ? null : (
            <button
              onClick={handleRegisterForEvent}
              disabled={isRegistering}
              className={`${sedgwick.className} relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-600 to-pink-700 shadow-[0_4px_0_0_#9d174d] hover:shadow-[0_2px_0_0_#9d174d] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg`}
            >
              {isRegistering ? "Registering..." : "Register"}
            </button>
          )}
        </div>
      </div>
      <div className="md:w-1/2 w-full h-full flex justify-center items-center px-10 md:px-0">
        {finalPoster ? (
          <Image
            src={finalPoster}
            alt={eventName}
            width={500}
            height={500}
            className="rounded-xl w-full md:w-3/4 h-auto"
          />
        ) : (
          <div className="w-full h-96 rounded-xl bg-gray-800" />
        )}
      </div>
    </div>
  );
}

export default Card;
