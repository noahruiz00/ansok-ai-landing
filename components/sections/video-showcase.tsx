import { Clapperboard, Clock, FileUp, SearchCheck, Zap } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site";

/** What the walkthrough will cover – the same three steps as the product section (no new claims). */
const walkthroughTopics = [
  { icon: FileUp, label: "Ladda upp ditt CV" },
  { icon: SearchCheck, label: "Hitta relevanta jobb" },
  { icon: Zap, label: "Automatisera ansökningar" },
];

const isVideoFile = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

/**
 * Accepts a normal YouTube/Vimeo link (watch, youtu.be, shorts or vimeo.com/ID)
 * or an existing embed URL and returns a privacy-friendly embed URL without autoplay.
 */
function toEmbedUrl(src: string): string {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");
    let youtubeId: string | null = null;
    if (host === "youtu.be") youtubeId = url.pathname.slice(1);
    else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      youtubeId =
        url.searchParams.get("v") ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1] ?? null;
    }
    if (youtubeId) return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;

    const vimeoId = host.endsWith("vimeo.com") ? url.pathname.match(/(\d+)/)?.[1] : undefined;
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?dnt=1`;
  } catch {
    // Not an absolute URL – fall through and use as-is.
  }
  return src;
}

function VideoPlayer({ src, poster }: { src: string; poster: string | null }) {
  if (isVideoFile(src)) {
    return (
      <video
        controls
        playsInline
        preload="none"
        poster={poster ?? undefined}
        className="size-full bg-navy-950 object-cover"
      >
        <source src={src} />
        Din webbläsare stöder inte videouppspelning.
      </video>
    );
  }

  return (
    <iframe
      src={toEmbedUrl(src)}
      title="Produktvideo: Hur fungerar Ansök AI?"
      loading="lazy"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className="size-full border-0"
    />
  );
}

/**
 * Branded "coming soon" presentation shown until a verified video URL is configured.
 * Deliberately has no play button or other control: nothing here is clickable,
 * and the status pill states plainly that the video is not available yet.
 */
function VideoPlaceholder() {
  return (
    <div
      data-placeholder="product-video"
      className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-cyan-50 px-4 text-center sm:px-8"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,black,transparent)]"
      />
      <div aria-hidden className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-brand-200/50 blur-[90px]" />
      <div aria-hidden className="absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-cyan-200/50 blur-[90px]" />

      <div className="absolute top-5 left-6 hidden sm:block">
        <Logo tone="dark" className="h-6 lg:h-7" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Film icon in a tile (not a round play button) – signals "video" without suggesting it can be played */}
        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[0_10px_30px_-12px_rgb(29_85_235/0.45)] ring-1 ring-brand-200 min-[400px]:size-11 sm:size-16 sm:rounded-2xl"
        >
          <Clapperboard className="size-4 min-[400px]:size-5 sm:size-7" strokeWidth={1.75} />
        </span>
        <p className="mt-2 font-display text-base leading-tight font-bold text-navy-950 min-[400px]:mt-3 min-[400px]:text-lg sm:mt-5 sm:text-2xl lg:text-3xl">
          En närmare titt på Ansök AI
        </p>
        <p className="mt-2 hidden max-w-md text-base leading-relaxed text-slate-600 min-[400px]:block min-[400px]:text-sm sm:text-base">
          En produktgenomgång publiceras här när den är redo.
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200 min-[400px]:mt-3 sm:mt-5">
          <Clock aria-hidden className="size-3.5" />
          Video kommer snart
        </span>
        <ul
          aria-label="Genomgången kommer att visa"
          className="mt-6 hidden items-center gap-x-5 gap-y-2 text-sm text-slate-600 md:flex"
        >
          {walkthroughTopics.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon aria-hidden className="size-4 text-brand-600" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Temporary stock footage (David's request) until the official video exists.
 * Native controls, no autoplay and no audio track; clearly labelled as an
 * illustration on the frame and in the caption so it is never mistaken for
 * the product or for an endorsement by the person shown.
 */
function TemporaryVideo({ src, poster }: { src: string; poster: string }) {
  return (
    <div className="relative size-full">
      <video
        controls
        playsInline
        muted
        preload="none"
        poster={poster}
        aria-label="Illustrationsvideo: en person skriver på en bärbar dator. Visar inte den faktiska Ansök AI-plattformen."
        aria-describedby="video-illustration-note"
        className="size-full bg-navy-950 object-cover"
      >
        <source src={src} type="video/mp4" />
        Din webbläsare stöder inte videouppspelning.
      </video>
      {/* Label sits at the top, clear of the native controls along the bottom edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-200 backdrop-blur-sm sm:top-4 sm:left-4"
      >
        <Clapperboard className="size-3.5" />
        Illustrationsvideo
      </span>
    </div>
  );
}

/**
 * Product video directly after the hero (David's brief). Priority:
 * 1. the verified official video from site.video.src / NEXT_PUBLIC_VIDEO_URL,
 * 2. the labelled temporary illustration video (site.video.temporary),
 * 3. an honest, non-playable "coming soon" placeholder.
 */
export function VideoShowcase() {
  const temporary = site.video.src ? null : site.video.temporary;

  return (
    // Small bottom padding: the market section below already has generous top padding.
    <section id="video" aria-labelledby="video-rubrik" className="relative bg-white pb-6 sm:pb-8">
      <Container className="relative">
        <SectionHeading
          id="video-rubrik"
          eyebrow="Produktvideo"
          title="Se Ansök AI I Praktiken"
          description={
            temporary
              ? "Den officiella produktvideon publiceras här när den är klar. Tills dess visas en illustrationsvideo."
              : undefined
          }
        />

        <Reveal y={40} className="mt-10 sm:mt-12">
          <figure className="mx-auto max-w-5xl">
            <div className="rounded-[1.75rem] bg-white p-2 shadow-[0_30px_80px_-35px_rgb(29_85_235/0.45)] ring-1 ring-slate-200 sm:p-3">
              <div className="aspect-video overflow-hidden rounded-[1.25rem] ring-1 ring-slate-200">
                {site.video.src ? (
                  <VideoPlayer src={site.video.src} poster={site.video.poster} />
                ) : temporary ? (
                  <TemporaryVideo src={temporary.src} poster={temporary.poster} />
                ) : (
                  <VideoPlaceholder />
                )}
              </div>
            </div>
            {temporary && (
              <figcaption
                id="video-illustration-note"
                className="mt-4 flex flex-col items-center gap-1 text-center text-sm text-slate-600 sm:flex-row sm:justify-center sm:gap-2"
              >
                <span>Illustrationsvideo – visar inte den faktiska Ansök AI-plattformen.</span>
                <span className="text-xs text-slate-500">Video: {temporary.credit}</span>
              </figcaption>
            )}
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
