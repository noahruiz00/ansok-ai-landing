"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Calculator,
  CodeXml,
  FileText,
  Info,
  Sparkles,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/* ---------------------------------------------------------------------------
 * Static demonstration data. Everything below is invented for illustration:
 * no real people, employers, job ads, scores or AI output. The demo runs fully
 * in the browser – no API calls and no backend.
 * ------------------------------------------------------------------------- */

type Role = {
  id: string;
  title: string;
  /** Profile skills that are relevant for this example role. */
  matched: string[];
  /** Something the candidate could strengthen – shown as a neutral note, not a score. */
  develop: string;
  /** Role-specific sentence used in the example draft. */
  pitch: string;
};

type Profile = {
  id: string;
  icon: LucideIcon;
  label: string;
  summary: string;
  criteria: { label: string; value: string }[];
  skills: string[];
  experience: string;
  field: string;
  roles: Role[];
};

const profiles: Profile[] = [
  {
    id: "ekonomi",
    icon: Calculator,
    label: "Ekonomi & administration",
    summary: "Ekonomiassistent med erfarenhet av löpande redovisning.",
    criteria: [
      { label: "Yrkesområde", value: "Ekonomi & administration" },
      { label: "Erfarenhet", value: "4 år" },
      { label: "Ort", value: "Stockholm eller distans" },
      { label: "Önskemål", value: "Heltid, hybrid" },
    ],
    skills: ["Löpande bokföring", "Leverantörsreskontra", "Momsredovisning", "Excel", "Fakturering"],
    experience: "fyra års erfarenhet",
    field: "ekonomi och administration",
    roles: [
      {
        id: "redovisning",
        title: "Redovisningsassistent",
        matched: ["Löpande bokföring", "Momsredovisning", "Leverantörsreskontra"],
        develop: "Bokslutsarbete",
        pitch: "Jag trivs med noggrant arbete och vill gärna bidra till en korrekt och effektiv redovisning.",
      },
      {
        id: "ekonomiadmin",
        title: "Ekonomiadministratör",
        matched: ["Fakturering", "Leverantörsreskontra", "Excel"],
        develop: "Budgetuppföljning",
        pitch: "Jag är strukturerad och tycker om att skapa ordning i flöden som rör många personer.",
      },
      {
        id: "lon",
        title: "Löneadministratör",
        matched: ["Excel", "Löpande bokföring"],
        develop: "Lönesystem och kollektivavtal",
        pitch: "Jag vill utvecklas inom lön och ser min redovisningsbakgrund som en bra grund för det.",
      },
    ],
  },
  {
    id: "logistik",
    icon: Warehouse,
    label: "Lager & logistik",
    summary: "Lagermedarbetare med truckkort och erfarenhet av e-handelslager.",
    criteria: [
      { label: "Yrkesområde", value: "Lager & logistik" },
      { label: "Erfarenhet", value: "3 år" },
      { label: "Ort", value: "Göteborg" },
      { label: "Önskemål", value: "Heltid, skift går bra" },
    ],
    skills: ["Truckkort A+B", "Plock & pack", "Inventering", "Lagersystem", "Arbetsmiljö & säkerhet"],
    experience: "tre års erfarenhet",
    field: "lager och logistik",
    roles: [
      {
        id: "lager",
        title: "Lagermedarbetare",
        matched: ["Plock & pack", "Inventering", "Lagersystem"],
        develop: "Godsmottagning",
        pitch: "Jag arbetar gärna i högt tempo utan att tumma på kvalitet och säkerhet.",
      },
      {
        id: "truck",
        title: "Truckförare",
        matched: ["Truckkort A+B", "Arbetsmiljö & säkerhet"],
        develop: "Fler trucktyper",
        pitch: "Jag är van vid truckkörning i trånga miljöer och tar säkerheten på stort allvar.",
      },
      {
        id: "logistikkoordinator",
        title: "Logistikkoordinator",
        matched: ["Lagersystem", "Inventering"],
        develop: "Planering och transportbokning",
        pitch: "Jag vill ta nästa steg mot planering och samordning, med min praktiska lagererfarenhet i ryggen.",
      },
    ],
  },
  {
    id: "it",
    icon: CodeXml,
    label: "Utveckling & IT",
    summary: "Webbutvecklare med fokus på moderna gränssnitt.",
    criteria: [
      { label: "Yrkesområde", value: "Utveckling & IT" },
      { label: "Erfarenhet", value: "2 år" },
      { label: "Ort", value: "Malmö eller distans" },
      { label: "Önskemål", value: "Heltid, gärna distans" },
    ],
    skills: ["TypeScript", "React", "REST-API:er", "Git", "Automatiserade tester"],
    experience: "två års erfarenhet",
    field: "webbutveckling",
    roles: [
      {
        id: "frontend",
        title: "Frontendutvecklare",
        matched: ["TypeScript", "React", "Automatiserade tester"],
        develop: "Tillgänglighet (WCAG)",
        pitch: "Jag brinner för tydliga och snabba gränssnitt som fungerar för alla användare.",
      },
      {
        id: "fullstack",
        title: "Fullstackutvecklare",
        matched: ["TypeScript", "REST-API:er", "Git"],
        develop: "Databaser och drift",
        pitch: "Jag vill gärna bredda mig mot backend och ta ansvar för funktioner från idé till produktion.",
      },
      {
        id: "webb",
        title: "Webbutvecklare",
        matched: ["React", "Git"],
        develop: "Sökmotoroptimering",
        pitch: "Jag tycker om att bygga webbplatser som är enkla att använda och lätta att vidareutveckla.",
      },
    ],
  },
];

