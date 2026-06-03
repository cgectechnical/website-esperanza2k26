"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import Band from "@/models/band.model";

export const getAllBands = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const bands = await Band.find().sort({ createdAt: -1 });
  const plainBands = bands.map((band) => JSON.parse(JSON.stringify(band)));
  return { success: true, bands: plainBands };
};

export const createBand = async (data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const band = new Band(data);
  await band.save();
  const plainBand = JSON.parse(JSON.stringify(band));
  return { success: true, message: "Band created successfully", band: plainBand };
};

export const updateBand = async (bandId: string, data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const band = await Band.findByIdAndUpdate(bandId, data, { new: true });
  if (!band) {
    return { success: false, message: "Band not found" };
  }

  const plainBand = JSON.parse(JSON.stringify(band));
  return { success: true, message: "Band updated successfully", band: plainBand };
};

export const deleteBand = async (bandId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const band = await Band.findByIdAndDelete(bandId);
  if (!band) {
    return { success: false, message: "Band not found" };
  }

  return { success: true, message: "Band deleted successfully" };
};
