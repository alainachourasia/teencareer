import { isEmpty, splitLines, type Resume } from "@/lib/resume/schema";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="border-b border-neutral-400 pb-0.5 text-xs font-bold uppercase tracking-wider">
        {title}
      </h2>
      <div className="mt-2 text-[13px] leading-snug">{children}</div>
    </section>
  );
}

export default function ResumePreview({ resume }: { resume: Resume }) {
  const contact = [resume.location, resume.phone, resume.email].filter(Boolean);
  const skills = resume.skills
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const awards = splitLines(resume.awards);
  const schoolLine = [
    resume.gradYear && `Expected graduation ${resume.gradYear}`,
    resume.gpa && `GPA ${resume.gpa}`,
  ].filter(Boolean);

  return (
    <article
      id="resume-preview"
      className="mx-auto aspect-[8.5/11] w-full max-w-[680px] bg-white p-8 text-black shadow-md print:aspect-auto print:max-w-none print:p-0 print:shadow-none"
    >
      {isEmpty(resume) ? (
        <p className="pt-24 text-center text-sm text-neutral-500">
          Your resume will appear here as you fill in the form.
        </p>
      ) : (
        <>
          <header className="text-center">
            <h1 className="text-2xl font-bold">{resume.fullName || "Your Name"}</h1>
            {contact.length > 0 && (
              <p className="mt-1 text-[13px] text-neutral-700">{contact.join("  |  ")}</p>
            )}
          </header>

          {resume.objective && <Section title="Objective">{resume.objective}</Section>}

          {(resume.school || schoolLine.length > 0) && (
            <Section title="Education">
              <p className="font-semibold">{resume.school}</p>
              {schoolLine.length > 0 && <p>{schoolLine.join("  |  ")}</p>}
              {resume.coursework && <p>Relevant classes: {resume.coursework}</p>}
            </Section>
          )}

          {resume.activities.length > 0 && (
            <Section title="Experience and Activities">
              <div className="space-y-3">
                {resume.activities.map((a) => (
                  <div key={a.id}>
                    <div className="flex justify-between gap-4">
                      <p className="font-semibold">
                        {[a.title, a.org].filter(Boolean).join(", ") || "Untitled"}
                      </p>
                      {a.dates && <p className="shrink-0 text-neutral-700">{a.dates}</p>}
                    </div>
                    <ul className="ml-4 list-disc">
                      {splitLines(a.bullets).map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {skills.length > 0 && <Section title="Skills">{skills.join("  •  ")}</Section>}

          {awards.length > 0 && (
            <Section title="Awards and Honors">
              <ul className="ml-4 list-disc">
                {awards.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </Section>
          )}

          {resume.references.length > 0 && (
            <Section title="References">
              <div className="grid grid-cols-2 gap-3">
                {resume.references.map((r) => (
                  <div key={r.id}>
                    <p className="font-semibold">{r.name}</p>
                    {r.relationship && <p>{r.relationship}</p>}
                    {r.contact && <p>{r.contact}</p>}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}
    </article>
  );
}
