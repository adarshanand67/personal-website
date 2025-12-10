"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { linkifyTech } from "@/lib/tech-links";
import { getAssetPath } from "@/lib/utils/asset-path";

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

export default function Experience({ items }: ExperienceProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="section max-w-4xl mx-auto px-4 mb-6">
            <div className="mb-4 font-mono" id="experience">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full text-left group"
                >
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        <span className="text-primary">##</span> Experience
                        <ChevronDown
                            size={20}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                        />
                    </h2>
                </button>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 text-xs">
                    <span className="text-green-500 font-bold">$</span>
                    <span>cat ~/work/history.log</span>
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                </div>

                {/* Timeline Container */}
                <div
                    className={`relative transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-8 top-2 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-green-500"></div>

                    <div className="space-y-12">
                        {items.map((exp, index) => (
                            <div key={index} className="relative pl-24">
                                {/* Logo positioned on timeline */}
                                <div className="absolute left-0 top-0">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-800 border-2 border-green-500 z-10">
                                        {exp.logo && (
                                            <Image
                                                src={getAssetPath(exp.logo)}
                                                alt={`${exp.company} logo`}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Content - Clean, no card styles */}
                                <div className="pt-1">
                                    <div className="mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{exp.company}</h3>
                                        <p className="text-lg text-gray-900 dark:text-gray-200 font-medium mt-0.5">{exp.role}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm font-mono mt-1">
                                            {exp.duration} • {exp.location}
                                        </p>
                                    </div>

                                    {exp.description && (
                                        <div className="mb-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {exp.description.includes("||") ? (
                                                exp.description.split("||").map((part, i) => (
                                                    <span key={i}>
                                                        {i > 0 && <span className="mx-2 text-gray-400">•</span>}
                                                        <span dangerouslySetInnerHTML={{ __html: linkifyTech(part.trim()) }} />
                                                    </span>
                                                ))
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: linkifyTech(exp.description) }} />
                                            )}
                                        </div>
                                    )}

                                    {exp.highlights.length > 0 && (
                                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                                            {exp.highlights.map((highlight: string, idx: number) => (
                                                <li key={idx} dangerouslySetInnerHTML={{ __html: linkifyTech(highlight) }} />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
