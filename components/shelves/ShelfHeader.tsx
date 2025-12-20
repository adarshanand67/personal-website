import { Search } from "lucide-react";

interface ShelfHeaderProps {
    title: string;
    description?: string;
    count: number;
    command: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    onPickRandom?: (item: unknown) => void;
    items?: unknown[];
}

export function ShelfHeader({
    title,
    description,
    count,
    command,
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    onPickRandom,
    items = []
}: ShelfHeaderProps) {
    const { RandomizerButton } = require("@/components/randomizerButton");

    return (
        <>
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">
                    <span className="text-gray-500">#</span> {title}
                    <span className="text-gray-500 text-lg ml-2">({count})</span>
                </h1>
                {onPickRandom && items.length > 0 && (
                    <RandomizerButton items={items} onPick={onPickRandom} />
                )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">$ {command}</p>
            {description && (
                <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm italic">&gt; {description}</p>
            )}
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
            </div>
        </>
    );
}
