import { BadgeCheck, Globe2, Lock, MapPin, PlayCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { BookingButton } from "@/components/ui/booking-button";
import { Container } from "@/components/ui/container";
// Investor-safe version of the marketing-site screenshot: the unverified statistics
// (user counts, application volumes, success rate, "2 minuters setup") have been
// removed. The unchanged original is kept outside `public/` in
// source-assets/private-screenshots/website-desktop-hero.jpg (not served, git-ignored).
import websiteHero from "@/public/assets/website-desktop-hero-investor-safe.jpg";

/** Only facts confirmed by the company story: paid prototype, Swedish origin, Nordic plan. */
const highlights = [
  // Company-provided claim awaiting founder confirmation – attributed like the market and timeline sections.
  { icon: BadgeCheck, label: "Enligt Ansök AI: betalande kunder redan med prototypen" },
  { icon: MapPin, label: "Utvecklad i Sverige" },
  { icon: Globe2, label: "Nästa steg: Norden" },
];

function WebsitePreview() {
  return (
    <figure className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      {/* Single soft glow – lifts the frame off the light background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/60 via-sky-200/40 to-cyan-100/30 blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 shadow-[0_24px_60px_-28px_rgb(29_85_235/0.35)]">
        {/* Browser chrome */}
        <div aria-hidden className="flex items-center gap-3 border-b border-slate-200/80 bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-md bg-white px-3 text-xs text-slate-600 ring-1 ring-slate-200">
            <Lock className="size-3 text-slate-400" />
            ansokai.se
          </div>
          <div className="w-[2.6rem]" />
        </div>

        {/* Screenshot keeps its intrinsic 1220×649 ratio via the static import */}
        <Image
          src={websiteHero}
          alt="Skärmbild av Ansök AI:s webbplats med rubriken ”Få fler intervjuer utan timmar av ansökningar” och ett foto av en kvinna som arbetar vid en bärbar dator"
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, (min-width: 672px) 640px, 100vw"
          className="block h-auto w-full"
        />
      </div>

      <figcaption className="mt-4 text-center text-sm text-slate-600 lg:text-left">
        Förhandsvisning av Ansök AI:s webbplats
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-rubrik"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 via-sky-50/60 to-white pt-32 pb-20 text-navy-950 sm:pt-40 sm:pb-24 lg:pb-28"
    >
      {/* Background decoration – light, airy glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
        <div className="absolute top-[-14rem] left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand-200/50 blur-[120px]" />
        <div className="absolute top-48 -right-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-[100px]" />
        <div className="absolute top-32 -left-40 h-72 w-72 rounded-full bg-sky-200/40 blur-[100px]" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Copy */}
          <div className="text-center motion-safe:animate-hero-rise lg:col-span-6 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-1.5 text-xs font-medium sm:text-sm text-brand-700 shadow-sm shadow-brand-100">
              <Sparkles aria-hidden className="size-4 text-brand-500" />
              AI-driven jobbansökan · Byggd i Sverige
            </p>

            <h1
              id="hero-rubrik"
              className="mx-auto mt-7 max-w-2xl font-display text-[2rem] leading-[1.08] font-extrabold tracking-tight text-balance min-[400px]:text-[2.5rem] sm:text-5xl lg:mx-0 lg:text-[3.25rem] xl:text-6xl"
            >
              Få <span className="text-gradient-hero">Fler Intervjuer</span>
              &nbsp;– Utan Timmar Av
              Jobbansökningar
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl lg:mx-0">
              Ansök AI hjälper dig att hitta relevanta jobb och automatisera dina
              jobbansökningar – så att du kan fokusera på nästa steg i karriären.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <BookingButton />
              <a
                href="#video"
                className="inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-5 text-base font-semibold sm:px-7 text-navy-950 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-brand-50 hover:ring-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
              >
                <PlayCircle aria-hidden className="size-5 text-brand-600" />
                Se produkten
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600 lg:justify-start">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-start gap-2 text-left">
                  <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Product preview */}
          <div className="motion-safe:animate-hero-rise-delayed lg:col-span-6">
            <WebsitePreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
