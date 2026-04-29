export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
};

export type ExperienceInput = Omit<Experience, "id">;
