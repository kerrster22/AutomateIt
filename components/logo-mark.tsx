const SIZES = {
  header: { pad: "px-[15px] py-[11px]", corner: "w-[11px] h-[10px]", text: "text-[19px]" },
  footer: { pad: "px-[14px] py-[10px]", corner: "w-[10px] h-[9px]", text: "text-[17px]" },
} as const;

export function LogoMark({ variant = "header" }: { variant?: keyof typeof SIZES }) {
  const s = SIZES[variant];
  return (
    <span className={`relative inline-flex items-center ${s.pad}`}>
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 ${s.corner} border-t-2 border-l-2 border-ink`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-0 right-0 ${s.corner} border-t-2 border-r-2 border-ink`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 ${s.corner} border-b-2 border-l-2 border-ink`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-0 right-0 ${s.corner} border-b-2 border-r-2 border-ink`}
      />
      <span className={`font-display font-extrabold ${s.text} tracking-[-0.03em]`}>
        Automate it.
      </span>
    </span>
  );
}
