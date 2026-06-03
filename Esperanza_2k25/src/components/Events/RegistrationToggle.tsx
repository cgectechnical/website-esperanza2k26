
"use client";

import { useState } from "react";
import { toggleRegistration } from "@/actions/settings.action";
import customSwal from "@/utils/swal";

interface RegistrationToggleProps {
  initialEnabled: boolean;
}

export default function RegistrationToggle({
  initialEnabled,
}: RegistrationToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    const result = await toggleRegistration(!enabled);
    setIsLoading(false);
    if (result.success) {
      setEnabled(!enabled);
      customSwal.fire("Success!", result.message, "success");
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800/70 rounded-lg">
      <span className="text-white font-semibold">
        Event Registration:
      </span>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg font-bold transition ${
          enabled
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        } text-white disabled:opacity-50`}
      >
        {isLoading ? "Updating..." : enabled ? "OPEN" : "CLOSED"}
      </button>
    </div>
  );
}

