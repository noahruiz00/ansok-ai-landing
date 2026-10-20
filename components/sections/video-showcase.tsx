import { Play } from "lucide-react";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { PlaceholderBadge } from "@/components/ui/placeholder-badge";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

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

/** Branded, clearly non-playable preview shown until a verified video URL is configured. */
function VideoPlaceholder() {
  return (
    <div
      data-placeholder="product-video"
      className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-cyan-50 px-4 text-center sm:px-6"
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
        {/* Static (non-interactive) play symbol – signals "video", not "click to play" */}
        <span
          aria-hidden
          className="flex size-9 items-center justify-center rounded-full bg-white text-brand-600 min-[400px]:size-11 shadow-[0_10px_30px_-12px_rgb(29_85_235/0.5)] ring-1 ring-brand-200 sm:size-20"
        >
          <Play className="ml-0.5 size-4 min-[400px]:size-5 sm:ml-1 sm:size-8" strokeWidth={2} />
        </span>
        <p className="mt-2 font-display text-base font-bold text-navy-950 min-[400px]:mt-3 min-[400px]:text-lg sm:mt-6 sm:text-2xl lg:text-3xl">
          Produktvideo kommer snart
        </p>
        <p className="mt-2 hidden max-w-md text-base text-slate-600 sm:block">
          Här visas en genomgång av hur Ansök AI fungerar i praktiken.
        </p>
        <div className="mt-2 min-[400px]:mt-3 sm:mt-5">
          <PlaceholderBadge tone="light">Platshållare – video tillkommer</PlaceholderBadge>
        </div>
      </div>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <section id="video" aria-labelledby="video-rubrik" className="relative bg-white pb-24 sm:pb-32">
      <h2 id="video-rubrik" className="sr-only">
        Produktvideo
      </h2>

      <Container className="relative">
        <Reveal y={40}>
          <div className="mx-auto max-w-5xl rounded-[1.75rem] bg-white p-2 shadow-[0_30px_80px_-35px_rgb(29_85_235/0.45)] ring-1 ring-slate-200 sm:p-3">
            <div className="aspect-video overflow-hidden rounded-[1.25rem] ring-1 ring-slate-200">
              {site.video.src ? (
                <VideoPlayer src={site.video.src} poster={site.video.poster} />
              ) : (
                <VideoPlaceholder />
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
