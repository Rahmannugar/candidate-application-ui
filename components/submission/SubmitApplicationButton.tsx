"use client";

import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useBasicInfoStore } from "@/lib/basicInfo/basicInfoStore";
import { useCoverLetterStore } from "@/lib/coverLetter/coverLetterStore";
import { useEducationStore } from "@/lib/education/educationStore";
import { useExperienceStore } from "@/lib/experience/experienceStore";
import { useLanguagesStore } from "@/lib/languages/languagesStore";
import { useResumeStore } from "@/lib/resume/resumeStore";
import { useSkillsStore } from "@/lib/skills/skillsStore";
import { useSubmitApplication } from "@/lib/submission/useSubmitApplication";
import { useSummaryStore } from "@/lib/summary/summaryStore";
import SubmissionStatus from "./SubmissionStatus";

export default function SubmitApplicationButton() {
  const basicInfo = useBasicInfoStore((state) => state.basicInfo);
  const summary = useSummaryStore((state) => state.summary);
  const skills = useSkillsStore((state) => state.skills);
  const languages = useLanguagesStore((state) => state.languages);
  const experience = useExperienceStore((state) => state.experience);
  const education = useEducationStore((state) => state.education);
  const resume = useResumeStore((state) => state.resume);
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);
  const submitApplicationMutation = useSubmitApplication();

  const handleSubmitApplication = () => {
    submitApplicationMutation.mutate({
      basicInfo,
      summary,
      skills,
      languages,
      experience,
      education,
      resume,
      coverLetter,
    });
  };

  const isSubmitting = submitApplicationMutation.isPending;
  const status = submitApplicationMutation.status;
  const statusMessage =
    submitApplicationMutation.data?.message ??
    submitApplicationMutation.error?.message;

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Submit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your details, then submit your application.
        </p>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={handleSubmitApplication}
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <PaperPlaneTilt size={18} weight="bold" />
          {isSubmitting ? "Submitting..." : "Submit application"}
        </button>

        <SubmissionStatus status={status} message={statusMessage} />
      </div>
    </section>
  );
}
