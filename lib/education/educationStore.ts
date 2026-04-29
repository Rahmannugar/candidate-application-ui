"use client";

import { create } from "zustand";
import { Education, EducationInput } from "./education.types";

const createEducationId = () => crypto.randomUUID();

type EducationStore = {
  education: Education[];
  addEducation: (education: EducationInput) => void;
  removeEducation: (educationId: string) => void;
  resetEducation: () => void;
};

export const useEducationStore = create<EducationStore>((set) => ({
  education: [],
  addEducation: (education) =>
    set((state) => ({
      education: [
        ...state.education,
        {
          id: createEducationId(),
          ...education,
        },
      ],
    })),
  removeEducation: (educationId) =>
    set((state) => ({
      education: state.education.filter((item) => item.id !== educationId),
    })),
  resetEducation: () => set({ education: [] }),
}));
