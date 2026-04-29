"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SummaryFormValues,
  summarySchema,
} from "@/lib/summary/summarySchema";
import { useSummaryStore } from "@/lib/summary/summaryStore";

export default function SummaryForm() {
  const summary = useSummaryStore((state) => state.summary);
  const updateSummaryField = useSummaryStore(
    (state) => state.updateSummaryField,
  );

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<SummaryFormValues>({
    resolver: zodResolver(summarySchema),
    mode: "onBlur",
    defaultValues: summary,
  });

  const professionalSummary = watch("professionalSummary");
  const summaryLength = professionalSummary.length;

  const headlineField = register("headline", {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      updateSummaryField("headline", event.target.value);
    },
  });

  const professionalSummaryField = register("professionalSummary", {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateSummaryField("professionalSummary", event.target.value);
    },
  });

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a concise overview of your background and the value you bring.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block" htmlFor="headline">
          <span className="text-sm font-medium text-foreground">
            Professional headline
          </span>
          <input
            id="headline"
            type="text"
            placeholder="Senior frontend engineer"
            className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...headlineField}
          />
          {errors.headline?.message ? (
            <span className="mt-1 block text-xs text-danger">
              {errors.headline.message}
            </span>
          ) : null}
        </label>

        <label className="block" htmlFor="professionalSummary">
          <span className="text-sm font-medium text-foreground">
            Professional summary
          </span>
          <textarea
            id="professionalSummary"
            placeholder="Briefly describe your experience, strengths, and the type of work you are looking for."
            rows={6}
            className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...professionalSummaryField}
          />
          <div className="mt-1 flex items-center justify-between gap-3">
            {errors.professionalSummary?.message ? (
              <span className="text-xs text-danger">
                {errors.professionalSummary.message}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">
                Keep it focused and specific.
              </span>
            )}
            <span className="shrink-0 text-xs text-muted-foreground">
              {summaryLength}/700
            </span>
          </div>
        </label>
      </div>
    </section>
  );
}
