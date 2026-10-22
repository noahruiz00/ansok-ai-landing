import {
  Building2,
  FileText,
  Handshake,
  Info,
  MessagesSquare,
  Target,
  Timer,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Proposed B2C/B2B revenue streams (David's brief). The business model is
 * company-provided and NOT independently verified: launch status is phrased
 * conditionally, every price is labelled as proposed, the section shows a
 * verification note, and the development-only notes list exactly what the
 * founder must confirm – the same pattern as the market and story sections.
 */

type Stream = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Proposed price, highlighted in the layout but labelled as proposed. */
  price?: { value: string; suffix?: string };
  /**
   * What the founder must confirm before this is presented as fact.
   * Shown only in development builds (never to visitors) – see `SHOW_REVIEW_NOTES`.
   */
  needsConfirmation?: string;
};

type Accent = {
  /** Middle colour of the thin gradient line along the panel's top edge. */
  topline: string;
  /** The small B2C/B2B pill in the panel header. */
  pill: string;
  /** Icon tiles for the panel and its streams. */
  tile: string;
  /** The highlighted proposed price. */
  price: string;
};

type Panel = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
  accent: Accent;
  streams: Stream[];
};

/* B2C uses Tailwind's emerald scale (harmonises with the blue/cyan palette
   without new theme tokens); B2B keeps the existing brand blue. Text colours
   are the darker 700/800 steps so small text meets WCAG AA on white. */
const accents: Record<"emerald" | "brand", Accent> = {
  emerald: {
    topline: "via-emerald-400/70",
    pill: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    tile: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    price: "text-emerald-700",
  },
  brand: {
    topline: "via-brand-400/70",
    pill: "bg-brand-50 text-brand-700 ring-brand-200",
    tile: "bg-brand-50 text-brand-600 ring-brand-100",
    price: "text-brand-700",
  },
};

const panels: Panel[] = [
  {
    id: "b2c",
    icon: UserRound,
    eyebrow: "B2C",
    title: "Automatiserad Försäljning",
    intro:
      "Tjänster som riktar sig direkt till jobbsökande – från automatiska ansökningar till personlig coaching och professionella CV:n.",
    accent: accents.emerald,
    streams: [
      {
        icon: Zap,
        title: "Automatiserad Jobbansökan",
        price: { value: "299 kr", suffix: "/mån" },
        description:
          "För en månadsavgift ska kunden kunna ansöka automatiskt till upp till 50 jobb per dag. AI:n läser av jobbannonser och anpassar CV:t efter rollen.",
        needsConfirmation:
          "Bekräfta att 299 kr/mån är det faktiska (eller föreslagna) priset, att tjänsten säljs i dag, och att upp till 50 ansökningar per dag är en verklig produktkapacitet.",
      },
      {
        icon: MessagesSquare,
        title: "Intervjuträning & Coaching",
        description:
          "Personlig intervjuträning och coaching inom kroppsspråk, kommunikation, tonläge och löneförhandling – för kandidater som vill förbereda sig inför intervjuer.",
        needsConfirmation:
          "Bekräfta om intervjuträning och coaching erbjuds i dag eller är planerad, och vem som levererar den.",
      },
      {
        icon: FileText,
        title: "CV-Upsell",
        price: { value: "1 200–2 000 kr", suffix: "/kund" },
        description:
          "Professionella CV-tjänster där ett dedikerat team kombinerar professionell design med AI-stödd textproduktion. Försäljningen kan stödjas av provisionsbaserade säljare.",
        needsConfirmation:
          "Bekräfta prisintervallet 1 200–2 000 kr, att ett dedikerat CV-team finns, och planen för provisionsbaserade säljare.",
      },
    ],
  },
  {
    id: "b2b",
    icon: Building2,
    eyebrow: "B2B",
    title: "Snabbmatchning & Rekrytering",
    intro:
      "Målet är att hjälpa företag att snabbare hitta relevanta kandidater och effektivisera sina rekryteringsprocesser.",
    accent: accents.brand,
    streams: [
      {
        icon: Target,
        title: "Direkt AI-Matchning",
        description:
          "Företaget beskriver sin idealkandidat, och AI:n matchar kompetens, erfarenhet och relevanta kvalifikationer mot tillgängliga kandidater.",
        needsConfirmation:
          "Bekräfta om B2B-matchningen finns i produkten i dag eller är planerad, och om det finns några företagskunder eller piloter.",
      },
      {
        icon: Timer,
        title: "Akuta Rekryteringsbehov",
        description:
          "Genom snabbare kandidatmatchning kan företag minska tiden mellan identifierat rekryteringsbehov och första intervju.",
      },
      {
        icon: Handshake,
        title: "B2B-Licenser & Matchningsavgifter",
        description:
          "Affärsmodellen omfattar potentiella intäkter från företagslicenser och avgifter kopplade till framgångsrika matchningar eller rekryteringar.",
        needsConfirmation:
          "Bekräfta licensmodellen och avgiftsstrukturen (nivåer och priser) innan de beskrivs närmare för investerare.",
      },
    ],
  },
];

