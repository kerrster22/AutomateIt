import Link from "next/link";
import { LinkedInIcon } from "./linkedin-icon";
import { LogoMark } from "./logo-mark";
import { NAV_ITEMS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-alt">
      <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pt-[clamp(44px,6vw,60px)] pb-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
        <div>
          <LogoMark variant="footer" />
          <p className="mt-4 text-[16px] leading-[1.6] text-muted max-w-[28ch]">
            Business improvement first. Automation where it earns its place.
          </p>
        </div>
        <div className="grid gap-1 content-start">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2">
            Pages
          </div>
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="inline-flex items-center min-h-10 text-[16px] text-muted transition-colors duration-150 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-1 content-start">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2">
            Contact
          </div>
          <a
            href="mailto:info@automateit.tech"
            className="inline-flex items-center min-h-10 text-[16px] text-muted transition-colors duration-150 hover:text-ink"
          >
            info@automateit.tech
          </a>
          <a
            href="https://www.linkedin.com/company/automate-it-tech/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-10 text-[16px] text-muted transition-colors duration-150 hover:text-ink"
          >
            <LinkedInIcon />
            Automate It Tech — LinkedIn
          </a>
        </div>
        <div className="grid gap-1 content-start">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2">
            Legal
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center min-h-10 text-[16px] text-muted transition-colors duration-150 hover:text-ink"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="inline-flex items-center min-h-10 text-[16px] text-muted transition-colors duration-150 hover:text-ink"
          >
            Cookie Preferences
          </Link>
        </div>
      </div>
      <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pt-5 pb-9 border-t border-border flex flex-wrap gap-3 justify-between items-center text-sm text-faint">
        <span>© 2026 AutomateIT</span>
      </div>
    </footer>
  );
}
