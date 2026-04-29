export type ResumeAttachment = {
  file: File | null;
  fileName: string;
  fileSize: number;
};

export type ResumeValidationResult = {
  isValid: boolean;
  message: string;
};
