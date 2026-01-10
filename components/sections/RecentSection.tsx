"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";

export function RecentSection({
  title,
  command,
  items,
  linkText,
  linkUrl,
}: {
  title: string;
  command: string;
  items: any[];
  linkText: string;
  linkUrl: string;
}) {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const id = `recent-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const isExpanded = expandedSections[id] ?? false;
  return (
    <section
      className="font-mono max-w-6xl mx-auto px-4 md:px-12 mb-8 cursor-pointer"
      onClick={() => toggleSectionExpanded(id)}
    >
      <h2 className="text-xl font-black flex items-center gap-2 opacity-90">
        <span className="opacity-20">##</span>
        {title}
        <ChevronDown
          size={20}
          className={`transition-transform ${isExpanded ? "rotate-0" : "-rotate-90 opacity-30"}`}
        />
      </h2>
      <div className="flex items-center gap-2 opacity-40 text-xs mt-1">
        <span>$</span>
        {command}
        <span className="animate-pulse w-2 h-4 bg-foreground/20" />
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="space-y-4 glass p-6 rounded-2xl border border-white/10">
              {items.map((item, i) => (
                <div key={i} className="pl-4 border-l-2 border-foreground/10">
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-widest block mb-1">
                    {item.date}
                  </span>
                  <Link
                    href={item.url}
                    className="text-sm font-bold hover:underline decoration-foreground/20 underline-offset-4"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
            <Link
              href={linkUrl}
              className="mt-4 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity block"
            >
              → {linkText}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
