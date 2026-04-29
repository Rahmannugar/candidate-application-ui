"use client";

import { create } from "zustand";
import { Language, LanguageInput } from "./languages.types";

const createLanguageId = () => crypto.randomUUID();

type LanguagesStore = {
  languages: Language[];
  addLanguage: (language: LanguageInput) => void;
  removeLanguage: (languageId: string) => void;
  resetLanguages: () => void;
};

export const useLanguagesStore = create<LanguagesStore>((set) => ({
  languages: [],
  addLanguage: (language) =>
    set((state) => {
      const languageName = language.name.trim();
      const languageExists = state.languages.some(
        (item) => item.name.toLowerCase() === languageName.toLowerCase(),
      );

      if (!languageName || languageExists) {
        return state;
      }

      return {
        languages: [
          ...state.languages,
          {
            id: createLanguageId(),
            name: languageName,
            proficiency: language.proficiency,
          },
        ],
      };
    }),
  removeLanguage: (languageId) =>
    set((state) => ({
      languages: state.languages.filter((language) => language.id !== languageId),
    })),
  resetLanguages: () => set({ languages: [] }),
}));
