"use client";

import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
    title: string;
    command: string;
    isExpanded: boolean;
    onToggle: () => void;
    rightElement?: ReactNode;
}

export default function SectionHeader({
    title,
    command,
    isExpanded,
    onToggle,
    rightElement,
}: SectionHeaderProps) {
    return (
        <div
            className="w-full text-left group mb-3 cursor-pointer"
            onClick={onToggle}
        >
            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                <span className="text-primary">##</span> {title}
                <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                />
                {rightElement && <div className="ml-auto">{rightElement}</div>}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <span className="text-green-500 font-bold">$</span>
                <span>{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
            </div>
        </div>
    );
}
