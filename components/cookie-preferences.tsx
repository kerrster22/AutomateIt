"use client";

import { useSyncExternalStore } from "react";
import { getStoredConsent, initAnalytics, setStoredConsent, subscribeConsent } from "@/lib/analytics";

function getServerSnapshot() {
  return null;
}

export function CookiePreferences() {
  const consent = useSyncExternalStore(subscribeConsent, getStoredConsent, getServerSnapshot);

  function accept() {
    setStoredConsent("granted");
    initAnalytics();
  }

  function reject() {
    setStoredConsent("denied");
  }

  const statusLabel = consent === "granted" ? "Analytics cookies: on" : consent === "denied" ? "Analytics cookies: off" : "Analytics cookies: not yet chosen";

  return (
    <div className="mt-8 border border-line rounded bg-card p-[clamp(22px,3vw,32px)] max-w-[520px]">
      <div className="font-mono text-xs tracking-[0.1em] uppercase text-faint font-medium mb-2">
        Current setting
      </div>
      <div className="text-[17px] font-semibold mb-6">{statusLabel}</div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reject}
          className="inline-flex items-center justify-center min-h-12 px-5 rounded-md border border-strong text-ink text-[15px] font-semibold cursor-pointer transition-colors duration-150 hover:border-ink"
        >
          Turn off
        </button>
        <button
          type="button"
          onClick={accept}
          className="inline-flex items-center justify-center min-h-12 px-5 rounded-md border-0 bg-btn text-btnink text-[15px] font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-[0.86]"
        >
          Turn on
        </button>
      </div>
    </div>
  );
}
