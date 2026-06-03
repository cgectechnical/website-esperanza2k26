"use server";

import { User } from "@/models/user.model";
import { connectDB } from "@/utils/db/connect";

export async function sendOTP(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ "credentials.email": email });

    if (!user) {
      return { success: false, error: "User with this email does not exist." };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = expiry;
    await user.save();

    // Use Brevo API directly via fetch
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Esperanza Support", email: process.env.GMAIL_USER },
        to: [{ email: email }],
        subject: "Password Reset OTP - Esperanza 2k26",
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px;">
              <h2 style="color: #ff4444;">Esperanza 2k26 Password Reset</h2>
              <p>You requested a password reset. Your OTP is:</p>
              <div style="background-color: #222; padding: 15px; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold; border-radius: 10px;">
                ${otp}
              </div>
              <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email via Brevo");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return { success: false, error: error.message || "Internal server error" };
  }
}

export async function verifyOTPAndResetPassword(
  email: string,
  otp: string,
  newPassword: string,
) {
  try {
    await connectDB();
    const user = await User.findOne({
      "credentials.email": email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() },
    });

    if (!user) {
      return { success: false, error: "Invalid or expired OTP." };
    }

    // Hash is handled by pre-save hook in user model
    user.credentials.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    return { success: true };
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return { success: false, error: error.message || "Internal server error" };
  }
}
