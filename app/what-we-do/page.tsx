import type { Metadata } from "next";
import { CtaPrimary } from "@/components/cta";
import { approach, cost, method, offers, whySlots } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Remove operational bottlenecks. Reduce the cost of doing business. Start with the business case, not the technology.",
  alternates: { canonical: "/what-we-do" },
  openGraph: {
    title: "What We Do — AutomateIT",
    description:
      "Remove operational bottlenecks. Reduce the cost of doing business. Start with the business case, not the technology.",
    url: "/what-we-do",
  },
};

export default function WhatWeDoPage() {
  return (
    <main>
      <section className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pt-[clamp(64px,9vw,112px)] pb-[clamp(56px,7vw,88px)]">
        <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-accent font-medium mb-[26px]">
          What we do
        </div>
        <h1 className="font-display font-extrabold text-[clamp(36px,5.6vw,72px)] leading-[0.99] tracking-[-0.04em] m-0 max-w-[21ch] text-balance">
          Remove operational bottlenecks. Reduce the cost of doing business.
        </h1>
        <p className="mt-[clamp(26px,3vw,36px)] text-[clamp(17.5px,1.8vw,20px)] leading-[1.55] text-muted max-w-[54ch] text-pretty">
          Automation can address human error, low productivity, repetitive work and high overheads. We
          start by establishing whether there is a worthwhile business case at all.
        </p>
      </section>

      {/* COST framework */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,112px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-[22px]">
            What makes AutomateIT different
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.034em] m-0 mb-3.5 max-w-[24ch]">
            We find cost savings others can&rsquo;t see.
          </h2>
          <p className="m-0 mb-[clamp(34px,4vw,48px)] text-[17.5px] leading-[1.6] text-muted max-w-[52ch] text-pretty">
            Our COST framework is how we get from a vague sense of inefficiency to a defensible business
            case.
          </p>
          <div className="border border-accent rounded bg-card p-[clamp(24px,3vw,40px)]">
            <div className="flex items-start gap-1 mb-[clamp(22px,3vw,30px)]">
              <span className="font-display font-extrabold text-[clamp(26px,3vw,34px)] tracking-[-0.03em] text-accent">
                COST
              </span>
              <span className="font-mono text-xs text-accent pt-1">&#8482;</span>
            </div>
            <div className="grid gap-px bg-border">
              {cost.map((c) => (
                <div
                  key={c.letter}
                  className="bg-card grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2 md:gap-[22px] items-baseline py-[18px]"
                >
                  <div className="flex items-baseline gap-3.5">
                    <span className="font-display font-extrabold text-[30px] leading-none tracking-[-0.03em] text-accent w-[26px] flex-none">
                      {c.letter}
                    </span>
                    <span className="font-display font-bold text-[21px] tracking-[-0.026em]">{c.word}</span>
                  </div>
                  <p className="m-0 text-[16.5px] leading-[1.55] text-muted max-w-[52ch]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,112px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-[22px]">
            Our approach
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.034em] m-0 mb-[clamp(40px,5vw,64px)] max-w-[24ch]">
            Start with the business case, not the technology.
          </h2>
          <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-line border border-line rounded overflow-hidden">
            {approach.map((a) => (
              <li
                key={a.num}
                className="bg-card shadow-[0_0_0_1px_var(--color-line)] px-[22px] pt-[26px] pb-[30px] grid gap-3 content-start"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-[9px] h-[9px] rounded-full" style={{ background: a.hue }} />
                  <span className="font-mono text-[12.5px] tracking-[0.1em] text-faint font-medium">
                    {a.num}
                  </span>
                </div>
                <div className="font-display font-bold text-[19px] leading-[1.2] tracking-[-0.024em]">
                  {a.title}
                </div>
                <div className="text-[15.5px] leading-[1.55] text-muted">{a.body}</div>
              </li>
            ))}
          </ol>
          <p className="mt-[clamp(30px,4vw,42px)] mb-0 text-[17px] leading-[1.6] text-muted max-w-[58ch] text-pretty">
            We identify the problem, the opportunity and the financial value before any automation is
            proposed. If the case is not there, we will tell you.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,96px)]">
          <h2 className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-[clamp(30px,4vw,44px)]">
            What we offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(32px,4vw,56px)]">
            {offers.map((o) => (
              <div key={o.title}>
                <h3 className="font-display font-bold text-[clamp(24px,2.4vw,30px)] tracking-[-0.028em] m-0 mb-3">
                  {o.title}
                </h3>
                <p className="m-0 mb-[18px] text-[16.5px] leading-[1.6] text-muted max-w-[32ch]">{o.body}</p>
                <div className="grid gap-2.5">
                  {o.points.map((p) => (
                    <div key={p} className="flex gap-3 items-baseline text-[15.5px] leading-[1.5] text-muted">
                      <span className="flex-none w-3.5 h-px bg-strong -translate-y-[5px]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-panel text-panelink">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,108px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase opacity-[0.72] font-medium mb-5">
            Delivery
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.034em] m-0 mb-4 max-w-[22ch]">
            Every step has an output you can review.
          </h2>
          <p className="m-0 mb-[clamp(38px,5vw,56px)] text-[17.5px] leading-[1.6] opacity-[0.82] max-w-[50ch]">
            Nothing gets built on a hunch, and nothing goes live without your sign-off.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {method.map((m) => (
              <div key={m.num} className="relative pt-[26px] pr-[22px] pb-[30px] border-t border-panelline">
                <div className="absolute -top-1 left-0 w-[7px] h-[7px] rounded-full bg-panelink" />
                <div className="font-mono text-xs tracking-[0.1em] opacity-[0.72] mb-3 font-medium">{m.num}</div>
                <h3 className="font-display font-bold text-[22px] tracking-[-0.026em] m-0 mb-2.5">
                  {m.title}
                </h3>
                <p className="m-0 mb-4 text-[15.5px] leading-[1.55] opacity-[0.84]">{m.body}</p>
                <div className="inline-block border border-panelline rounded px-2.5 py-1.5 font-mono text-xs tracking-[0.04em] opacity-90">
                  {m.out}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AutomateIT */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(56px,7vw,84px)]">
          <div className="flex flex-wrap gap-3.5 items-baseline justify-between mb-[26px]">
            <h2 className="font-display font-extrabold text-[clamp(26px,3vw,36px)] tracking-[-0.032em] m-0">
              Why AutomateIT
            </h2>
            <span className="font-mono text-[11.5px] tracking-[0.06em] text-faint border border-dashed border-strong rounded px-2.5 py-1.5">
              Client content to follow
            </span>
          </div>
          <div className="border border-line rounded bg-card p-[clamp(28px,4vw,44px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-[clamp(24px,3vw,44px)] items-start">
            <p className="m-0 text-[17.5px] leading-[1.6] max-w-[34ch] text-pretty">
              Space reserved for the client&rsquo;s own positioning statement and supporting image.
            </p>
            <div className="grid gap-3.5">
              {whySlots.map((w) => (
                <div key={w.slot} className="flex gap-3.5 items-baseline pb-3.5 border-b border-border">
                  <span className="font-mono text-[11.5px] tracking-[0.08em] text-accent font-medium flex-none">
                    {w.slot}
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-muted">{w.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(72px,10vw,124px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-[clamp(28px,4vw,48px)] items-center">
          <h2 className="font-display font-extrabold text-[clamp(29px,4vw,50px)] leading-[1.04] tracking-[-0.036em] m-0 max-w-[20ch] text-balance">
            Find out whether the business case is there.
          </h2>
          <div>
            <CtaPrimary href="/contact">Book a Free Cost Reduction Assessment</CtaPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}
