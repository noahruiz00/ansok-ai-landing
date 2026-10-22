# Ansök AI – Investor Landing Page

Swedish-language, investor-focused landing page for **Ansök AI**, an AI-driven
platform that helps job seekers find relevant jobs and automate repetitive
parts of the application process.

Built with [Next.js](https://nextjs.org) 16 (App Router, Cache Components),
React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons. The
page prerenders fully static – there is no backend, database or API, so it
runs on any Node host or Vercel at no extra service cost.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Useful scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server (shows the founder review notes, see below) |
| `npm run build` | Production build (fully static output) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run social-images` | Regenerate `app/opengraph-image.png` / `app/twitter-image.png` (run after logo or copy changes, then commit the PNGs) |

## Environment variables

All configuration lives in [`lib/site.ts`](lib/site.ts) and is driven by five
optional environment variables – see [`.env.example`](.env.example) for a
commented template. **Every value is optional**: while one is missing, the site
falls back to a clearly labelled placeholder, so a build never breaks or shows
invented data.

| Variable | Purpose | Without it |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain (https only), used for the canonical URL and absolute social-image URLs. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is an automatic fallback. | Build warns; page stays `noindex`; social images resolve to localhost |
| `ALLOW_INDEXING` | Explicit opt-in (`true`) for search-engine indexing at the public launch. Controls the robots meta tag, the `X-Robots-Tag` header, `robots.txt` and the sitemap – all from the single `allowIndexing` flag in `lib/site.ts`. | Everything stays `noindex, nofollow` (private-preview safe) |
| `NEXT_PUBLIC_BOOKING_URL` | The CEO's booking page (Calendly/Cal.com, https only). | CTAs lead to `#boka-mote`, which falls back to e-mail or an honest "not open yet" notice |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Approved address for meeting requests (used when no booking URL is set). | See above |
| `NEXT_PUBLIC_VIDEO_URL` | Official product video (YouTube/Vimeo link → privacy-friendly embed, or a local file under `public/`). | A labelled temporary illustration video is shown (`site.video.temporary`) |

`NEXT_PUBLIC_*` values are inlined at **build time** – rebuild and redeploy
after changing them. Invalid values (non-https URLs, malformed e-mail
addresses) are rejected by validation in `lib/site.ts` and treated as unset.

## Investor claims & founder review

Company-provided claims (market size, paying prototype customers, proposed
prices and revenue streams) are **not independently verified**. The site
handles this deliberately:

- Every such claim is visibly attributed ("Källa: Ansök AI") with an
  "inväntar verifiering" note; proposed prices are labelled
  "Föreslagen prissättning".
- In `next dev`, amber **founder review notes** appear next to each claim,
  listing exactly what must be confirmed. They are stripped from production
  builds (`SHOW_REVIEW_NOTES` in the section components).
- The interactive demo uses invented example data and says so; conceptual
  illustrations are labelled so they cannot be mistaken for app screenshots.

Do not add metrics, testimonials, e-mail addresses or product capabilities
that the founder has not confirmed.

## Project structure

```
app/            Layout (metadata, fonts), page composition, robots/sitemap, 404
components/
  sections/     One component per page section, in page order
  ui/           Shared primitives (Container, Reveal, SectionHeading, CTAs)
lib/site.ts     Central config: copy, nav links, env-var validation, indexing flag
public/         Served assets (logos, screenshots, illustration video)
assets/fonts/   Local fonts for the social-image script only
scripts/        generate-social-images.mjs
source-assets/  NOT served: brand originals and private screenshots (see its README)
```

Security headers (CSP, HSTS, nosniff, frame-ancestors, …) are set in
[`next.config.ts`](next.config.ts). The CSP is applied to production builds
only, so `next dev` tooling keeps working; verify it locally with
`npm run build && npm run start`.

## Deployment

Any Node.js host or Vercel: `npm run build`, then `npm run start` (or let
Vercel handle it). The page is fully static with a daily revalidation (used
only to roll over the copyright year). No paid services are required.

For a **private preview** (e.g. for investors), deploy with no env vars set,
or just `NEXT_PUBLIC_SITE_URL` – the site stays `noindex` until indexing is
explicitly allowed.

## Launch checklist

1. Founder confirms or removes every claim flagged by the dev-mode review
   notes (market figures, prototype customers, US comparison, prices,
   B2C/B2B revenue-stream status).
2. Set `NEXT_PUBLIC_BOOKING_URL` (or `NEXT_PUBLIC_CONTACT_EMAIL`) so the
   meeting CTA works.
3. Set `NEXT_PUBLIC_SITE_URL` to the real https domain.
4. Optional: set `NEXT_PUBLIC_VIDEO_URL` when the official product video is
   ready (replaces the temporary illustration video automatically).
5. Set `ALLOW_INDEXING=true` and rebuild/redeploy.
6. Verify on the live site: `/robots.txt` allows crawling and references
   `/sitemap.xml`; the `X-Robots-Tag` header is gone; canonical and
   `og:image` URLs use the real domain; the booking button opens the booking
   page; run a social-card preview (e.g. opengraph.xyz).
