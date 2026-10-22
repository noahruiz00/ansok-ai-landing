import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

/**
 * robots.txt, driven by the same explicit launch opt-in as the robots meta tag
 * and the X-Robots-Tag header (see lib/site.ts): everything is disallowed
 * until ALLOW_INDEXING=true is set at build time with a valid https site URL.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing || !siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
