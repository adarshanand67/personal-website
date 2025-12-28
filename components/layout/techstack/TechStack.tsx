"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, SpotlightCard } from "@/components/layout/ui";
import { useStore } from "@/lib/store/useStore";
import { skillCategories } from "@/lib/constants";
import { techLinks } from "@/lib/techLinks";
import { SkillsGraph } from "./SkillsGraph";

/**
 * Tech Stack Section Component - displays technical skills in list or graph view.
 * Features collapsible section with view mode toggle and auto-linked technology names.

 */
export function TechStack() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["techstack"] ?? false;
    const [viewMode, setViewMode] = useState<"list" | "graph">("list");

    return (
        <div className="font-mono max-w-6xl mx-auto px-4 md:px-6 mb-4">
            <SectionHeader
                title="Tech Stack"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded("techstack")}
                rightElement={
                    <div
                        className="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg border border-gray-200 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                                viewMode === "list"
                                    ? "bg-white dark:bg-black text-foreground shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("graph")}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                                viewMode === "graph"
                                    ? "bg-white dark:bg-black text-foreground shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                        >
                            Graph
                        </button>
                    </div>
                }
            />
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                {viewMode === "list" ? (
                    <div className="grid grid-cols-1 gap-2 mt-2">
                        {Object.entries(skillCategories).map(([category, skills]) => (
                            <SpotlightCard
                                key={category}
                                className="group hover:border-blue-500/30 transition-all duration-300"
                            >
                                <div className="p-3">
                                    <h3 className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-slate-600 transition-colors"></span>
                                        {category}
                                        <span className="text-[9px] text-gray-400 ml-auto font-mono opacity-0 group-hover/spotlight:opacity-100 transition-opacity">
                                            {skills.length} items
                                        </span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => {
                                            const url =
                                                techLinks[skill] ||
                                                `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
                                            let domain = "google.com";
                                            try {
                                                domain = new URL(url).hostname;
                                            } catch {}
                                            const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                                            return (
                                                <Link
                                                    key={skill}
                                                    href={url}
                                                    target="_blank"
                                                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-medium text-foreground/70 hover:bg-white dark:hover:bg-white/10 hover:text-foreground hover:border-foreground/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                                                >
                                                    <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white dark:bg-gray-900 p-0.5 shrink-0">
                                                        <Image
                                                            src={favicon}
                                                            alt={skill}
                                                            width={16}
                                                            height={16}
                                                            className="object-contain"
                                                            loading="eager"
                                                        />
                                                    </div>
                                                    {skill}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <SkillsGraph />
                    </div>
                )}
            </div>
        </div>
    );
}
