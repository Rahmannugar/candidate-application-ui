export type BasicInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  portfolioUrl: string;
  githubUrl: string;
};

export type BasicInfoField = keyof BasicInfo;
