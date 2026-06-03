"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <label className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <span
        className={cn(
          "inline-block h-6 w-11 rounded-full bg-gray-600 transition-colors",
          checked ? "bg-red-600" : "bg-gray-600"
        )}
      />
      <span
        className={cn(
          "absolute left-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </label>
  )
);
Switch.displayName = "Switch";

export { Switch };