/** Product and technology names keep their capitalisation inside sentences. */
const PROPER_NOUNS = new Set(["Excel", "TypeScript", "React", "Git", "REST-API:er"]);

/** "A, B och C" – Swedish list formatting, lower-casing common nouns mid-sentence. */
function joinSv(items: string[]) {
  const lower = items.map((s) => (PROPER_NOUNS.has(s) ? s : s.charAt(0).toLowerCase() + s.slice(1)));
  return lower.length > 1 ? `${lower.slice(0, -1).join(", ")} och ${lower.at(-1)}` : (lower[0] ?? "");
}

/** Fixed template – the example draft is assembled from the static data above, not generated by AI. */
function exampleDraft(profile: Profile, role: Role) {
  return [
    "Hej!",
    `Jag söker tjänsten som ${role.title.toLowerCase()}. Med ${profile.experience} inom ${profile.field} har jag arbetat med ${joinSv(role.matched)}.`,
    role.pitch,
    "Jag ser fram emot att berätta mer om hur jag kan bidra.",
  ];
}

/* ------------------------------- UI pieces ------------------------------- */

function ExampleBadge({ children = "Exempel · påhittade data" }: { children?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-brand-300 bg-white px-2.5 py-1 text-xs font-semibold text-brand-700">
      <Info aria-hidden className="size-3.5" />
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgb(3_10_31/0.04),0_18px_40px_-30px_rgb(29_85_235/0.35)] ring-1 ring-slate-200 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function StepLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
      <span className="flex size-5 items-center justify-center rounded-full bg-brand-50 text-[11px] tracking-normal text-brand-700 ring-1 ring-brand-100">
        {n}
      </span>
      {children}
    </p>
  );
}

