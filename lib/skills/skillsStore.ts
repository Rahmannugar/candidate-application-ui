"use client";

import { create } from "zustand";
import { Skill } from "./skills.types";

const createSkillId = () => crypto.randomUUID();

type SkillsStore = {
  skills: Skill[];
  addSkill: (name: string) => void;
  removeSkill: (skillId: string) => void;
  resetSkills: () => void;
};

export const useSkillsStore = create<SkillsStore>((set) => ({
  skills: [],
  addSkill: (name) =>
    set((state) => {
      const trimmedName = name.trim();
      const skillExists = state.skills.some(
        (skill) => skill.name.toLowerCase() === trimmedName.toLowerCase(),
      );

      if (!trimmedName || skillExists) {
        return state;
      }

      return {
        skills: [
          ...state.skills,
          {
            id: createSkillId(),
            name: trimmedName,
          },
        ],
      };
    }),
  removeSkill: (skillId) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== skillId),
    })),
  resetSkills: () => set({ skills: [] }),
}));
