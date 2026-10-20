import { ArrowRight, CalendarCheck, CalendarClock, Mail } from "lucide-react";
import { bookingUrl } from "@/lib/site";

type BookingButtonProps = {
  label?: string;
  variant?: "primary" | "light";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-[0_10px_30px_-10px_rgb(47_107_255/0.8)] ring-1 ring-inset ring-white/15 hover:from-brand-500 hover:to-brand-600",
  light:
    "bg-white text-navy-950 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] hover:bg-brand-50",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-5 text-base sm:px-7",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold sm:gap-2.5";

/**
 * Primary CTA. Links (in a new tab) to the CEO's validated https booking page
 * once one is configured; until then it scrolls to the #boka-mote section,
 * which offers an e-mail meeting request or explains that booking is not open yet.
 */
export function BookingButton({
  label = "Boka Möte Med Vår VD",
  variant = "primary",
  size = "lg",
  className = "",
  onClick,
}: BookingButtonProps) {
  const isExternal = bookingUrl !== null;

  return (
    <a
      href={bookingUrl ?? "#boka-mote"}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={onClick}
      data-placeholder={isExternal ? undefined : "booking-link"}
      className={`group ${base} transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <CalendarCheck aria-hidden className="size-[1.15em]" />
      <span>{label}</span>
      <ArrowRight
        aria-hidden
        className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
      {isExternal && <span className="sr-only">(öppnas i ny flik)</span>}
    </a>
  );
}

/**
 * E-mail fallback used in #boka-mote when no booking URL exists but a contact
 * email is configured. The label says "Förfråga" (request), not "Boka", because
 * it opens an e-mail draft rather than a booking page. Same look as the primary CTA.
 */
export function MeetingRequestButton({ href, describedBy }: { href: string; describedBy: string }) {
  return (
    <a
      href={href}
      aria-describedby={describedBy}
      // Longer label than "Boka Möte Med Vår VD": below 400px it may wrap onto two lines (and drops the arrow) instead of overflowing the card.
      className={`group ${base} max-w-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${variants.primary} ${sizes.lg} max-[399px]:h-auto max-[399px]:min-h-14 max-[399px]:py-2.5 max-[399px]:leading-snug max-[399px]:whitespace-normal`}
    >
      <Mail aria-hidden className="size-[1.15em] shrink-0" />
      <span className="text-balance">Förfråga Möte Med Vår VD</span>
      <ArrowRight
        aria-hidden
        className="size-[1.05em] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none max-[399px]:hidden"
      />
    </a>
  );
}

/**
 * Shown instead of the booking link when no booking URL exists. Same pill
 * shape and size as the primary CTA, but clearly unavailable: it is a
 * focusable `aria-disabled` button with no action, described by `statusId`.
 */
export function BookingUnavailable({
  label = "Boka Möte Med Vår VD",
  statusId,
}: {
  label?: string;
  statusId: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      aria-describedby={statusId}
      data-placeholder="booking-unavailable"
      className={`${base} ${sizes.lg} cursor-not-allowed bg-white text-brand-700 ring-1 ring-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500`}
    >
      <CalendarClock aria-hidden className="size-[1.15em]" />
      <span>{label}</span>
    </button>
  );
}
