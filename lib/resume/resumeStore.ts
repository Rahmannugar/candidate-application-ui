"use client";

import { create } from "zustand";
import { ResumeAttachment } from "./resume.types";

const initialResumeAttachment: ResumeAttachment = {
  file: null,
  fileName: "",
  fileSize: 0,
};

type ResumeStore = {
  resume: ResumeAttachment;
  setResumeFile: (file: File) => void;
  clearResumeFile: () => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResumeAttachment,
  setResumeFile: (file) =>
    set({
      resume: {
        file,
        fileName: file.name,
        fileSize: file.size,
      },
    }),
  clearResumeFile: () => set({ resume: initialResumeAttachment }),
}));
