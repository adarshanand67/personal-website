"use client";

import { useState, useMemo } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { ShelfConfig } from "@/config/shelves";
import { container } from "@/lib/di";
import { ShelfItemStrategy } from "@/lib/shelf-strategies";

interface UniversalShelfProps {
  config: ShelfConfig;
  initialData?: unknown[]; // For keys like 'blog' where data comes from getStaticProps equivalent
}

export default function UniversalShelf({ config, initialData }: UniversalShelfProps) {
  // Dependency Injection: Get Strategy
  const strategy = useMemo(
    () => container.getStrategy(config.type) as unknown as ShelfItemStrategy<unknown>,
    [config.type]
  );

  // Dependency Injection: Get Repository (if not provided via initialData)
  // Blogs usually pass data from server, others might too.
  // If initialData is present, use it. Else fetch from Repo.
  const allItems = useMemo(() => {
    if (initialData) return initialData;
    const repo = container.getRepository(config.type);
    if (repo) return repo.getAll();
    return [];
  }, [initialData, config.type]);

  const [query, setQuery] = useState("");

  // Polymorphic Filtering
  const filteredItems = useMemo(
    () => strategy.filter(allItems, query),
    [allItems, query, strategy]
  );

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
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
