import Link from "next/link";

const comingSoon = [
  "Interview practice with sample answers",
  "Job and internship matches for ages 15 to 18",
  "Scripts for calling and emailing local businesses",
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Your first job starts with a first resume.
      </h1>
      <p className="mt-4 text-lg text-neutral-600">
        TeenCareer helps students ages 15 to 18 get ready for their first job or internship. No
        experience needed.
      </p>
      <Link
        href="/resume"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Build my resume
      </Link>
      <p className="mt-3 text-sm text-neutral-500">
        Free. No account. Your information stays in your browser.
      </p>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">Coming soon</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-600">
          {comingSoon.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
