"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LinkedInIcon } from "./linkedin-icon";
import { trackEvent } from "@/lib/analytics";

type EnquiryType = "Customer" | "Partner";

const ENQUIRY_TYPES: readonly EnquiryType[] = ["Customer", "Partner"];

type FormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function errorsFor(f: FormState) {
  return {
    name: !f.name.trim(),
    email: !EMAIL_RE.test(f.email.trim()),
    message: f.message.trim().length < 10,
  };
}

export function ContactForm({
  initialContext,
  initialEnq,
}: {
  initialContext?: string;
  initialEnq: EnquiryType;
}) {
  const [enq, setEnq] = useState<EnquiryType>(initialEnq);
  const [context, setContext] = useState(initialContext ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", company: "", email: "", message: "" });
  const [submitError, setSubmitError] = useState("");
  const radioRefs = useRef<Partial<Record<EnquiryType, HTMLButtonElement | null>>>({});

  function onRadioKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const forward = e.key === "ArrowRight" || e.key === "ArrowDown";
    const backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
    if (!forward && !backward) return;
    e.preventDefault();
    const currentIndex = ENQUIRY_TYPES.indexOf(enq);
    const nextIndex =
      (currentIndex + (forward ? 1 : -1) + ENQUIRY_TYPES.length) % ENQUIRY_TYPES.length;
    const next = ENQUIRY_TYPES[nextIndex];
    setEnq(next);
    radioRefs.current[next]?.focus();
  }

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const errs = errorsFor(form);
  const showErrors = touched && status !== "sent";
  const nameInvalid = showErrors && errs.name;
  const emailInvalid = showErrors && errs.email;
  const messageInvalid = showErrors && errs.message;
  const anyInvalid = nameInvalid || emailInvalid || messageInvalid;

  const isPartner = enq === "Partner";
  const contactLead = isPartner ? "Let’s grow together." : "Let’s unlock your savings.";
  const contactSub = isPartner
    ? "Talk to us about bringing managed automation to your clients with AutomateIT handling the delivery."
    : "Book your free Cost Reduction Assessment today.";

  const submitLabel = status === "sending" ? "Sending…" : isPartner ? "Send Partner Enquiry" : "Book My Free Assessment";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = errorsFor(form);
    if (errors.name || errors.email || errors.message) {
      setTouched(true);
      setStatus("idle");
      return;
    }
    setTouched(true);
    setStatus("sending");
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, enq, context }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      trackEvent("generate_lead", { enquiry_type: enq });
      setStatus("sent");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-[clamp(36px,5vw,64px)] items-start max-w-[1180px] mx-auto px-[clamp(18px,3vw,28px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div>
        <div className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-accent font-medium mb-[26px]">
          Contact
        </div>
        <h1 className="font-display font-extrabold text-[clamp(34px,4.6vw,60px)] leading-[1.0] tracking-[-0.04em] m-0 max-w-[14ch] text-balance">
          Reduce Costs. Unlock Growth.
        </h1>
        <p className="mt-6 mb-0 text-[18.5px] leading-[1.55] font-semibold max-w-[34ch]">{contactLead}</p>
        <p className="mt-2 mb-0 text-[17.5px] leading-[1.6] text-muted max-w-[42ch]">{contactSub}</p>

        {context ? (
          <div className="mt-[30px] border border-line rounded bg-alt px-5 py-[18px] max-w-[420px]">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-3">
              You&rsquo;re contacting us about
            </div>
            <div className="inline-flex items-center gap-3 border border-strong rounded bg-card py-2 pr-2 pl-3.5">
              <span className="text-base font-semibold">{context}</span>
              <button
                type="button"
                onClick={() => setContext("")}
                aria-label="Remove subject"
                className="inline-flex items-center justify-center w-8 h-8 rounded border-0 bg-transparent cursor-pointer text-muted text-[17px] leading-none hover:bg-tint"
              >
                &#215;
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-9 border-t border-border max-w-[440px]">
          <div className="py-[22px] border-b border-border">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2.5">
              What happens next?
            </div>
            <p className="m-0 text-[16.5px] leading-[1.6] text-muted">
              We review your enquiry, then arrange a conversation about your processes, where cost is going
              and which opportunities are worth pursuing.
            </p>
          </div>
          <div className="py-5 border-b border-border">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2">
              Email
            </div>
            <a
              href="mailto:info@automateit.tech"
              className="text-[17px] font-medium border-b border-strong pb-0.5 hover:border-ink"
            >
              info@automateit.tech
            </a>
          </div>
          <div className="py-5">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-faint font-medium mb-2">
              LinkedIn
            </div>
            <a
              href="https://www.linkedin.com/company/automate-it-tech/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[17px] font-medium border-b border-strong pb-0.5 hover:border-ink"
            >
              <LinkedInIcon />
              Automate It Tech
            </a>
          </div>
        </div>

        <p className="mt-[30px] mb-0 text-[17px] leading-[1.6] font-semibold max-w-[40ch] border-l-[3px] border-accent2 pl-[18px] text-pretty">
          We don&rsquo;t just implement automation, we deliver measurable cost savings that improve your
          bottom line.
        </p>
      </div>

      {status === "sent" ? (
        <div className="border border-line rounded bg-card p-[clamp(28px,4vw,40px)]" role="status">
          <div className="inline-flex items-center border border-success rounded px-3 py-[7px] font-mono text-xs tracking-[0.1em] uppercase text-success font-medium">
            Enquiry received
          </div>
          <h2 className="font-display font-bold text-[clamp(25px,2.8vw,32px)] leading-[1.15] tracking-[-0.03em] mt-[22px] mb-3">
            Thanks for getting in touch.
          </h2>
          <p className="m-0 mb-7 text-[17px] leading-[1.6] text-muted max-w-[44ch]">
            We&rsquo;ve received your enquiry and a member of the AutomateIT team will be in touch soon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[52px] px-[26px] rounded-md border border-strong text-base font-semibold hover:border-ink"
          >
            Return home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="border border-border rounded bg-card px-[clamp(22px,3vw,32px)] pt-[clamp(26px,4vw,36px)] pb-[clamp(28px,4vw,38px)] grid gap-[22px]"
        >
          {anyInvalid ? (
            <div role="alert" className="border border-error rounded px-4 py-3.5 flex gap-3 items-start">
              <span aria-hidden="true" className="font-mono text-sm text-error font-medium">
                !
              </span>
              <span className="text-base leading-[1.5] text-error">
                Please check the highlighted fields and try again.
              </span>
            </div>
          ) : null}

          {status === "error" ? (
            <div role="alert" className="border border-error rounded px-4 py-3.5 flex gap-3 items-start">
              <span aria-hidden="true" className="font-mono text-sm text-error font-medium">
                !
              </span>
              <span className="text-base leading-[1.5] text-error">{submitError}</span>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            <label className="grid gap-2">
              <span className="text-[16px] font-semibold">
                Name <span aria-hidden="true" className="text-accent">*</span>
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={setField("name")}
                aria-invalid={nameInvalid}
                placeholder="Jane Whitfield"
                className={`min-h-[50px] px-3.5 rounded border bg-bg text-ink text-base outline-none transition-colors duration-150 hover:border-ink focus:border-accent ${
                  nameInvalid ? "border-error" : "border-line"
                }`}
              />
              {nameInvalid ? (
                <span className="flex gap-2 items-baseline text-[16px] text-error">
                  <span aria-hidden="true" className="font-mono">
                    !
                  </span>
                  Enter your name.
                </span>
              ) : null}
            </label>
            <label className="grid gap-2">
              <span className="text-[16px] font-semibold">Company</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={form.company}
                onChange={setField("company")}
                placeholder="Whitfield Logistics"
                className="min-h-[50px] px-3.5 rounded border border-line bg-bg text-ink text-base outline-none transition-colors duration-150 hover:border-ink focus:border-accent"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-[16px] font-semibold">
              Email <span aria-hidden="true" className="text-accent">*</span>
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={setField("email")}
              aria-invalid={emailInvalid}
              placeholder="jane@company.co.uk"
              className={`min-h-[50px] px-3.5 rounded border bg-bg text-ink text-base outline-none transition-colors duration-150 hover:border-ink focus:border-accent ${
                emailInvalid ? "border-error" : "border-line"
              }`}
            />
            {emailInvalid ? (
              <span className="flex gap-2 items-baseline text-[16px] text-error">
                <span aria-hidden="true" className="font-mono">
                  !
                </span>
                Enter a valid email address.
              </span>
            ) : null}
          </label>

          <fieldset className="border-0 p-0 m-0 grid gap-3">
            <legend className="p-0 text-[16px] font-semibold">I am a</legend>
            <div role="radiogroup" aria-label="I am a" className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ENQUIRY_TYPES.map((o) => {
                const active = enq === o;
                return (
                  <button
                    key={o}
                    ref={(el) => {
                      radioRefs.current[o] = el;
                    }}
                    type="button"
                    onClick={() => setEnq(o)}
                    onKeyDown={onRadioKeyDown}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    className={`flex items-center gap-3 text-left cursor-pointer min-h-16 px-4 py-2.5 rounded border text-ink transition-colors duration-150 hover:border-ink ${
                      active ? "border-accent bg-tint" : "border-line bg-bg"
                    }`}
                  >
                    <span
                      className={`flex-none w-5 h-5 rounded-full border-[1.5px] inline-flex items-center justify-center ${
                        active ? "border-accent" : "border-strong"
                      }`}
                    >
                      {active ? <span className="w-2.5 h-2.5 rounded-full bg-accent" /> : null}
                    </span>
                    <span className="grid gap-0.5">
                      <span className="text-base font-semibold">{o === "Customer" ? "Customer / Client" : o}</span>
                      <span className="text-[14.5px] text-muted font-normal">
                        {o === "Customer" ? "Looking to reduce costs in my business" : "Looking to deliver automation to my clients"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="grid gap-2">
            <span className="text-[16px] font-semibold">
              Message <span aria-hidden="true" className="text-accent">*</span>
            </span>
            <textarea
              name="message"
              rows={6}
              required
              value={form.message}
              onChange={setField("message")}
              aria-invalid={messageInvalid}
              placeholder="Tell us about the process that takes too long, costs too much, or goes wrong too often."
              className={`p-3.5 rounded border bg-bg text-ink text-base leading-[1.55] resize-y outline-none transition-colors duration-150 hover:border-ink focus:border-accent ${
                messageInvalid ? "border-error" : "border-line"
              }`}
            />
            {messageInvalid ? (
              <span className="flex gap-2 items-baseline text-[16px] text-error">
                <span aria-hidden="true" className="font-mono">
                  !
                </span>
                Tell us a little about the process.
              </span>
            ) : null}
          </label>

          <p className="m-0 text-[16px] leading-[1.5] text-muted">
            We aim to respond to enquiries within 24 hours.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              aria-busy={status === "sending"}
              className={`border-0 inline-flex items-center justify-center min-h-14 px-7 rounded-md bg-btn text-btnink text-[17px] font-semibold transition-opacity duration-150 hover:opacity-[0.86] ${
                status === "sending" ? "cursor-progress opacity-[0.55]" : "cursor-pointer opacity-100"
              }`}
            >
              {submitLabel}
            </button>
            <span className="font-mono text-[13px] tracking-[0.06em] text-faint">* Required</span>
          </div>

          <p className="m-0 text-[16px] leading-[1.6] text-muted max-w-[62ch]">
            We&rsquo;ll use your details to respond to your enquiry and handle them in accordance with our{" "}
            <Link href="/privacy" className="font-semibold text-accent border-b border-strong hover:border-accent">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
