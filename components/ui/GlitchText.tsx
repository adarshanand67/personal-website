"use client";
import { cn } from "@/lib/utils/cn";
export const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("relative inline-block font-bold group cursor-default", className)}>
      <span className="relative z-10 block">{text}</span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-70 animate-glitch-1 select-none"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 w-full h-full text-green-500 opacity-70 animate-glitch-2 select-none"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};
