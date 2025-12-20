"use client";

import Image from "next/image";
import { useStore } from "@/lib/store/useStore";
import { SectionHeader, SpotlightCard } from "@/components/layout/ui";
import { linkifyTech } from "@/lib/techLinks";
import { getAssetPath } from "@/lib/utils";

interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
    logo?: string;
    description?: string;
    highlights: string[];
}

interface ExperienceProps {
    items: ExperienceItem[];
}

export function Experience(props: ExperienceProps) {
    return <ExperienceBase {...props} />;
}

function ExperienceBase({ items }: ExperienceProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['experience'] ?? true;

    return (
        <div className="mb-4 font-mono" id="experience">
            <SectionHeader
                title="Experience"
                command="cat ~/work/history.log"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded('experience')}
            />
            <div
                className={`relative transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pt-4 pl-2">
                    {items.map((exp, index) => (
                        <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0 last:border-l-transparent hover:border-green-500 transition-colors group/item">
                            <div className="absolute left-0 top-0 z-10 w-4 h-4 -translate-x-[9px] rounded-full bg-green-500 border-4 border-white dark:border-gray-900 group-hover/item:scale-125 transition-transform"></div>
                            <SpotlightCard className="hover:shadow-green-500/10 transition-all duration-500">
                                <div className="flex flex-col gap-3 p-5">
                                    <div className="flex items-start gap-3">
                                        {exp.logo && (
                                            <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
                                                <Image
                                                    src={getAssetPath(exp.logo)}
                                                    alt={`${exp.company} logo`}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{exp.company}</h3>
                                            <p className="text-green-600 dark:text-green-400 font-semibold mt-0.5">{exp.role}</p>
                                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                <span>{exp.duration}</span>
                                                <span className="text-gray-400">•</span>
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    )}
                                    {exp.highlights && exp.highlights.length > 0 && (
                                        <ul className="space-y-2">
                                            {exp.highlights.map((highlight, i) => (
                                                <li
                                                    key={i}
                                                    className="flex gap-2 text-gray-700 dark:text-gray-300 leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<span class="text-green-500 shrink-0">▸</span><span>${linkifyTech(highlight)}</span>`
                                                    }}
                                                />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
