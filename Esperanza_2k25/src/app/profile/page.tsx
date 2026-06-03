"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  fetchRegisteredEvents,
  fetchUserByEmail,
} from "@/actions/fetch.action";
import { unregisterFromEvent } from "@/actions/profile.action";
import LogOutButton from "@/components/Profile/LogOutButton";
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfilePhotoUpload from "@/components/Profile/ProfilePhotoUpload";
import Container from "@/components/Shared/Container";
import TeamManager from "@/components/Events/TeamManager";
import LoaderComponent from "@/components/Shared/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Trophy, UserMinus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import customSwal from "@/utils/swal";
import { sedgwick } from "@/utils/fonts";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import Hexagon from "@/assets/images/Hexagon.png";

export default function Profile() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (email: string) => {
    setIsLoading(true);

    const userData = await fetchUserByEmail(email);
    // Filter out duplicates and null values from registeredEvents
    const uniqueEventIds = Array.from(
      new Set(
        (userData?.registeredEvents || []).map((id: any) => id.toString()),
      ),
    ) as string[];
    const eventsData = await fetchRegisteredEvents(uniqueEventIds);

    setUser(userData);
    setRegisteredEvents(eventsData || []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.email) {
      setUser(null);
      setRegisteredEvents([]);
      setIsLoading(false);
      router.push("/login");
      return;
    }

    loadData(session.user.email as string);
  }, [session?.user?.email, status, router]);

  const handleUnregister = async (eventId: string, eventName: string) => {
    const result = await customSwal.fire({
      title: "Are you sure?",
      text: `You will unregister from ${eventName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unregister!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed && session?.user?.email) {
      const res = await unregisterFromEvent(eventId);
      if (res.success) {
        customSwal.fire("Unregistered!", res.message, "success");
        loadData(session.user.email as string);
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  if (status === "loading" || isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="min-h-[90vh] relative overflow-hidden mt-[80px]">
      {/* Backgrounds */}
      <Image
        src={RadialBgRed}
        alt="background"
        className="opacity-20 sm:opacity-40 md:opacity-55 lg:opacity-65 absolute left-1/2 transform -translate-x-1/2 z-0"
      />
      <Image src={Hexagon} alt="hexagon decoration" className="absolute z-0" />
      <div className="container mx-auto px-4 pt-0 pb-2 relative z-10">
        <div className="mb-4 sm:mb-8 justify-between flex items-center">
          <Link
            href="/"
            className="text-white flex items-center hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className={`${sedgwick.className} hidden sm:inline text-lg`}>
              HOME
            </span>
          </Link>
          <LogOutButton />
        </div>
        <Container>
          <div className="mb-4 sm:mb-8 flex items-center justify-center flex-col gap-2">
            <h1
              className={`${sedgwick.className} text-4xl sm:text-5xl font-extrabold text-white text-center`}
            >
              Welcome{" "}
              <span className="text-red-400">
                {isLoading ? "..." : user?.name}
              </span>
            </h1>
            <div className="mt-4">
              <ProfilePhotoUpload
                currentPhoto={user?.profilePhoto}
                userEmail={session?.user?.email as string}
              />
            </div>
            <div className="mt-6 w-full">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <h1
                  className={`${sedgwick.className} text-3xl sm:text-4xl font-extrabold text-white`}
                >
                  Registered Events
                </h1>
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-lg font-bold">
                  {isLoading ? "..." : registeredEvents.length}
                </span>
              </div>
              <div className={`flex flex-col gap-8 max-w-4xl mx-auto`}>
                {isLoading ? (
                  <div className="space-y-8">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-2xl animate-pulse"
                      >
                        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-gray-700 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : registeredEvents?.length > 0 ? (
                  registeredEvents?.map((event: any) => (
                    <div
                      key={event._id}
                      className="text-white bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-2xl"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-red-400" />
                            <span
                              className={`text-gray-400 text-sm font-medium uppercase tracking-wider ${sedgwick.className}`}
                            >
                              Event
                            </span>
                          </div>
                          <h2
                            className={`text-2xl sm:text-3xl font-bold mb-2 ${sedgwick.className}`}
                          >
                            {event?.eventName}
                          </h2>
                          {event?.eventDescription && (
                            <p
                              className={`text-gray-400 text-sm leading-relaxed ${sedgwick.className}`}
                            >
                              {event.eventDescription}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleUnregister(event._id, event.eventName)
                          }
                          className="relative inline-flex items-center justify-center px-4 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-[0_4px_0_0_#991b1b] hover:shadow-[0_2px_0_0_#991b1b] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg whitespace-nowrap"
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Unregister
                        </button>
                      </div>
                      <TeamManager
                        eventId={event._id.toString()}
                        userEmail={session?.user?.email as string}
                        onUpdate={() =>
                          loadData(session?.user?.email as string)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-800/40 rounded-2xl border border-gray-700/50">
                    <div className="text-gray-400 text-lg">
                      You haven't registered for any events yet!
                    </div>
                    <Link
                      href="/events/technical"
                      className="inline-block mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
                    >
                      Browse Events
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
        <Card className="mx-auto max-w-2xl bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-white mt-8 shadow-2xl">
          <CardContent className="p-4 sm:p-6">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-700 rounded w-full"></div>
                <div className="h-10 bg-gray-700 rounded w-full"></div>
                <div className="h-12 bg-gray-600 rounded w-full"></div>
              </div>
            ) : (
              user && (
                <ProfileForm
                  user={{
                    name: user?.name!,
                    department: user?.department!,
                    email: user?.credentials.email!,
                    phoneNumber: user?.credentials.phoneNumber!,
                    rollNumber: user?.rollNumber!,
                    year: user?.year!,
                  }}
                  onUpdate={() => loadData(session?.user?.email as string)}
                />
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
