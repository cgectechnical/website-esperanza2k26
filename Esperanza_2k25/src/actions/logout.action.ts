"use server";

import { signOut } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

const logout = async () => {
  try {
    await signOut({
      redirect : false,
    });
    
    revalidatePath("/", "layout");
    revalidatePath("/profile");
    revalidateTag("user");
    revalidateTag("events");
    
    return {
      success: true,
      status: "S",
      message: "Logged out successfully",
    };
  } catch (error: any) {
    console.log(error);
    
    return {
      success: false,
      status: "F",
      message: "Logout failed",
      error: error.message,
    };
  }
};

export { logout };
