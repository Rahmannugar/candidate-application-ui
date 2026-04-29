import BasicInfoForm from "@/components/basicInfo/BasicInfoForm";
import ThemeToggle from "@/components/common/ThemeToggle";
import CoverLetterForm from "@/components/coverLetter/CoverLetterForm";
import EducationForm from "@/components/education/EducationForm";
import ExperienceForm from "@/components/experience/ExperienceForm";
import LanguagesForm from "@/components/languages/LanguagesForm";
import ResumeUpload from "@/components/resume/ResumeUpload";
import SkillsForm from "@/components/skills/SkillsForm";
import SubmitApplicationButton from "@/components/submission/SubmitApplicationButton";
import SummaryForm from "@/components/summary/SummaryForm";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Staffing Co.</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-foreground">
              Candidate application
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Please share your details so the hiring team can review your
              profile and resume.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <div className="space-y-5">
          <BasicInfoForm />
          <SummaryForm />
          <SkillsForm />
          <ExperienceForm />
          <EducationForm />
          <LanguagesForm />
          <ResumeUpload />
          <CoverLetterForm />
          <SubmitApplicationButton />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
