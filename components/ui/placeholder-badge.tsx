import { Construction } from "lucide-react";

/** Clearly marks content that will be replaced once real assets are provided. */
export function PlaceholderBadge({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const styles =
    tone === "dark"
      ? "border-white/20 bg-white/5 text-brand-100"
      : "border-brand-300 bg-brand-50 text-brand-700";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-xs font-medium tracking-wide ${styles}`}
    >
      <Construction aria-hidden className="size-3.5" />
      {children}
    </span>
  );
}
