"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { SectionHeader, SpotlightCard } from "@/components/layout/ui";
import { useStore } from "@/lib/store/useStore";
import { linkifyTech } from "@/lib/techLinks";
import { getAssetPath } from "@/lib/utils";

/**
 * Props for Experience component.
 */
interface ExperienceProps {
    items: any[];
}

/**
 * Experience Section Component - displays professional work history.
 * Features collapsible section with spotlight cards and auto-linked technology mentions.

 */
export function Experience({ items }: ExperienceProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["experience"] ?? true;

    // Validate items prop
    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <div
                className="mb-2 font-mono max-w-6xl mx-auto px-4 md:px-6 section-padding"
                id="experience"
            >
                <SectionHeader
                    title="Experience"
                    isExpanded={isExpanded}
                    onToggle={() => toggleSectionExpanded("experience")}
                />
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No experience data available.
                </div>
            </div>
        );
    }

    return (
        <div
            className="mb-2 font-mono max-w-6xl mx-auto px-4 md:px-6 section-padding"
            id="experience"
        >
            <SectionHeader
                title="Experience"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded("experience")}
            />
            <div
                className={`relative transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
            >
                <div className="grid grid-cols-1 gap-4 pt-1">
                    {items.map((exp, index) => {
                        // Validate individual experience item
                        if (!exp || typeof exp !== "object") {
                            console.error(`Invalid experience item at index ${index}:`, exp);
                            return null;
                        }
                        return (
                            <SpotlightCard
                                key={index}
                                className="hover:shadow-2xl hover:shadow-foreground/[0.02] transition-all duration-500 hover:border-foreground/10 group"
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                                        {exp.logo && (
                                            <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-gray-800 p-1.5 border border-gray-100 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                <Image
                                                    src={getAssetPath(exp.logo)}
                                                    alt={`${exp.company || "Company"} logo`}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                                <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                                    {exp.company || "Unknown Company"}
                                                </h3>
                                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                                                    {exp.duration || "N/A"}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mt-0">
                                                {exp.role || "Unknown Role"}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                                <MapPin
                                                    size={10}
                                                    className="text-black dark:text-gray-400"
                                                />
                                                <span>{exp.location || "Unknown Location"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p
                                            className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed mb-4 border-l-2 border-gray-200 dark:border-zinc-800 pl-4 italic"
                                            dangerouslySetInnerHTML={{
                                                __html: linkifyTech(exp.description),
                                            }}
                                        />
                                    )}
                                    {exp.highlights &&
                                        Array.isArray(exp.highlights) &&
                                        exp.highlights.length > 0 && (
                                            <ul className="space-y-2">
                                                {exp.highlights.map((h: string, i: number) => {
                                                    if (!h || typeof h !== "string") {
                                                        return null;
                                                    }
                                                    return (
                                                        <li
                                                            key={i}
                                                            className="relative flex gap-3 text-xs leading-relaxed group/item w-full cursor-default"
                                                        >
                                                            <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover/item:bg-neutral-900 dark:group-hover/item:bg-white group-hover/item:scale-150 group-hover/item:rounded-sm transition-all duration-300 origin-center" />
                                                            <span
                                                                className="flex-1 text-zinc-500 dark:text-zinc-500 transition-colors duration-300 group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-200"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: linkifyTech(h),
                                                                }}
                                                            />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
