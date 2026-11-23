// Massachusetts youth employment rules, copied from official mass.gov pages.
// Re-check the sources before changing anything here, and update LAST_CHECKED.

export const LAST_CHECKED = "November 22, 2026";

export const SOURCES = [
  {
    label: "Work hours restrictions for minors (AG Fair Labor Division)",
    url: "https://www.mass.gov/info-details/work-hours-restrictions-for-minors",
  },
  {
    label: "Prohibited jobs for minors (AG Fair Labor Division)",
    url: "https://www.mass.gov/info-details/prohibited-jobs-for-minors",
  },
  {
    label: "Apply for a youth work permit (Department of Labor Standards)",
    url: "https://www.mass.gov/how-to/apply-for-a-youth-work-permit",
  },
] as const;

export const HOTLINE = {
  label: "AG Fair Labor Hotline",
  phone: "(617) 727-3465",
  hours: "Monday to Friday, 10 a.m. to 4 p.m.",
};

export type AgeBand = "15" | "16-17" | "18";

export const AGE_BANDS: { id: AgeBand; label: string }[] = [
  { id: "15", label: "Age 15" },
  { id: "16-17", label: "Ages 16 and 17" },
  { id: "18", label: "Age 18" },
];

export type HourRule = { title: string; items: string[] };

export const HOURS: Record<Exclude<AgeBand, "18">, HourRule[]> = {
  "15": [
    {
      title: "During the school year",
      items: [
        "Not during school hours",
        "No more than 3 hours on a school day",
        "No more than 18 hours in a school week",
        "No more than 8 hours on a weekend or holiday",
        "Not from 7 p.m. to 7 a.m.",
      ],
    },
    {
      title: "When school is not in session",
      items: [
        "No more than 8 hours a day",
        "No more than 40 hours a week",
        "No more than 6 days a week",
        "Not from 7 p.m. to 7 a.m., except in summer (July 1 to Labor Day), when you can work until 9 p.m.",
      ],
    },
    {
      title: "Exception",
      items: [
        "School-approved career or experience-building jobs may allow work during the school day, up to 23 hours a week.",
      ],
    },
  ],
  "16-17": [
    {
      title: "All year, whether or not school is in session",
      items: [
        "No more than 9 hours a day",
        "No more than 48 hours a week",
        "No more than 6 days a week",
        "Not from 10 p.m. to 6 a.m. (or past 10:15 p.m. if the employer stops serving customers at 10 p.m.)",
      ],
    },
    {
      title: "Exception",
      items: [
        "On non-school nights you may work until 11:30 p.m., or until midnight at a restaurant or racetrack.",
      ],
    },
  ],
};

export const SUPERVISION_NOTE =
  "Anyone under 18 may not work past 8 p.m. without direct, on-site adult supervision (except at kiosks in the common areas of some malls).";

export const PERMIT = {
  summary:
    "In Massachusetts, anyone under 18 who wants to work needs a youth work permit. Your employer keeps it on file.",
  needs: [
    "A job offer, written or verbal, from an employer in Massachusetts",
    "A parent or guardian's signature",
    "If you are 15 or younger: a signature from a doctor (physician's certificate of health)",
    "Proof of age (birth certificate, passport, state ID, or immigration paperwork)",
    "School records showing you are enrolled",
  ],
  steps: [
    "Download the application.",
    "Ask your employer to complete the Promise of Employment section.",
    "If you are 15 or younger, have a doctor complete the physician's certificate.",
    "Have a parent or guardian complete their part, then sign it yourself.",
    "Turn it in with your proof of age and school records to the superintendent's office (or designee) at your school. If approved, they will ask you to sign the permit.",
    "Give the permit to your employer.",
  ],
  validity:
    "Your permit is good while you stay at the same job, until you turn 18. If you get a new job before 18, you need a new permit for that job. You do not need a new one each school year.",
};

export const BANNED_UNDER_18 = [
  "Driving a vehicle or forklift (golf carts allowed in some cases)",
  "Operating, cleaning, or repairing power-driven meat slicers, grinders, or choppers",
  "Operating, cleaning, or repairing power-driven bakery machines",
  "Working 30 feet or more above ground or water",
  "Handling, serving, or selling alcohol",
  "Using circular or band saws, or guillotine shears",
  "Using power-driven woodworking machines",
  "Using hoisting machines",
  "Operating paper balers, box compactors, or other power-driven paper products machines",
  "Using power-driven metal-forming, punching, or shearing machines",
  "Using buffing or polishing equipment",
  "Making brick, tile, or similar products",
  "Making or storing explosives",
  "Excavation, wrecking, demolition, or shipbreaking",
  "Logging, sawmilling, or mining",
  "Slaughtering, packing, or processing meat",
  "Railway operations",
  "Roofing, or working on or about a roof",
  "Foundries or around blast furnaces",
  "Exposure to radioactive substances",
  "Any job that requires having or using a firearm",
  "Oiling or cleaning hazardous machinery in motion",
];

export const BANNED_UNDER_16_EXTRA = [
  "Operating power-driven machinery (except office machines, or machines in retail or food service that aren't otherwise banned)",
  "Cooking, except on electric or gas grills without open flames",
  "Operating fryolators, rotisseries, or pressure cookers",
  "Any baking activities",
  "Using microwave ovens, except to heat food at or below 140 degrees Fahrenheit",
  "Cleaning kitchen surfaces hotter than 100 degrees Fahrenheit, or handling cooking oil hotter than 100 degrees Fahrenheit",
  "Working in freezers or meat coolers",
  "Working in a factory or other manufacturing facility",
  "Working on ladders or scaffolds",
  "Working in garages, except dispensing gas and oil",
  "Working in amusement places such as pool halls or bowling alleys",
  "Working in barber shops",
  "Construction, transportation, communications, or public utilities (except clerical work away from heavy machinery)",
  "Working in warehouses (except clerical work)",
  "Loading or unloading trucks, railroad cars, or conveyors",
  "Commercial laundry or dry cleaning",
  "Working as a public messenger",
  "Working around boilers or in engine rooms",
  "Industrial homework",
];

export const BABYSITTING_NOTE =
  "Babysitting has no minimum age in Massachusetts law, and it is not on the banned lists above. These pages don't say whether informal jobs like babysitting or yard work need a youth work permit, so ask your school's permit office if you are unsure.";
