import type { NextConfig } from "next";
// Single source of truth for the indexing opt-in, shared with the robots meta
// tag (app/layout.tsx) and robots.txt/sitemap.xml (app/robots.ts, app/sitemap.ts).
import { allowIndexing } from "./lib/site";

/**
 * Content Security Policy for the fully static site.
 * - `script-src 'unsafe-inline'`: Next.js streams the React payload through
 *   inline <script> tags on prerendered pages; a nonce-based policy would need
 *   per-request middleware and give up the static output.
 * - `style-src 'unsafe-inline'`: React/Framer Motion set inline styles.
 * - `frame-src`: only the privacy-friendly YouTube/Vimeo players that the
 *   optional product video embeds (see components/sections/video-showcase.tsx).
 *   A self-hosted video file under public/ is covered by `media-src 'self'`.
 * - `img-src data:`: next/image blur placeholders from static imports.
 * Applied only to production builds so `next dev` (HMR, eval source maps)
 * keeps working; `next start` serves it locally for parity testing.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Redundant with CSP frame-ancestors, kept for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Browsers ignore HSTS over plain http, so this is safe for local previews.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
    : []),
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS runs through PostCSS (see postcss.config.mjs). The previous
  // `@tailwindcss/turbopack` loader rule kept a stale theme in `next dev`
  // after edits to globals.css, so brand colours silently disappeared.

  async headers() {
    const headers = [{ source: "/:path*", headers: securityHeaders }];
    // Private-preview safety: unless indexing is explicitly allowed for the
    // public launch (see allowIndexing in lib/site.ts), every response –
    // including images and the social-sharing PNGs – tells search engines
    // not to index.
    if (!allowIndexing) {
      headers.push({
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      });
    }
    return headers;
  },
};

export default nextConfig;
