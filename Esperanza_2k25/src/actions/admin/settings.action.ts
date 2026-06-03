"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { Settings } from "@/models/settings.model";

export const getSettings = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  let registrationEnabledSetting = await Settings.findOne({ key: "registrationEnabled" });
  if (!registrationEnabledSetting) {
    registrationEnabledSetting = new Settings({ key: "registrationEnabled", value: true });
    await registrationEnabledSetting.save();
  }
  
  return { success: true, registrationEnabled: registrationEnabledSetting.value as boolean };
};

export const updateSettings = async (data: { registrationEnabled: boolean }) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  await connectDB();
  const settings = await Settings.findOneAndUpdate(
    { key: "registrationEnabled" },
    { value: data.registrationEnabled, updatedAt: new Date() },
    { new: true, upsert: true }
  );
  
  return { success: true, message: "Settings updated successfully", registrationEnabled: settings.value as boolean };
};
