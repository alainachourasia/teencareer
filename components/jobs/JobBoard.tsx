"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { LISTING_TYPE_LABELS, listings, type Listing, type ListingType } from "@/data/jobs";
import {
  citiesOf,
  defaultFilters,
  formatDate,
  isActive,
  matches,
  sortListings,
  type Filters,
} from "@/lib/jobs/filter";

function subscribeNever() {
  return () => {};
}

// Today's date in the visitor's time zone. Empty on the server so the page
// never shows a list that was filtered against the build date.
function useToday(): string {
  return useSyncExternalStore(
    subscribeNever,
    () => new Date().toLocaleDateString("en-CA"),
    () => "",
  );
}

const selectClass =
  "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200";

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-neutral-800">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        {children}
      </select>
    </label>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "blue" | "green" | "amber" }) {
  const tones = {
    neutral: "bg-neutral-100 text-neutral-700",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-900",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="blue">{LISTING_TYPE_LABELS[listing.type]}</Badge>
        <Badge tone={listing.paid ? "green" : "amber"}>{listing.paid ? "Paid" : "Unpaid"}</Badge>
        <Badge>Ages {listing.minAge}+</Badge>
        {listing.sample && <Badge tone="amber">Sample</Badge>}
        {listing.verified && <Badge tone="green">Verified</Badge>}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{listing.title}</h3>
      <p className="text-sm text-neutral-600">
        {listing.employer} · {listing.city}
      </p>
      <p className="mt-3 text-sm text-neutral-700">{listing.description}</p>
      <dl className="mt-3 grid gap-1 text-sm text-neutral-700 sm:grid-cols-2">
        <div>
          <dt className="inline font-medium">Hours: </dt>
          <dd className="inline">{listing.hours}</dd>
        </div>
        {listing.pay && (
          <div>
            <dt className="inline font-medium">Pay: </dt>
            <dd className="inline">{listing.pay}</dd>
          </div>
        )}
        {listing.deadline && (
          <div>
            <dt className="inline font-medium">Apply by: </dt>
            <dd className="inline">{formatDate(listing.deadline)}</dd>
          </div>
        )}
        <div>
          <dt className="inline font-medium">Last confirmed: </dt>
          <dd className="inline">{formatDate(listing.lastConfirmed)}</dd>
        </div>
      </dl>
      <div className="mt-4">
        {listing.applyUrl ? (
          <a
            href={listing.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            How to apply
          </a>
        ) : (
          <p className="text-sm italic text-neutral-500">{listing.applyNote}</p>
        )}
      </div>
    </article>
  );
}

export default function JobBoard() {
  const today = useToday();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const active = useMemo(
    () => (today ? listings.filter((l) => isActive(l, today)) : []),
    [today],
  );
  const cities = useMemo(() => citiesOf(active), [active]);
  const results = useMemo(
    () => sortListings(active.filter((l) => matches(l, filters))),
    [active, filters],
  );

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  if (!today) {
    return <p className="text-neutral-500">Loading listings…</p>;
  }

  const hasSample = active.some((l) => l.sample);

  return (
    <div>
      {hasSample && (
        <p className="mb-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <strong>These are sample listings.</strong> They show how the board will work and are not
          real openings. Verified Massachusetts listings are coming.
        </p>
      )}

      <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="My age" value={String(filters.age)} onChange={(v) => set("age", Number(v))}>
          {[15, 16, 17, 18].map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </Select>
        <Select
          label="Type"
          value={filters.type}
          onChange={(v) => set("type", v as ListingType | "any")}
        >
          <option value="any">All types</option>
          {(Object.keys(LISTING_TYPE_LABELS) as ListingType[]).map((type) => (
            <option key={type} value={type}>
              {LISTING_TYPE_LABELS[type]}
            </option>
          ))}
        </Select>
        <Select
          label="Pay"
          value={filters.pay}
          onChange={(v) => set("pay", v as Filters["pay"])}
        >
          <option value="any">Paid or unpaid</option>
          <option value="paid">Paid only</option>
          <option value="unpaid">Unpaid only</option>
        </Select>
        <Select label="Massachusetts city" value={filters.city} onChange={(v) => set("city", v)}>
          <option value="any">Anywhere in Massachusetts</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </div>

      <p className="mb-3 mt-5 text-sm text-neutral-600" aria-live="polite">
        {results.length} {results.length === 1 ? "listing" : "listings"} found
      </p>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
          No listings match these filters. Try a different type or city.
        </p>
      ) : (
        <div className="space-y-4">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-neutral-600">
        Under 18? You need a youth work permit before you start, and there are limits on hours and
        jobs. See the{" "}
        <Link href="/jobs-guide" className="text-blue-700 underline">
          Massachusetts work rules
        </Link>
        . Never pay an employer for a job, training, or equipment.
      </p>
    </div>
  );
}
