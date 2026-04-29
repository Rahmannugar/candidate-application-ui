"use client";

import { Plus, X } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { skillNameSchema } from "@/lib/skills/skillsSchema";
import { useSkillsStore } from "@/lib/skills/skillsStore";

export default function SkillsForm() {
  const skills = useSkillsStore((state) => state.skills);
  const addSkill = useSkillsStore((state) => state.addSkill);
  const removeSkill = useSkillsStore((state) => state.removeSkill);
  const [skillName, setSkillName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSkillName(event.target.value);
    setErrorMessage("");
  };

  const handleAddSkill = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedSkill = skillNameSchema.safeParse(skillName);

    if (!parsedSkill.success) {
      setErrorMessage(parsedSkill.error.issues[0]?.message ?? "Invalid skill");
      return;
    }

    const skillExists = skills.some(
      (skill) =>
        skill.name.toLowerCase() === parsedSkill.data.trim().toLowerCase(),
    );

    if (skillExists) {
      setErrorMessage("Skill has already been added");
      return;
    }

    addSkill(parsedSkill.data);
    setSkillName("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add the tools, technologies, and strengths most relevant to the role.
        </p>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleAddSkill}>
        <label className="flex-1" htmlFor="skillName">
          <span className="sr-only">Skill name</span>
          <input
            id="skillName"
            type="text"
            value={skillName}
            onChange={handleSkillNameChange}
            onKeyDown={handleInputKeyDown}
            placeholder="React, project management, sales strategy"
            className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={18} weight="bold" />
          Add skill
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-2 text-xs text-danger">{errorMessage}</p>
      ) : null}

      {skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => {
            const handleRemoveSkill = () => {
              removeSkill(skill.id);
            };

            return (
              <span
                key={skill.id}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground"
              >
                {skill.name}
                <button
                  type="button"
                  aria-label={`Remove ${skill.name}`}
                  onClick={handleRemoveSkill}
                  className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X size={13} weight="bold" />
                </button>
              </span>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
          No skills added yet.
        </div>
      )}
    </section>
  );
}
