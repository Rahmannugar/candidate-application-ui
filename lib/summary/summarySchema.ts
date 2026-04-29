import { z } from "zod";

export const summarySchema = z.object({
  headline: z.string().min(2, "Professional headline is required"),
  professionalSummary: z
    .string()
    .min(40, "Summary should be at least 40 characters")
    .max(700, "Summary should be 700 characters or fewer"),
});

export type SummaryFormValues = z.infer<typeof summarySchema>;
