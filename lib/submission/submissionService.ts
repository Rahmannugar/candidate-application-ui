import {
  ApplicationPayload,
  SubmitApplicationResponse,
} from "./submission.types";

// Mock URL.
const API_URL = "https://25thandstaffing.com/api";

const appendJson = (formData: FormData, key: string, value: unknown) => {
  formData.append(key, JSON.stringify(value));
};

const buildApplicationFormData = (payload: ApplicationPayload) => {
  const formData = new FormData();

  appendJson(formData, "basicInfo", payload.basicInfo);
  appendJson(formData, "summary", payload.summary);
  appendJson(formData, "skills", payload.skills);
  appendJson(formData, "languages", payload.languages);
  appendJson(formData, "experience", payload.experience);
  appendJson(formData, "education", payload.education);
  appendJson(formData, "coverLetter", payload.coverLetter);

  if (payload.resume.file) {
    formData.append("resume", payload.resume.file);
  }

  return formData;
};

export const submitApplication = async (
  payload: ApplicationPayload,
): Promise<SubmitApplicationResponse> => {
  buildApplicationFormData(payload);

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    id: crypto.randomUUID(),
    message: `Application queued for ${API_URL}/applications`,
    submittedAt: new Date().toISOString(),
  };
};
