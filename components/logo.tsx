import Image from "next/image";
import logoOnDark from "@/public/assets/ansok-ai-logo-horizontal-on-dark.png";
import logoOnLight from "@/public/assets/ansok-ai-logo-horizontal-transparent.png";

type LogoProps = {
  /** "dark" = for light backgrounds (original colours), "light" = for dark backgrounds. */
  tone?: "light" | "dark";
  className?: string;
  /** Load immediately instead of lazily (use for the above-the-fold navbar logo). */
  eager?: boolean;
};

/**
 * Official horizontal Ansök AI logo. The intrinsic width/height from the static
 * import keep the aspect ratio; set the rendered height via `className`.
 */
export function Logo({ tone = "dark", className = "h-8", eager = false }: LogoProps) {
  return (
    <Image
      src={tone === "light" ? logoOnDark : logoOnLight}
      alt="Ansök AI"
      loading={eager ? "eager" : "lazy"}
      sizes="240px"
      className={`w-auto select-none ${className}`}
    />
  );
}
