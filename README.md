# AutomateIT website

This repo is a Next.js (App Router) + Tailwind CSS implementation of the AutomateIT
marketing site, built from the Claude Design handoff bundle described below (see
`chats/` and `project/` for the original design source and its approval history).

## Running the site

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Four pages: Home (`/`), What We Do (`/what-we-do`), Use Cases (`/use-cases`) and
Contact (`/contact`). Light/dark theme is a manual toggle (persisted to
`localStorage`), styled with CSS custom properties in `app/globals.css`. Content
copy lives in `lib/site-data.ts`, transcribed verbatim from the approved design —
see the file's header comment for provenance notes (e.g. the four Use Cases are
still client-supplied placeholders, not invented examples).

The contact form validates client-side and submits to `app/api/contact/route.ts`,
which sends mail via Microsoft Graph (delegated through an Entra ID app
registration using client-credentials auth — see `.env.example` for the
required variables).

Analytics is Google Analytics 4, gated behind the cookie banner
(`components/cookie-consent.tsx`) — nothing loads until a visitor accepts.
Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (see `.env.example`) to enable it.
`instrumentation-client.ts` boots it on return visits and fires a manual
`page_view` on client-side navigations (see `lib/analytics.ts`). Contact form
submissions fire a `generate_lead` event with an `enquiry_type` param
("Customer" or "Partner") so the two can be split in reports — mark
`generate_lead` as a key event and register `enquiry_type` as a custom
dimension in the GA4 admin UI to see it broken out.

---

# CODING AGENTS: READ THIS FIRST

**Status: implemented.** The section below is the original Claude Design handoff
note, kept for reference/history. It no longer describes an open task.

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 2 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/AutomateIT Website.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `AutomateIT website redesign` project files (HTML prototypes, assets, components)
