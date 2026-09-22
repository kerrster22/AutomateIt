"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getStoredConsent, initAnalytics, setStoredConsent, subscribeConsent } from "@/lib/analytics";

function getServerSnapshot() {
  // Unknown on the server — render as already-decided so the banner never
  // flashes on first paint; the real value takes over once hydrated.
  return "denied" as const;
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getStoredConsent, getServerSnapshot);

  function accept() {
    setStoredConsent("granted");
    initAnalytics();
  }

  function reject() {
    setStoredConsent("denied");
  }

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-[clamp(18px,3vw,28px)] py-5"
    >
      <div className="max-w-[1180px] mx-auto flex flex-wrap items-center gap-x-8 gap-y-4 justify-between">
        <p className="m-0 text-[14.5px] leading-[1.55] text-muted max-w-[62ch]">
          We use analytics cookies to understand site traffic and improve the site. See our{" "}
          <Link href="/cookies" className="font-semibold text-accent border-b border-strong hover:border-accent">
            Cookie Preferences
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-none">
          <button
            type="button"
            onClick={reject}
            className="inline-flex items-center justify-center min-h-11 px-5 rounded-md border border-strong text-ink text-[15px] font-semibold cursor-pointer transition-colors duration-150 hover:border-ink"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center min-h-11 px-5 rounded-md border-0 bg-btn text-btnink text-[15px] font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-[0.86]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
