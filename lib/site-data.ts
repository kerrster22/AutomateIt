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

export const whySlots = [
  { slot: "[ SLOT 01 ]", note: "Experience or capability statement, once verified." },
  { slot: "[ SLOT 02 ]", note: "Delivery or sector fact, once verified." },
  { slot: "[ SLOT 03 ]", note: "Platform, partnership or hosting capability." },
];

export const journey = [
  { num: "01", title: "Enquiry", body: "You describe the process that costs too much or takes too long." },
  { num: "02", title: "Assessment", body: "We review how it runs today and where the value is lost." },
  { num: "03", title: "Business case", body: "An estimate of the savings, before anything is built." },
  { num: "04", title: "Delivery", body: "Built, deployed and measured against that case." },
];

// The client has not yet supplied the final four use cases — these are the
// approved placeholder cards, not invented examples. See chats/chat1.md
// ("USE CASES" section, 2026-09-15 request): "four use cases... clearly
// replaceable placeholder content... Do not invent customer names,
// testimonials, percentages, savings or claims."
export const cases = [1, 2, 3, 4].map((i) => ({
  id: `use-case-0${i}`,
  eyebrow: `Use case 0${i}`,
  title: `Placeholder title ${i}`,
  rows: [
    { label: "Who it's for", body: "The function or role this applies to — to be supplied." },
    { label: "The problem", body: "What is costing time or money today — to be supplied." },
    { label: "The solution", body: "What AutomateIT puts in place — to be supplied." },
    { label: "The result", body: "The measurable operational or financial outcome — to be supplied." },
  ],
  contextLabel: `Use case 0${i}`,
}));
