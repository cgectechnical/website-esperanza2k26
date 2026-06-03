"use client";

import { sendOTP, verifyOTPAndResetPassword } from "@/actions/forgotPassword.action";
import { roboto, sedgwick } from "@/utils/fonts";
import customSwal from "@/utils/swal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ForgotPasswordFlowProps {
  onBack: () => void;
}

const ForgotPasswordFlow = ({ onBack }: ForgotPasswordFlowProps) => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendOTP(email);
    setLoading(false);
    if (res.success) {
      customSwal.fire({
        title: "OTP Sent",
        text: "Please check your email for the OTP.",
        icon: "success",
      });
      setStep("otp");
    } else {
      customSwal.fire({
        title: "Error",
        text: res.error || "Failed to send OTP",
        icon: "error",
      });
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await verifyOTPAndResetPassword(email, otp, newPassword);
    setLoading(false);
    if (res.success) {
      customSwal.fire({
        title: "Success",
        text: "Password reset successfully. You can now login.",
        icon: "success",
      }).then(() => {
        onBack();
      });
    } else {
      customSwal.fire({
        title: "Error",
        text: res.error || "Failed to reset password",
        icon: "error",
      });
    }
  };

  return (
    <div className="relative z-50 h-full flex flex-col p-4 sm:p-6 md:py-8 md:px-12 max-w-[500px] m-auto gap-3 sm:gap-5 md:gap-8">
      <h2 className={`${sedgwick.className} text-2xl text-white text-center`}>
        {step === "email" && "Forgot Password"}
        {step === "otp" && "Enter OTP"}
        {step === "reset" && "Reset Password"}
      </h2>

      {step === "email" && (
        <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            required
            className={`bg-white/70 placeholder:text-black/65 px-6 py-4 rounded-2xl text-black outline-none ${roboto.className}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-red-700 rounded-2xl cursor-pointer px-6 py-4 text-white ${sedgwick.className} disabled:opacity-50`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {(step === "otp" || step === "reset") && (
        <form onSubmit={handleVerifyAndReset} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            required
            maxLength={6}
            className={`bg-white/70 placeholder:text-black/65 px-6 py-4 rounded-2xl text-black outline-none ${roboto.className}`}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              className={`bg-white/70 placeholder:text-black/65 px-6 py-4 rounded-2xl text-black outline-none w-full ${roboto.className}`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-700 rounded-2xl cursor-pointer px-6 py-4 text-white ${sedgwick.className} disabled:opacity-50`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}

      <button
        onClick={onBack}
        className={`text-white/70 hover:text-white text-sm ${roboto.className}`}
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPasswordFlow;
