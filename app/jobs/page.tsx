import type { Metadata } from "next";
import JobBoard from "@/components/jobs/JobBoard";

export const metadata: Metadata = {
  title: "Teen Jobs and Internships | TeenCareer",
  description: "Jobs and internships for teens ages 15 to 18 in Massachusetts.",
};

export default function JobsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Jobs and internships in Massachusetts</h1>
      <p className="mb-6 mt-2 max-w-2xl text-neutral-600">
        Openings for teens ages 15 to 18. Pick your age to see only what you can apply for.
        Listings that haven&apos;t been confirmed in 60 days are hidden.
      </p>
      <JobBoard />
    </div>
  );
}
