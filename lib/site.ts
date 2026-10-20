/**
 * Central configuration for the landing page.
 *
 * PLATSHÅLLARE: `bookingUrl`, `contactEmail`, `video` and the screenshot `src` values are
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
   * PLATSHÅLLARE: godkänd kontaktadress för mötesförfrågningar, t.ex. VD:ns e-post.
   * Ange den här eller via miljövariabeln NEXT_PUBLIC_CONTACT_EMAIL – gissa inte en adress.
   * Används bara när ingen giltig bokningslänk finns: sektionen #boka-mote visar då
   * "Förfråga Möte Med Vår VD", som öppnar ett e-postutkast (se `meetingMode` nedan).
   */
  contactEmail: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || null) as string | null,

  /**
   * PLATSHÅLLARE: produktvideo ("Hur Fungerar AnsöAI?" på kanalen AnsökAI).
   * Ingen verifierad länk finns ännu – gissa inte en URL.
   * - `src`: en vanlig YouTube-/Vimeo-länk (t.ex. "https://www.youtube.com/watch?v=…",
   *   "https://youtu.be/…" eller "https://vimeo.com/…") – den görs om till en
   *   integritetsvänlig inbäddning utan autoplay. Alternativt en lokal fil,
   *   t.ex. "/assets/ansok-ai-demo.mp4".
   * - `poster`: valfri förhandsbild för lokala videofiler, t.ex. "/assets/video-poster.jpg".
   * Länken kan anges här eller via miljövariabeln NEXT_PUBLIC_VIDEO_URL. Utan länk
   * visas en tydligt märkt "Video kommer snart"-presentation i stället.
   */
  video: {
    src: (process.env.NEXT_PUBLIC_VIDEO_URL || null) as string | null,
    poster: null as string | null,

    /**
     * Tillfällig illustrationsvideo (på Davids begäran) som visas tills den officiella
     * produktvideon finns. Används bara när `src` saknas – en officiell länk har alltid
     * företräde. Sätt till `null` för att visa "Video kommer snart"-presentationen igen.
     *
     * Källa: "Side View Of A Woman Working Using Laptop" av Katrin Bolovtsova,
     * https://www.pexels.com/video/side-view-of-a-woman-working-using-laptop-5390861/
     * Licens: Pexels License (https://www.pexels.com/license/) – fri användning, även
     * kommersiell, utan krav på attribution. Får inte antyda att personen i videon
     * står bakom produkten. Klippet har inget ljudspår och visar ingen programvara.
     */
    temporary: {
      src: "/videos/illustration-laptop-typing.mp4",
      poster: "/videos/illustration-laptop-typing-poster.jpg",
      credit: "Katrin Bolovtsova / Pexels",
    } as { src: string; poster: string; credit: string } | null,
  },
} as const;

export const navLinks = [
  { href: "#marknad", label: "Marknaden" },
  { href: "#resa", label: "Vår resa" },
  { href: "#produkt", label: "Produkten" },
  { href: "#demo", label: "Demo" },
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

/** Accepts a single plain address only, so no extra recipients or mailto parameters can be injected. */
function toValidEmail(value: string | null): string | null {
  const email = value?.trim();
  if (!email || email.length > 254) return null;
  return /^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email) ? email : null;
}

/** The validated contact email, or `null` when none is configured. */
export const contactEmail = toValidEmail(site.contactEmail);

/** Pre-filled e-mail draft for a meeting request (Swedish subject and a short template). */
export const meetingRequestHref = contactEmail
  ? `mailto:${contactEmail}?subject=${encodeURIComponent("Mötesförfrågan – Ansök AI")}&body=${encodeURIComponent(
      "Hej!\n\nJag vill gärna boka ett möte med Ansök AI:s VD.\n\nNamn:\nOrganisation:\nFörslag på tider:\n",
    )}`
  : null;

/**
 * How the meeting CTA behaves, in priority order:
 * 1. "booking" – a valid https booking URL: "Boka Möte Med Vår VD" opens it in a new tab.
 * 2. "email" – no booking URL but a valid contact email: #boka-mote offers
 *    "Förfråga Möte Med Vår VD", which opens an e-mail draft.
 * 3. "unavailable" – neither: #boka-mote states honestly that booking is not open yet.
 * Hero and navbar buttons lead to #boka-mote in modes 2 and 3.
 */
export const meetingMode: "booking" | "email" | "unavailable" = bookingUrl
  ? "booking"
  : meetingRequestHref
    ? "email"
    : "unavailable";
