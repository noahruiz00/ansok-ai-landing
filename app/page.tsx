import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Market } from "@/components/sections/market";
import { Navbar } from "@/components/sections/navbar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Revenue } from "@/components/sections/revenue";
import { Story } from "@/components/sections/story";
import { MatchingDemo } from "@/components/sections/matching-demo";
import { VideoShowcase } from "@/components/sections/video-showcase";

export default function Home() {
  return (
    <>
      <a
        href="#innehall"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-navy-950 shadow-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Hoppa till innehållet
      </a>
      <Navbar />
      <main id="innehall">
        <Hero />
        {/* Product video directly after the hero (David's brief). Honest placeholder until a verified URL is set. */}
        <VideoShowcase />
        {/* David's core business story */}
        <Market />
        <Story />
        {/* Supporting demonstrations: real screenshot + labelled illustrations, then the fictional-data demo */}
        <ProductShowcase />
        <MatchingDemo />
        {/* Proposed B2C/B2B revenue streams (David's brief) – after the product explanation, before the meeting CTA */}
        <Revenue />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
