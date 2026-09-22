import type { Metadata } from "next";
import { CookiePreferences } from "@/components/cookie-preferences";

export const metadata: Metadata = {
  title: "Cookie Preferences",
  description: "AutomateIT's cookie usage and preference controls.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main>
      <section className="max-w-[860px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,112px)]">
        <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-accent font-medium mb-[26px]">
          Legal
        </div>
        <h1 className="font-display font-extrabold text-[clamp(32px,4.6vw,54px)] leading-[1.05] tracking-[-0.036em] m-0">
          Cookie Preferences
        </h1>
        <p className="mt-6 text-[17.5px] leading-[1.6] text-muted max-w-[60ch]">
          This site uses Google Analytics to understand site traffic, in the form of a single analytics
          cookie set by Google. It is only set once you choose &ldquo;Accept&rdquo; or turn it on below —
          nothing is set until then, and you can change your mind at any time.
        </p>
        <p className="mt-4 text-[17px] leading-[1.6] text-muted max-w-[60ch]">
          Turning analytics off (or not turning it on) does not affect your ability to use the site,
          including the contact form.
        </p>
        <CookiePreferences />
      </section>
    </main>
  );
}
