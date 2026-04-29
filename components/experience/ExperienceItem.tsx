"use client";

import { Trash } from "@phosphor-icons/react";
import { Experience } from "@/lib/experience/experience.types";

type ExperienceItemProps = {
  experience: Experience;
  onRemove: (experienceId: string) => void;
};

const formatMonthYear = (dateValue: string) => {
  if (!dateValue) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
};

export default function ExperienceItem({
  experience,
  onRemove,
}: ExperienceItemProps) {
  const dateRange = `${formatMonthYear(experience.startDate)} - ${
    experience.isCurrentRole ? "Present" : formatMonthYear(experience.endDate)
  }`;

  const handleRemove = () => {
    onRemove(experience.id);
  };

  return (
    <article className="rounded-md border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {experience.role}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {experience.company} • {experience.location}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{dateRange}</p>
        </div>

        <button
          type="button"
          aria-label={`Remove ${experience.role} at ${experience.company}`}
          onClick={handleRemove}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Trash size={16} />
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-foreground">
        {experience.description}
      </p>
    </article>
  );
}
