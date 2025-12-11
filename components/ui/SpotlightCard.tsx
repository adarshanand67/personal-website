"use client";

import { cn } from "@/lib/utils";

export const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="relative h-full">{children}</div>
    </div>
  );
};
