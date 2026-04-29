"use client";

import ByteDatePicker from "byte-datepicker";
import { ChangeEvent, FormEvent, useState } from "react";
import { experienceInputSchema } from "@/lib/experience/experienceSchema";
import { ExperienceInput } from "@/lib/experience/experience.types";
import { useExperienceStore } from "@/lib/experience/experienceStore";
import ExperienceItem from "./ExperienceItem";

const initialExperienceInput: ExperienceInput = {
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrentRole: false,
  description: "",
};

type ExperienceErrors = Partial<Record<keyof ExperienceInput, string>>;

const toDateValue = (value: string) => {
  return value ? new Date(value) : null;
};

const toStoredDate = (date: Date | null) => {
  return date ? date.toISOString() : "";
};

export default function ExperienceForm() {
  const experience = useExperienceStore((state) => state.experience);
  const addExperience = useExperienceStore((state) => state.addExperience);
  const removeExperience = useExperienceStore(
    (state) => state.removeExperience,
  );
  const [experienceInput, setExperienceInput] = useState<ExperienceInput>(
    initialExperienceInput,
  );
  const [errors, setErrors] = useState<ExperienceErrors>({});

  const updateExperienceInput = (
    field: keyof ExperienceInput,
    value: string | boolean,
  ) => {
    setExperienceInput((currentInput) => ({
      ...currentInput,
      [field]: value,
      ...(field === "isCurrentRole" && value === true ? { endDate: "" } : {}),
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateExperienceInput(
      event.target.name as keyof ExperienceInput,
      event.target.value,
    );
  };

  const handleCurrentRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateExperienceInput("isCurrentRole", event.target.checked);
  };

  const handleStartDateChange = (date: Date | null) => {
    updateExperienceInput("startDate", toStoredDate(date));
  };

  const handleEndDateChange = (date: Date | null) => {
    updateExperienceInput("endDate", toStoredDate(date));
  };

  const handleAddExperience = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedExperience = experienceInputSchema.safeParse(experienceInput);

    if (!parsedExperience.success) {
      const nextErrors: ExperienceErrors = {};

      parsedExperience.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ExperienceInput;
        nextErrors[field] = issue.message;
      });

      setErrors(nextErrors);
      return;
    }

    addExperience(parsedExperience.data);
    setExperienceInput(initialExperienceInput);
    setErrors({});
  };

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Experience</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add relevant roles, responsibilities, and outcomes.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleAddExperience}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block" htmlFor="role">
            <span className="text-sm font-medium text-foreground">Role</span>
            <input
              id="role"
              name="role"
              type="text"
              value={experienceInput.role}
              onChange={handleTextChange}
              placeholder="Product designer"
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.role ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.role}
              </span>
            ) : null}
          </label>

          <label className="block" htmlFor="company">
            <span className="text-sm font-medium text-foreground">Company</span>
            <input
              id="company"
              name="company"
              type="text"
              value={experienceInput.company}
              onChange={handleTextChange}
              placeholder="Acme Inc."
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.company ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.company}
              </span>
            ) : null}
          </label>
        </div>

        <label className="block" htmlFor="location">
          <span className="text-sm font-medium text-foreground">Location</span>
          <input
            id="location"
            name="location"
            type="text"
            value={experienceInput.location}
            onChange={handleTextChange}
            placeholder="Remote, New York, NY"
            className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.location ? (
            <span className="mt-1 block text-xs text-danger">
              {errors.location}
            </span>
          ) : null}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-foreground">
              Start date
            </span>
            <div className="mt-2">
              <ByteDatePicker
                value={toDateValue(experienceInput.startDate)}
                onChange={handleStartDateChange}
                placeholder="Select start date"
                formatString="month yyyy"
                clearable
                theme="system"
              />
            </div>
            {errors.startDate ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.startDate}
              </span>
            ) : null}
          </div>

          <div>
            <span className="text-sm font-medium text-foreground">
              End date
            </span>
            <div className="mt-2">
              <ByteDatePicker
                value={toDateValue(experienceInput.endDate)}
                onChange={handleEndDateChange}
                placeholder="Select end date"
                formatString="month yyyy"
                clearable
                disabled={experienceInput.isCurrentRole}
                theme="system"
              />
            </div>
            {errors.endDate ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.endDate}
              </span>
            ) : null}
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={experienceInput.isCurrentRole}
            onChange={handleCurrentRoleChange}
            className="size-4 accent-primary"
          />
          I currently work here
        </label>

        <label className="block" htmlFor="description">
          <span className="text-sm font-medium text-foreground">
            Description
          </span>
          <textarea
            id="description"
            name="description"
            value={experienceInput.description}
            onChange={handleTextChange}
            placeholder="Describe your responsibilities, tools used, and measurable impact."
            rows={5}
            className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.description ? (
            <span className="mt-1 block text-xs text-danger">
              {errors.description}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Add experience
        </button>
      </form>

      {experience.length > 0 ? (
        <div className="mt-5 space-y-3">
          {experience.map((experienceItem) => (
            <ExperienceItem
              key={experienceItem.id}
              experience={experienceItem}
              onRemove={removeExperience}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
          No experience added yet.
        </div>
      )}
    </section>
  );
}
