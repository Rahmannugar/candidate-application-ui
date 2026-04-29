"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  CoverLetterFormValues,
  coverLetterSchema,
} from "@/lib/coverLetter/coverLetterSchema";
import { useCoverLetterStore } from "@/lib/coverLetter/coverLetterStore";

export default function CoverLetterForm() {
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);
  const updateCoverLetter = useCoverLetterStore(
    (state) => state.updateCoverLetter,
  );

  const {
    register,
    control,
    formState: { errors },
  } = useForm<CoverLetterFormValues>({
    resolver: zodResolver(coverLetterSchema),
    mode: "onBlur",
    defaultValues: coverLetter,
  });

  const content = useWatch({
    control,
    name: "content",
  });
  const contentLength = content?.length ?? 0;

  const contentField = register("content", {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      updateCoverLetter(event.target.value);
    },
  });

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Cover letter</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell the hiring team why this role is a strong match.
        </p>
      </div>

      <label className="block" htmlFor="coverLetter">
        <span className="text-sm font-medium text-foreground">
          Cover letter
        </span>
        <textarea
          id="coverLetter"
          rows={8}
          placeholder="Introduce yourself, highlight relevant experience, and explain why you are interested in this opportunity."
          className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...contentField}
        />
      </label>

      <div className="mt-1 flex items-center justify-between gap-3">
        {errors.content?.message ? (
          <span className="text-xs text-danger">{errors.content.message}</span>
        ) : (
          <span className="text-xs text-muted-foreground">
            Keep it specific to the role and client.
          </span>
        )}
        <span className="shrink-0 text-xs text-muted-foreground">
          {contentLength}/2000
        </span>
      </div>
    </section>
  );
}
