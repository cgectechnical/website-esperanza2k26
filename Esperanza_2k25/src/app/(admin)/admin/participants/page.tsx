"use client";

import { useEffect, useState } from "react";
import { getEventsWithParticipants } from "@/actions/admin/participants.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Loader2,
  Download,
  User as UserIcon,
  Calendar,
  Users,
  Trophy,
} from "lucide-react";
import * as XLSX from "xlsx";
import { Badge } from "@/components/ui/badge";

interface Participant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  year: string;
  department: string;
  profilePhoto: string;
  role?: string;
  team?: {
    teamId: string;
    teamName: string;
    teamKey: string;
    role: string;
  } | null;
}

interface Team {
  teamId: string;
  teamName: string;
  teamKey: string;
  participants: Participant[];
}

interface Event {
  _id: string;
  eventName: string;
  eventCategory: string;
  allParticipants: Participant[];
  teams: Team[];
  individualParticipants: Participant[];
  loading?: boolean;
}

export default function ParticipantsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const result = await getEventsWithParticipants();
      if (result.success) {
        const allEvents = result.events || [];
        setEvents(allEvents.map((e) => ({ ...e, loading: true })));
        setFilteredEvents(allEvents.map((e) => ({ ...e, loading: true })));

        // Load events one by one
        let currentCount = 0;
        for (const event of allEvents) {
          // Simulate loading each event separately
          await new Promise((resolve) => setTimeout(resolve, 100));
          setEvents((prev) =>
            prev.map((e) =>
              e._id === event._id ? { ...e, loading: false } : e,
            ),
          );
          setFilteredEvents((prev) =>
            prev.map((e) =>
              e._id === event._id ? { ...e, loading: false } : e,
            ),
          );
          currentCount++;
          setLoadedCount(currentCount);
        }
        setAllLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const downloadExcel = (event: Event) => {
    const data: any[] = [];
    event.teams.forEach((team) => {
      team.participants.forEach((p) => {
        data.push({
          "Event Name": event.eventName,
          "Team Name": team.teamName,
          "Team Key": team.teamKey,
          Role: p.role,
          Name: p.name,
          Email: p.email,
          Phone: p.phone,
          "Roll Number": p.rollNumber,
          Year: p.year,
          Department: p.department,
        });
      });
    });
    event.individualParticipants.forEach((p) => {
      data.push({
        "Event Name": event.eventName,
        "Team Name": "Individual",
        "Team Key": "N/A",
        Role: p.role,
        Name: p.name,
        Email: p.email,
        Phone: p.phone,
        "Roll Number": p.rollNumber,
        Year: p.year,
        Department: p.department,
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
    XLSX.writeFile(workbook, `${event.eventName}_Participants.xlsx`);
  };

  if (!allLoaded && loadedCount === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  const totalParticipants = filteredEvents.reduce(
    (sum, e) => sum + e.allParticipants.length,
    0,
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent truncate">
            Event Participants
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Loaded {loadedCount}/{events.length} events • Total{" "}
            {totalParticipants} participants
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            className="pl-10 bg-gray-900/50 border-gray-700 text-white h-9 sm:h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredEvents.map((event) => (
          <Card
            key={event._id}
            className="bg-gray-900/80 border-gray-700 overflow-hidden"
          >
            <CardHeader className="border-b border-gray-800 bg-gray-800/30 px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg sm:text-xl text-white">
                      {event.eventName}
                    </CardTitle>
                    <Badge
                      variant={
                        event.eventCategory === "technical"
                          ? "default"
                          : "secondary"
                      }
                      className="capitalize text-[10px] sm:text-xs h-5"
                    >
                      {event.eventCategory}
                    </Badge>
                    {event.loading && (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400">
                    <span>
                      Total:{" "}
                      <span className="text-red-500 font-bold">
                        {event.allParticipants.length}
                      </span>
                    </span>
                    {event.teams.length > 0 && (
                      <span className="text-blue-400">
                        • Teams: {event.teams.length}
                      </span>
                    )}
                    {event.individualParticipants.length > 0 && (
                      <span className="text-green-400">
                        • Individuals: {event.individualParticipants.length}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => downloadExcel(event)}
                  className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full sm:w-auto h-9 text-sm"
                  disabled={event.allParticipants.length === 0}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {event.loading ? (
                <div className="p-6 space-y-6">
                  {/* Skeleton Teams Section */}
                  <div className="space-y-4">
                    <div className="h-6 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="space-y-4">
                      {/* Skeleton Team Card 1 */}
                      <div className="bg-gray-800/50 border border-blue-500/20 rounded-lg overflow-hidden">
                        <div className="border-b border-blue-500/20 bg-blue-900/20 p-4">
                          <div className="h-6 w-40 bg-gray-700 rounded animate-pulse mb-2" />
                          <div className="h-4 w-56 bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="p-4 space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex items-center gap-4 p-3 rounded-lg bg-gray-700/40"
                            >
                              <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse" />
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-5 w-32 bg-gray-600 rounded animate-pulse" />
                                  <div className="h-5 w-12 bg-gray-600 rounded animate-pulse" />
                                </div>
                                <div className="flex gap-4">
                                  <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
                                  <div className="h-3 w-28 bg-gray-700 rounded animate-pulse" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Skeleton Individuals Section */}
                  <div className="space-y-4">
                    <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/40"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse" />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-32 bg-gray-600 rounded animate-pulse" />
                              <div className="h-5 w-16 bg-gray-600 rounded animate-pulse" />
                            </div>
                            <div className="flex gap-4">
                              <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
                              <div className="h-3 w-28 bg-gray-700 rounded animate-pulse" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : event.allParticipants.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  <UserIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No participants registered for this event yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 p-4">
                  {/* Teams Section */}
                  {event.teams.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-400" />
                        Teams ({event.teams.length})
                      </h3>
                      {event.teams.map((team) => (
                        <Card
                          key={team.teamId}
                          className="bg-gray-800/50 border-blue-500/30 overflow-hidden"
                        >
                          <CardHeader className="border-b border-blue-500/20 bg-blue-900/20 pb-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg text-white flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-yellow-400" />
                                  {team.teamName}
                                </CardTitle>
                                <p className="text-xs text-gray-400 mt-1">
                                  Team Key: {team.teamKey} •{" "}
                                  {team.participants.length} members
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex flex-col gap-3">
                              {team.participants.map((p) => (
                                <div
                                  key={p._id}
                                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-gray-700/40 border border-gray-600/30 hover:bg-gray-700/60 transition-all"
                                >
                                  <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <Avatar className="h-10 w-10 border-2 border-blue-500/20">
                                      <AvatarImage
                                        src={p.profilePhoto}
                                        alt={p.name}
                                      />
                                      <AvatarFallback className="bg-blue-700 text-white font-bold">
                                        {p.name.charAt(0).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                          <p className="text-white font-semibold truncate">
                                            {p.name}
                                          </p>
                                          <Badge
                                            variant={
                                              p.role === "Leader"
                                                ? "destructive"
                                                : "default"
                                            }
                                            className="text-[10px] h-4 px-1"
                                          >
                                            {p.role}
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">
                                          {p.email}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 sm:mt-0 pt-2 sm:pt-0 border-t border-gray-600/30 sm:border-0 w-full sm:w-auto">
                                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                                      Roll:{" "}
                                      <span className="text-gray-300">
                                        {p.rollNumber || "N/A"}
                                      </span>
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                                      Phone:{" "}
                                      <span className="text-gray-300">
                                        {p.phone || "N/A"}
                                      </span>
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                                      Year/Dept:{" "}
                                      <span className="text-gray-300">
                                        {p.year} {p.department}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Individuals Section */}
                  {event.individualParticipants.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-green-400" />
                        Individual Participants (
                        {event.individualParticipants.length})
                      </h3>
                      <div className="flex flex-col gap-3">
                        {event.individualParticipants.map((p) => (
                          <div
                            key={p._id}
                            className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 transition-all"
                          >
                            <Avatar className="h-10 w-10 border-2 border-green-500/20">
                              <AvatarImage src={p.profilePhoto} alt={p.name} />
                              <AvatarFallback className="bg-green-700 text-white font-bold">
                                {p.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-white font-semibold truncate">
                                    {p.name}
                                  </p>
                                  <Badge className="text-xs bg-green-700">
                                    Individual
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400 truncate">
                                  {p.email}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 mt-1">
                                <span className="text-xs text-gray-500 font-medium">
                                  Roll:{" "}
                                  <span className="text-gray-300">
                                    {p.rollNumber || "N/A"}
                                  </span>
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                  Phone:{" "}
                                  <span className="text-gray-300">
                                    {p.phone || "N/A"}
                                  </span>
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                  Year/Dept:{" "}
                                  <span className="text-gray-300">
                                    {p.year} {p.department}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-gray-500 bg-gray-900/40 rounded-xl border border-dashed border-gray-700">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
