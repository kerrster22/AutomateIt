import Image from "next/image";

// Source asset is 314x110 (public/AutomateITLogo.png) — black artwork on a
// transparent background, brackets baked into the image itself. It has no
// light-theme-aware colour, so dark mode is handled with a CSS filter (see
// .logo-mark-invert in globals.css) rather than the currentColor trick the
// previous CSS-drawn mark used.
const NATIVE_WIDTH = 314;
const NATIVE_HEIGHT = 110;
const ASPECT = NATIVE_WIDTH / NATIVE_HEIGHT;

const SIZES = {
  header: { height: 38 },
  footer: { height: 32 },
} as const;

export function LogoMark({ variant = "header" }: { variant?: keyof typeof SIZES }) {
  const { height } = SIZES[variant];
  const width = Math.round(height * ASPECT);
  return (
    <Image
      src="/AutomateITLogo.png"
      alt="AutomateIT"
      width={width}
      height={height}
      priority={variant === "header"}
      className="logo-mark-invert"
    />
  );
}
