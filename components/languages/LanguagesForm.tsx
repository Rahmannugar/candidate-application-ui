"use client";

import { Plus, X } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { languageInputSchema } from "@/lib/languages/languagesSchema";
import {
  LanguageProficiency,
  LanguageInput,
} from "@/lib/languages/languages.types";
import { useLanguagesStore } from "@/lib/languages/languagesStore";

const proficiencyLabels: Record<LanguageProficiency, string> = {
  basic: "Basic",
  conversational: "Conversational",
  professional: "Professional",
  native: "Native",
};

const proficiencyOptions: LanguageProficiency[] = [
  "basic",
  "conversational",
  "professional",
  "native",
];

const initialLanguageInput: LanguageInput = {
  name: "",
  proficiency: "professional",
};

export default function LanguagesForm() {
  const languages = useLanguagesStore((state) => state.languages);
  const addLanguage = useLanguagesStore((state) => state.addLanguage);
  const removeLanguage = useLanguagesStore((state) => state.removeLanguage);
  const [languageInput, setLanguageInput] =
    useState<LanguageInput>(initialLanguageInput);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLanguageInput((currentInput) => ({
      ...currentInput,
      name: event.target.value,
    }));
    setErrorMessage("");
  };

  const handleProficiencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguageInput((currentInput) => ({
      ...currentInput,
      proficiency: event.target.value as LanguageProficiency,
    }));
    setErrorMessage("");
  };

  const handleAddLanguage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedLanguage = languageInputSchema.safeParse(languageInput);

    if (!parsedLanguage.success) {
      setErrorMessage(
        parsedLanguage.error.issues[0]?.message ?? "Invalid language",
      );
      return;
    }

    const languageExists = languages.some(
      (language) =>
        language.name.toLowerCase() ===
        parsedLanguage.data.name.trim().toLowerCase(),
    );

    if (languageExists) {
      setErrorMessage("Language has already been added");
      return;
    }

    addLanguage(parsedLanguage.data);
    setLanguageInput(initialLanguageInput);
  };

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Languages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Include languages that may help with the role or client work.
        </p>
      </div>

      <form
        className="grid gap-3 md:grid-cols-[1fr_220px_auto]"
        onSubmit={handleAddLanguage}
      >
        <label htmlFor="languageName">
          <span className="sr-only">Language</span>
          <input
            id="languageName"
            type="text"
            value={languageInput.name}
            onChange={handleNameChange}
            placeholder="English, Spanish, French"
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label htmlFor="languageProficiency">
          <span className="sr-only">Proficiency</span>
          <select
            id="languageProficiency"
            value={languageInput.proficiency}
            onChange={handleProficiencyChange}
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {proficiencyOptions.map((proficiency) => (
              <option key={proficiency} value={proficiency}>
                {proficiencyLabels[proficiency]}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} weight="bold" />
          Add
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-2 text-xs text-danger">{errorMessage}</p>
      ) : null}

      {languages.length > 0 ? (
        <div className="mt-4 space-y-2">
          {languages.map((language) => {
            const handleRemoveLanguage = () => {
              removeLanguage(language.id);
            };

            return (
              <div
                key={language.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {language.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {proficiencyLabels[language.proficiency]}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={`Remove ${language.name}`}
                  onClick={handleRemoveLanguage}
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
          No languages added yet.
        </div>
      )}
    </section>
  );
}
