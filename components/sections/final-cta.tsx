import { Clock, FlaskConical, Globe2, Hammer } from "lucide-react";
import { BookingButton, BookingUnavailable } from "@/components/ui/booking-button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { isBookingPlaceholder } from "@/lib/site";

/** Summary of the company story (see story.tsx) – no traction, revenue or partnership claims. */
const journey = [
  { icon: FlaskConical, label: "Tidig prototyp i Sverige" },
  { icon: Hammer, label: "Plattformen byggs om" },
  { icon: Globe2, label: "Planerad expansion i Norden" },
];

export function FinalCta() {
  return (
    <section id="boka-mote" aria-labelledby="boka-mote-rubrik" className="bg-white pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-sky-50 via-brand-50/60 to-white px-5 py-14 text-center ring-1 ring-brand-100 sm:px-12 sm:py-20 lg:py-24">
            {/* Restrained decoration: a cyan hairline on top and two soft glows */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
              <div className="absolute -top-28 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[100px]" />
              <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
            </div>

            <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">
              Investerare & partners
            </p>
            <h2
              id="boka-mote-rubrik"
              className="mx-auto mt-4 max-w-3xl font-display text-[1.75rem] leading-tight font-extrabold tracking-tight text-balance text-navy-950 min-[400px]:text-3xl sm:text-5xl sm:leading-[1.1]"
            >
              Var Med Och Forma Framtidens Jobbsökande
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-slate-600 sm:mt-6 sm:text-lg">
              Ansök AI utvecklar en AI-driven plattform som förenklar jobbsökandet. Vi bygger
              vidare på erfarenheter från en tidig prototyp och arbetar mot målet att göra
              tjänsten tillgänglig för fler jobbsökande i Norden.
            </p>

            <ul
              aria-label="Var Ansök AI står i dag"
              className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-2 text-sm text-slate-700 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6"
            >
              {journey.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon aria-hidden className="size-4 text-brand-600" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-4">
              {isBookingPlaceholder ? (
                <>
                  <BookingUnavailable statusId="bokning-status" />
                  <p
                    id="bokning-status"
                    className="inline-flex max-w-xs items-start gap-2 text-left text-sm leading-relaxed text-slate-700 sm:max-w-none sm:items-center"
                  >
                    <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan-700 sm:mt-0" />
                    Onlinebokning är inte öppen ännu – bokningslänken läggs till här.
                  </p>
                </>
              ) : (
                <>
                  <BookingButton />
                  <p className="text-sm text-slate-600">Bokningssidan öppnas i en ny flik.</p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
