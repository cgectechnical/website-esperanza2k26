"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { Crew } from "@/models/crew.model";
import cloudinary from "@/utils/cloudinary";

export const getAllCrew = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const crew = await Crew.find().sort({ createdAt: -1 });
  const plainCrew = crew.map(member => JSON.parse(JSON.stringify(member)));
  return { success: true, crew: plainCrew };
};

export const createCrewMember = async (data: {
  name: string;
  department: string;
  year: string;
  avatar: string;
  category: string[];
  lead?: string;
  role?: string;
  socials: { handler: string; link: string }[];
}) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const crewMember = new Crew(data);
  await crewMember.save();
  const plainMember = JSON.parse(JSON.stringify(crewMember));
  return { success: true, message: "Crew member created successfully", member: plainMember };
};

export const updateCrewMember = async (
  memberId: string,
  data: Partial<{
    name: string;
    department: string;
    year: string;
    avatar: string;
    category: string[];
    lead?: string;
    role?: string;
    socials: { handler: string; link: string }[];
  }>
) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const member = await Crew.findByIdAndUpdate(memberId, data, { new: true });
  if (!member) {
    return { success: false, message: "Crew member not found" };
  }

  const plainMember = JSON.parse(JSON.stringify(member));
  return { success: true, message: "Crew member updated successfully", member: plainMember };
};

export const deleteCrewMember = async (memberId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const member = await Crew.findByIdAndDelete(memberId);
  if (!member) {
    return { success: false, message: "Crew member not found" };
  }

  return { success: true, message: "Crew member deleted successfully" };
};
