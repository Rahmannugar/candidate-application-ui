import { z } from "zod";

export const coverLetterSchema = z.object({
  content: z
    .string()
    .trim()
    .min(80, "Cover letter should be at least 80 characters")
    .max(2000, "Cover letter should be 2000 characters or fewer"),
});

export type CoverLetterFormValues = z.infer<typeof coverLetterSchema>;
