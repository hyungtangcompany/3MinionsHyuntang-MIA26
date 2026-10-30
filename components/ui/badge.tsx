import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-akar-primary/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-akar-primary/20 bg-akar-primary-light text-akar-primary",
        earth:
          "border border-akar-earth/20 bg-akar-earth-light text-akar-earth",
        accent:
          "border border-akar-accent/40 bg-akar-accent-light text-akar-ink font-semibold",
        danger:
          "border border-akar-danger/25 bg-akar-danger-light text-akar-danger",
        outline:
          "border border-akar-border bg-white text-akar-muted",
        neutral:
          "border border-akar-border/80 bg-stone-100 text-akar-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

