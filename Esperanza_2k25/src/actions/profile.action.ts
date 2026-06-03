"use server";

import { auth } from "@/auth";
import { User } from "@/models/user.model";
import { Events } from "@/models/events.model";
import { Team } from "@/models/team.model";
import { connectDB } from "@/utils/db/connect";
import cloudinary from "@/utils/cloudinary";

export const uploadProfilePhoto = async (base64Image: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const publicId = `esperanza2k26/profile/${user._id}`;
    
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      public_id: publicId,
      overwrite: true,
      invalidate: true,
    });

    user.profilePhoto = uploadResult.secure_url;
    await user.save();

    return {
      success: true,
      message: "Profile photo uploaded successfully",
      photoUrl: uploadResult.secure_url,
    };
  } catch (error: any) {
    console.error("Error uploading profile photo:", error);
    return { success: false, message: "Failed to upload profile photo" };
  }
};

export const unregisterFromEvent = async (eventId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const eventIndex = user.registeredEvents.findIndex(
      (id: string) => id.toString() === eventId.toString()
    );
    
    if (eventIndex === -1) {
      return { success: false, message: "You are not registered for this event" };
    }

    const team = await Team.findOne({ eventId });
    if (team) {
      if (team.leader.toString() === user._id.toString()) {
        if (team.members.length > 0) {
          const newLeaderId = team.members[0];
          team.leader = newLeaderId;
          team.members = team.members.filter((m: any) => m.toString() !== newLeaderId.toString());
        } else {
          await Team.findByIdAndDelete(team._id);
        }
      } else {
        team.members = team.members.filter((m: any) => m.toString() !== user._id.toString());
      }
      
      if (team.leader) {
        await team.save();
      }
    }

    const event = await Events.findById(eventId);
    if (event) {
      event.participants = event.participants.filter(
        (id: string) => id.toString() !== user._id.toString()
      );
      await event.save();
    }

    // Remove all instances of this event from user's registeredEvents to clean up duplicates
    user.registeredEvents = user.registeredEvents.filter(
      (id: any) => id.toString() !== eventId.toString()
    );
    await user.save();

    return {
      success: true,
      message: "Successfully unregistered from event",
    };
  } catch (error: any) {
    console.error("Error unregistering from event:", error);
    return { success: false, message: "Failed to unregister from event" };
  }
};

export const updateProfile = async (data: {
  name: string;
  department: string;
  phoneNumber: string;
  rollNumber: string;
  year: string;
}) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const existingUser = await User.findOne({ 
      "credentials.phoneNumber": data.phoneNumber,
      _id: { $ne: user._id }
    });
    
    if (existingUser) {
      return { success: false, message: "Phone number already in use" };
    }

    user.name = data.name;
    user.department = data.department;
    user.credentials.phoneNumber = data.phoneNumber;
    user.rollNumber = data.rollNumber;
    user.year = data.year;

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
};
