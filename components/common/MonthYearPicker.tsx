"use client";

import { CalendarBlank, X } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import ByteDatePicker from "byte-datepicker";

type MonthYearPickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
  disabled?: boolean;
};

export default function MonthYearPicker({
  value,
  onChange,
  placeholder,
  disabled = false,
}: MonthYearPickerProps) {
  const { resolvedTheme } = useTheme();
  const datePickerTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ByteDatePicker
      value={value}
      onChange={onChange}
      formatString="month yyyy"
      clearable
      disabled={disabled}
      hideInput
      theme={datePickerTheme}
    >
      {({ open, formattedValue, clear }) => {
        const hasValue = Boolean(formattedValue);

        const handleOpen = () => {
          open();
        };

        const handleClear = () => {
          clear();
        };

        return (
          <div className="relative">
            <button
              type="button"
              onClick={handleOpen}
              disabled={disabled}
              className="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-border bg-background px-3 text-left text-sm text-foreground outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span
                className={
                  hasValue ? "text-foreground" : "text-muted-foreground"
                }
              >
                {formattedValue || placeholder}
              </span>
              <CalendarBlank size={18} className="shrink-0 text-primary" />
            </button>

            {hasValue && !disabled ? (
              <button
                type="button"
                aria-label="Clear selected date"
                onClick={handleClear}
                className="absolute right-9 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X size={13} weight="bold" />
              </button>
            ) : null}
          </div>
        );
      }}
    </ByteDatePicker>
  );
}
