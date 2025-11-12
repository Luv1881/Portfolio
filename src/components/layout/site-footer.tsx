import { socialLinks } from "@/data/social";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-border/30 mx-auto mt-24 flex max-w-5xl flex-col gap-8 border-t px-6 py-12 text-sm text-muted">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <span className="text-xs font-medium uppercase tracking-[0.5em]">
          © {year} LUV GUPTA
        </span>
        <ul className="flex gap-6">
          {socialLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block text-xs uppercase tracking-[0.5em] transition-all hover:translate-y-[-1px] hover:text-accent"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
