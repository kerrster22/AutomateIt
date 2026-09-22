"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "./logo-mark";
import { NAV_ITEMS } from "@/lib/nav";
import { useTheme } from "@/lib/theme-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-[60] bg-bg border-b border-border">
      <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] min-h-[76px] flex items-center gap-[clamp(14px,3vw,34px)]">
        <Link
          href="/"
          aria-label="AutomateIT — home"
          className="flex-none"
          onClick={() => setMenuOpen(false)}
        >
          <LogoMark variant="header" />
        </Link>

        <div className="flex-1" />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center min-h-11 py-[26px] whitespace-nowrap text-[16px] ${
                  active ? "font-semibold" : "font-medium"
                } text-ink transition-opacity duration-150 hover:opacity-60`}
              >
                {n.label}
                {active ? (
                  <span className="absolute -left-[3px] -right-[3px] bottom-[22px] h-0.5 bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-3.5 ml-2">
          <div
            role="group"
            aria-label="Colour theme"
            className="flex items-center border border-line rounded-lg p-[3px] gap-0.5"
          >
            {(["light", "dark"] as const).map((t) => {
              const active = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={active}
                  suppressHydrationWarning
                  className="relative min-w-[52px] min-h-[40px] px-[11px] rounded-[5px] font-mono text-[13px] tracking-[0.06em] uppercase text-ink"
                >
                  <span
                    suppressHydrationWarning
                    className={`absolute inset-0 rounded-[5px] bg-tint ${active ? "opacity-100" : "opacity-0"}`}
                  />
                  <span
                    suppressHydrationWarning
                    className={`relative z-10 ${active ? "font-semibold" : "font-normal"}`}
                  >
                    {t}
                  </span>
                </button>
              );
            })}
          </div>
          <Link
            href="/contact?type=customer"
            className="inline-flex items-center min-h-11 px-5 rounded-md bg-btn text-btnink text-[16px] font-semibold whitespace-nowrap transition-opacity duration-150 hover:opacity-[0.86]"
          >
            Book an assessment
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/contact?type=customer"
            className="inline-flex items-center min-h-11 px-[15px] rounded-md bg-btn text-btnink text-[16px] font-semibold"
          >
            Book
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex flex-col items-center justify-center gap-[5px] w-[46px] h-[46px] rounded-md border border-line bg-transparent"
          >
            <span className="w-[18px] h-[1.5px] bg-ink" />
            <span className="w-[18px] h-[1.5px] bg-ink" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-alt px-[18px] pt-2.5 pb-[22px] [animation:sheetIn_200ms_ease_both]"
        >
          <nav aria-label="Mobile" className="grid">
            {NAV_ITEMS.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between min-h-14 border-b border-border text-lg ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                >
                  {n.label}
                  {active ? (
                    <span className="font-mono text-xs text-accent">current</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div role="group" aria-label="Colour theme" className="flex gap-2 mt-[18px]">
            {(["light", "dark"] as const).map((t) => {
              const active = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-pressed={active}
                  suppressHydrationWarning
                  className="relative flex-1 min-h-12 border border-line rounded-md font-mono text-[13px] tracking-[0.06em] uppercase text-ink"
                >
                  <span
                    suppressHydrationWarning
                    className={`absolute inset-0 rounded-[5px] bg-tint ${active ? "opacity-100" : "opacity-0"}`}
                  />
                  <span
                    suppressHydrationWarning
                    className={`relative z-10 ${active ? "font-semibold" : "font-normal"}`}
                  >
                    {t} mode
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
