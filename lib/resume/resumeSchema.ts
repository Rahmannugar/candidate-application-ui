import { z } from "zod";
import { ResumeValidationResult } from "./resume.types";

export const acceptedResumeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const maxResumeFileSize = 5 * 1024 * 1024;

export const resumeSchema = z.object({
  fileName: z.string().min(1, "Resume is required"),
  fileSize: z.number().max(maxResumeFileSize, "Resume must be 5MB or smaller"),
});

export const validateResumeFile = (file: File): ResumeValidationResult => {
  if (!acceptedResumeTypes.includes(file.type)) {
    return {
      isValid: false,
      message: "Upload a PDF, DOC, or DOCX resume",
    };
  }

  if (file.size > maxResumeFileSize) {
    return {
      isValid: false,
      message: "Resume must be 5MB or smaller",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

export type ResumeFormValues = z.infer<typeof resumeSchema>;
