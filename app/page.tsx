import Link from "next/link";
import Image from "next/image";
import { CtaPrimary, CtaText } from "@/components/cta";
import { areas, benefits, frictions, outcomes, partnerSupport, partnerUs, partnerYou, stages } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      {/* Hero — full-bleed image, spans the whole window width */}
      <section className="relative w-full overflow-hidden h-[clamp(480px,72vh,760px)]">
        <Image
          src="/Automateithero.png"
          alt="A laptop showing the AutomateIT automation dashboard, connecting emails, forms, documents and CRM data through to automated processing, analysis and notifications"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[1180px] mx-auto w-full px-[clamp(18px,3vw,28px)] pb-[clamp(40px,7vw,72px)]">
            <h1 className="font-display font-extrabold text-white text-[clamp(34px,6vw,80px)] leading-[0.98] tracking-[-0.04em] m-0 max-w-[14ch] text-balance">
              Reduce Costs. Unlock Growth.
            </h1>
            <p className="mt-[clamp(16px,2.5vw,26px)] text-white/85 text-[clamp(16px,1.6vw,20px)] leading-[1.5] max-w-[46ch] text-pretty">
              We help organisations uncover hidden costs, automate what matters and deliver measurable savings.
            </p>
            <div className="flex flex-wrap gap-3 mt-[clamp(20px,3vw,32px)]">
              <CtaPrimary href="/contact?type=customer">Book a Free Cost Reduction Assessment</CtaPrimary>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center min-h-14 px-7 rounded-md border border-white/50 text-white text-[17px] font-semibold bg-white/10 backdrop-blur-sm transition-colors duration-150 hover:bg-white/20"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three benefits */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(56px,7vw,88px)] grid grid-cols-1 md:grid-cols-3 gap-[clamp(32px,4vw,56px)]">
          {benefits.map((b) => (
            <div key={b.title}>
              <h2 className="font-display font-bold text-[clamp(22px,2.2vw,27px)] leading-[1.15] tracking-[-0.026em] m-0 mb-3">
                {b.title}
              </h2>
              <p className="m-0 text-[16.5px] leading-[1.6] text-muted max-w-[34ch]">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The problem */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,96px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-[clamp(32px,4vw,56px)] items-start">
          <div>
            <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-5">
              The problem
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,3.4vw,42px)] leading-[1.06] tracking-[-0.034em] m-0 max-w-[20ch] text-balance">
              Cost hides in the way work gets done.
            </h2>
          </div>
          <div>
            <p className="m-0 mb-6.5 text-[17.5px] leading-[1.65] text-muted max-w-[54ch] text-pretty">
              Processes grow around exceptions, systems that never got connected and checks nobody has
              questioned in years. The cost is real but rarely sits in one place, which is why it survives
              budget rounds.
            </p>
            <div className="grid border-t border-line">
              {frictions.map((f) => (
                <div key={f.num} className="flex items-baseline gap-4 py-[15px] border-b border-line">
                  <span className="font-mono text-xs text-faint flex-none font-medium">{f.num}</span>
                  <span className="text-[16.5px] font-medium leading-[1.45]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost comparison — moved here from Use Cases so it supports the cost
          story right after "The problem" establishes why it matters. */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(56px,7vw,88px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-5">
            Why AutomateIT
          </div>
          <p className="m-0 mb-[clamp(28px,3vw,36px)] text-[17.5px] leading-[1.6] text-muted max-w-[56ch] text-pretty">
            Here&rsquo;s how that plays out against traditional enterprise RPA.
          </p>
          <div className="border border-line rounded overflow-hidden bg-card">
            <Image
              src="/AutomateIT_Cost_Comparison.png"
              alt="A lower-cost route to automation: AutomateIT avoids much of the licence and development overhead associated with traditional RPA."
              width={2520}
              height={1440}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border scroll-mt-[84px]">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,9vw,112px)]">
          <h2 className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-[22px]">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(28px,3vw,44px)] mt-[clamp(30px,4vw,44px)]">
            {stages.map((s) => (
              <div key={s.num} className="pt-6" style={{ borderTop: `3px solid ${s.hue}` }}>
                <div className="font-mono text-[13px] tracking-[0.1em] text-faint font-medium">{s.num}</div>
                <h3 className="font-display font-bold text-[clamp(26px,2.8vw,34px)] tracking-[-0.03em] mt-3 mb-3.5">
                  {s.title}
                </h3>
                <p className="m-0 mb-2.5 text-[16.5px] leading-[1.6] text-muted max-w-[32ch]">{s.body}</p>
                <p className="m-0 text-[16.5px] leading-[1.6] font-semibold max-w-[32ch]">{s.principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we help */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,96px)]">
          <div className="flex flex-wrap gap-5 items-end justify-between mb-[clamp(30px,4vw,42px)]">
            <div>
              <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-5">
                Where we help
              </div>
              <h2 className="font-display font-extrabold text-[clamp(28px,3.4vw,42px)] leading-[1.06] tracking-[-0.034em] m-0 max-w-[20ch]">
                Wherever information moves by hand.
              </h2>
            </div>
            <CtaText href="/use-cases">See the use cases</CtaText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-card border border-border rounded overflow-hidden">
            {areas.map((a) => (
              <div
                key={a.num}
                className="bg-card shadow-[0_0_0_1px_var(--color-border)] px-[22px] pt-6 pb-7 min-h-[160px] flex flex-col gap-2 transition-colors duration-200 hover:bg-tint"
              >
                <div className="font-mono text-xs tracking-[0.1em] text-faint font-medium">{a.num}</div>
                <h3 className="font-display font-bold text-[19px] tracking-[-0.022em] mt-1.5 mb-0">
                  {a.title}
                </h3>
                <p className="m-0 text-[16px] leading-[1.55] text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,96px)]">
          <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-faint font-medium mb-5">
            Outcomes
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,3.4vw,42px)] leading-[1.06] tracking-[-0.034em] m-0 mb-[clamp(32px,4vw,44px)] max-w-[20ch]">
            What changes when the work changes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(28px,4vw,48px)]">
            {outcomes.map((o) => (
              <div key={o.num} className="flex gap-[18px] items-baseline py-[22px] border-b border-line">
                <span className="font-mono text-xs text-accent flex-none font-medium">{o.num}</span>
                <div>
                  <div className="font-display font-bold text-xl tracking-[-0.024em]">{o.title}</div>
                  <div className="mt-1.5 text-[16px] leading-[1.55] text-muted">{o.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-alt">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(80px,11vw,136px)] grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-[clamp(28px,4vw,48px)] items-center">
          <h2 className="font-display font-extrabold text-[clamp(30px,4.2vw,54px)] leading-[1.04] tracking-[-0.036em] m-0 max-w-[22ch] text-balance">
            Ready to uncover where your business could save?
          </h2>
          <div>
            <CtaPrimary href="/contact?type=customer">Book a Free Cost Reduction Assessment</CtaPrimary>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="bg-[#004AAD] text-white">
        <div className="max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] py-[clamp(64px,8vw,100px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,5vw,64px)] items-start">
            <div>
              <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-[#8BCFFE] font-medium mb-5">
                For partners
              </div>
              <h2 className="font-display font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.034em] m-0 max-w-[22ch] text-balance">
                Deliver automation to your clients. We&rsquo;ll handle the delivery.
              </h2>
              <p className="mt-[22px] text-[17.5px] leading-[1.6] text-[#D8EBFB] max-w-[50ch] text-pretty">
                Bring automation opportunities to your clients without building your own automation
                infrastructure or delivery team. AutomateIT builds, hosts, manages and supports the
                solution while you maintain the client relationship.
              </p>
              <Link
                href="/contact?type=partner"
                className="inline-flex items-center justify-center min-h-14 px-7 mt-8 rounded-md bg-white text-[#004AAD] text-[17px] font-semibold transition-opacity duration-150 hover:opacity-[0.86]"
              >
                Partner with AutomateIT &#8594;
              </Link>
            </div>

            <div>
              <div className="font-display font-bold text-[clamp(19px,2.2vw,24px)] tracking-[-0.026em] mb-6">
                You own the relationship. We power the delivery.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-[18px] items-start">
                <div>
                  <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#8BCFFE] font-medium pb-3 border-b border-white/28">
                    You
                  </div>
                  <ul className="list-none m-0 p-0 grid gap-2.5 mt-3.5">
                    {partnerYou.map((p) => (
                      <li key={p} className="text-[16px] leading-[1.4] text-[#EAF4FE]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  aria-hidden="true"
                  className="text-xl text-[#8BCFFE] flex justify-center md:justify-start md:pt-[30px]"
                >
                  <span className="md:hidden">&#8595;</span>
                  <span className="hidden md:inline">&#8594;</span>
                </div>
                <div>
                  <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#8BCFFE] font-medium pb-3 border-b border-white/28">
                    AutomateIT
                  </div>
                  <ul className="list-none m-0 p-0 grid gap-2.5 mt-3.5">
                    {partnerUs.map((p) => (
                      <li key={p} className="text-[16px] leading-[1.4] text-[#EAF4FE]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[clamp(40px,5vw,56px)] pt-[clamp(28px,3vw,36px)] border-t border-white/22 grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,4vw,56px)]">
            <div className="flex flex-wrap gap-2">
              {partnerSupport.map((s) => (
                <span
                  key={s}
                  className="text-[15px] leading-none px-[13px] py-2.5 border border-white/35 rounded-full text-[#EAF4FE]"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="m-0 text-[17px] leading-[1.55] font-semibold text-white max-w-[40ch] text-pretty">
              No minimum revenue commitments. No sales quotas. No certifications. No unnecessarily complex
              partner rules.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
