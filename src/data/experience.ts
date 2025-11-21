export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Orion Labs",
    role: "Principal Product Engineer",
    period: "2023 — Present",
    summary:
      "Leading prototyping and systems architecture for spatial analytics tools powering data-heavy teams.",
  },
  {
    company: "Ripple Studio",
    role: "Founder & Lead Engineer",
    period: "2021 — 2023",
    summary:
      "Partnered with early-stage founders to deliver expressive interfaces that shipped to production.",
  },
  {
    company: "Saturn",
    role: "Design Engineer",
    period: "2019 — 2021",
    summary:
      "Built the shared design system and performance tooling for realtime trading applications.",
  },
];
