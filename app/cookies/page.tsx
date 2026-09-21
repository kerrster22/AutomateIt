import type { Metadata } from "next";

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
          This page is a placeholder. This site does not currently set any non-essential cookies. A full
          cookie policy and preference control will be published here if that changes.
        </p>
      </section>
    </main>
  );
}
