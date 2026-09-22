export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const ANALYTICS_CONSENT_KEY = "analytics-consent";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function getStoredConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

type Listener = () => void;
const consentListeners = new Set<Listener>();

// For useSyncExternalStore in the cookie banner — localStorage writes made
// from this same tab don't fire the browser's `storage` event, so the
// banner notifies its own listeners directly after writing.
export function subscribeConsent(listener: Listener) {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
}

export function setStoredConsent(value: Consent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // Storage unavailable (e.g. private browsing) — consent choice won't
    // persist across visits, but the current session still respects it.
  }
  consentListeners.forEach((listener) => listener());
}

// Loads gtag.js and starts sending events. Only call this once consent has
// been granted — either from a prior visit (checked at boot in
// instrumentation-client.ts) or from the cookie banner's Accept action.
export function initAnalytics() {
  if (initialized || !GA_MEASUREMENT_ID || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // Re-checked per call (not just at load time) so revoking consent on the
  // /cookies page stops tracking immediately, without needing a reload.
  if (getStoredConsent() !== "granted") return;
  window.gtag("event", name, params);
}

// Manual pageview for client-side (App Router) navigations — the automatic
// page_view sent by `config` above only covers the first load.
export function trackPageview(url: string) {
  trackEvent("page_view", { page_path: url });
}
