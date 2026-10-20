"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileUp, SearchCheck, Zap, type LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/container";
import { PlaceholderBadge } from "@/components/ui/placeholder-badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import uploadCvScreenshot from "@/public/assets/app-onboarding-upload-cv.jpg";

type Step = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /**
   * Real app screenshot (portrait phone capture). `null` shows an honest
   * placeholder – add the image to /public/assets and import it here.
   */
  screenshot: { src: StaticImageData; alt: string; caption: string } | null;
};

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
    screenshot: {
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
    screenshot: null,
  },
  {
    id: "automatisera",
    icon: Zap,
    title: "Automatisera dina ansökningar",
    description:
      "AI-assisterad automatisering tar hand om de repetitiva momenten i ansökningsprocessen – så att du kan lägga tiden på det som spelar roll.",
    screenshot: null,
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

function ScreenshotPlaceholder({ step }: { step: Step }) {
  return (
    <div
      data-placeholder="product-screenshot"
      className="flex size-full flex-col items-center justify-center bg-gradient-to-b from-brand-50 via-white to-sky-50 px-6 text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/25">
        <step.icon aria-hidden className="size-7" />
      </span>
      <p className="mt-5 font-display text-lg font-bold text-navy-950">{step.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        En skärmbild av det här steget läggs till inom kort.
      </p>
      <div className="mt-5">
        <PlaceholderBadge tone="light">Platshållare – skärmbild tillkommer</PlaceholderBadge>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const step = steps[active];

  const focusTab = (index: number) => {
    const next = (index + steps.length) % steps.length;
    setActive(next);
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
                    onClick={() => setActive(index)}
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
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {step.screenshot ? (
                    <Image
                      src={step.screenshot.src}
                      alt={step.screenshot.alt}
                      sizes="(min-width: 400px) 300px, calc(100vw - 60px)"
                      className="block h-auto w-full"
                    />
                  ) : (
                    <ScreenshotPlaceholder step={step} />
                  )}
                </motion.div>
              </PhoneFrame>
              <p className="mt-4 text-center text-sm text-slate-600">
                {step.screenshot ? step.screenshot.caption : "Skärmbild tillkommer"}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
