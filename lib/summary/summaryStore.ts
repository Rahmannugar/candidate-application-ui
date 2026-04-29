"use client";

import { create } from "zustand";
import { Summary, SummaryField } from "./summary.types";

const initialSummary: Summary = {
  headline: "",
  professionalSummary: "",
};

type SummaryStore = {
  summary: Summary;
  updateSummaryField: (field: SummaryField, value: string) => void;
  resetSummary: () => void;
};

export const useSummaryStore = create<SummaryStore>((set) => ({
  summary: initialSummary,
  updateSummaryField: (field, value) =>
    set((state) => ({
      summary: {
        ...state.summary,
        [field]: value,
      },
    })),
  resetSummary: () => set({ summary: initialSummary }),
}));
