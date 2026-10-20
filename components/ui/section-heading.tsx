import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase ${
          dark ? "text-brand-300" : "text-brand-600"
        }`}
      >
        <span
          aria-hidden
          className={`h-px w-6 ${dark ? "bg-brand-300/60" : "bg-brand-500/50"}`}
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
