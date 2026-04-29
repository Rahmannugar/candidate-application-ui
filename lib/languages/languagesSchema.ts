import { z } from "zod";

export const languageProficiencySchema = z.enum([
  "basic",
  "conversational",
  "professional",
  "native",
]);

export const languageInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Language should be at least 2 characters")
    .max(40, "Language should be 40 characters or fewer"),
  proficiency: languageProficiencySchema,
});

export const languagesSchema = z.object({
  languages: z.array(
    z.object({
      id: z.string(),
      name: languageInputSchema.shape.name,
      proficiency: languageProficiencySchema,
    }),
  ),
});

export type LanguageInputValues = z.infer<typeof languageInputSchema>;
export type LanguagesFormValues = z.infer<typeof languagesSchema>;
