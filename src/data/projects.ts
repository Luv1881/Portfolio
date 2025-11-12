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
    description:
      "Smart medication reminder app designed for elderly care and chronic disease management",
    year: "2023",
    tags: ["React.js", "Python", "Firebase", "Mobile-First"],
    overview:
      "Pillbox is a personal medication tracker that helps users maintain their medication schedules with timely alerts. Designed with elderly users in mind, it features a clean, accessible interface that simplifies complex medication routines and provides family caregivers with peace of mind.",
    highlights: [
      "Implemented intuitive medication scheduling with customizable reminder notifications and snooze functionality.",
      "Built accessibility-first UI with large touch targets, high contrast modes, and voice-guided navigation.",
      "Integrated Firebase for real-time medication adherence tracking and caregiver dashboard updates.",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/RayGL1TCH/PillBox" }],
  },
  {
    slug: "faq-chatbot",
    title: "FAQ Chatbot",
    description:
      "Intelligent conversational assistant powered by natural language processing for automated customer support",
    year: "2023",
    tags: ["Next.js", "OpenAI", "LangChain", "RAG"],
    overview:
      "An AI-powered FAQ chatbot that leverages retrieval-augmented generation (RAG) to provide accurate, context-aware responses. The system understands user intent, searches through knowledge bases, and delivers helpful answers in natural language, reducing support ticket volume by 60%.",
    highlights: [
      "Integrated OpenAI GPT models with custom prompt engineering for domain-specific accuracy.",
      "Built vector database with semantic search using embeddings for lightning-fast information retrieval.",
      "Designed responsive chat interface with typing indicators, suggested questions, and conversation history.",
    ],
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Technical Writeup", href: "#" },
    ],
  },
  {
    slug: "invisible-ink-in-ai",
    title: "Invisible Ink in AI",
    description:
      "Research project exploring digital watermarking and steganography techniques in AI-generated content",
    year: "2024",
    tags: ["Python", "PyTorch", "Computer Vision", "ML Security"],
    overview:
      "This research explores novel approaches to embedding invisible watermarks in AI-generated images and text. The project implements steganographic techniques to authenticate and trace AI content, addressing growing concerns about deepfakes and content provenance in the age of generative AI.",
    highlights: [
      "Developed robust watermarking algorithm that survives image compression and common transformations.",
      "Achieved 99.2% watermark detection accuracy with minimal perceptual quality degradation.",
      "Published findings on adversarial robustness and potential applications in content authentication.",
    ],
    links: [
      { label: "Research Paper", href: "#" },
      { label: "Code Repository", href: "#" },
    ],
  },
  {
    slug: "market-data-feed-handler",
    title: "Market Data Feed Handler",
    description:
      "Ultra-low latency system for processing real-time financial market data feeds at microsecond precision",
    year: "2022",
    tags: ["C++", "FIX Protocol", "WebSockets", "HFT"],
    overview:
      "High-performance market data processing engine designed for algorithmic trading systems. Handles multiple exchange feeds simultaneously, normalizing and distributing quotes, trades, and order book updates to downstream trading strategies with sub-microsecond latency.",
    highlights: [
      "Optimized data pipeline achieving consistent p99 latency under 5 microseconds for message processing.",
      "Implemented zero-copy deserialization with custom memory pools to eliminate allocation overhead.",
      "Built resilient failover mechanisms and gap detection to ensure data integrity during market volatility.",
    ],
    links: [
      { label: "Architecture Overview", href: "#" },
      { label: "Performance Benchmarks", href: "#" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}
