import { z } from "zod";

export const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  location: z.string().min(2, "Location is required"),
  linkedInUrl: z
    .url("Enter a valid LinkedIn URL")
    .includes("linkedin.com", { message: "LinkedIn URL must be valid" }),
  portfolioUrl: z
    .url("Enter a valid portfolio URL")
    .or(z.literal("")),
  githubUrl: z.url("Enter a valid GitHub URL").or(z.literal("")),
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
