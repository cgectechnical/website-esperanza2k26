
"use server";

import { Settings } from "@/models/settings.model";
import { connectDB } from "@/utils/db/connect";

const DEFAULT_SETTINGS = {
  registrationEnabled: true,
};

export const getSettings = async () => {
  try {
    await connectDB();
    const settings = await Settings.find();
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>);

    return { ...DEFAULT_SETTINGS, ...settingsMap };
  } catch (error) {
    console.error("Error getting settings:", error);
    return DEFAULT_SETTINGS;
  }
};

export const toggleRegistration = async (enabled: boolean) => {
  try {
    await connectDB();
    await Settings.findOneAndUpdate(
      { key: "registrationEnabled" },
      { value: enabled, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return { success: true, message: `Registration ${enabled ? "enabled" : "disabled"}` };
  } catch (error) {
    console.error("Error toggling registration:", error);
    return { success: false, message: "Failed to toggle registration" };
  }
};

