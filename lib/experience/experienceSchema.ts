import { z } from "zod";

export const experienceInputSchema = z
  .object({
    role: z.string().trim().min(2, "Role is required"),
    company: z.string().trim().min(2, "Company is required"),
    location: z.string().trim().min(2, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string(),
    isCurrentRole: z.boolean(),
    description: z
      .string()
      .trim()
      .max(900, "Description should be 900 characters or fewer"),
  })
  .refine((value) => value.isCurrentRole || value.endDate.length > 0, {
    message: "End date is required unless this is your current role",
    path: ["endDate"],
  })
  .refine(
    (value) => {
      if (!value.startDate || !value.endDate || value.isCurrentRole) {
        return true;
      }

      return new Date(value.endDate) >= new Date(value.startDate);
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    },
  );

export const experienceSchema = z.object({
  experience: z.array(
    experienceInputSchema.extend({
      id: z.string(),
    }),
  ),
});

export type ExperienceInputValues = z.infer<typeof experienceInputSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
