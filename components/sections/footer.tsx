import { MapPin } from "lucide-react";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { navLinks, site } from "@/lib/site";

const footerLinks = [...navLinks, { href: "#boka-mote", label: "Boka möte" }] as const;

/**
 * Current year for the copyright line. Cached so the page stays static, and
 * revalidated daily so it rolls over automatically in a new year.
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-brand-50/60">
      {/* Subtle divider: hairline with a soft brand tint in the middle */}
      <div aria-hidden className="h-px bg-gradient-to-r from-slate-200 via-brand-200 to-slate-200" />

      <Container className="py-12 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              aria-label="Ansök AI – till toppen av sidan"
              className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            >
              <Logo tone="dark" className="h-9" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{site.tagline}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
              <MapPin aria-hidden className="size-4 text-brand-600" />
              Byggd i Sverige
            </p>
          </div>

          <nav aria-label="Sidfotsnavigering">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm min-[400px]:gap-x-12 sm:flex sm:flex-wrap sm:gap-x-8">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded font-medium text-slate-700 transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:mt-12">
          <p>
            © <CopyrightYear /> {site.name}. Alla rättigheter förbehållna.
          </p>
        </div>
      </Container>
    </footer>
  );
}
