"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import Sponsor from "@/models/sponsor.model";

export const getAllSponsors = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const sponsors = await Sponsor.find().sort({ createdAt: -1 });
  const plainSponsors = sponsors.map((sponsor) => JSON.parse(JSON.stringify(sponsor)));
  return { success: true, sponsors: plainSponsors };
};

export const createSponsor = async (data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const sponsor = new Sponsor(data);
  await sponsor.save();
  const plainSponsor = JSON.parse(JSON.stringify(sponsor));
  return { success: true, message: "Sponsor created successfully", sponsor: plainSponsor };
};

export const updateSponsor = async (sponsorId: string, data: any) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const sponsor = await Sponsor.findByIdAndUpdate(sponsorId, data, { new: true });
  if (!sponsor) {
    return { success: false, message: "Sponsor not found" };
  }

  const plainSponsor = JSON.parse(JSON.stringify(sponsor));
  return { success: true, message: "Sponsor updated successfully", sponsor: plainSponsor };
};

export const deleteSponsor = async (sponsorId: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const sponsor = await Sponsor.findByIdAndDelete(sponsorId);
  if (!sponsor) {
    return { success: false, message: "Sponsor not found" };
  }

  return { success: true, message: "Sponsor deleted successfully" };
};
