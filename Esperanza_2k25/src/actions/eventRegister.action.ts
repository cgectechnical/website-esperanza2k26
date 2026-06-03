"use server";

import { Events } from "@/models/events.model";
import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db/connect";
import { getSettings } from "./settings.action";

const eventRegister = async (uniqueId: number, userEmail?: string) => {
  if (!userEmail) {
    return null;
  }
  try {
    const settings = await getSettings();
    if (!settings.registrationEnabled) {
      return {
        message: "Registrations are currently closed",
      };
    }
    await connectDB();
    const user = await User.findOne({ "credentials.email": userEmail });
    if (!user) {
      return null;
    }
    const event = await Events.findOne({ uniqueId });
    if (!event) {
      return null;
    }
    const isAlreadyInEvent = event.participants.some(
      (id: any) => id.toString() === user._id.toString(),
    );
    if (isAlreadyInEvent) {
      return {
        message: `${user.name} is Already registered`,
      };
    }
    event.participants.push(user._id);
    await event.save();

    const isAlreadyInUser = user.registeredEvents.some(
      (id: any) => id.toString() === event._id.toString(),
    );
    if (!isAlreadyInUser) {
      user.registeredEvents.push(event._id);
      await user.save();
    }
    return {
      message: `${user.name} registered for ${event.eventName}`,
    };
  } catch (error: any) {
    return {
      message: "Error registering for event",
      error: error.message,
    };
  }
};

export { eventRegister };
