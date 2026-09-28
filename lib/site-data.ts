// Content transcribed verbatim from the approved Claude Design handoff
// (`project/AutomateIT Website.dc.html`). See chats/chat1.md and chats/chat2.md
// for the approval history behind this copy — nothing here is invented.

export const benefits = [
  {
    title: "Solve Business Problems",
    body: "Identify the inefficiencies actually costing the organisation money.",
  },
  {
    title: "Reduce Costs",
    body: "Remove unnecessary operational overhead through targeted improvement and automation.",
  },
  {
    title: "Deliver Measurable Benefits",
    body: "Focus on solutions where the financial and operational impact can be demonstrated.",
  },
];

export const stages = [
  {
    num: "01",
    title: "Ideation",
    body: "Discover, prioritise and prove the value.",
    principle: "Start with the business case, not the technology.",
    hue: "#004AAD",
  },
  {
    num: "02",
    title: "Automation",
    body: "Build, deploy and scale.",
    principle: "Turn the opportunity into a working solution.",
    hue: "#308CE0",
  },
  {
    num: "03",
    title: "Trust",
    body: "Governance, guardrails and assurance.",
    principle: "Build trust into the solution.",
    hue: "#8BCFFE",
  },
];

export const frictions = [
  { num: "01", label: "The same data typed into two systems" },
  { num: "02", label: "Approvals that live in email threads" },
  { num: "03", label: "Reports rebuilt by hand every week" },
  { num: "04", label: "Work that stops when one person is away" },
];

export const areas = [
  { num: "01", title: "Finance & Accounting", body: "Invoices, reconciliation, expenses, month-end." },
  { num: "02", title: "Operations", body: "Scheduling, data movement, reporting, exceptions." },
  { num: "03", title: "HR", body: "Onboarding, absence, records, compliance tasks." },
  { num: "04", title: "Customer Service", body: "Triage, routine responses, case context." },
  { num: "05", title: "Sales & Marketing", body: "Lead routing, follow-up, proposal preparation." },
  { num: "06", title: "Procurement", body: "Requests, approvals, supplier records, orders." },
  { num: "07", title: "IT Management", body: "Access requests, provisioning, routine tickets." },
  { num: "08", title: "Project Management", body: "Status collection, reporting, task handoffs." },
];

export const outcomes = [
  { num: "01", title: "Less repetitive work", body: "Fewer hours spent moving information from one place to another." },
  { num: "02", title: "Lower operating costs", body: "The same output without the manual overhead around it." },
  { num: "03", title: "Fewer errors", body: "Rules applied the same way every time, with exceptions surfaced." },
  { num: "04", title: "Better customer experience", body: "Quicker responses and fewer things falling through gaps." },
  { num: "05", title: "More time for your team", body: "Capacity released for the work that needs judgement." },
  { num: "06", title: "Processes that scale", body: "Growth that does not require proportional headcount." },
];

export const partnerYou = ["Client Relationship", "Opportunity Identification", "Process Discovery", "Business Case"];
export const partnerUs = ["Build", "Deploy", "Host", "Monitor", "Support"];
export const partnerSupport = [
  "Go-to-market support",
  "Campaign and outreach materials",
  "Co-branded collateral",
  "Pre-sales technical guidance",
  "Solution design support",
  "Commercial support",
  "Delivery and hosting",
  "Ongoing monitoring and support",
];

export const cost = [
  { letter: "C", word: "Capture", body: "Understand processes." },
  { letter: "O", word: "Optimise", body: "Identify inefficiencies." },
  { letter: "S", word: "Simplify", body: "Remove manual effort through intelligent automation." },
  { letter: "T", word: "Transform", body: "Deliver measurable business improvement." },
];

export const approach = [
  { num: "01", title: "Business Process Review", body: "How the work runs today, with the people who run it.", hue: "#004AAD" },
  { num: "02", title: "Opportunity Identification", body: "Where effort, error and delay are concentrated.", hue: "#004AAD" },
  { num: "03", title: "Potential Savings Estimate", body: "The financial value, before anything is built.", hue: "#308CE0" },
  { num: "04", title: "Automation", body: "Built, tested and deployed against the agreed case.", hue: "#308CE0" },
  { num: "05", title: "Trust Roadmap", body: "Governance, controls and assurance over time.", hue: "#8BCFFE" },
];

export const offers = [
  {
    title: "Ideation",
    body: "Capture, evaluate and prioritise opportunities.",
    points: ["Process review workshops", "Opportunity scoring", "Savings estimate"],
  },
  {
    title: "Intelligent Automation",
    body: "Automate repetitive and knowledge-based work.",
    points: ["Workflow and approvals", "System-to-system integration", "Document and data handling"],
  },
  {
    title: "Trust",
    body: "Security, governance, compliance and data protection.",
    points: ["Access and audit controls", "Compliance alignment", "Monitoring and assurance"],
  },
];

export const method = [
  { num: "01", title: "Discover", body: "Understand the process as it actually runs.", out: "Process map" },
  { num: "02", title: "Analyse", body: "Quantify time, cost, error rates and lost value.", out: "Baseline" },
  { num: "03", title: "Improve", body: "Redesign first. Remove steps before adding tools.", out: "Target process" },
  { num: "04", title: "Automate", body: "Implement the right technology for the new process.", out: "Working solution" },
  { num: "05", title: "Measure", body: "Compare against the baseline and keep refining.", out: "Reported results" },
];

export const whyStatement =
  "AutomateIT delivers subscription-based automation for a fixed monthly fee. It's affordable, " +
  "scalable and built to evolve with your business, with continuous support included.";

