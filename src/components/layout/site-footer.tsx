import { socialLinks } from "@/data/social";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-border/30 relative mx-auto mt-24 flex max-w-5xl flex-col gap-8 border-t px-6 py-12 text-sm text-muted">
      {/* Subtle gradient line above footer */}
      <div className="via-accent/40 absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent" />

      <div className="flex flex-wrap items-center justify-between gap-6">
        <span className="gradient-text text-xs font-bold uppercase tracking-[0.5em]">
          © {year} LUV GUPTA
        </span>
        <ul className="flex gap-6">
          {socialLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative inline-block text-xs uppercase tracking-[0.5em] transition-all hover:translate-y-[-2px] hover:text-accent"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
