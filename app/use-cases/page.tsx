import type { Metadata } from "next";
import Link from "next/link";
import { CostComparisonChart } from "@/components/cost-comparison-chart";
import { CtaPrimary } from "@/components/cta";
import { cases, journey } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Where the savings actually come from — real business problems, not a catalogue of technology.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Use Cases — AutomateIT",
    description: "Where the savings actually come from — real business problems, not a catalogue of technology.",
    url: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <main>
      <section className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pt-[clamp(64px,9vw,112px)] pb-[clamp(40px,5vw,60px)]">
        <div className="flex flex-wrap gap-3.5 items-baseline justify-between">
          <div>
            <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-accent font-medium mb-[26px]">
              Use cases
            </div>
            <h1 className="font-display font-extrabold text-[clamp(36px,5.6vw,72px)] leading-[0.99] tracking-[-0.04em] m-0 max-w-[18ch] text-balance">
              Where the savings actually come from.
            </h1>
          </div>
          <span className="font-mono text-[11.5px] tracking-[0.06em] text-faint border border-dashed border-strong rounded px-2.5 py-1.5">
            Four cases to be confirmed by client
          </span>
        </div>
        <p className="mt-[clamp(24px,3vw,32px)] mb-0 text-[17.5px] leading-[1.6] text-muted max-w-[52ch] text-pretty">
          Each case sets out who it is for, the problem, the solution and the measurable result.
        </p>
      </section>

      <section>
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pb-[clamp(56px,7vw,88px)] grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <article
              key={c.id}
              className="border border-border rounded bg-card px-[clamp(24px,3vw,32px)] pt-[clamp(26px,3vw,34px)] pb-7 flex flex-col gap-5 transition-colors duration-200 hover:border-strong"
            >
              <div>
                <div className="font-mono text-xs tracking-[0.1em] uppercase text-accent font-medium">
                  {c.eyebrow}
                </div>
                <h2 className="font-display font-bold text-[27px] tracking-[-0.03em] m-0 mt-3">{c.title}</h2>
              </div>
              <div className="grid border-t border-line">
                {c.rows.map((r) => (
                  <div key={r.label} className="py-4 border-b border-line">
                    <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-[7px]">
                      {r.label}
                    </div>
                    <div className="text-[16.5px] leading-[1.55] text-muted">{r.body}</div>
                  </div>
                ))}
                <div className="pt-4">
                  <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-[7px]">
                    Proof / example
                  </div>
                  <div className="text-[15.5px] leading-[1.55] text-faint border border-dashed border-strong rounded px-3 py-2.5">
                    Awaiting client-verified example. No figures shown until confirmed.
                  </div>
                </div>
              </div>
              <Link
                href={`/contact?context=${encodeURIComponent(c.contextLabel)}`}
                className="inline-flex items-center gap-2.5 min-h-11 mt-auto text-base font-semibold text-accent hover:text-ink"
              >
                Talk to us about this <span aria-hidden="true" className="font-mono">&#8594;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Cost comparison */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(56px,7vw,88px)]">
          <h2 className="font-display font-extrabold text-[clamp(28px,3.6vw,44px)] leading-[1.05] tracking-[-0.034em] m-0 mb-3.5 max-w-[22ch]">
            A lower-cost route to automation
          </h2>
          <p className="m-0 mb-[clamp(30px,4vw,44px)] text-[17.5px] leading-[1.6] text-muted max-w-[56ch] text-pretty">
            AutomateIT avoids much of the licence and development overhead associated with traditional RPA.
          </p>

          <div className="border border-line rounded bg-card p-[clamp(22px,3vw,34px)]">
            <div className="flex flex-wrap gap-[22px] mb-[22px]">
              <div className="flex items-center gap-2.5">
                <span className="w-[26px] h-1 rounded-sm bg-neutralline" />
                <span className="text-[15px] text-muted">Licensed enterprise RPA (e.g. UiPath)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-[26px] h-1 rounded-sm bg-accent2" />
                <span className="text-[15px] font-semibold">AutomateIT</span>
              </div>
            </div>

            <CostComparisonChart />

            <p className="mt-[22px] mb-0 text-sm leading-[1.6] text-faint max-w-[96ch]">
              Illustrative comparison only. Index values show relative positioning, not quoted supplier
              prices. Actual costs depend on scope, licences, infrastructure, implementation and support.
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,96px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-5">
            From enquiry to result
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,3.4vw,42px)] leading-[1.06] tracking-[-0.034em] m-0 mb-[clamp(34px,4vw,48px)] max-w-[22ch]">
            How a case like these gets built.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(24px,3vw,36px)]">
            {journey.map((j) => (
              <div key={j.num} className="border-t-2 border-accent pt-5">
                <div className="font-mono text-xs tracking-[0.1em] text-faint font-medium mb-2.5">
                  {j.num}
                </div>
                <h3 className="font-display font-bold text-xl tracking-[-0.024em] m-0 mb-2">{j.title}</h3>
                <p className="m-0 text-[15.5px] leading-[1.55] text-muted max-w-[30ch]">{j.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(72px,10vw,124px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-[clamp(28px,4vw,48px)] items-center">
          <h2 className="font-display font-extrabold text-[clamp(29px,4vw,50px)] leading-[1.04] tracking-[-0.036em] m-0 max-w-[20ch] text-balance">
            Tell us about your process.
          </h2>
          <div>
            <CtaPrimary href="/contact">Book a Free Cost Reduction Assessment</CtaPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}
