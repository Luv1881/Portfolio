export type TalkResource = {
  label: string;
  href: string;
};

export type Talk = {
  slug: string;
  title: string;
  event: string;
  year: string;
  abstract: string;
  takeaways: string[];
  resources: TalkResource[];
};

export const recentTalks: Talk[] = [
  {
    slug: "kinetic-systems",
    title: "Kinetic Systems in Production",
    event: "SmashingConf Barcelona",
    year: "2024",
    abstract:
      "How we evolved motion guidelines from prototypes to a resilient production language without sacrificing performance or accessibility.",
    takeaways: [
      "Composing spring physics with design tokens keeps motion expressive yet tunable across surfaces.",
      "Instrumentation is the only way to know when animation boosts task completion versus getting in the way.",
      "Shipping motion safely means giving engineers guardrails like velocity budgets and orchestration primitives.",
    ],
    resources: [
      { label: "Slides", href: "https://talks.luvgupta.com/kinetic-systems" },
      { label: "Demo", href: "https://play.luvgupta.com/kinetic-motions" },
    ],
  },
  {
    slug: "latency-windows",
    title: "Designing with Latency Windows",
    event: "Figma Config",
    year: "2023",
    abstract:
      "A field guide for crafting calm interfaces when networks spike, services stall, and handoffs hop around the world.",
    takeaways: [
      "Treat every request as a timeline with thresholds for optimism, realism, and failure handling.",
      "Latency budgets unlock creative placeholders that set expectations instead of hiding the wait.",
      "Feedback loops must degrade gracefully from realtime to batched updates without losing trust.",
    ],
    resources: [
      { label: "Slides", href: "https://talks.luvgupta.com/latency-windows" },
      { label: "Latency Workbook", href: "https://notes.luvgupta.com/latency-windows" },
    ],
  },
  {
    slug: "interfaces-that-listen",
    title: "Interfaces that Listen",
    event: "React Day Berlin",
    year: "2023",
    abstract:
      "Exploring input models that respond to tone, cadence, and confidence so assistive experiences stay responsive and humane.",
    takeaways: [
      "Signal confidence is as important as the transcript when designing for voice and ambient inputs.",
      "Interfaces should make sensing visible—surface state, calibration, and privacy in the same breath.",
      "Prototype guardrails early: even dummy fallbacks set expectations for rollout conversations.",
    ],
    resources: [
      { label: "Slides", href: "https://talks.luvgupta.com/interfaces-that-listen" },
      {
        label: "Workshop Guide",
        href: "https://notes.luvgupta.com/listening-interfaces",
      },
    ],
  },
];

export function getTalkBySlug(slug: string): Talk | undefined {
  return recentTalks.find((talk) => talk.slug === slug);
}
