"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  FileText,
  FileUp,
  SearchCheck,
  Sparkles,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import uploadCvScreenshot from "@/public/assets/app-onboarding-upload-cv.jpg";

/** Label used for every conceptual (non-screenshot) visual – shown inside the phone and in the caption. */
const CONCEPT_LABEL = "Illustration av arbetsflödet";
const CONCEPT_CAPTION = `${CONCEPT_LABEL} – inte en skärmbild från appen`;

type Visual =
  /** Real app screenshot (portrait phone capture). */
  | { kind: "screenshot"; src: StaticImageData; alt: string; caption: string }
  /**
   * Conceptual illustration built from the site's design language. Uses abstract
   * placeholder bars only – no employer names, job titles, numbers or statuses –
   * so it can never be mistaken for a real app screen.
   */
  | { kind: "illustration"; Component: ComponentType; description: string };

type Step = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  visual: Visual;
};

/* ---------- Conceptual illustrations (Steps 2 and 3) ----------
 * Styled after the real Step 1 app screen (measured from app-onboarding-upload-cv.jpg):
 * neutral off-white background (#fbfbfb), plain white cards with a thin neutral-grey
 * border and no shadow, heavy dark-slate titles, neutral-grey body text, and a single
 * flat cyan-blue accent (#0593c5, the app's progress-bar colour) – no gradients.
 * Small text on or in the accent uses the darker #0369a1 so it meets WCAG AA.
 * No status bar, browser chrome or app buttons are imitated, and the concept label
 * stays visible, so these can't be mistaken for real screenshots. */

const ACCENT = "bg-[#0593c5]";

/** Grey placeholder line standing in for text, so no real-looking content is shown. */
function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-zinc-200 ${className}`} />;
}

function ConceptChip() {
  return (
    <span className="mx-auto inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 bg-white px-2.5 py-1 text-[10px] font-medium text-zinc-600">
      <Sparkles aria-hidden className="size-3 text-[#0369a1]" />
      {CONCEPT_LABEL}
    </span>
  );
}

/** Same page structure as the app: centred heavy title + grey subtitle, then one white card area. */
function IllustrationShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-col bg-[#fbfbfb] px-4 pt-7 pb-6">
      <ConceptChip />
      <p className="mt-4 text-center text-[19px] leading-tight font-extrabold tracking-tight text-slate-800">{title}</p>
      <p className="mx-auto mt-1.5 max-w-[15rem] text-center text-[11px] leading-snug text-zinc-500">{subtitle}</p>
      <div className="mt-5 flex flex-1 flex-col justify-center gap-3">{children}</div>
    </div>
  );
}

/** White card with the app's thin neutral border and generous radius – no shadow. */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-zinc-200 bg-white ${className}`}>{children}</div>;
}

/** Step 2: a candidate profile is matched against relevant openings (abstract, ranked by signal bars). */
function MatchingIllustration() {
  const openings = [3, 2, 1]; // relative relevance, shown only as filled signal bars – no numbers
  return (
    <IllustrationShell title="Hitta relevanta jobb" subtitle="Din profil jämförs med lediga tjänster som passar.">
      {/* Profile */}
      <Card className="p-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500">
            <UserRound className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-slate-800">Din profil</p>
            <Bar className="mt-1.5 w-24" />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {["CV", "Kompetenser", "Önskemål"].map((label) => (
            <span key={label} className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] text-zinc-600">
              {label}
            </span>
          ))}
        </div>
      </Card>

      {/* Matching connector */}
      <div className="relative flex h-9 items-center justify-center">
        <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-zinc-300" />
        <span className="relative inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#0369a1]">
          <Sparkles className="size-3" />
          AI-matchning
        </span>
      </div>

      {/* Relevant openings (abstract) – one card with list dividers, like a mobile list */}
      <Card className="divide-y divide-zinc-100 px-3">
        {openings.map((strength, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500">
              <BriefcaseBusiness className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <Bar className="h-2 w-[85%] bg-zinc-300" />
              <Bar className="mt-1.5 w-[55%]" />
            </div>
            <span className="flex h-3.5 items-end gap-0.5">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={`w-1 rounded-sm ${level <= strength ? ACCENT : "bg-zinc-200"}`}
                  style={{ height: `${level * 33}%` }}
                />
              ))}
            </span>
          </div>
        ))}
      </Card>
    </IllustrationShell>
  );
}

