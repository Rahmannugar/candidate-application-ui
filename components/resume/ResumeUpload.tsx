"use client";

import { FileArrowUp, Trash } from "@phosphor-icons/react";
import { ChangeEvent, useRef, useState } from "react";
import { validateResumeFile } from "@/lib/resume/resumeSchema";
import { useResumeStore } from "@/lib/resume/resumeStore";

const formatFileSize = (fileSize: number) => {
  if (fileSize === 0) {
    return "0 KB";
  }

  const sizeInKb = fileSize / 1024;

  if (sizeInKb < 1024) {
    return `${Math.round(sizeInKb)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(1)} MB`;
};

export default function ResumeUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resume = useResumeStore((state) => state.resume);
  const setResumeFile = useResumeStore((state) => state.setResumeFile);
  const clearResumeFile = useResumeStore((state) => state.clearResumeFile);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const validationResult = validateResumeFile(selectedFile);

    if (!validationResult.isValid) {
      setErrorMessage(validationResult.message);
      event.target.value = "";
      return;
    }

    setErrorMessage("");
    setResumeFile(selectedFile);
  };

  const handleRemoveFile = () => {
    clearResumeFile();
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasResume = Boolean(resume.file);

  return (
    <section className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">Resume</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Attach your resume as a PDF, DOC, or DOCX file.
        </p>
      </div>

      <label
        htmlFor="resumeFile"
        className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-background px-4 py-8 text-center transition hover:border-primary hover:bg-muted"
      >
        <FileArrowUp size={32} className="text-primary" />
        <span className="mt-3 text-sm font-semibold text-foreground">
          Click to upload resume
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          PDF, DOC, or DOCX up to 5MB
        </span>
        <input
          ref={fileInputRef}
          id="resumeFile"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>

      {errorMessage ? (
        <p className="mt-2 text-xs text-danger">{errorMessage}</p>
      ) : null}

      {hasResume ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {resume.fileName}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatFileSize(resume.fileSize)}
            </p>
          </div>

          <button
            type="button"
            aria-label="Remove resume"
            onClick={handleRemoveFile}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <Trash size={17} />
          </button>
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-dashed border-border bg-background px-4 py-5 text-sm text-muted-foreground">
          No resume attached yet.
        </div>
      )}
    </section>
  );
}
