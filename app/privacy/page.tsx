import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AutomateIT handles enquiry details submitted through this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="max-w-[860px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,112px)]">
        <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-accent font-medium mb-[26px]">
          Legal
        </div>
        <h1 className="font-display font-extrabold text-[clamp(32px,4.6vw,54px)] leading-[1.05] tracking-[-0.036em] m-0">
          Privacy Policy
        </h1>
        <p className="mt-6 text-[17.5px] leading-[1.6] text-muted max-w-[60ch]">
          This page is a placeholder. AutomateIT&rsquo;s full privacy policy, covering how enquiry details
          submitted through this site are used and retained, will be published here before launch.
        </p>
        <p className="mt-4 text-[17px] leading-[1.6] text-muted max-w-[60ch]">
          In the meantime, contact{" "}
          <a href="mailto:info@automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
            info@automateit.tech
          </a>{" "}
          with any privacy questions.
        </p>
      </section>
    </main>
  );
}
