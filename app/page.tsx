import BasicInfoForm from "@/components/basicInfo/BasicInfoForm";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            25th & Staffing
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-foreground">
            Candidate application
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Share your details so the hiring team can review your profile and
            resume.
          </p>
        </div>

        <BasicInfoForm />
      </div>
    </main>
  );
};

export default HomePage;
