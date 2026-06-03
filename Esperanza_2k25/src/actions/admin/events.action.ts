"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { Events } from "@/models/events.model";

export const getAllEvents = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const events = await Events.find().sort({ createdAt: -1 });
  const plainEvents = events.map(event => JSON.parse(JSON.stringify(event)));
  return { success: true, events: plainEvents };
};

export const createEvent = async (data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  
  const lastEvent = await Events.findOne().sort({ uniqueId: -1 });
  const nextUniqueId = lastEvent ? lastEvent.uniqueId + 1 : 1;
  
  const event = new Events({ ...data, uniqueId: nextUniqueId });
  await event.save();
  const plainEvent = JSON.parse(JSON.stringify(event));
  return { success: true, message: "Event created successfully", event: plainEvent };
};

export const updateEvent = async (eventId: string, data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const event = await Events.findByIdAndUpdate(eventId, data, { new: true });
  if (!event) {
    return { success: false, message: "Event not found" };
  }

  const plainEvent = JSON.parse(JSON.stringify(event));
  return { success: true, message: "Event updated successfully", event: plainEvent };
};

export const deleteEvent = async (eventId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const event = await Events.findByIdAndDelete(eventId);
  if (!event) {
    return { success: false, message: "Event not found" };
  }

  return { success: true, message: "Event deleted successfully" };
};