/** Step 3: an AI-assisted application workflow where the user stays in control (no completion states). */
function WorkflowIllustration() {
  const stages = ["Jobbannonsen läses in", "AI föreslår en anpassad ansökan", "Du granskar och justerar", "Skicka när du är redo"];
  return (
    <IllustrationShell title="Automatisera ansökningar" subtitle="AI hjälper till med de repetitiva momenten – du har kontrollen.">
      {/* Application draft with AI-suggested passages */}
      <Card className="p-3.5">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-500">
            <FileText className="size-3.5" />
          </span>
          <p className="text-[12px] font-bold text-slate-800">Utkast till ansökan</p>
        </div>
        <div className="mt-3 space-y-1.5">
          <Bar className="w-full" />
          <span className="block h-1.5 w-[92%] rounded-full bg-[#0593c5]/25" />
          <span className="block h-1.5 w-[78%] rounded-full bg-[#0593c5]/25" />
          <Bar className="w-[88%]" />
          <Bar className="w-[60%]" />
        </div>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0369a1]">
          <Sparkles className="size-3" />
          AI-förslag
        </span>
      </Card>

      {/* Workflow stages – numbered, no ticks or "sent" states */}
      <Card className="px-3.5 py-3">
        <ol className="relative flex flex-col gap-2.5">
          <span className="absolute top-3 bottom-3 left-[11px] w-px bg-zinc-200" />
          {stages.map((label, i) => (
            <li key={label} className="relative flex items-center gap-2.5">
              <span
                className={`flex size-[23px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 1 ? "bg-[#0369a1] text-white" : "border border-zinc-300 bg-white text-zinc-500"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-[11px] leading-tight ${i === 1 ? "font-semibold text-slate-800" : "text-zinc-600"}`}>
                {label}
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </IllustrationShell>
  );
}

/* Copy is limited to what the real product screens confirm:
   CV upload + AI analysis + preferences ("vad du letar efter, och hur mycket du
   vill att den ska automatisera"), job search and automated applications. */
const steps: Step[] = [
  {
    id: "cv",
    icon: FileUp,
    title: "Ladda upp ditt CV",
    description:
      "Börja med att ladda upp ditt CV och ange vad du letar efter. CV:t analyseras med AI, och du väljer själv hur mycket som ska automatiseras.",
    visual: {
      kind: "screenshot",
      src: uploadCvScreenshot,
      alt: "Skärmbild från Ansök AI: steget ”Ladda upp ditt CV” i introduktionen ”Konfigurera Autotillämpa”, steg 1 av 7",
      caption: "Skärmbild från appen – första steget i introduktionen",
    },
  },
  {
    id: "jobb",
    icon: SearchCheck,
    title: "Hitta relevanta jobb",
    description:
      "Utifrån din profil och dina önskemål hjälper Ansök AI dig att hitta lediga tjänster som matchar din erfarenhet.",
    visual: {
      kind: "illustration",
      Component: MatchingIllustration,
      description:
        "Illustration av arbetsflödet, inte en skärmbild från appen: din profil med CV, kompetenser och önskemål matchas med AI mot relevanta lediga tjänster.",
    },
  },
  {
    id: "automatisera",
    icon: Zap,
    title: "Automatisera dina ansökningar",
    description:
      "AI-assisterad automatisering tar hand om de repetitiva momenten i ansökningsprocessen – så att du kan lägga tiden på det som spelar roll.",
    visual: {
      kind: "illustration",
      Component: WorkflowIllustration,
      description:
        "Illustration av arbetsflödet, inte en skärmbild från appen: jobbannonsen läses in, AI föreslår en anpassad ansökan, du granskar och justerar, och skickar när du är redo.",
    },
  },
];

/** Phone frame sized to the real screenshot's 591×1280 ratio so every step has the same footprint. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2.75rem] bg-navy-950 p-2.5 shadow-[0_40px_80px_-40px_rgb(11_31_79/0.55)] ring-1 ring-navy-800">
      <div className="relative aspect-[591/1280] overflow-hidden rounded-[2.2rem] bg-white">
        {children}
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  // Fade only when the user switches tabs – the first render is visible immediately
  // (also without JavaScript), so the real screenshot never starts out hidden.
  const [hasSwitched, setHasSwitched] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const step = steps[active];
  const visual = step.visual;

  const select = (index: number) => {
    if (index !== active) setHasSwitched(true);
    setActive(index);
  };

  const focusTab = (index: number) => {
    const next = (index + steps.length) % steps.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(active + 1),
      ArrowRight: () => focusTab(active + 1),
      ArrowUp: () => focusTab(active - 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(steps.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <section
      id="produkt"
      aria-labelledby="produkt-rubrik"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[120px]"
      />
      <Container className="relative">
        <SectionHeading
          id="produkt-rubrik"
          eyebrow="Produkten"
          title="Så Fungerar Ansök AI"
          description="Ansök AI är en AI-driven assistent för jobbsökande. Den hjälper dig att hitta relevanta jobb och automatisera de repetitiva delarna av att söka."
        />

        <div className="mt-14 grid items-center gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Steps */}
          <Reveal className="lg:col-span-7">
            <div
              role="tablist"
              aria-label="Så fungerar Ansök AI – steg för steg"
              aria-orientation="vertical"
              className="flex flex-col gap-3"
            >
              {steps.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onKeyDown}
                    className={`relative flex w-full items-start gap-4 overflow-hidden rounded-2xl p-5 text-left ring-1 transition-[background-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:gap-5 sm:p-6 ${
                      selected
                        ? "bg-white shadow-[0_18px_40px_-24px_rgb(29_85_235/0.45)] ring-brand-200"
                        : "ring-transparent hover:bg-white/70 hover:ring-slate-200"
                    }`}
                  >
                    {/* Accent bar marks the selected step */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 to-cyan-500 transition-opacity duration-200 ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 sm:size-12 ${
                        selected
                          ? "bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-md shadow-brand-500/30"
                          : "bg-white text-slate-500 ring-1 ring-slate-200"
                      }`}
                    >
                      <item.icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-xs font-semibold tracking-[0.16em] uppercase ${
                          selected ? "text-brand-700" : "text-slate-500"
                        }`}
                      >
                        Steg {index + 1}
                      </span>
                      <span className="mt-1 block font-display text-lg font-bold text-navy-950 sm:text-xl">
                        {item.title}
                      </span>
                      {/* On small screens only the selected step is expanded, so the
                          screenshot below stays close to the tabs. */}
                      <span
                        className={`mt-2 text-base leading-relaxed text-pretty text-slate-600 lg:block ${
                          selected ? "block" : "hidden"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Screen for the selected step */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div
              role="tabpanel"
              id={`panel-${step.id}`}
              aria-labelledby={`tab-${step.id}`}
              className="mx-auto w-full max-w-[20rem]"
            >
              <PhoneFrame>
                <motion.div
                  key={step.id}
                  initial={reduceMotion || !hasSwitched ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {visual.kind === "screenshot" ? (
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      sizes="(min-width: 400px) 300px, calc(100vw - 60px)"
                      className="block h-auto w-full"
                    />
                  ) : (
                    // One accessible description for the whole illustration; its parts are decorative.
                    <div role="img" aria-label={visual.description} data-illustration={step.id} className="size-full">
                      <div aria-hidden className="size-full">
                        <visual.Component />
                      </div>
                    </div>
                  )}
                </motion.div>
              </PhoneFrame>
              <p className="mt-4 text-center text-sm text-slate-600">
                {visual.kind === "screenshot" ? visual.caption : CONCEPT_CAPTION}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
