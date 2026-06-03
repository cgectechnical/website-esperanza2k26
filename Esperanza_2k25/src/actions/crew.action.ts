"use server";

import { connectDB } from "@/utils/db/connect";
import { Crew } from "@/models/crew.model";

export const getPublicCrew = async () => {
  await connectDB();
  const crew = await Crew.find().sort({ createdAt: 1 });
  const plainCrew = crew.map(member => JSON.parse(JSON.stringify(member)));
  return plainCrew;
};
