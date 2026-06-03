"use server";

import { ContactMessage } from "@/models/contact.model";
import { connectDB } from "@/utils/db/connect";
import { auth } from "@/auth";
import { User } from "@/models/user.model";

const contactMessage = async (name: string, email: string, message: string) => {
  try {
    await connectDB();

    const session = await auth();
    let profilePhoto = null;

    if (session?.user?.email) {
      const user = await User.findOne({ "credentials.email": session.user.email });
      if (user) {
        profilePhoto = user.profilePhoto;
      }
    }

    const response = await ContactMessage.create({
      name,
      email,
      message,
      profilePhoto,
    });
    if (response) {
      return {
        success: true,
        message: "Message Sent Successfully",
      };
    } else {
      return {
        success: false,
        message: "Message Sending Failed",
      };
    }
  } catch (error:any) {
    return {
      success: false,
      message: "Internal Server Error",
      error: error.message,
    };
  }
};

export { contactMessage };
