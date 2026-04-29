import { z } from "zod";

export const educationInputSchema = z
  .object({
    school: z.string().trim().min(2, "School is required"),
    degree: z.string().trim().min(2, "Degree or program is required"),
    fieldOfStudy: z.string().trim().min(2, "Field of study is required"),
    location: z.string().trim().min(2, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string(),
    isCurrent: z.boolean(),
    notes: z.string().trim().max(500, "Notes should be 500 characters or fewer"),
  })
  .refine((value) => value.isCurrent || value.endDate.length > 0, {
    message: "End date is required unless you are still enrolled",
    path: ["endDate"],
  })
  .refine(
    (value) => {
      if (!value.startDate || !value.endDate || value.isCurrent) {
        return true;
      }

      return new Date(value.endDate) >= new Date(value.startDate);
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    },
  );

export const educationSchema = z.object({
  education: z.array(
    educationInputSchema.extend({
      id: z.string(),
    }),
  ),
});

export type EducationInputValues = z.infer<typeof educationInputSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
