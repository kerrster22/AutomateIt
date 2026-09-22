import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free Cost Reduction Assessment, or talk to us about partnering with AutomateIT.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — AutomateIT",
    description: "Book a free Cost Reduction Assessment, or talk to us about partnering with AutomateIT.",
    url: "/contact",
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const contextParam = params.context;
  // `type` is the documented param (?type=partner / ?type=customer); `enq` is
  // kept as an alias since it predates this and may already be linked/bookmarked.
  const typeParam = params.type ?? params.enq;

  const initialContext = typeof contextParam === "string" ? contextParam : undefined;
  const initialEnq = (typeof typeParam === "string" ? typeParam : "").toLowerCase() === "partner" ? "Partner" : "Customer";

  return (
    <main>
      <ContactForm initialContext={initialContext} initialEnq={initialEnq} />
    </main>
  );
}
