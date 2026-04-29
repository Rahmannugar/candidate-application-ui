"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { educationInputSchema } from "@/lib/education/educationSchema";
import { EducationInput } from "@/lib/education/education.types";
import { useEducationStore } from "@/lib/education/educationStore";
import EducationItem from "./EducationItem";

const MonthYearPicker = dynamic(
  () => import("@/components/common/MonthYearPicker"),
  { ssr: false },
);

const initialEducationInput: EducationInput = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  notes: "",
};

type EducationErrors = Partial<Record<keyof EducationInput, string>>;

const toDateValue = (value: string) => {
  return value ? new Date(value) : null;
};

const toStoredDate = (date: Date | null) => {
  return date ? date.toISOString() : "";
};

export default function EducationForm() {
  const education = useEducationStore((state) => state.education);
  const addEducation = useEducationStore((state) => state.addEducation);
  const removeEducation = useEducationStore((state) => state.removeEducation);
  const [educationInput, setEducationInput] = useState<EducationInput>(
    initialEducationInput,
  );
  const [errors, setErrors] = useState<EducationErrors>({});

  const updateEducationInput = (
    field: keyof EducationInput,
    value: string | boolean,
  ) => {
    setEducationInput((currentInput) => ({
      ...currentInput,
      [field]: value,
      ...(field === "isCurrent" && value === true ? { endDate: "" } : {}),
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateEducationInput(
      event.target.name as keyof EducationInput,
      event.target.value,
    );
  };

  const handleCurrentChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateEducationInput("isCurrent", event.target.checked);
  };

  const handleStartDateChange = (date: Date | null) => {
    updateEducationInput("startDate", toStoredDate(date));
  };

  const handleEndDateChange = (date: Date | null) => {
    updateEducationInput("endDate", toStoredDate(date));
  };

  const handleAddEducation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedEducation = educationInputSchema.safeParse(educationInput);

    if (!parsedEducation.success) {
      const nextErrors: EducationErrors = {};

      parsedEducation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EducationInput;
        nextErrors[field] = issue.message;
      });

      setErrors(nextErrors);
      return;
    }

    addEducation(parsedEducation.data);
    setEducationInput(initialEducationInput);
    setErrors({});
  };

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Education</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add schools, programs, and training relevant to this application.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleAddEducation}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block" htmlFor="school">
            <span className="text-sm font-medium text-foreground">School</span>
            <input
              id="school"
              name="school"
              type="text"
              value={educationInput.school}
              onChange={handleTextChange}
              placeholder="University of Lagos"
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.school ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.school}
              </span>
            ) : null}
          </label>

          <label className="block" htmlFor="degree">
            <span className="text-sm font-medium text-foreground">
              Degree or program
            </span>
            <input
              id="degree"
              name="degree"
              type="text"
              value={educationInput.degree}
              onChange={handleTextChange}
              placeholder="B.Sc."
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.degree ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.degree}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block" htmlFor="fieldOfStudy">
            <span className="text-sm font-medium text-foreground">
              Field of study
            </span>
            <input
              id="fieldOfStudy"
              name="fieldOfStudy"
              type="text"
              value={educationInput.fieldOfStudy}
              onChange={handleTextChange}
              placeholder="Computer Science"
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.fieldOfStudy ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.fieldOfStudy}
              </span>
            ) : null}
          </label>

          <label className="block" htmlFor="educationLocation">
            <span className="text-sm font-medium text-foreground">Location</span>
            <input
              id="educationLocation"
              name="location"
              type="text"
              value={educationInput.location}
              onChange={handleTextChange}
              placeholder="Lagos, Nigeria"
              className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.location ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.location}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-foreground">
              Start date
            </span>
            <div className="mt-2">
              <MonthYearPicker
                value={toDateValue(educationInput.startDate)}
                onChange={handleStartDateChange}
                placeholder="Select start date"
              />
            </div>
            {errors.startDate ? (
              <span className="mt-1 block text-xs text-danger">
                {errors.startDate}
              </span>
            ) : null}
          </div>

          <div>
            <span className="text-sm font-medium text-foreground">End date</span>
            <div className="mt-2">
              <MonthYearPicker
                value={toDateValue(educationInput.endDate)}
                onChange={handleEndDateChange}
                placeholder="Select end date"
                disabled={educationInput.isCurrent}
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
            checked={educationInput.isCurrent}
            onChange={handleCurrentChange}
            className="size-4 accent-primary"
          />
          I am currently enrolled here
        </label>

        <label className="block" htmlFor="notes">
          <span className="text-sm font-medium text-foreground">Notes</span>
          <textarea
            id="notes"
            name="notes"
            value={educationInput.notes}
            onChange={handleTextChange}
            placeholder="Honors, coursework, achievements, or relevant training."
            rows={4}
            className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.notes ? (
            <span className="mt-1 block text-xs text-danger">
              {errors.notes}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Add education
        </button>
      </form>

      {education.length > 0 ? (
        <div className="mt-5 space-y-3">
          {education.map((educationItem) => (
            <EducationItem
              key={educationItem.id}
              education={educationItem}
              onRemove={removeEducation}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
          No education added yet.
        </div>
      )}
    </section>
  );
}
