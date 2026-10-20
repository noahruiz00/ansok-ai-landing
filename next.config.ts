import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS runs through PostCSS (see postcss.config.mjs). The previous
  // `@tailwindcss/turbopack` loader rule kept a stale theme in `next dev`
  // after edits to globals.css, so brand colours silently disappeared.

  // Private-preview safety: unless indexing is explicitly allowed for the public
  // launch (ALLOW_INDEXING=true at build time, see lib/site.ts), every response –
  // including images and the social-sharing PNGs – tells search engines not to index.
  async headers() {
    if (process.env.ALLOW_INDEXING === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
