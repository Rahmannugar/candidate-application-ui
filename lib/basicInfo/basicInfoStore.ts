"use client";

import { create } from "zustand";
import { BasicInfo, BasicInfoField } from "./basicInfo.types";

const initialBasicInfo: BasicInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedInUrl: "",
  portfolioUrl: "",
  githubUrl: "",
};

type BasicInfoStore = {
  basicInfo: BasicInfo;
  updateBasicInfoField: (field: BasicInfoField, value: string) => void;
  resetBasicInfo: () => void;
};

export const useBasicInfoStore = create<BasicInfoStore>((set) => ({
  basicInfo: initialBasicInfo,
  updateBasicInfoField: (field, value) =>
    set((state) => ({
      basicInfo: {
        ...state.basicInfo,
        [field]: value,
      },
    })),
  resetBasicInfo: () => set({ basicInfo: initialBasicInfo }),
}));
