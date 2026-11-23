import type { Listing, ListingType } from "@/data/jobs";

export const STALE_AFTER_DAYS = 60;

export type Filters = {
  age: number;
  type: ListingType | "any";
  pay: "any" | "paid" | "unpaid";
  city: string;
};

export const defaultFilters: Filters = { age: 15, type: "any", pay: "any", city: "any" };

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

/** Hide listings whose deadline passed or that haven't been confirmed recently. */
export function isActive(listing: Listing, today: string): boolean {
  if (listing.deadline && listing.deadline < today) return false;
  return daysBetween(listing.lastConfirmed, today) <= STALE_AFTER_DAYS;
}

export function matches(listing: Listing, filters: Filters): boolean {
  if (listing.minAge > filters.age) return false;
  if (filters.type !== "any" && listing.type !== filters.type) return false;
  if (filters.pay === "paid" && !listing.paid) return false;
  if (filters.pay === "unpaid" && listing.paid) return false;
  if (filters.city !== "any" && listing.city !== filters.city) return false;
  return true;
}

/** Verified first, then soonest deadline, then title. */
export function sortListings(list: Listing[]): Listing[] {
  return [...list].sort((a, b) => {
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    const da = a.deadline ?? "9999-12-31";
    const db = b.deadline ?? "9999-12-31";
    if (da !== db) return da < db ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

export function citiesOf(list: Listing[]): string[] {
  return [...new Set(list.map((l) => l.city))].sort((a, b) => {
    if (a === "Remote") return 1;
    if (b === "Remote") return -1;
    return a.localeCompare(b);
  });
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
