"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export function SectionHeader({
  title,
  isExpanded,
  onToggle,
  rightElement,
}: {
  title: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  rightElement?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between mb-6 group cursor-pointer select-none"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 rounded-lg bg-foreground/5 flex items-center justify-center transition-all duration-300 ${isExpanded ? "rotate-90 bg-foreground/10" : "group-hover:bg-foreground/10"}`}
        >
          <ChevronRight size={14} className="opacity-50" />
        </div>
        <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
          {title}
          <div className="h-px w-12 bg-foreground/10 group-hover:w-24 transition-all duration-500" />
        </h2>
      </div>
      {rightElement}
    </div>
  );
}
