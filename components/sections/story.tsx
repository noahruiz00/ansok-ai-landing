import { Check, CircleDashed, FlaskConical, Globe2, Hammer, Info, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Status = "done" | "ongoing" | "planned";

type Milestone = {
  icon: LucideIcon;
  status: Status;
  title: string;
  description: string;
  /** Company-provided claim awaiting founder confirmation (attributed on the page). */
  companyClaim?: { source: string; needsConfirmation: string };
};

/* No dates, numbers or results are stated – only the four stages supplied by the founder. */
const milestones: Milestone[] = [
  {
    icon: FlaskConical,
    status: "done",
    title: "En tidig prototyp i Sverige",
    description: "För att testa marknaden släppte vi en tidig prototyp i Sverige.",
  },
  {
    icon: Users,
    status: "done",
    title: "Betalande kunder från start",
    description:
      "Det smärtsamma problemet fick folk att betala för en ofungerande produkt, vilket bevisar en extrem betalningsvilja för att faktiskt lösa det här problemet.",
    companyClaim: {
      source: "Uppgift från Ansök AI",
      needsConfirmation:
        "Bekräfta att prototypen hade betalande kunder (antal och period) innan uppgiften presenteras för investerare.",
    },
  },
  {
    icon: Hammer,
    status: "done",
    title: "Plattformen byggdes om",
    description: "När vi fick det beviset stängde vi ner testet och byggde om plattformen från grunden.",
  },
  {
    icon: Globe2,
    status: "ongoing",
    title: "Lansering i Norden",
    description:
      "Nu handlar det inte om att bevisa behovet, utan om att lansera, möta efterfrågan och skala över hela Norden.",
  },
];

const statusMeta: Record<
  Status,
  { label: string; pill: string; pillIcon: LucideIcon; marker: string; card: string }
> = {
  done: {
    label: "Genomfört",
    pill: "bg-brand-50 text-brand-700 ring-brand-200",
    pillIcon: Check,
    marker: "bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/25",
    card: "bg-white ring-1 ring-slate-200",
  },
  ongoing: {
    label: "Pågår",
    pill: "bg-cyan-50 text-cyan-800 ring-cyan-200",
    pillIcon: CircleDashed,
    marker: "bg-white text-cyan-700 ring-2 ring-cyan-400 shadow-md shadow-cyan-500/20",
    card: "bg-gradient-to-br from-cyan-50/70 to-white ring-1 ring-cyan-200",
  },
  planned: {
    label: "Planerat",
    pill: "bg-slate-100 text-slate-700 ring-slate-300",
    pillIcon: CircleDashed,
    marker: "bg-white text-slate-500 border-2 border-dashed border-slate-300",
    card: "border border-dashed border-slate-300 bg-slate-50/70",
  },
};

/** Founder review notes are visible locally (`next dev`) but never in production. */
const SHOW_REVIEW_NOTES = process.env.NODE_ENV !== "production";

function StatusPill({ status }: { status: Status }) {
  const { label, pill, pillIcon: Icon } = statusMeta[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${pill}`}
    >
      <Icon aria-hidden className="size-3" strokeWidth={2.5} />
      {label}
    </span>
  );
}

/** Connector below a marker: solid blue→cyan within achieved/ongoing work, dashed toward a planned stage. */
function Connector({ next }: { next: Status }) {
  return next === "planned" ? (
    <span
      aria-hidden
      className="absolute top-10 bottom-0 left-[1.1875rem] border-l-2 border-dashed border-slate-300 sm:top-14 sm:left-[1.6875rem]"
    />
  ) : (
    <span
      aria-hidden
      className={`absolute top-10 bottom-0 left-[1.1875rem] w-0.5 rounded-full bg-gradient-to-b sm:top-14 sm:left-[1.6875rem] ${
        next === "ongoing" ? "from-brand-500 to-cyan-400" : "from-brand-500 to-brand-400"
      }`}
    />
  );
}

export function Story() {
  return (
    <section id="resa" aria-labelledby="resa-rubrik" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="resa-rubrik"
                align="left"
                eyebrow="Vår resa"
                title="Från Svensk Prototyp Till Nordisk Plattform"
                description="Ansök AI:s egen berättelse om resan hittills – från en tidig prototyp i Sverige till lansering i hela Norden. Uppgifterna inväntar verifiering av grundaren."
              />
              <Reveal delay={0.1}>
                <ul aria-label="Förklaring av status" className="mt-8 flex flex-wrap gap-2">
                  {(["done", "ongoing", "planned"] as const).map((status) => (
                    <li key={status}>
                      <StatusPill status={status} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {milestones.map((milestone, index) => {
              const meta = statusMeta[milestone.status];
              const next = milestones[index + 1]?.status;
              return (
                <li key={milestone.title} className="relative pb-5 pl-13 last:pb-0 sm:pb-8 sm:pl-20">
                  {next && <Connector next={next} />}

                  {/* Marker: solid (done), ringed (ongoing), dashed (planned) */}
                  <span
                    aria-hidden
                    className={`absolute top-0 left-0 flex size-10 items-center justify-center rounded-xl sm:size-14 sm:rounded-2xl ${meta.marker}`}
                  >
                    <milestone.icon className="size-[1.125rem] sm:size-6" />
                  </span>

                  <Reveal delay={index * 0.06}>
                    <article className={`rounded-2xl p-4 min-[400px]:p-5 sm:p-6 ${meta.card}`}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                          Steg {index + 1}
                        </span>
                        <StatusPill status={milestone.status} />
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold text-navy-950 sm:text-2xl">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-pretty text-slate-600 sm:text-lg">
                        {milestone.description}
                      </p>

                      {milestone.companyClaim && (
                        <>
                          <p className="mt-4 text-xs text-slate-500">{milestone.companyClaim.source}</p>
                          {SHOW_REVIEW_NOTES && (
                            <p
                              data-review-note
                              className="mt-3 flex gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"
                            >
                              <Info aria-hidden className="mt-px size-3.5 shrink-0" />
                              <span>
                                <strong className="font-semibold">
                                  Endast i utvecklingsläge – bekräftas av grundaren:
                                </strong>{" "}
                                {milestone.companyClaim.needsConfirmation}
                              </span>
                            </p>
                          )}
                        </>
                      )}
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
