"use client";

import { useState } from "react";
import { activityIdeas, skillIdeas } from "@/lib/resume/prompts";
import { newId, type Activity, type Reference, type Resume } from "@/lib/resume/schema";
import { useResume } from "@/lib/resume/useResume";
import { TextArea, TextField } from "./fields";
import ResumePreview from "./ResumePreview";

const steps = ["About you", "School", "Experience", "Skills", "References"] as const;

const buttonClass =
  "rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40";
const primaryButton = `${buttonClass} bg-blue-600 text-white hover:bg-blue-700`;
const secondaryButton = `${buttonClass} border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50`;

export default function ResumeBuilder() {
  const { resume, setResume, clearResume } = useResume();
  const [step, setStep] = useState(0);

  function update<K extends keyof Resume>(key: K, value: Resume[K]) {
    setResume({ ...resume, [key]: value });
  }

  function updateActivity(id: string, patch: Partial<Activity>) {
    update(
      "activities",
      resume.activities.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );
  }

  function addActivity(activity: Partial<Activity> = {}) {
    update("activities", [
      ...resume.activities,
      { id: newId(), title: "", org: "", dates: "", bullets: "", ...activity },
    ]);
  }

  function updateReference(id: string, patch: Partial<Reference>) {
    update(
      "references",
      resume.references.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  function addSkill(skill: string) {
    const current = resume.skills.trim();
    if (current.toLowerCase().includes(skill.toLowerCase())) return;
    update("skills", current ? `${current}, ${skill}` : skill);
  }

  function startOver() {
    if (window.confirm("Clear everything and start a new resume?")) {
      clearResume();
      setStep(0);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="print:hidden">
        <ol className="mb-6 flex flex-wrap gap-2" aria-label="Resume steps">
          {steps.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                className={`rounded-full px-3 py-1 text-sm ${
                  i === step
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                }`}
              >
                {i + 1}. {name}
              </button>
            </li>
          ))}
        </ol>

        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5">
          {step === 0 && (
            <>
              <TextField
                label="Full name"
                value={resume.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                autoComplete="name"
              />
              <TextField
                label="Email"
                type="email"
                value={resume.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                hint="Use a professional-sounding address, like first.last@..."
              />
              <TextField
                label="Phone"
                type="tel"
                value={resume.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
              />
              <TextField
                label="City and state"
                value={resume.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Springfield, IL"
                hint="Don't put your home address on a resume."
              />
              <TextArea
                label="Objective (optional)"
                rows={3}
                value={resume.objective}
                onChange={(e) => update("objective", e.target.value)}
                placeholder="A responsible high school student looking for a part-time job where I can learn and help customers."
              />
            </>
          )}

          {step === 1 && (
            <>
              <TextField
                label="School"
                value={resume.school}
                onChange={(e) => update("school", e.target.value)}
              />
              <TextField
                label="Expected graduation year"
                value={resume.gradYear}
                onChange={(e) => update("gradYear", e.target.value)}
                inputMode="numeric"
                maxLength={4}
              />
              <TextField
                label="GPA (optional)"
                value={resume.gpa}
                onChange={(e) => update("gpa", e.target.value)}
                hint="Only include it if you're proud of it."
              />
              <TextField
                label="Relevant classes (optional)"
                value={resume.coursework}
                onChange={(e) => update("coursework", e.target.value)}
                placeholder="Business, Spanish, Computer Science"
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-neutral-600">
                No job yet? That&apos;s fine. Tap an idea below to add something you already do,
                then edit it to fit you.
              </p>
              <div className="flex flex-wrap gap-2">
                {activityIdeas.map((idea) => (
                  <button
                    key={idea.label}
                    type="button"
                    onClick={() =>
                      addActivity({ title: idea.title, org: idea.org, bullets: idea.bullets })
                    }
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 hover:bg-blue-100"
                  >
                    + {idea.label}
                  </button>
                ))}
              </div>

              {resume.activities.map((a) => (
                <div key={a.id} className="space-y-3 rounded-xl border border-neutral-200 p-4">
                  <TextField
                    label="Role"
                    value={a.title}
                    onChange={(e) => updateActivity(a.id, { title: e.target.value })}
                  />
                  <TextField
                    label="Where (organization, team, or who you helped)"
                    value={a.org}
                    onChange={(e) => updateActivity(a.id, { org: e.target.value })}
                  />
                  <TextField
                    label="Dates"
                    value={a.dates}
                    onChange={(e) => updateActivity(a.id, { dates: e.target.value })}
                    placeholder="Summer 2025 or 2024 to present"
                  />
                  <TextArea
                    label="What you did"
                    rows={4}
                    value={a.bullets}
                    onChange={(e) => updateActivity(a.id, { bullets: e.target.value })}
                    hint="One point per line. Start with an action word, like helped, organized or served."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "activities",
                        resume.activities.filter((x) => x.id !== a.id),
                      )
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => addActivity()} className={secondaryButton}>
                + Add a blank entry
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <TextArea
                label="Skills"
                rows={3}
                value={resume.skills}
                onChange={(e) => update("skills", e.target.value)}
                hint="Separate with commas."
              />
              <div className="flex flex-wrap gap-2">
                {skillIdeas.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 hover:bg-blue-100"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
              <TextArea
                label="Awards and honors (optional)"
                rows={3}
                value={resume.awards}
                onChange={(e) => update("awards", e.target.value)}
                hint="One per line. Honor roll, perfect attendance, team awards."
              />
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-sm text-neutral-600">
                A teacher, coach, or neighbor you&apos;ve worked for can be a reference. Ask them
                first, and avoid using family members.
              </p>
              {resume.references.map((r) => (
                <div key={r.id} className="space-y-3 rounded-xl border border-neutral-200 p-4">
                  <TextField
                    label="Name"
                    value={r.name}
                    onChange={(e) => updateReference(r.id, { name: e.target.value })}
                  />
                  <TextField
                    label="How they know you"
                    value={r.relationship}
                    onChange={(e) => updateReference(r.id, { relationship: e.target.value })}
                    placeholder="Soccer coach"
                  />
                  <TextField
                    label="Email or phone"
                    value={r.contact}
                    onChange={(e) => updateReference(r.id, { contact: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "references",
                        resume.references.filter((x) => x.id !== r.id),
                      )
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {resume.references.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    update("references", [
                      ...resume.references,
                      { id: newId(), name: "", relationship: "", contact: "" },
                    ])
                  }
                  className={secondaryButton}
                >
                  + Add a reference
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className={secondaryButton}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === steps.length - 1}
              className={primaryButton}
            >
              Next
            </button>
          </div>
          <button
            type="button"
            onClick={startOver}
            className="text-sm text-neutral-500 hover:underline"
          >
            Start over
          </button>
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          Saved automatically in this browser only. Nothing is sent to us.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between print:hidden">
          <h2 className="text-sm font-semibold text-neutral-700">Preview</h2>
          <button type="button" onClick={() => window.print()} className={primaryButton}>
            Print or save as PDF
          </button>
        </div>
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
}
