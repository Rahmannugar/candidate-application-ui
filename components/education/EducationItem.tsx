"use client";

import { Trash } from "@phosphor-icons/react";
import { Education } from "@/lib/education/education.types";

type EducationItemProps = {
  education: Education;
  onRemove: (educationId: string) => void;
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

export default function EducationItem({
  education,
  onRemove,
}: EducationItemProps) {
  const dateRange = `${formatMonthYear(education.startDate)} - ${
    education.isCurrent ? "Present" : formatMonthYear(education.endDate)
  }`;

  const handleRemove = () => {
    onRemove(education.id);
  };

  return (
    <article className="rounded-md border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {education.school}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {education.degree}, {education.fieldOfStudy}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {education.location} • {dateRange}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Remove ${education.school}`}
          onClick={handleRemove}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Trash size={16} />
        </button>
      </div>

      {education.notes ? (
        <p className="mt-3 text-sm leading-6 text-foreground">
          {education.notes}
        </p>
      ) : null}
    </article>
  );
}
