import type { Metadata } from "next";
import AgeGuide from "@/components/guide/AgeGuide";
import { HOTLINE, LAST_CHECKED, SOURCES } from "@/data/massachusetts-rules";

export const metadata: Metadata = {
  title: "Massachusetts Teen Work Rules | TeenCareer",
  description:
    "Plain-language guide to work hours, work permits, and banned jobs for teens in Massachusetts.",
};

export default function JobsGuidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold">What jobs can I do in Massachusetts?</h1>
      <p className="mb-6 mt-2 text-neutral-600">
        The rules depend on your age. Pick yours to see your hours, the work permit, and jobs that
        are off limits.
      </p>

      <AgeGuide />

      <section className="mt-10 rounded-2xl bg-neutral-100 p-5 text-sm text-neutral-700">
        <h2 className="font-semibold text-neutral-900">Questions or a problem at work?</h2>
        <p className="mt-1">
          Call the {HOTLINE.label} at {HOTLINE.phone} ({HOTLINE.hours}). Never pay an employer for
          a job, training, or equipment.
        </p>
        <h2 className="mt-4 font-semibold text-neutral-900">Sources</h2>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} className="text-blue-700 underline" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-neutral-500">
          Last checked {LAST_CHECKED}. This is a summary, not legal advice, and laws change. Check
          the sources above for the latest.
        </p>
      </section>
    </div>
  );
}
