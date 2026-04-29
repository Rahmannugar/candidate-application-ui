"use client";

import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

type SubmissionStatusProps = {
  status: "idle" | "pending" | "success" | "error";
  message?: string;
};

export default function SubmissionStatus({
  status,
  message,
}: SubmissionStatusProps) {
  if (status === "idle" || status === "pending") {
    return null;
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-md border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
        <CheckCircle size={20} weight="fill" className="mt-0.5 text-primary" />
        <p>{message ?? "Application submitted successfully."}</p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-foreground">
      <WarningCircle size={20} weight="fill" className="mt-0.5 text-danger" />
      <p>{message ?? "Unable to submit application. Please try again."}</p>
    </div>
  );
}
