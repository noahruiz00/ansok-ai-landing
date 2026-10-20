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
 * Investor-safe wording (Step 13): no unverified numbers, no claims of proven
 * product-market fit, market size or revenue. The only company-provided factual
 * claim (paying prototype customers) is attributed and awaits founder confirmation.
 */
const metrics: Metric[] = [
  {
    icon: Users,
    label: "Marknadsbehov",
    title: "Ett Tydligt Behov",
    description:
      "Att hitta relevanta jobb och skriva ansökningar kan vara tidskrävande. Ansök AI utvecklar verktyg för att förenkla delar av processen.",
  },
  {
    icon: BadgeCheck,
    label: "Validering",
    title: "Tidig Validering",
    description:
      "Enligt Ansök AI hade den tidiga prototypen betalande kunder – en första signal om efterfrågan och en grund att bygga vidare på.",
    source: "Källa: Ansök AI",
    needsConfirmation:
      "Bekräfta att den tidiga prototypen hade betalande kunder (antal, period och pris) innan uppgiften presenteras för investerare.",
  },
  {
    icon: Globe2,
    label: "Möjlighet",
    // Soft hyphen (U+00AD): lets the long compound break as "Marknads-/potential" in narrow cards only.
    title: "Marknads\u00ADpotential",
    description:
      "Liknande AI-drivna tjänster för jobbsökande finns på internationella marknader. Ansök AI ser möjligheter att utveckla en tjänst anpassad för svenska och nordiska jobbsökande.",
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

      <h3 className="mt-8 font-display text-[1.75rem] leading-tight font-extrabold tracking-tight text-balance text-navy-950 sm:text-3xl lg:min-h-[2.5em] xl:min-h-0">
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
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <Container className="relative">
        <SectionHeading
          id="marknad-rubrik"
          eyebrow="Marknaden"
          title="Från Marknadsbehov Till Tidig Validering"
          description="Jobbsökandet kan bli enklare och mer effektivt. Tidiga signaler från vår prototyp ger oss en grund att bygga vidare på – i Sverige och i resten av Norden."
        />

        <div className="mx-auto mt-14 grid max-w-xl gap-5 sm:mt-16 lg:max-w-none lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className="h-full">
              <MetricCard metric={metric} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-pretty text-slate-600">
          Uppgifterna ovan kommer från Ansök AI och har inte granskats av en extern part. Fråga
          gärna om underlaget vid ett möte med vår VD.
        </p>
      </Container>
    </section>
  );
}
