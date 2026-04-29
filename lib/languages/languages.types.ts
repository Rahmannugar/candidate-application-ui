export type LanguageProficiency =
  | "basic"
  | "conversational"
  | "professional"
  | "native";

export type Language = {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
};

export type LanguageInput = {
  name: string;
  proficiency: LanguageProficiency;
};