/** Founder review notes are visible locally (`next dev`) but never in production. */
const SHOW_REVIEW_NOTES = process.env.NODE_ENV !== "production";

function StreamItem({ stream, accent }: { stream: Stream; accent: Accent }) {
  const { icon: Icon, title, description, price, needsConfirmation } = stream;

  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5 sm:py-6">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${accent.tile}`}
      >
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-lg font-bold text-navy-950">{title}</h4>
        {price && (
          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className={`font-display text-2xl font-extrabold tracking-tight ${accent.price}`}>
              {price.value}
              {price.suffix && <span className="text-base font-bold">{price.suffix}</span>}
            </span>
            <span className="text-xs font-medium text-slate-500">Föreslagen prissättning</span>
          </p>
        )}
        <p className="mt-2 text-base leading-relaxed text-pretty text-slate-600">{description}</p>
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
    </li>
  );
}

function RevenuePanel({ panel }: { panel: Panel }) {
  const { icon: Icon, eyebrow, title, intro, accent, streams } = panel;

  return (
    <article className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgb(3_10_31/0.04),0_18px_40px_-30px_rgb(29_85_235/0.35)] ring-1 ring-slate-200 sm:p-8">
      {/* Thin accent along the top edge – green for B2C, blue for B2B */}
      <div
        aria-hidden
        className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${accent.topline}`}
      />

      <div className="flex items-center justify-between gap-4">
        <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${accent.tile}`}>
          <Icon aria-hidden className="size-6" />
        </span>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase ring-1 ring-inset ${accent.pill}`}
        >
          {eyebrow}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl leading-tight font-extrabold tracking-tight text-balance text-navy-950 sm:text-[1.625rem]">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-pretty text-slate-600">{intro}</p>

      <ul className="mt-6 divide-y divide-slate-100 border-t border-slate-100 pt-1 sm:mt-7">
        {streams.map((stream) => (
          <StreamItem key={stream.title} stream={stream} accent={accent} />
        ))}
      </ul>

      <p className="mt-auto pt-4 text-xs text-slate-500">Källa: Ansök AI – föreslagen affärsmodell</p>
    </article>
  );
}

export function Revenue() {
  return (
    <section
      id="intakter"
      aria-labelledby="intakter-rubrik"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-32"
    >
      {/* Soft glows echo the two accents: emerald (B2C) left, brand blue (B2B) right */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-emerald-200/30 blur-[110px]" />
        <div className="absolute top-40 -right-40 h-80 w-80 rounded-full bg-brand-200/40 blur-[110px]" />
      </div>

      <Container className="relative">
        <SectionHeading
          id="intakter-rubrik"
          eyebrow="Flera Intäktsströmmar"
          title="Det Finns Många Sätt Att Tjäna Pengar På En AI-Plattform"
          description="Så beskriver Ansök AI de planerade intäktsströmmarna – en konsumenttjänst och en företagslösning byggda på samma AI-plattform."
        />

        <div className="mx-auto mt-14 grid max-w-xl gap-6 sm:mt-16 lg:max-w-none lg:grid-cols-2 lg:gap-8">
          {panels.map((panel, index) => (
            <Reveal key={panel.id} delay={index * 0.08} className="h-full">
              <RevenuePanel panel={panel} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-pretty text-slate-600">
          Uppgifter enligt Ansök AI. Affärsmodellen beskriver planerade intäktsströmmar – priser,
          tjänsteutbud och lanseringsstatus inväntar verifiering.
        </p>
      </Container>
    </section>
  );
}
