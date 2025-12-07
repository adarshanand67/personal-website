"use client";

import papersData from "@/data/papers.json";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface Paper {
  title: string;
  url: string;
}

export default function Papershelf() {
  const papers: Paper[] = papersData;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPapers = useMemo(() => {
    if (searchQuery.trim() === "") return papers;
    const query = searchQuery.toLowerCase();
    return papers.filter((paper) => paper.title.toLowerCase().includes(query));
  }, [searchQuery, papers]);

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Papershelf
        <span className="text-gray-500 text-lg ml-2">({filteredPapers.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        $ find ~/papers -name &quot;*.pdf&quot;
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search papers..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredPapers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No papers found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <div className="space-y-2">
          {filteredPapers.map((paper, index) => (
            <div
              key={index}
              className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
              <Link
                href={paper.url}
                target="_blank"
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                {paper.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
