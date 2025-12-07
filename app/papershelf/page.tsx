"use client";

import papersData from "@/data/papers.json";
import { useState, useMemo } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { Paper } from "@/types";
import { ShelfStrategyFactory } from "@/lib/shelf-strategies";
import { shelfConfigs } from "@/config/shelves";

export default function Papershelf() {
  const papers: Paper[] = papersData;
  const config = shelfConfigs.papers;
  const strategy = useMemo(
    () =>
      ShelfStrategyFactory.getStrategy(
        config.type
      ) as unknown as import("@/lib/shelf-strategies").ShelfItemStrategy<Paper>,
    [config.type]
  );

  const [query, setQuery] = useState("");
  // Filter using the strategy method
  const filteredPapers = useMemo(() => strategy.filter(papers, query), [papers, query, strategy]);

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
        count={filteredPapers.length}
        command={config.command}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder={config.searchPlaceholder}
      />

      {filteredPapers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No papers found matching &quot;{query}&quot;
        </p>
      ) : (
        <div className="space-y-2">
          {filteredPapers.map((paper, index) =>
            // Render using strategy
            strategy.renderItem(paper, index)
          )}
        </div>
      )}
    </div>
  );
}
