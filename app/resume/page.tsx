import type { Metadata } from "next";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

export const metadata: Metadata = {
  title: "First Resume Builder | TeenCareer",
  description: "Build a one-page resume with no job experience, in a few minutes.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold print:hidden">Build your first resume</h1>
      <p className="mb-6 mt-2 max-w-2xl text-neutral-600 print:hidden">
        Answer a few questions and get a clean one-page resume. You don&apos;t need job experience:
        school, clubs, volunteering, and chores all count.
      </p>
      <ResumeBuilder />
    </div>
  );
}
