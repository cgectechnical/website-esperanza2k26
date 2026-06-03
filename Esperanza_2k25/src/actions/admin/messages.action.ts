"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { ContactMessage } from "@/models/contact.model";
import { User } from "@/models/user.model";

export const getAllMessages = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  // Fetch all users to map profile photos by email for a more robust lookup
  const users = await User.find({}, "credentials.email profilePhoto");
  const userPhotoMap = new Map();
  users.forEach((u) => {
    if (u.credentials?.email && u.profilePhoto) {
      userPhotoMap.set(u.credentials.email.toLowerCase(), u.profilePhoto);
    }
  });

  const plainMessages = messages.map((msg) => {
    const email = msg.email?.toLowerCase();
    return {
      _id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      // Priority: 1. Photo stored with message, 2. Current photo from User model, 3. null
      profilePhoto: msg.profilePhoto || userPhotoMap.get(email) || null,
      createdAt: msg.createdAt
        ? msg.createdAt.toISOString()
        : msg._id.getTimestamp().toISOString(),
    };
  });

  return { success: true, messages: plainMessages };
};

export const deleteMessage = async (messageId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const msg = await ContactMessage.findByIdAndDelete(messageId);
  if (!msg) {
    return { success: false, message: "Message not found" };
  }

  return { success: true, message: "Message deleted successfully" };
};
