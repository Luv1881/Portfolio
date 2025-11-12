export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  overview: string;
  highlights: string[];
  links: ProjectLink[];
};

export const featuredProjects: Project[] = [
  {
    slug: "pillbox",
    title: "Pillbox",
    description: "Your personal medication tracker",
    year: "2023",
    tags: ["React.js", "Python", "UX"],
    overview:
      "Pillbox is meant to track medicine schedules and alert them based on their set schedule. Mainly meant for elderly people who easily forget to take their medicines",
    highlights: [
      "Built a shader-driven particle renderer capable of 120k points at 60fps on mid-tier GPUs.",
      "Paired WebRTC with a resilient command queue so remote teams can co-pilot investigations.",
      "Invented a spatial picker that converts 3D selection to declarative query filters in real time.",
    ],
    links: [
      { label: "Live Prototype", href: "https://github.com/RayGL1TCH/PillBox" },
      // { label: "Design Notes", href: "https://notes.luvgupta.com/nebula-build" },
    ],
  },
  {
    slug: "faq-chatbot",
    title: "FAQ Chatbot",
    description:
      "Healthcare analytics control room that compresses millions of signals into actionable, explainable insights.",
    year: "2023",
    tags: ["Next.js", "AI", "Design Systems"],
    overview:
      "Pulse collects telemetry from hospital devices and models predicted load, triage risk, and staffing gaps. The experience fuses dense decision layers into an interface that feels approachable to clinicians on the move.",
    highlights: [
      "Delivered a component system tuned for large touch displays and assistive tech compliance.",
      "Embedded explainability primitives next to every ML projection so teams can trust automation.",
      "Introduced incident rehearsals that let staff simulate surges before rolling out live updates.",
    ],
    links: [
      { label: "Case Study", href: "https://projects.luvgupta.com/pulse" },
      { label: "System Tokens", href: "https://design.luvgupta.com/pulse" },
    ],
  },
  {
    slug: "Invisible ink in AI",
    title: "Invisible Ink in AI",
    description:
      "Boutique product studio partnering with founders to deliver expressive, production-ready experiences.",
    year: "2022",
    tags: ["Consulting", "Strategy", "Product"],
    overview:
      "Ripple Studio is the playground where I help early teams craft opinionated product foundations fast. From naming to handoff, every engagement ships with a living design language and instrumentation baked in.",
    highlights: [
      "Scaled a founder's MVP into a multi-tenant SaaS in under 10 weeks with automated billing.",
      "Facilitated branding sprints that translated directly into component libraries and docs.",
      "Mentored internal engineers on performance budgets and progressive disclosure patterns.",
    ],
    links: [
      { label: "Studio Website", href: "https://luvgupta.com/ripple" },
      { label: "Starter Playbook", href: "https://notes.luvgupta.com/ripple-playbook" },
    ],
  },
  {
    slug: "low-latency-market-data-feed-handler",
    title: "Market Data Feed Handler",
    description:
      "Boutique product studio partnering with founders to deliver expressive, production-ready experiences.",
    year: "2022",
    tags: ["Consulting", "Strategy", "Product"],
    overview:
      "Ripple Studio is the playground where I help early teams craft opinionated product foundations fast. From naming to handoff, every engagement ships with a living design language and instrumentation baked in.",
    highlights: [
      "Scaled a founder's MVP into a multi-tenant SaaS in under 10 weeks with automated billing.",
      "Facilitated branding sprints that translated directly into component libraries and docs.",
      "Mentored internal engineers on performance budgets and progressive disclosure patterns.",
    ],
    links: [
      { label: "Studio Website", href: "https://luvgupta.com/ripple" },
      { label: "Starter Playbook", href: "https://notes.luvgupta.com/ripple-playbook" },
    ],
  },
  {
    slug: "low-latency-market-data-feed-handler",
    title: "Market Data Feed Handler",
    description:
      "Boutique product studio partnering with founders to deliver expressive, production-ready experiences.",
    year: "2022",
    tags: ["Consulting", "Strategy", "Product"],
    overview:
      "Ripple Studio is the playground where I help early teams craft opinionated product foundations fast. From naming to handoff, every engagement ships with a living design language and instrumentation baked in.",
    highlights: [
      "Scaled a founder's MVP into a multi-tenant SaaS in under 10 weeks with automated billing.",
      "Facilitated branding sprints that translated directly into component libraries and docs.",
      "Mentored internal engineers on performance budgets and progressive disclosure patterns.",
    ],
    links: [
      { label: "Studio Website", href: "https://luvgupta.com/ripple" },
      { label: "Starter Playbook", href: "https://notes.luvgupta.com/ripple-playbook" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}
