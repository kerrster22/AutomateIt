// Simple in-memory sliding-window rate limiter, keyed by IP. Correct and
// effective on a persistently-running Node server (VPS, Docker, `next
// start`). On serverless hosting (e.g. Vercel) each instance has its own
// memory, so a burst spread across cold-started instances could partially
// evade this — if that turns out to matter in practice, swap this module's
// internals for a shared store (Upstash Redis / Vercel KV) without changing
// the call site below.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

// Periodically forget IPs with no recent activity so this map doesn't grow
// unbounded over the life of a long-running server process.
setInterval(
  () => {
    const cutoff = Date.now() - WINDOW_MS;
    for (const [key, timestamps] of hits) {
      if (timestamps.every((t) => t < cutoff)) hits.delete(key);
    }
  },
  60 * 60 * 1000
).unref?.();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function clientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
