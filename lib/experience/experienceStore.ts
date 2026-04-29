"use client";

import { create } from "zustand";
import { Experience, ExperienceInput } from "./experience.types";

const createExperienceId = () => crypto.randomUUID();

type ExperienceStore = {
  experience: Experience[];
  addExperience: (experience: ExperienceInput) => void;
  removeExperience: (experienceId: string) => void;
  resetExperience: () => void;
};

export const useExperienceStore = create<ExperienceStore>((set) => ({
  experience: [],
  addExperience: (experience) =>
    set((state) => ({
      experience: [
        ...state.experience,
        {
          id: createExperienceId(),
          ...experience,
        },
      ],
    })),
  removeExperience: (experienceId) =>
    set((state) => ({
      experience: state.experience.filter((item) => item.id !== experienceId),
    })),
  resetExperience: () => set({ experience: [] }),
}));
