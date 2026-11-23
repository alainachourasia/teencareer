export type Activity = {
  id: string;
  title: string;
  org: string;
  dates: string;
  /** One bullet per line. */
  bullets: string;
};

export type Reference = {
  id: string;
  name: string;
  relationship: string;
  contact: string;
};

export type Resume = {
  fullName: string;
  email: string;
  phone: string;
  /** City and state only. Never ask for a home address. */
  location: string;
  objective: string;
  school: string;
  gradYear: string;
  gpa: string;
  coursework: string;
  activities: Activity[];
  skills: string;
  awards: string;
  references: Reference[];
};

export const emptyResume: Resume = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  objective: "",
  school: "",
  gradYear: "",
  gpa: "",
  coursework: "",
  activities: [],
  skills: "",
  awards: "",
  references: [],
};

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function parseResume(raw: string): Resume {
  if (!raw) return emptyResume;
  try {
    const data = JSON.parse(raw) as Partial<Resume>;
    return {
      ...emptyResume,
      ...data,
      activities: Array.isArray(data.activities) ? data.activities : [],
      references: Array.isArray(data.references) ? data.references : [],
    };
  } catch {
    return emptyResume;
  }
}

export function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function isEmpty(r: Resume): boolean {
  return (
    !r.fullName &&
    !r.objective &&
    !r.school &&
    !r.skills &&
    !r.awards &&
    r.activities.length === 0 &&
    r.references.length === 0
  );
}
