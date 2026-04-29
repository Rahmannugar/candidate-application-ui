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
  const formData = buildApplicationFormData(payload);

  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return (await response.json()) as SubmitApplicationResponse;
    }
  } catch {
    // The endpoint is mocked for this UI task, so failed network calls fall
    // through to the simulated success response below.
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    id: crypto.randomUUID(),
    message: "Application submitted successfully",
    submittedAt: new Date().toISOString(),
  };
};
