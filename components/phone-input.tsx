"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhoneInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, error, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // Remove all non-digit characters
      inputValue = inputValue.replace(/\D/g, "");

      // Limit to 9 digits (after +998)
      if (inputValue.length > 9) {
        inputValue = inputValue.slice(0, 9);
      }

      // Always prepend +998
      const fullValue = "+998" + inputValue;
      onChange(fullValue);
    };

    // Get digits only (without +998)
    const digits = value.replace(/\D/g, "").slice(3) || "";

    // Format display value: 90 123 45 67
    const formatDisplayValue = (digs: string) => {
      if (digs.length === 0) return "";

      // Format: XX XXX XX XX
      let formatted = "";

      if (digs.length > 0) {
        formatted = digs.slice(0, 2);
      }
      if (digs.length > 2) {
        formatted += " " + digs.slice(2, 5);
      }
      if (digs.length > 5) {
        formatted += " " + digs.slice(5, 7);
      }
      if (digs.length > 7) {
        formatted += " " + digs.slice(7, 9);
      }

      return formatted;
    };

    const displayValue = formatDisplayValue(digits);

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            +998
          </span>
        </div>
        <input
          ref={ref}
          type="tel"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "flex h-12 w-full rounded-lg border bg-background py-2 pl-20 pr-4 text-base font-medium transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input",
            className,
          )}
          placeholder="90 123 45 67"
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
