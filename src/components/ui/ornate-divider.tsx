import { cn } from "@/lib/utils";

interface OrnateDividerProps {
  className?: string;
  variant?: "gold" | "maroon" | "light";
}

export function OrnateDivider({ className, variant = "gold" }: OrnateDividerProps) {
  const colorClass = {
    gold: "text-gold",
    maroon: "text-maroon",
    light: "text-gold/30",
  }[variant];

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className={cn("flex-1 h-px bg-gradient-to-r from-transparent to-current", colorClass)} />
      <svg
        className={cn("w-8 h-8", colorClass)}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2L24 10L32 8L28 16L36 20L28 24L32 32L24 30L20 38L16 30L8 32L12 24L4 20L12 16L8 8L16 10L20 2Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
      <div className={cn("flex-1 h-px bg-gradient-to-l from-transparent to-current", colorClass)} />
    </div>
  );
}
