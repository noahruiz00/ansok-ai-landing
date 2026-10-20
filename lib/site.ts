/**
 * Central configuration for the landing page.
 *
 * PLATSHÅLLARE: `bookingUrl`, `video` and the screenshot `src` values are
 * intentionally empty until the real assets are provided. Every component
 * falls back to a clearly labelled placeholder while they are `null`.
 */

export const site = {
  name: "Ansök AI",
  title: "Ansök AI – Smartare Jobbsökande Med AI",
  description:
    "Ansök AI utvecklar en AI-driven plattform som hjälper jobbsökande att hitta relevanta jobb och automatisera repetitiva delar av ansökningsprocessen.",
  tagline: "Smartare jobbansökningar med AI – för jobbsökande i hela Norden.",
  locale: "sv_SE",

  /**
   * PLATSHÅLLARE: länk till VD:ns bokningssida (t.ex. Calendly eller Cal.com).
   * Ange den här eller via miljövariabeln NEXT_PUBLIC_BOOKING_URL. Endast
   * https-länkar används (se `bookingUrl` nedan). Utan giltig länk pekar
   * CTA-knapparna till sektionen #boka-mote, som visar att bokning inte är öppen ännu.
   */
  bookingUrl: (process.env.NEXT_PUBLIC_BOOKING_URL || null) as string | null,

  /**
   * PLATSHÅLLARE: produktvideo ("Hur Fungerar AnsöAI?" på kanalen AnsökAI).
   * Ingen verifierad länk finns ännu – gissa inte en URL.
   * - `src`: en vanlig YouTube-/Vimeo-länk (t.ex. "https://www.youtube.com/watch?v=…",
   *   "https://youtu.be/…" eller "https://vimeo.com/…") – den görs om till en
   *   integritetsvänlig inbäddning utan autoplay. Alternativt en lokal fil,
   *   t.ex. "/assets/ansok-ai-demo.mp4".
   * - `poster`: valfri förhandsbild för lokala videofiler, t.ex. "/assets/video-poster.jpg".
   */
  video: {
    src: null as string | null,
    poster: null as string | null,
  },
} as const;

export const navLinks = [
  { href: "#video", label: "Produktvideo" },
  { href: "#marknad", label: "Marknaden" },
  { href: "#produkt", label: "Produkten" },
  { href: "#resa", label: "Vår resa" },
] as const;

/** Accepts only absolute https URLs, so a typo or unsafe scheme can never become a CTA link. */
function toSecureUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * Public site URL used for canonical links and absolute social-image URLs.
 *
 * 1. NEXT_PUBLIC_SITE_URL – the real production domain (https only), e.g. "https://ansokai.se".
 * 2. VERCEL_PROJECT_PRODUCTION_URL – automatic fallback when hosted on Vercel.
 * 3. http://localhost:3000 – development only.
 *
 * In a production build without 1 or 2 this is `null`: no canonical URL is
 * published and the page is marked `noindex` (see app/layout.tsx), so
 * localhost is never announced as the production address.
 */
export const siteUrl: string | null = (() => {
  const configured = toSecureUrl(process.env.NEXT_PUBLIC_SITE_URL ?? null);
  if (configured) return configured.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return toSecureUrl(`https://${vercel}`)?.replace(/\/$/, "") ?? null;
  return process.env.NODE_ENV === "production" ? null : "http://localhost:3000";
})();

// Build/server-side only – never log in visitors' browsers.
if (siteUrl === null && typeof window === "undefined") {
  console.warn(
    "[ansok-ai] NEXT_PUBLIC_SITE_URL saknas eller är ogiltig (måste vara https): ingen canonical-URL publiceras och sidan markeras noindex. Ange den riktiga domänen (https) innan publicering.",
  );
}

/**
 * Search-engine indexing is an explicit opt-in, separate from knowing the URL.
 * Knowing the URL (NEXT_PUBLIC_SITE_URL, or Vercel's automatic production URL)
 * only enables correct canonical and social-image links; a private preview on
 * any host therefore stays `noindex` until ALLOW_INDEXING=true is set at build
 * time for the real public launch. Also used by next.config.ts (X-Robots-Tag).
 */
export const allowIndexing =
  process.env.ALLOW_INDEXING === "true" && siteUrl !== null && !siteUrl.startsWith("http://localhost");

/** The validated booking URL, or `null` when booking is not available yet. */
export const bookingUrl = toSecureUrl(site.bookingUrl);

export const isBookingPlaceholder = bookingUrl === null;
