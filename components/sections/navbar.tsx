"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { BookingButton } from "@/components/ui/booking-button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        // Return focus to the toggle instead of leaving it on a link that is about to unmount.
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-slate-200/70 bg-white/85 shadow-[0_8px_30px_-20px_rgb(3_10_31/0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <nav aria-label="Huvudnavigering" className="flex h-18 items-center justify-between">
          <a
            href="#top"
            aria-label="Ansök AI – till startsidan"
            className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
          >
            {/* The hero is light, so the original-colour logo works in both navbar states. */}
            <Logo tone="dark" eager className="h-7 sm:h-8" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition-colors hover:bg-brand-50 hover:text-navy-950 focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden md:block lg:ml-0">
            <BookingButton label="Boka möte" size="md" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            className="inline-flex size-11 items-center justify-center rounded-full text-navy-950 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-500 md:ml-3 lg:hidden"
          >
            {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          /*
           * Animate only opacity/transform – never `height`. To animate from
           * `height: "auto"`, Motion measures the element and then restores the
           * page position with `window.scrollTo`, which cancels the smooth
           * scroll started by tapping a menu link (the page stayed at the top).
           * The panel sits inside the fixed header, so its height never affects
           * page layout and needs no height animation.
           */
          <motion.div
            id="mobilmeny"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="border-t border-slate-200/70 lg:hidden"
          >
            <Container className="py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-navy-950 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pb-2">
                <BookingButton size="md" className="w-full" onClick={() => setOpen(false)} />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
