import Link from "next/link";
import type { ReactNode } from "react";

type CtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function CtaPrimary({ href, children, className = "" }: CtaProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center min-h-14 px-5 sm:px-7 rounded-md bg-btn text-btnink text-[14px] sm:text-[17px] font-semibold whitespace-nowrap transition-opacity duration-150 hover:opacity-[0.86] ${className}`}
    >
      {children}
    </Link>
  );
}

export function CtaSecondary({ href, children, className = "" }: CtaProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center min-h-14 px-7 rounded-md border border-strong text-ink text-[17px] font-semibold transition-colors duration-150 hover:border-ink ${className}`}
    >
      {children}
    </Link>
  );
}

export function CtaText({ href, children, className = "" }: CtaProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 min-h-11 text-base font-semibold text-accent border-b border-strong transition-colors duration-150 hover:border-accent ${className}`}
    >
      {children}
      <span aria-hidden="true" className="font-mono">
        &#8594;
      </span>
    </Link>
  );
}
