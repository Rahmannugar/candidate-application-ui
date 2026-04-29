"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  BasicInfoFormValues,
  basicInfoSchema,
} from "@/lib/basicInfo/basicInfoSchema";
import { BasicInfoField } from "@/lib/basicInfo/basicInfo.types";
import { useBasicInfoStore } from "@/lib/basicInfo/basicInfoStore";

type BasicInfoInput = {
  name: BasicInfoField;
  label: string;
  placeholder: string;
  type?: string;
};

const basicInfoInputs: BasicInfoInput[] = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Abdulrahmon Adenuga",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "adenuga@example.com",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "+1 555 012 4421",
    type: "tel",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Austin, TX",
  },
  {
    name: "linkedInUrl",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/in/rahmannugar",
    type: "url",
  },
  {
    name: "portfolioUrl",
    label: "Portfolio URL",
    placeholder: "https://rahmannugar.vercel.app",
    type: "url",
  },
  {
    name: "githubUrl",
    label: "GitHub URL",
    placeholder: "https://github.com/rahmannugar",
    type: "url",
  },
];

export default function BasicInfoForm() {
  const basicInfo = useBasicInfoStore((state) => state.basicInfo);
  const updateBasicInfoField = useBasicInfoStore(
    (state) => state.updateBasicInfoField,
  );

  const {
    control,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    mode: "onBlur",
    defaultValues: basicInfo,
  });

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Basic info</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact details the hiring team will use for this application.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {basicInfoInputs.map((input) => (
          <Controller
            key={input.name}
            name={input.name}
            control={control}
            render={({ field }) => {
              const fieldError = errors[input.name]?.message;

              const handleChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ) => {
                field.onChange(event);
                updateBasicInfoField(input.name, event.target.value);
              };

              return (
                <label className="block" htmlFor={input.name}>
                  <span className="text-sm font-medium text-foreground">
                    {input.label}
                  </span>
                  <input
                    {...field}
                    id={input.name}
                    type={input.type ?? "text"}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    className="mt-2 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {fieldError ? (
                    <span className="mt-1 block text-xs text-danger">
                      {fieldError}
                    </span>
                  ) : null}
                </label>
              );
            }}
          />
        ))}
      </div>
    </section>
  );
}
