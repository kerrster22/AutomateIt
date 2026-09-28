import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AutomateIT collects, uses, stores and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display font-bold text-[24px] tracking-[-0.02em] mt-[clamp(40px,5vw,56px)] mb-4">
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[16.5px] leading-[1.65] text-muted mb-4">{children}</p>;
}

function Ul({ children }: { children: ReactNode }) {
  return <ul className="grid gap-2.5 mb-4 pl-5 list-disc marker:text-strong text-[16.5px] leading-[1.65] text-muted">{children}</ul>;
}

const lawfulBasis = [
  {
    purpose: "Responding to enquiries and arranging meetings or assessments",
    basis: "Legitimate interests in responding to and developing business opportunities; or steps taken before entering a contract",
  },
  { purpose: "Providing our products and services", basis: "Performance of a contract" },
  {
    purpose: "Managing customer, supplier and partner relationships",
    basis: "Performance of a contract and our legitimate business interests",
  },
  {
    purpose: "Operating, securing and improving our website",
    basis: "Legitimate interests in maintaining a secure and effective website",
  },
  { purpose: "Website analytics", basis: "Your consent where required" },
  {
    purpose: "Sending marketing communications",
    basis: "Consent where required, or legitimate interests where permitted by law",
  },
  {
    purpose: "Meeting accounting, tax, regulatory and legal obligations",
    basis: "Compliance with a legal obligation",
  },
  {
    purpose: "Establishing, exercising or defending legal claims",
    basis: "Legitimate interests and applicable legal provisions",
  },
];

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
        <p className="mt-4 text-[15px] font-mono tracking-[0.02em] text-faint">Last updated: 21 September 2026</p>

        <P>
          AutomateIT respects your privacy and is committed to protecting your personal data. This Privacy
          Policy explains how we collect, use, store and protect your personal data when you visit{" "}
          <strong className="text-ink">automateit.tech</strong>, contact us or otherwise interact with us.
        </P>

        <H2>1. Who we are</H2>
        <P>
          <strong className="text-ink">AutomateIT Limited</strong>, trading as{" "}
          <strong className="text-ink">AutomateIT</strong>, is the controller responsible for your personal
          data.
        </P>
        <P>Our details are:</P>
        <Ul>
          <li>Registered office: Unit 7, e-Space North, 181 Wisbech Road, Littleport, Cambs, CB6 1RA</li>
          <li>
            Email:{" "}
            <a href="mailto:info@automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
              info@automateit.tech
            </a>
          </li>
          <li>
            Website:{" "}
            <a href="https://automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
              https://automateit.tech
            </a>
          </li>
        </Ul>

        <H2>2. Personal data we collect</H2>
        <P>We may collect and process the following personal data:</P>
        <Ul>
          <li>
            <strong className="text-ink">Identity and contact data:</strong> your name, job title,
            organisation, telephone number and email address.
          </li>
          <li>
            <strong className="text-ink">Enquiry data:</strong> information you provide when completing a
            form, emailing us, requesting an assessment or communicating with us.
          </li>
          <li>
            <strong className="text-ink">Business relationship data:</strong> information relating to
            prospective customers, customers, suppliers and business partners.
          </li>
          <li>
            <strong className="text-ink">Technical and usage data:</strong> your IP address, browser type,
            device information, operating system, pages visited, referral source and how you interact with
            our website.
          </li>
          <li>
            <strong className="text-ink">Marketing data:</strong> your marketing preferences and records of
            your interactions with our communications.
          </li>
          <li>
            <strong className="text-ink">Cookie data:</strong> information collected through cookies and
            similar technologies, subject to your choices.
          </li>
        </Ul>
        <P>
          Please do not submit confidential, sensitive or special-category personal data through our general
          website contact forms unless we specifically ask you to do so.
        </P>

        <H2>3. How we collect your data</H2>
        <P>We collect personal data:</P>
        <Ul>
          <li>directly from you when you contact us, complete a website form or subscribe to communications;</li>
          <li>automatically when you use our website, through cookies and similar technologies;</li>
          <li>from publicly available sources, including company websites and professional networking platforms; and</li>
          <li>from business partners, referral partners or other third parties where they are permitted to share it with us.</li>
        </Ul>
        <P>Where we obtain your information from another source, we will provide the relevant privacy information when required by law.</P>

        <H2>4. How and why we use your data</H2>
        <P>We use personal data only where we have a lawful basis to do so.</P>
        <div className="grid gap-px bg-border border border-border rounded overflow-hidden mb-6">
          {lawfulBasis.map((row) => (
            <div key={row.purpose} className="bg-card grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 p-4">
              <div className="text-[15.5px] font-semibold">{row.purpose}</div>
              <div className="text-[15.5px] leading-[1.55] text-muted">{row.basis}</div>
            </div>
          ))}
        </div>
        <P>Where we rely on legitimate interests, we consider whether our interests are proportionate and whether your rights and interests should take priority.</P>
        <P>
          You can unsubscribe from marketing emails at any time by using the unsubscribe link in the email or
          contacting{" "}
          <a href="mailto:info@automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
            info@automateit.tech
          </a>
          .
        </P>

        <H2>5. Who we share your data with</H2>
        <P>We may share personal data with trusted organisations that help us operate our business, including:</P>
        <Ul>
          <li>website hosting and technical support providers;</li>
          <li>email, communications and customer relationship management providers;</li>
          <li>analytics providers, where you have accepted analytics cookies;</li>
          <li>professional advisers, including accountants, lawyers and insurers;</li>
          <li>business partners involved in responding to your enquiry or delivering services, where appropriate and lawful; and</li>
          <li>regulators, courts, law-enforcement bodies or other authorities where required by law.</li>
        </Ul>
        <P>
          These organisations may act as processors on our behalf or as independent controllers. Where a
          supplier processes data on our behalf, we require it to protect the information and use it only in
          accordance with our instructions and applicable law.
        </P>
        <P>We do not sell your personal data.</P>

        <H2>6. International transfers</H2>
        <P>Some of our technology or service providers may process personal data outside the United Kingdom.</P>
        <P>
          Where personal data is transferred internationally, we use appropriate safeguards as required by UK
          data-protection law. These may include UK adequacy regulations, the UK International Data Transfer
          Agreement or the UK Addendum to approved contractual clauses.
        </P>
        <P>You may contact us for further information about the safeguards applying to your personal data.</P>

        <H2>7. Cookies and similar technologies</H2>
        <P>Our website may use:</P>
        <Ul>
          <li><strong className="text-ink">strictly necessary cookies</strong>, required for the website to operate securely;</li>
          <li><strong className="text-ink">analytics cookies</strong>, which help us understand how visitors use the website; and</li>
          <li><strong className="text-ink">functionality or marketing cookies</strong>, where applicable.</li>
        </Ul>
        <P>
          Except where the law allows otherwise, we will not place non-essential cookies on your device
          without your consent. You can accept, reject or manage non-essential cookies through our{" "}
          <a href="/cookies" className="font-semibold text-accent border-b border-strong hover:border-accent">
            cookie banner or preference centre
          </a>
          .
        </P>
        <P>
          Further details, including the cookies used, their providers, purposes and expiry periods, should
          be included in our{" "}
          <a href="/cookies" className="font-semibold text-accent border-b border-strong hover:border-accent">
            Cookie Policy
          </a>{" "}
          or cookie preference centre.
        </P>
        <P>Changing your browser settings alone may not remove information already collected through cookies.</P>

        <H2>8. How long we retain your data</H2>
        <P>
          We retain personal data only for as long as reasonably necessary for the purpose for which it was
          collected, including meeting legal, regulatory, tax, accounting and reporting requirements.
        </P>
        <P>As a general guide:</P>
        <Ul>
          <li>website enquiries that do not lead to a business relationship are retained for 24 months;</li>
          <li>customer, supplier and contractual records are normally retained for six years after the relationship ends;</li>
          <li>marketing records are retained until you unsubscribe or object, after which we may retain limited suppression information to ensure we respect your preference;</li>
          <li>cookie and analytics information are retained for the period stated in our Cookie Policy or preference centre; and</li>
          <li>records relevant to a dispute or legal claim may be retained until that matter has been concluded.</li>
        </Ul>
        <P>We may retain anonymised information indefinitely where it can no longer identify an individual.</P>

        <H2>9. Data security</H2>
        <P>
          We use appropriate technical and organisational measures designed to protect personal data against
          accidental or unlawful loss, alteration, disclosure, misuse or unauthorised access.
        </P>
        <P>
          Access to personal data is limited to people and service providers who need it for legitimate
          business purposes and who are subject to appropriate confidentiality obligations.
        </P>
        <P>No internet transmission or storage system can be guaranteed to be completely secure.</P>

        <H2>10. Your data-protection rights</H2>
        <P>Depending on the circumstances, you may have the right to:</P>
        <Ul>
          <li>request access to your personal data;</li>
          <li>ask us to correct inaccurate or incomplete data;</li>
          <li>ask us to erase your personal data;</li>
          <li>ask us to restrict how your data is used;</li>
          <li>object to processing based on legitimate interests;</li>
          <li>object at any time to direct marketing;</li>
          <li>receive certain personal data in a portable format;</li>
          <li>withdraw consent at any time, where processing is based on consent; and</li>
          <li>ask for human intervention where a legally significant decision has been made solely by automated means.</li>
        </Ul>
        <P>These rights are not absolute and may be subject to legal conditions or exemptions.</P>
        <P>
          To exercise a right or raise a data-protection complaint, email{" "}
          <a href="mailto:info@automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
            info@automateit.tech
          </a>
          . We may need to verify your identity before responding.
        </P>

        <H2>11. Automated decision-making</H2>
        <P>
          We do not currently use personal data collected through this website to make decisions about
          individuals solely by automated means where those decisions would have legal or similarly
          significant effects.
        </P>
        <P>If this changes, we will provide appropriate information and safeguards.</P>

        <H2>12. Complaints</H2>
        <P>
          If you have concerns about how we use your personal data, please contact us first at{" "}
          <a href="mailto:info@automateit.tech" className="font-semibold text-accent border-b border-strong hover:border-accent">
            info@automateit.tech
          </a>
          . We will investigate your complaint and inform you of the outcome.
        </P>
        <P>You also have the right to complain to the Information Commissioner&rsquo;s Office:</P>
        <div className="border border-line rounded bg-card p-4 mb-4 text-[16px] leading-[1.6] text-muted">
          <div className="font-semibold text-ink mb-1">Information Commissioner&rsquo;s Office</div>
          <div>Wycliffe House</div>
          <div>Water Lane</div>
          <div>Wilmslow</div>
          <div>Cheshire</div>
          <div>SK9 5AF</div>
          <div className="mt-2">Telephone: 0303 123 1113</div>
          <div>
            Website:{" "}
            <a href="https://ico.org.uk/make-a-complaint/" className="font-semibold text-accent border-b border-strong hover:border-accent">
              https://ico.org.uk/make-a-complaint/
            </a>
          </div>
        </div>

        <H2>13. Third-party websites</H2>
        <P>
          Our website may contain links to websites operated by third parties. We do not control these
          websites and are not responsible for their privacy practices. We recommend reviewing the privacy
          information provided by each third-party website you visit.
        </P>

        <H2>14. Children</H2>
        <P>
          Our website and services are intended for businesses and are not directed at children. We do not
          knowingly collect personal data from children through the website.
        </P>

        <H2>15. Changes to this policy</H2>
        <P>
          We may update this Privacy Policy to reflect changes to our services, technology or legal
          obligations. The latest version will be published on this page with the revised &ldquo;last
          updated&rdquo; date.
        </P>
      </section>
    </main>
  );
}
