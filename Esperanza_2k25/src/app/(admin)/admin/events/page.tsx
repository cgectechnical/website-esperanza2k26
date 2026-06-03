"use client";

import { useEffect, useState } from "react";
import {
  getAllEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} from "@/actions/admin/events.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit3 } from "lucide-react";
import customSwal from "@/utils/swal";
import EventModal from "@/components/Admin/EventModal";

interface Event {
  _id: string;
  uniqueId?: number;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  venue: string;
  eventCategory: "technical" | "cultural";
  ruleBookLink: string;
  poster: string;
  leads: any[];
  participants: any[];
  nonRegisterable?: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      const result = await getAllEvents();
      if (result.success) {
        const allEvents = result.events || [];
        setEvents(allEvents);
        setFilteredEvents(allEvents);
      }
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
            e.venue.toLowerCase().includes(query),
        ),
      );
    }
  }, [searchQuery, events]);

  const handleDeleteEvent = async (eventId: string) => {
    const result = await customSwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await deleteEvent(eventId);
      if (res.success) {
        customSwal.fire("Deleted!", res.message, "success");
        setEvents((prev) => prev.filter((e) => e._id !== eventId));
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  const handleSaveEvent = async (data: Partial<Event>) => {
    if (editingEvent) {
      const res = await updateEvent(editingEvent._id, data);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setEvents((prev) =>
          prev.map((e) => (e._id === editingEvent._id ? { ...e, ...data } : e)),
        );
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    } else {
      const res = await createEvent(data as any);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setEvents((prev) => [res.event, ...prev]);
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Events Management
        </h1>
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 sm:w-64 h-9 sm:h-10"
          />
          <Button
            size="sm"
            className="sm:h-10 whitespace-nowrap px-3 sm:px-4"
            onClick={() => {
              setEditingEvent(null);
              setModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">All Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-800/50 animate-pulse"
                >
                  <div className="h-6 w-2/3 bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No events found
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 w-full">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {event.eventName}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                          {event.eventDescription}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            {event.eventDate}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1">
                            {event.eventStartTime} - {event.eventEndTime}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center gap-1">
                            {event.venue}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              event.eventCategory === "technical"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}
                          >
                            {event.eventCategory}
                          </span>
                          {event.nonRegisterable && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              Non-Registerable
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-start bg-gray-900/50 p-1 rounded-lg sm:bg-transparent sm:p-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-700 text-gray-400 hover:text-white"
                          onClick={() => {
                            setEditingEvent(event);
                            setModalOpen(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-red-600"
                          onClick={() => handleDeleteEvent(event._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={editingEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
