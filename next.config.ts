import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Next.js's App Router streams server-component payloads via its own inline
// `<script>self.__next_f.push(...)</script>` tags on every page — content
// that's unique per route/build, so it can't be pinned with a static hash.
// Nonce-based CSP is the alternative, but that requires every page to opt
// into dynamic rendering (no static generation), which isn't a fit for a
// static marketing site. So — matching Next's own documented "without
// nonces" CSP recipe — script-src uses 'self' + 'unsafe-inline' rather than
// hashes. There's no reflected/stored user input rendered as raw HTML
// anywhere in this app (React escapes everything; our few
// dangerouslySetInnerHTML uses are static, developer-authored JSON/JS, never
// user input), so the residual inline-script risk this leaves open has no
// known injection point today — but it's the one CSP tradeoff worth
// revisiting if that ever changes.
const cspDirectives = [
  `default-src 'self'`,
  // googletagmanager.com is Google Analytics (gtag.js) — only ever loaded
  // client-side after a visitor accepts the cookie banner, see lib/analytics.ts.
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  // Inline `style="..."` attributes are used for the cost-comparison SVG's
  // themed colours, so style-src needs 'unsafe-inline'. Style-only injection
  // is a far smaller risk than script injection.
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self'`,
  // google-analytics.com (and its regional subdomains, e.g. region1.) is
  // where gtag.js actually sends hits once loaded.
  `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `upgrade-insecure-requests`,
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
