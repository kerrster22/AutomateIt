import { getStoredConsent, initAnalytics, trackPageview } from "@/lib/analytics";

if (getStoredConsent() === "granted") {
  initAnalytics();
}

export function onRouterTransitionStart(url: string) {
  trackPageview(url);
}
