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
    description: "Your personal medication tracker for better health management",
    year: "2023",
    tags: ["React.js", "Python", "UX"],
    overview:
      "Pillbox is a medication tracking application designed to help users manage their medicine schedules with timely alerts. Focused on accessibility and ease of use for elderly users who may need reminders for their daily medications.",
    highlights: [
      "Intuitive interface designed for elderly users with large, clear text and simple navigation",
      "Smart notification system that sends timely reminders based on custom schedules",
      "Medication history tracking and adherence analytics for caregivers",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/RayGL1TCH/PillBox" }],
  },
  {
    slug: "faq-chatbot",
    title: "FAQ Chatbot",
    description: "Intelligent conversational AI for automated customer support",
    year: "2023",
    tags: ["Next.js", "AI", "NLP"],
    overview:
      "An AI-powered chatbot system that handles frequently asked questions with natural language understanding. Built to reduce support load and provide instant, accurate responses to common user queries.",
    highlights: [
      "Natural language processing for understanding user intent and context",
      "Integration with knowledge bases for dynamic, up-to-date responses",
      "Analytics dashboard showing common questions and user satisfaction metrics",
    ],
    links: [{ label: "View Demo", href: "#" }],
  },
  {
    slug: "invisible-ink-in-ai",
    title: "Invisible Ink in AI",
    description: "Exploring steganography and watermarking in AI-generated content",
    year: "2024",
    tags: ["AI", "Security", "Research"],
    overview:
      "Research project investigating digital watermarking techniques for AI-generated content. Explores methods to embed invisible markers in AI outputs for authenticity verification and content attribution.",
    highlights: [
      "Novel watermarking algorithms that survive image compression and transformations",
      "Detection system with high accuracy for identifying AI-generated content",
      "Applications in copyright protection and misinformation prevention",
    ],
    links: [
      { label: "Research Paper", href: "#" },
      { label: "Demo", href: "#" },
    ],
  },
  {
    slug: "market-data-feed-handler",
    title: "Market Data Feed Handler",
    description: "High-performance real-time financial data processing system",
    year: "2024",
    tags: ["C++", "Finance", "Low Latency"],
    overview:
      "Ultra-low latency market data feed handler built for high-frequency trading environments. Processes millions of market updates per second with microsecond-level precision.",
    highlights: [
      "Sub-microsecond latency processing with lock-free data structures",
      "Multi-threaded architecture optimized for modern CPU architectures",
      "Support for multiple exchange protocols and data normalization",
    ],
    links: [{ label: "Technical Overview", href: "#" }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}
