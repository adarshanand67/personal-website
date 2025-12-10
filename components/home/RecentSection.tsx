"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Item {
    title: string;
    url: string;
    date?: string;
    isExternal?: boolean;
}

interface RecentSectionProps {
    title: string;
    command: string;
    items: Item[];
    linkText: string;
    linkUrl: string;
}

export default function RecentSection({
    title,
    command,
    items,
    linkText,
    linkUrl,
}: RecentSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section
            className="font-mono group/section cursor-pointer"
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('a')) return;
                setIsExpanded(!isExpanded);
            }}
        >
            <div className="w-full text-left group">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <span className="text-primary text-glow">##</span>
                    <span className="group-hover/section:text-green-400 transition-colors duration-300">{title}</span>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                </h2>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3 text-xs">
                <span className="text-green-500 font-bold">$</span>
                <span className="opacity-75">{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                {item.date && <span className="text-gray-500 text-xs">{item.date}</span>}
                                <Link
                                    href={item.url}
                                    target={item.isExternal ? "_blank" : undefined}
                                    className="text-green-700 dark:text-green-400 hover:underline"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    →{" "}
                    <Link href={linkUrl} className="text-green-700 dark:text-green-400 hover:underline">
                        {linkText}
                    </Link>
                </p>
            </div>
        </section>
    );
}
