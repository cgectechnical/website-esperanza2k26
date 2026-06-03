"use client";

import { eventRegister } from "@/actions/eventRegister.action";
import { getSettings } from "@/actions/settings.action";
import { useRouter } from "next/navigation";
import customSwal from "@/utils/swal";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const RegisterButton = ({
  uniqueId,
  userEmail,
}: {
  uniqueId: number;
  userEmail?: string;
}) => {
  const router = useRouter();
  const [isRegOpen, setIsRegOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSettings = async () => {
      const settings = await getSettings();
      setIsRegOpen(settings.registrationEnabled);
    };
    checkSettings();
  }, []);

  const handleRegisterForEvent = async () => {
    if (!isRegOpen) {
      customSwal.fire({
        title: "Registration is closed",
        icon: "info",
        text: "Please contact the event coordinators for more information",
      });
      return;
    }

    if (!userEmail) {
      customSwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You need to login first!",
        confirmButtonText: "Okay",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    setIsLoading(true);
    const res = await eventRegister(uniqueId, userEmail);
    setIsLoading(false);
    
    if (res) {
      if (res.error) {
        customSwal.fire({
          icon: "error",
          title: "Oops...",
          text: res.error || res.message,
          confirmButtonText: "Okay",
        });
      } else {
        customSwal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
          confirmButtonText: "Okay",
        }).then(() => {
          router.refresh();
        });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleRegisterForEvent}
      disabled={isLoading}
      className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 shadow-[0_4px_0_0_#9d174d] hover:shadow-[0_2px_0_0_#9d174d] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
      Register
    </button>
  );
};

export default RegisterButton;
