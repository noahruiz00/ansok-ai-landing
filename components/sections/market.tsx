import { BadgeCheck, Globe2, Info, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Metric = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  /** Visible attribution for a company-provided factual claim. */
  source?: string;
  /**
   * What the founder must confirm before this claim is presented as fact.
   * Shown only in development builds (never to visitors) – see `SHOW_REVIEW_NOTES`.
   */
  needsConfirmation?: string;
};

/**
 * David's requested statements, kept verbatim for founder review. They are
 * company-provided and NOT independently verified: every card shows its source,
 * the section shows a verification note, and the development-only notes list
 * exactly what must be confirmed.
 */
const metrics: Metric[] = [
  {
    icon: Users,
    label: "Marknadsbehov",
    title: "1,2 Miljoner",
    description: "Jobbsökande i Norden som möter detta problem varje dag.",
    source: "Källa: Ansök AI",
    needsConfirmation:
      "Bekräfta källa och definition för 1,2 miljoner: vilka länder, vilken period och hur ”jobbsökande” räknas.",
  },
  {
    icon: BadgeCheck,
    label: "Validering",
    title: "VALIDERAD PRODUCT-MARKET FIT",
    description: "Kunder betalade direkt för en tidig prototyp, vilket bevisade den extrema efterfrågan.",
    source: "Källa: Ansök AI",
    needsConfirmation:
      "Bekräfta antal betalande kunder, period och pris för prototypen – och att det räcker för att kalla det ”validerad product-market fit”.",
  },
  {
    icon: Globe2,
    label: "Affärsmodell",
    title: "MULTI-MILJON MARKNAD",
    description: "Samma affärsmodell omsätter redan miljoner i USA.",
    source: "Källa: Ansök AI",
    needsConfirmation: "Ange vilka amerikanska bolag som avses och en källa för deras omsättning (valuta och år).",
  },
];

/** Founder review notes are visible locally (`next dev`) but never in production. */
const SHOW_REVIEW_NOTES = process.env.NODE_ENV !== "production";

function MetricCard({ metric }: { metric: Metric }) {
  const { icon: Icon, label, title, description, source, needsConfirmation } = metric;

  return (
    <article className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgb(3_10_31/0.04),0_18px_40px_-30px_rgb(29_85_235/0.35)] ring-1 ring-slate-200 transition-shadow duration-300 hover:shadow-[0_1px_2px_rgb(3_10_31/0.04),0_24px_50px_-30px_rgb(29_85_235/0.45)] sm:p-8">
      {/* Thin brand accent along the top edge, identical on every card */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
      />

      <div className="flex items-center justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <Icon aria-hidden className="size-5" />
        </span>
        <span className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          {label}
        </span>
      </div>

      <h3 className="mt-8 font-display text-2xl leading-tight font-extrabold tracking-tight text-balance text-navy-950 sm:text-[1.625rem] lg:min-h-[3.75em] xl:min-h-[2.5em]">
        {title}
      </h3>

      <div aria-hidden className="mt-5 h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500" />

      <p className="mt-5 text-base leading-relaxed text-pretty text-slate-600">{description}</p>

      {(source || (SHOW_REVIEW_NOTES && needsConfirmation)) && (
        <div className="mt-auto pt-6">
          {source && <p className="text-xs text-slate-500">{source}</p>}
          {SHOW_REVIEW_NOTES && needsConfirmation && (
            <p
              data-review-note
              className="mt-3 flex gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"
            >
              <Info aria-hidden className="mt-px size-3.5 shrink-0" />
              <span>
                <strong className="font-semibold">Endast i utvecklingsläge – bekräftas av grundaren:</strong>{" "}
                {needsConfirmation}
              </span>
            </p>
          )}
        </div>
      )}
    </article>
  );
}

export function Market() {
  return (
    <section
      id="marknad"
      aria-labelledby="marknad-rubrik"
      className="relative overflow-hidden bg-white pt-24 pb-10 sm:pt-32 sm:pb-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <Container className="relative">
        <SectionHeading
          id="marknad-rubrik"
          eyebrow="Marknaden"
          title="Från Marknadsbehov Till Betalande Kunder"
          description="Så beskriver Ansök AI behovet, den tidiga valideringen och marknaden."
        />

        <div className="mx-auto mt-14 grid max-w-xl gap-5 sm:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className="h-full">
              <MetricCard metric={metric} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-pretty text-slate-600">
          Uppgifter enligt Ansök AI. Marknadsstorlek, kundbetalningar och internationella jämförelser inväntar
          verifiering.
        </p>
      </Container>
    </section>
  );
}