export const whySlots = [
  {
    slot: "01",
    note: "Reduce operating costs, improve efficiency and unlock growth through intelligent automation.",
  },
  {
    slot: "02",
    note: "Practical, affordable solutions for organisations across every sector.",
  },
  {
    slot: "03",
    note: "A flexible, fully hosted platform with secure cloud or on-premise deployment, and ongoing technical support through our technology partners.",
  },
];

export const journey = [
  { num: "01", title: "Enquiry", body: "You describe the process that costs too much or takes too long." },
  { num: "02", title: "Assessment", body: "We review how it runs today and where the value is lost." },
  { num: "03", title: "Business case", body: "An estimate of the savings, before anything is built." },
  { num: "04", title: "Delivery", body: "Built, deployed and measured against that case." },
];

export type UseCaseVideo = {
  src: string;
  poster?: string;
  /** Track file (e.g. .vtt) for captions — keep accessible if a video is added. */
  captionsSrc?: string;
};

export type UseCase = {
  id: string;
  eyebrow: string;
  title: string;
  rows: { label: string; body: string }[];
  /** Concrete measurable outcomes, shown under "Proof / example". */
  proof: string[];
  contextLabel: string;
  /** Optional — a case renders normally with no video when this is absent. */
  video?: UseCaseVideo;
};

// Real use cases supplied by the client (2026-09-29). Figures and outcomes
// are theirs, transcribed as given — not invented or estimated by us.
export const cases: UseCase[] = [
  {
    id: "use-case-01",
    eyebrow: "Use case 01",
    title: "A catering supplies company",
    contextLabel: "Invoice processing automation",
    rows: [
      {
        label: "Who it's for",
        body: "A catering supplies company processing around 5,000 supplier invoices each month.",
      },
      {
        label: "The problem",
        body: "Eight Accounts Payable staff manually downloaded invoices from emails, entered the details into the ERP system and matched them against purchase orders.",
      },
      {
        label: "The solution",
        body: "Two automations extract data from PDFs and emails, validate each invoice against the relevant purchase order and route any exceptions to the AP team for review.",
      },
      {
        label: "The result",
        body: "The same invoice volume is now handled by two automations instead of eight staff, freeing the team to focus on exceptions and higher-value work.",
      },
    ],
    proof: [
      "Processing time reduced from 10 minutes to 45 seconds",
      "80–90% less manual processing",
      "Estimated saving of £15–£25 per invoice",
      "Potential monthly saving of £75,000–£125,000",
    ],
  },
  {
    id: "use-case-02",
    eyebrow: "Use case 02",
    title: "An insurance company",
    contextLabel: "Insurance claims automation",
    rows: [
      {
        label: "Who it's for",
        body: "An insurance company processing a high volume of vehicle insurance claims.",
      },
      {
        label: "The problem",
        body: "Its claims team manually checked policy details, reviewed supporting documents, requested approvals and arranged payments — a process that could take several days.",
      },
      {
        label: "The solution",
        body: "Automation now verifies claim information, validates documents, routes approvals and processes eligible payments from end to end.",
      },
      {
        label: "The result",
        body: "Claims are resolved far faster, complex cases still get specialist attention, and the process scales without extra headcount.",
      },
    ],
    proof: [
      "Claims processed in hours rather than days",
      "Straightforward claims completed automatically",
      "Complex cases routed to claims specialists",
      "Consistent policy and document validation to identify fraudulent claims",
      "More than £100,000 in estimated annual savings",
      "Scalable processing without increasing headcount",
    ],
  },
  {
    id: "use-case-03",
    eyebrow: "Use case 03",
    title: "A recruitment consultant and head-hunting company",
    contextLabel: "Recruitment & candidate processing automation",
    rows: [
      {
        label: "Who it's for",
        body: "A recruitment consultant and head-hunting company whose consultants spent significant time reviewing CVs and on administration.",
      },
      {
        label: "The problem",
        body: "Consultants previously spent significant time reviewing CVs, updating applicant tracking system records, arranging interviews and sending candidate updates.",
      },
      {
        label: "The solution",
        body: "Automation now processes applications, updates candidate records, schedules interviews and sends personalised notifications.",
      },
      {
        label: "The result",
        body: "Recruiters have far more time for candidate engagement and client relationships, while processing significantly more candidates.",
      },
    ],
    proof: [
      "Processing reduced from 5–7 minutes to 1 minute per candidate",
      "Around 200 hours saved each month",
      "Five times more candidates processed by the same team",
      "Faster communication and interview scheduling",
    ],
  },
  {
    id: "use-case-04",
    eyebrow: "Use case 04",
    title: "An accountancy company",
    contextLabel: "Tax return preparation automation",
    rows: [
      {
        label: "Who it's for",
        body: "An accountancy company preparing tax returns for hundreds of sole traders, landlords and small businesses.",
      },
      {
        label: "The problem",
        body: "The team manually collected financial data from multiple systems, calculated liabilities and prepared each filing — creating significant pressure during peak periods.",
      },
      {
        label: "The solution",
        body: "Automation now gathers and validates the data, calculates tax obligations, prepares returns and submits them through HMRC-compatible software.",
      },
      {
        label: "The result",
        body: "The firm has far greater capacity during peak filing periods, with fewer manual errors and a lower risk of missed deadlines.",
      },
    ],
    proof: [
      "50–70% reduction in preparation time",
      "Greater capacity during peak filing periods",
      "Manual calculation errors substantially reduced",
      "Lower risk of missed deadlines and penalties",
      "Digital records and submissions aligned with HMRC's Making Tax Digital requirements — MTD for Income Tax applies from April 2026 to qualifying sole traders and landlords with self-employment and property income over £50,000",
    ],
  },
];
