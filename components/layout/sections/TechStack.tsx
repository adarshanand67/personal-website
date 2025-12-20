"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, Network } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { SectionHeader, SpotlightCard } from "@/components/layout/ui";
import { skillCategories } from "@/lib/constants";
import { techLinks } from "@/lib/techLinks";
import { SkillGraph } from "@/components";

export function TechStack() {
    return <TechStackBase />;
}

function TechStackBase() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['techstack'] ?? false;
    const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');

    return (
        <div className="font-mono">
            <div className="flex items-center justify-between mb-4">
                <SectionHeader
                    title="Tech Stack"
                    command="cat ~/.skills"
                    isExpanded={isExpanded}
                    onToggle={() => toggleSectionExpanded('techstack')}
                />
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {/* View Toggle */}
                <div className="flex justify-end px-1 mb-4">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'list'
                                ? 'bg-white dark:bg-black text-green-600 dark:text-green-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            <LayoutGrid size={14} />
                            <span>Skills List</span>
                        </button>
                        <button
                            onClick={() => setViewMode('graph')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'graph'
                                ? 'bg-white dark:bg-black text-green-600 dark:text-green-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            <Network size={14} />
                            <span>Architecture</span>
                        </button>
                    </div>
                </div>

                {viewMode === 'graph' ? (
                    <div className="mt-4 mb-8">
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 max-w-lg mx-auto">
                                Interactive visualization of the system architecture. Hover over nodes to see data flow.
                            </p>
                        </div>
                        <SkillGraph />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {Object.entries(skillCategories).map(([category, skills]) => (
                            <SpotlightCard
                                key={category}
                                className="group hover:border-green-500/30 transition-all duration-300"
                            >
                                <div className="p-5">
                                    <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-pulse"></span>
                                        {category}
                                        <span className="text-[10px] text-gray-400 ml-auto font-mono opacity-0 group-hover/spotlight:opacity-100 transition-opacity">
                                            {skills.length} items
                                        </span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => {
                                            const url = techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
                                            let domain = 'google.com';
                                            try {
                                                domain = new URL(url).hostname;
                                            } catch {
                                            }
                                            const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

                                            return (
                                                <Link
                                                    key={skill}
                                                    href={url}
                                                    target="_blank"
                                                    className="
                                                        flex items-center gap-2 pl-2 pr-3 py-1.5 
                                                        bg-gray-50/50 dark:bg-gray-800/30 
                                                        border border-gray-200 dark:border-gray-700 
                                                        rounded-full text-xs font-medium 
                                                        text-gray-700 dark:text-gray-300 
                                                        hover:bg-white dark:hover:bg-gray-800 
                                                        hover:text-green-600 dark:hover:text-green-400 
                                                        hover:border-green-500/50 hover:shadow-md 
                                                        hover:-translate-y-0.5 transition-all duration-200
                                                    "
                                                >
                                                    <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white dark:bg-gray-900 p-0.5 shrink-0">
                                                        <Image
                                                            src={favicon}
                                                            alt={skill}
                                                            width={16}
                                                            height={16}
                                                            className="object-contain"
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
                )}
            </div>
        </div>
    );
}
