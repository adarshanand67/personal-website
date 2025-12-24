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
 * @component
 */
export function Experience({ items }: ExperienceProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['experience'] ?? true;

    return (
        <div className="mb-4 font-mono max-w-6xl mx-auto px-4 md:px-6 section-padding" id="experience">
            <SectionHeader
                title="Experience"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded('experience')}
            />
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="grid grid-cols-1 gap-6 pt-4">
                    {items.map((exp, index) => (
                        <SpotlightCard key={index} className="hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 hover:border-green-500/20 group">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                                    {exp.logo && (
                                        <div className="shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <Image src={getAssetPath(exp.logo)} alt={`${exp.company} logo`} width={64} height={64} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{exp.company}</h3>
                                            <span className="text-xs font-bold px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">{exp.duration}</span>
                                        </div>
                                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">{exp.role}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            <MapPin size={14} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                                {exp.description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium border-l-2 border-gray-100 dark:border-white/5 pl-6 italic">{exp.description}</p>}
                                {exp.highlights && (
                                    <ul className="space-y-3">
                                        {exp.highlights.map((h: string, i: number) => (
                                            <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-300 leading-relaxed font-medium group/item" dangerouslySetInnerHTML={{ __html: `<div class="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 group-hover/item:scale-150 transition-transform"></div><span>${linkifyTech(h)}</span>` }} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
