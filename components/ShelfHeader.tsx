"use client";

import { Search } from "lucide-react";

interface ShelfHeaderProps {
  title: string;
  count: number;
  command: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
}

export function ShelfHeader({
  title,
  count,
  command,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
}: ShelfHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> {title}
        <span className="text-gray-500 text-lg ml-2">({count})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">$ {command}</p>

      {/* Search */}
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
