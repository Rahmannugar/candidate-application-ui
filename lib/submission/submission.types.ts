import { BasicInfo } from "@/lib/basicInfo/basicInfo.types";
import { CoverLetter } from "@/lib/coverLetter/coverLetter.types";
import { Education } from "@/lib/education/education.types";
import { Experience } from "@/lib/experience/experience.types";
import { Language } from "@/lib/languages/languages.types";
import { ResumeAttachment } from "@/lib/resume/resume.types";
import { Skill } from "@/lib/skills/skills.types";
import { Summary } from "@/lib/summary/summary.types";

export type ApplicationPayload = {
  basicInfo: BasicInfo;
  summary: Summary;
  skills: Skill[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  resume: ResumeAttachment;
  coverLetter: CoverLetter;
};

export type SubmitApplicationResponse = {
  id: string;
  message: string;
  submittedAt: string;
};
