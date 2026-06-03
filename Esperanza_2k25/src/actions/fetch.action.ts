"use server";

import { connectDB } from "@/utils/db/connect";
import { Events } from "@/models/events.model";
import { User } from "@/models/user.model";
import Sponsor from "@/models/sponsor.model";
import Band from "@/models/band.model";

export async function fetchAllEvents(category?: "technical" | "cultural") {
  try {
    await connectDB();
    let query: any = {};
    if (category) {
      query.eventCategory = category;
    }
    const events = await Events.find(query).sort({ uniqueId: 1 });
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function fetchEventByUniqueId(uniqueId: number) {
  try {
    await connectDB();
    const event = await Events.findOne({ uniqueId }).populate("participants");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Error fetching event by uniqueId:", error);
    return null;
  }
}

export async function fetchAllSponsors() {
  try {
    await connectDB();
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(sponsors));
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

export async function fetchAllBands() {
  try {
    await connectDB();
    const bands = await Band.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(bands));
  } catch (error) {
    console.error("Error fetching bands:", error);
    return [];
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ "credentials.email": email });
    if (user && user.registeredEvents) {
      // Proactively clean up duplicates in the database if any exist
      const uniqueEventIds = Array.from(new Set(user.registeredEvents.map((id: any) => id.toString())));
      if (uniqueEventIds.length !== user.registeredEvents.length) {
        user.registeredEvents = uniqueEventIds;
        await user.save();
      }
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function fetchRegisteredEvents(eventIds: string[]) {
  try {
    await connectDB();
    const events = await Events.find({ _id: { $in: eventIds } });
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching registered events:", error);
    return [];
  }
}
