import type { Metadata } from "next";
import { Archivo, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Reduce Costs. Unlock Growth.`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Reduce Costs. Unlock Growth.`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Reduce Costs. Unlock Growth.`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:inline-flex focus:items-center focus:min-h-11 focus:px-4 focus:rounded-md focus:bg-btn focus:text-btnink focus:text-[15px] focus:font-semibold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <SiteHeader />
          <div id="main-content" className="flex-1 [animation:pageIn_400ms_ease_both]">
            {children}
          </div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
