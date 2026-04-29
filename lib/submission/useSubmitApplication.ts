"use client";

import { useMutation } from "@tanstack/react-query";
import { submitApplication } from "./submissionService";
import { ApplicationPayload } from "./submission.types";

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: (payload: ApplicationPayload) => submitApplication(payload),
  });
};
