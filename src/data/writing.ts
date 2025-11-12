export type Writing = {
  slug: string;
  title: string;
  publishedOn: string;
  summary: string;
  content: string[];
};

export const latestWriting: Writing[] = [
  {
    slug: "designing-for-signal-clarity",
    title: "Designing for signal clarity",
    publishedOn: "Sep 2024",
    summary:
      "Tactics for keeping realtime dashboards legible when data spikes, dips, and diverges without notice.",
    content: [
      "Data-heavy products can drown teams in noise. Building dashboards that surface the right signal demands a deliberate choreography of typography, motion, and color.",
      "This piece walks through the heuristics I lean on when the feed won't sit still: prioritizing edge-case states, rehearsing incidents through playback tooling, and budgeting contrast like oxygen.",
    ],
  },
  {
    slug: "lessons-from-building-nebula",
    title: "Lessons from building Nebula",
    publishedOn: "Jun 2024",
    summary:
      "How spatial UI, procedural shaders, and a resilient editor workflow came together into a cohesive launch.",
    content: [
      "Nebula started as a prototype for real-time collaboration inside a fluid, spatial canvas. It matured only once we paired strong visual systems with equally opinionated constraints.",
      "I break down the build pipeline, shader architecture, and the habits that kept experimentation fast without sacrificing stability for the production release.",
    ],
  },
];

export function getWritingBySlug(slug: string) {
  return latestWriting.find((entry) => entry.slug === slug);
}
