"use client";

import { useState, useMemo } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { ShelfConfig } from "@/config/shelves";
import { ShelfStrategyFactory } from "@/lib/shelf-strategies";

interface UniversalShelfProps {
  config: ShelfConfig;
  items: unknown[];
}

export default function UniversalShelf({ config, items }: UniversalShelfProps) {
  // Strategy Pattern
  const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);

  const [query, setQuery] = useState("");

  // Polymorphic Filtering
  const filteredItems = useMemo(() => strategy.filter(items, query), [items, query, strategy]);

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
        description={config.description}
        count={filteredItems.length}
        command={config.command}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder={config.searchPlaceholder}
      />

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items found matching &quot;{query}&quot;
        </p>
      ) : (
        // Polymorphic Rendering: The Strategy decides the list layout!
        strategy.renderList(filteredItems)
      )}
    </div>
  );
}
