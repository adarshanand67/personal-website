"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useStore } from "@/lib/store";
import { SpotlightCard } from "@/components/ui";
import { SectionHeader } from "@/components/layout";
import { getAssetPath } from "@/lib/utils";
import { linkifyTech } from "@/lib/utils";

export function ExperienceSection({ items }: { items: any[] }) {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const isExpanded = expandedSections["experience"] ?? true;
  return (
    <div
      className="mb-2 font-mono max-w-6xl mx-auto px-4 md:px-6"
      id="experience"
    >
      <SectionHeader
        title="Experience"
        isExpanded={isExpanded}
        onToggle={() => toggleSectionExpanded("experience")}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="grid grid-cols-1 gap-4 pt-1 overflow-hidden"
          >
            {items.map((exp, i) => (
              <div
                key={i}
                className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300 overflow-hidden"
              >
                <div className="p-4 md:p-6 flex flex-col md:row-gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {exp.logo && (
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 p-1.5 border border-foreground/5 shadow-sm">
                        <Image
                          src={getAssetPath(exp.logo)}
                          alt={exp.company}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-black">{exp.company}</h3>
                        <span className="text-xs font-bold opacity-70">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-base font-bold text-foreground/90">
                        {exp.role}
                      </p>
                      <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p
                      className="text-xs pl-4 border-l-2 border-foreground/10 italic text-foreground/60 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: linkifyTech(exp.description),
                      }}
                    />
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-2 list-none text-[11px] text-foreground/70">
                        {exp.highlights.map((h: string, idx: number) => (
                          <li key={idx} className="flex gap-2 group/item">
                            <span className="text-foreground/30 group-hover/item:text-foreground/60 transition-colors">
                              ↳
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: linkifyTech(h),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
