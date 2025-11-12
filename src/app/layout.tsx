import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luv Gupta — Product Engineer",
  description:
    "Portfolio and experiments by Luv Gupta, a product-focused engineer crafting immersive web experiences.",
  metadataBase: new URL("https://luvgupta.com"),
  openGraph: {
    title: "Luv Gupta — Product Engineer",
    description:
      "Portfolio and experiments by Luv Gupta, a product-focused engineer crafting immersive web experiences.",
    type: "website",
    locale: "en_US",
    url: "https://luvgupta.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luv Gupta — Product Engineer",
    description:
      "Portfolio and experiments by Luv Gupta, a product-focused engineer crafting immersive web experiences.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full bg-background text-text">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          spaceGrotesk.variable,
          "selection:bg-accent/50 antialiased transition-colors duration-300 selection:text-text",
        )}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
