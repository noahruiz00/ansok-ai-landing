import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Market } from "@/components/sections/market";
import { Navbar } from "@/components/sections/navbar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Story } from "@/components/sections/story";
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
        <VideoShowcase />
        <Market />
        <ProductShowcase />
        <Story />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