/** Roving-focus keyboard handling shared by the profile tabs and the role radios. */
function useRoving(count: number, current: number, onSelect: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => {
    const next = (i + count) % count;
    onSelect(next);
    refs.current[next]?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, () => void> = {
      ArrowRight: () => go(current + 1),
      ArrowDown: () => go(current + 1),
      ArrowLeft: () => go(current - 1),
      ArrowUp: () => go(current - 1),
      Home: () => go(0),
      End: () => go(count - 1),
    };
    const action = map[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };
  return { refs, onKeyDown };
}

/* --------------------------------- Section -------------------------------- */

export function MatchingDemo() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  // Fade only after the visitor interacts – the first render is fully visible (also without JS).
  const [interacted, setInteracted] = useState(false);
  const reduceMotion = useReducedMotion();

  const profile = profiles[profileIndex];
  const role = profile.roles[roleIndex];

  const selectProfile = (i: number) => {
    if (i !== profileIndex) {
      setProfileIndex(i);
      setRoleIndex(0);
      setInteracted(true);
    }
  };
  const selectRole = (i: number) => {
    if (i !== roleIndex) {
      setRoleIndex(i);
      setInteracted(true);
    }
  };

  const profileNav = useRoving(profiles.length, profileIndex, selectProfile);
  const roleNav = useRoving(profile.roles.length, roleIndex, selectRole);
  // Animation props only – React's `key` must be passed directly on the element, never through a spread.
  const fade = {
    initial: reduceMotion || !interacted ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="demo" aria-labelledby="demo-rubrik" className="relative bg-white py-24 sm:py-32">
      <Container className="relative">
        <SectionHeading
          id="demo-rubrik"
          eyebrow="Interaktiv demo"
          title="Se Hur AI-Matchningen Fungerar"
          description="Välj en exempelprofil och se hur Ansök AI kan koppla ihop erfarenhet och kompetenser med relevanta roller – och hjälpa till med ett första utkast till ansökan."
        />

        <Reveal y={32} className="mt-10 sm:mt-12">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-12 lg:gap-6">
            {/* ---- 1. Profile picker + criteria ---- */}
            <Card className="lg:col-span-4">
              <StepLabel n={1}>Välj en exempelprofil</StepLabel>
              <div
                role="tablist"
                aria-label="Exempelprofiler"
                aria-orientation="vertical"
                className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1"
              >
                {profiles.map((p, i) => {
                  const selected = i === profileIndex;
                  return (
                    <button
                      key={p.id}
                      ref={(node) => {
                        profileNav.refs.current[i] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`demo-tab-${p.id}`}
                      aria-selected={selected}
                      aria-controls="demo-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectProfile(i)}
                      onKeyDown={profileNav.onKeyDown}
                      className={`flex items-center gap-3 rounded-2xl p-3 text-left ring-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                        selected ? "bg-brand-50/70 ring-brand-300" : "bg-white ring-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-gradient-to-b from-brand-600 to-brand-700 text-white"
                            : "bg-slate-50 text-slate-500 ring-1 ring-slate-200"
                        }`}
                      >
                        <p.icon aria-hidden className="size-5" />
                      </span>
                      <span className="min-w-0 text-sm leading-snug font-semibold text-navy-950">{p.label}</span>
                    </button>
                  );
                })}
              </div>

              <motion.div key={`criteria-${profile.id}`} {...fade} className="mt-6">
                <p className="text-sm leading-relaxed text-slate-600">{profile.summary}</p>
                <h3 className="mt-5 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Matchningskriterier</h3>
                <dl className="mt-3 divide-y divide-slate-100 rounded-2xl ring-1 ring-slate-200">
                  {profile.criteria.map((c) => (
                    <div key={c.label} className="flex items-baseline justify-between gap-3 px-3.5 py-2.5 text-sm">
                      <dt className="text-slate-500">{c.label}</dt>
                      <dd className="text-right font-medium text-navy-950">{c.value}</dd>
                    </div>
                  ))}
                </dl>
                <h3 className="mt-5 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Kompetenser</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Kompetenser i exempelprofilen">
                  {profile.skills.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                        role.matched.includes(s)
                          ? "bg-brand-50 font-semibold text-brand-700 ring-brand-200"
                          : "bg-white text-slate-600 ring-slate-200"
                      }`}
                    >
                      {s}
                      {role.matched.includes(s) && <span className="sr-only"> (relevant för vald roll)</span>}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Card>

            {/* ---- 2 + 3. Example roles and example draft ---- */}
            <Card className="lg:col-span-8">
              <div
                role="tabpanel"
                id="demo-panel"
                aria-labelledby={`demo-tab-${profile.id}`}
                className="grid gap-6 md:h-full md:grid-cols-5"
              >
                <div className="md:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StepLabel n={2}>Exempel på roller</StepLabel>
                  </div>
                  <div role="radiogroup" aria-label="Välj en exempelroll" className="mt-4 flex flex-col gap-2">
                    {profile.roles.map((r, i) => {
                      const selected = i === roleIndex;
                      return (
                        <button
                          key={`${profile.id}-${r.id}`}
                          ref={(node) => {
                            roleNav.refs.current[i] = node;
                          }}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          tabIndex={selected ? 0 : -1}
                          onClick={() => selectRole(i)}
                          onKeyDown={roleNav.onKeyDown}
                          className={`relative overflow-hidden rounded-2xl p-3.5 text-left ring-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                            selected ? "bg-white ring-brand-300" : "bg-slate-50/60 ring-slate-200 hover:bg-white"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 to-cyan-500 transition-opacity duration-200 ${
                              selected ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <span className="flex items-center gap-2">
                            <BriefcaseBusiness aria-hidden className="size-4 shrink-0 text-brand-600" />
                            <span className="text-sm font-semibold text-navy-950">{r.title}</span>
                          </span>
                          <span className="mt-1.5 block text-xs leading-relaxed text-slate-600">
                            Matchar: {joinSv(r.matched)}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">Att utveckla: {r.develop}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col md:col-span-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StepLabel n={3}>Exempel på ansökningsutkast</StepLabel>
                    <ExampleBadge />
                  </div>
                  {/* Stable live region so screen readers announce the new example draft */}
                  <div aria-live="polite" className="flex flex-1 flex-col">
                    <motion.article
                      key={`draft-${profile.id}-${role.id}`}
                      {...fade}
                      aria-label={`Exempel på ansökningsutkast för ${role.title}`}
                      className="mt-4 min-h-[15.5rem] flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-slate-200">
                          <FileText aria-hidden className="size-3.5" />
                        </span>
                        <p className="text-sm font-semibold text-navy-950">Ansökan: {role.title}</p>
                      </div>
                      <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                        {exampleDraft(profile, role).map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">
                        <Sparkles aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
                        Exempeltext från en fast mall – inte genererad av AI. Du kan välja en annan exempelroll för att se
                        hur texten förändras.
                      </p>
                    </motion.article>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-pretty text-slate-600">
            Demon använder påhittade exempeldata. Den visar inte riktiga jobb, verkliga matchningar eller
            AI-genererade resultat.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
