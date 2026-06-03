"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { User } from "@/models/user.model";

export const getAllUsers = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const users = await User.find().sort({ createdAt: -1 });
  const plainUsers = users.map(user => {
    const plainUser = JSON.parse(JSON.stringify(user));
    // Ensure registeredEvents count is accurate by removing potential duplicates
    if (plainUser.registeredEvents) {
      plainUser.registeredEvents = Array.from(new Set(plainUser.registeredEvents.map((id: any) => id.toString())));
    }
    return plainUser;
  });
  return { success: true, users: plainUsers };
};

export const updateUserRole = async (userId: string, role: "user" | "admin") => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const user = await User.findById(userId);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  user.role = role;
  await user.save();
  return { success: true, message: "User role updated successfully" };
};

export const deleteUser = async (userId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  return { success: true, message: "User deleted successfully" };
};
