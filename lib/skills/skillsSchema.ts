import { z } from "zod";

export const skillNameSchema = z
  .string()
  .trim()
  .min(2, "Skill should be at least 2 characters")
  .max(40, "Skill should be 40 characters or fewer");

export const skillsSchema = z.object({
  skills: z
    .array(
      z.object({
        id: z.string(),
        name: skillNameSchema,
      }),
    )
    .min(1, "Add at least one skill"),
});

export type SkillsFormValues = z.infer<typeof skillsSchema>;
