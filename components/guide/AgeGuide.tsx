"use client";

import { useState } from "react";
import {
  AGE_BANDS,
  BABYSITTING_NOTE,
  BANNED_UNDER_16_EXTRA,
  BANNED_UNDER_18,
  HOURS,
  PERMIT,
  SUPERVISION_NOTE,
  type AgeBand,
} from "@/data/massachusetts-rules";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-neutral-700">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AgeGuide() {
  const [age, setAge] = useState<AgeBand>("15");

  return (
    <div>
      <div role="group" aria-label="Pick your age" className="flex flex-wrap gap-2">
        {AGE_BANDS.map((band) => (
          <button
            key={band.id}
            type="button"
            onClick={() => setAge(band.id)}
            aria-pressed={age === band.id}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              age === band.id
                ? "bg-blue-600 text-white"
                : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
            }`}
          >
            {band.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {age === "18" ? (
          <Card title="At 18, the youth rules end">
            <p>
              The Massachusetts youth rules on this page apply to workers under 18. Once you turn
              18, the hours limits, banned-job lists, and youth work permit no longer apply to you.
            </p>
            <p>Normal wage and workplace laws still protect you at any age.</p>
          </Card>
        ) : (
          <>
            <Card title="When you can work">
              {HOURS[age].map((group) => (
                <div key={group.title}>
                  <h3 className="font-medium text-neutral-900">{group.title}</h3>
                  <List items={group.items} />
                </div>
              ))}
              <p className="rounded-lg bg-amber-50 p-3 text-amber-900">{SUPERVISION_NOTE}</p>
            </Card>

            <Card title="Work permit">
              <p>{PERMIT.summary}</p>
              <div>
                <h3 className="font-medium text-neutral-900">What you need</h3>
                <List
                  items={
                    age === "15"
                      ? PERMIT.needs
                      : PERMIT.needs.filter((n) => !n.startsWith("If you are 15 or younger"))
                  }
                />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">How to get it</h3>
                <ol className="list-decimal space-y-1 pl-5">
                  {(age === "15"
                    ? PERMIT.steps
                    : PERMIT.steps.filter((s) => !s.startsWith("If you are 15 or younger"))
                  ).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <p>{PERMIT.validity}</p>
            </Card>

            <Card title="Jobs you can't do">
              <div>
                <h3 className="font-medium text-neutral-900">Banned for everyone under 18</h3>
                <List items={BANNED_UNDER_18} />
              </div>
              {age === "15" && (
                <div>
                  <h3 className="font-medium text-neutral-900">Also banned under 16</h3>
                  <List items={BANNED_UNDER_16_EXTRA} />
                </div>
              )}
              <p>{BABYSITTING_NOTE}</p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
