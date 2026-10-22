import { MoveLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Sidan Hittades Inte",
};

/** Branded Swedish 404. Standalone (no navbar – its anchor links only exist on the start page). */
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50 via-sky-50/60 to-white px-5 py-16 text-center text-navy-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute top-[-10rem] left-1/2 h-[24rem] w-[44rem] -translate-x-1/2 rounded-full bg-brand-200/50 blur-[120px]" />
      </div>

      <Link
        href="/"
        aria-label="Ansök AI – till startsidan"
        className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      >
        <Logo tone="dark" eager className="h-8" />
      </Link>

      <p aria-hidden className="mt-12 font-display text-7xl font-extrabold tracking-tight text-gradient-hero sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
        Sidan Hittades Inte
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-pretty text-slate-600 sm:text-lg">
        Sidan du letar efter finns inte eller har flyttats.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-brand-600 to-brand-700 px-7 text-base font-semibold whitespace-nowrap text-white shadow-[0_10px_30px_-10px_rgb(47_107_255/0.8)] ring-1 ring-white/15 ring-inset transition-all duration-300 hover:-translate-y-0.5 hover:from-brand-500 hover:to-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <MoveLeft aria-hidden className="size-5" />
        Till startsidan
      </Link>
    </main>
  );
}
