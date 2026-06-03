"use server";

import { connectDB } from "@/utils/db/connect";
import { User } from "@/models/user.model";
import { Events } from "@/models/events.model";
import { ContactMessage } from "@/models/contact.model";

export const getDashboardStats = async () => {
  await connectDB();

  const usersCount = await User.countDocuments();
  const eventsCount = await Events.countDocuments();
  const messagesCount = await ContactMessage.countDocuments();

  const events = await Events.find();
  let totalReg = 0;
  events.forEach((event) => {
    totalReg += event.participants.length;
  });

  return {
    totalUsers: usersCount,
    totalEvents: eventsCount,
    totalRegistrations: totalReg,
    totalMessages: messagesCount,
  };
};
