import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

/**
 * Single-page sitemap. Empty until indexing is explicitly allowed for the
 * public launch (see lib/site.ts), so private previews never advertise URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing || !siteUrl) return [];
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
