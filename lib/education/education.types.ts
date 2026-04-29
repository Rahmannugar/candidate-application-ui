export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  notes: string;
};

export type EducationInput = Omit<Education, "id">;
