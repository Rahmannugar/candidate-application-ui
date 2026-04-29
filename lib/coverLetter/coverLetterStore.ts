"use client";

import { create } from "zustand";
import { CoverLetter } from "./coverLetter.types";

const initialCoverLetter: CoverLetter = {
  content: "",
};

type CoverLetterStore = {
  coverLetter: CoverLetter;
  updateCoverLetter: (content: string) => void;
  resetCoverLetter: () => void;
};

export const useCoverLetterStore = create<CoverLetterStore>((set) => ({
  coverLetter: initialCoverLetter,
  updateCoverLetter: (content) =>
    set({
      coverLetter: {
        content,
      },
    }),
  resetCoverLetter: () => set({ coverLetter: initialCoverLetter }),
}));
