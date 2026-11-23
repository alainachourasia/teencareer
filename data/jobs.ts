// Job and internship listings.
//
// IMPORTANT: every entry below is SAMPLE data (sample: true). None of these are
// real openings. Replace them with employers you have contacted and confirmed.
// For a real listing set sample: false, verified: true, and keep lastConfirmed
// current. Listings not confirmed in the last 60 days are hidden automatically.

export type ListingType = "job" | "internship" | "seasonal" | "gig";

export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  job: "Job",
  internship: "Internship",
  seasonal: "Seasonal / summer",
  gig: "Gig",
};

export type Listing = {
  id: string;
  title: string;
  employer: string;
  type: ListingType;
  description: string;
  /** Youngest age the employer will hire. Must be 14 or higher. */
  minAge: number;
  /** A Massachusetts city or town, or "Remote". */
  city: string;
  paid: boolean;
  pay?: string;
  hours: string;
  applyUrl?: string;
  /** Shown when there is no applyUrl, e.g. "Ask for the manager in person". */
  applyNote?: string;
  /** YYYY-MM-DD. Listing is hidden after this date. */
  deadline?: string;
  /** True only after you have confirmed the employer exists and hires teens. */
  verified: boolean;
  /** YYYY-MM-DD of the last time you confirmed this listing is still open. */
  lastConfirmed: string;
  sample?: boolean;
};

export const listings: Listing[] = [
  {
    id: "sample-1",
    title: "Cashier and Counter Help",
    employer: "Sample Bakery",
    type: "job",
    description: "Greet customers, ring up orders, and keep the counter tidy. No experience needed.",
    minAge: 15,
    city: "Worcester",
    paid: true,
    pay: "Minimum wage plus tips",
    hours: "Weekends and after school, up to 15 hours a week",
    applyNote: "Sample listing, not a real opening.",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-2",
    title: "Library Page",
    employer: "Sample Public Library",
    type: "job",
    description: "Shelve books, help patrons find materials, and assist at the front desk.",
    minAge: 15,
    city: "Springfield",
    paid: true,
    pay: "Hourly, set by the town",
    hours: "6 to 10 hours a week after school",
    applyNote: "Sample listing, not a real opening.",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-3",
    title: "Junior Counselor",
    employer: "Sample Day Camp",
    type: "seasonal",
    description: "Help lead games and activities for younger campers under adult supervision.",
    minAge: 15,
    city: "Lowell",
    paid: true,
    pay: "Weekly stipend",
    hours: "Weekdays, June to August",
    applyNote: "Sample listing, not a real opening.",
    deadline: "2027-05-01",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-4",
    title: "Hospital Summer Internship",
    employer: "Sample Community Hospital",
    type: "internship",
    description:
      "Shadow staff in different departments and complete a small project. Application needs a teacher recommendation.",
    minAge: 16,
    city: "Boston",
    paid: false,
    hours: "Full days for 6 weeks in summer",
    applyNote: "Sample listing, not a real opening.",
    deadline: "2027-03-15",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-5",
    title: "Office Assistant Intern",
    employer: "Sample Nonprofit",
    type: "internship",
    description: "Answer phones, enter data, and help plan community events.",
    minAge: 16,
    city: "Cambridge",
    paid: true,
    pay: "Hourly stipend",
    hours: "10 to 15 hours a week",
    applyNote: "Sample listing, not a real opening.",
    deadline: "2027-02-28",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-6",
    title: "Social Media Helper",
    employer: "Sample Small Business",
    type: "job",
    description: "Take photos and post updates for a local shop. Work from home with check-ins.",
    minAge: 16,
    city: "Remote",
    paid: true,
    pay: "Hourly",
    hours: "5 hours a week, flexible",
    applyNote: "Sample listing, not a real opening.",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-7",
    title: "Babysitter for Neighborhood Families",
    employer: "Sample Family",
    type: "gig",
    description: "Occasional evening and weekend babysitting. Parents will meet you first.",
    minAge: 15,
    city: "Worcester",
    paid: true,
    pay: "Set with the family",
    hours: "A few evenings a month",
    applyNote: "Sample listing, not a real opening.",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-8",
    title: "Retail Associate",
    employer: "Sample Clothing Store",
    type: "job",
    description: "Stock shelves, fold clothes, and help customers in the store.",
    minAge: 16,
    city: "Boston",
    paid: true,
    pay: "Hourly",
    hours: "Weekends and some weeknights until 8 p.m.",
    applyNote: "Sample listing, not a real opening.",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
  {
    id: "sample-9",
    title: "Research Lab Intern",
    employer: "Sample University",
    type: "internship",
    description: "Support a research team with data entry and lab upkeep. For rising seniors.",
    minAge: 17,
    city: "Cambridge",
    paid: true,
    pay: "Stipend",
    hours: "Full-time for 8 weeks in summer",
    applyNote: "Sample listing, not a real opening.",
    deadline: "2027-02-01",
    verified: false,
    lastConfirmed: "2026-11-20",
    sample: true,
  },
];
