export type ActivityIdea = {
  label: string;
  title: string;
  org: string;
  bullets: string;
};

// "No experience" starters. Each one turns something a teen already does
// into a resume entry they can edit.
export const activityIdeas: ActivityIdea[] = [
  {
    label: "Babysitting",
    title: "Babysitter",
    org: "Neighborhood families",
    bullets:
      "Looked after young children and followed each family's routines and safety rules\nPlanned games and activities that kept children engaged",
  },
  {
    label: "Volunteering",
    title: "Volunteer",
    org: "",
    bullets:
      "Helped with events and tasks as directed by staff\nWorked with a team to finish projects on time",
  },
  {
    label: "Sports team",
    title: "Team Member",
    org: "",
    bullets:
      "Balanced regular practices and games with schoolwork\nCommunicated with teammates and coaches during games",
  },
  {
    label: "School club",
    title: "Member",
    org: "",
    bullets:
      "Attended weekly meetings and helped plan club activities\nTook on responsibilities such as organizing events or keeping records",
  },
  {
    label: "Yard work or pet care",
    title: "Self-employed",
    org: "Neighborhood customers",
    bullets:
      "Completed jobs on time for regular customers\nManaged my own schedule and handled payments",
  },
  {
    label: "Helping at home or family business",
    title: "Helper",
    org: "Family",
    bullets:
      "Took responsibility for daily tasks without reminders\nHelped younger siblings or relatives",
  },
];

export const skillIdeas = [
  "Friendly and reliable",
  "Works well on a team",
  "Quick learner",
  "Basic computer skills",
  "Bilingual",
  "Cash handling",
  "Social media",
  "Public speaking",
];
