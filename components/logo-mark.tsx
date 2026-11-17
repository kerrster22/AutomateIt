import Image from "next/image";

// Source asset is 2768x964 (public/AutomateITLogo-v5.png) — black artwork on a
// white background, brackets baked into the image itself. It has no
// theme-aware colour, so dark mode is handled with a CSS filter (see
// .logo-mark-invert in globals.css) rather than the currentColor trick the
// previous CSS-drawn mark used.
const NATIVE_WIDTH = 2768;
const NATIVE_HEIGHT = 964;
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
      src="/AutomateITLogo-v5.png"
      alt="AutomateIT"
      width={width}
      height={height}
      priority={variant === "header"}
      className="logo-mark-invert"
    />
  );
}
