"use client";
import { useMemo } from "react";
import { ShelfHeader } from "@/components/shelves/ShelfHeader";
import { ShelfConfig } from "@/lib/config/shelves";
import { ShelfStrategyFactory, ShelfItem } from "@/lib/shelf-strategies";
import { useStore } from "@/lib/store/useStore";

interface UniversalShelfProps {
  config: ShelfConfig;
  items: unknown[];
}
export default function UniversalShelf({ config, items }: UniversalShelfProps) {
  const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);
  // Use global search query from store to persist search
  const { searchQuery, setSearchQuery } = useStore();

  const filteredItems = useMemo(() => strategy.filter(items as ShelfItem[], searchQuery), [items, searchQuery, strategy]);
  return (
    <div className="section max-w-4xl mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
        description={config.description}
        count={filteredItems.length}
        command={config.command}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={config.searchPlaceholder}
      />
      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        strategy.renderList(filteredItems)
      )}
    </div>
  );
}
