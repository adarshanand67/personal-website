"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

/**
 * Props for RecentSection component.

 * @property {string} title - Section title
 * @property {string} command - Terminal command representation
 * @property {any[]} items - Array of recent items to display
 * @property {string} linkText - Text for "view all" link
 * @property {string} linkUrl - URL for "view all" link
 */
interface RecentSectionProps {
    title: string;
    command: string;
    items: any[];
    linkText: string;
    linkUrl: string;
}

/**
 * Recent Section Component - collapsible section showing recent items.
 * Features terminal-style command display and expandable item list.

 * @param {RecentSectionProps} props - Component props
 */
export function RecentSection({ title, command, items, linkText, linkUrl }: RecentSectionProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const sectionId = `recent-${title.toLowerCase().replace(/\s+/g, "-")}`;
    const isExpanded = expandedSections[sectionId] ?? false;

    return (
        <section
            className="font-mono group/section cursor-pointer max-w-6xl mx-auto px-6 md:px-12 mb-8"
            onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) return;
                toggleSectionExpanded(sectionId);
            }}
        >
            <div className="w-full text-left group">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-foreground/90">
                    <span className="text-foreground/20">##</span>
                    <span className="group-hover/section:text-foreground transition-colors duration-300">
                        {title}
                    </span>
                    <ChevronDown
                        size={20}
                        className={`transition-all duration-300 text-black dark:text-gray-400 ${isExpanded ? "rotate-0" : "-rotate-90 opacity-30 group-hover/section:opacity-100"}`}
                    />
                </h2>
            </div>
            <div className="flex items-center gap-2 text-foreground/40 mb-3 text-xs">
                <span className="font-bold">$</span>
                <span className="opacity-75">{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-foreground/20 align-middle"></span>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="space-y-2 glass p-4 rounded-xl">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border-l-2 border-foreground/10 pl-4 hover:border-foreground/30 transition-colors py-1"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                {item.date && (
                                    <span className="text-foreground/40 text-[10px] uppercase tracking-wider">
                                        {item.date}
                                    </span>
                                )}
                                <Link
                                    href={item.url}
                                    target={item.isExternal ? "_blank" : undefined}
                                    className="text-foreground/80 hover:text-foreground transition-colors underline decoration-foreground/20 underline-offset-4"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-xs text-foreground/50">
                    →{" "}
                    <Link
                        href={linkUrl}
                        className="text-foreground/70 hover:text-foreground transition-colors underline decoration-foreground/10 underline-offset-4"
                    >
                        {linkText}
                    </Link>
                </p>
            </div>
        </section>
    );
}
