"use client";

import entertainmentData from "@/data/entertainment.json";
import { useState, useMemo } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { EntertainmentItem } from "@/types";
import { ShelfStrategyFactory, ShelfItemStrategy } from "@/lib/shelf-strategies";
import { shelfConfigs } from "@/config/shelves";

const Section = ({
  title,
  items,
  strategy,
}: {
  title: string;
  items: EntertainmentItem[];
  strategy: ShelfItemStrategy<EntertainmentItem>;
}) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4 font-mono">
        <span className="text-gray-500">##</span> {title}
        <span className="text-gray-500 text-sm ml-2">({items.length})</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => strategy.renderItem(item, index))}
      </div>
    </div>
  );
};

export default function Animeshelf() {
  const allEntertainment: EntertainmentItem[] = entertainmentData as EntertainmentItem[];
  const config = shelfConfigs.anime;
  const strategy = useMemo(
    () =>
      ShelfStrategyFactory.getStrategy(
        config.type
      ) as unknown as ShelfItemStrategy<EntertainmentItem>,
    [config.type]
  );

  const [query, setQuery] = useState("");
  // Filter using the strategy method
  const filteredItems = useMemo(
    () => strategy.filter(allEntertainment, query),
    [allEntertainment, query, strategy]
  );

  const filterItems = (
    items: EntertainmentItem[],
    type: "Anime" | "Movie",
    status: "Completed" | "Planning"
  ) => {
    return items.filter((item) => item.type === type && item.status === status);
  };

  const animeCompleted = filterItems(filteredItems, "Anime", "Completed");
  const animePlanning = filterItems(filteredItems, "Anime", "Planning");
  const movieCompleted = filterItems(filteredItems, "Movie", "Completed");
  const moviePlanning = filterItems(filteredItems, "Movie", "Planning");

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
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
        <>
          <Section title="Anime - Watched" items={animeCompleted} strategy={strategy} />
          <Section title="Anime - Planning" items={animePlanning} strategy={strategy} />
          <Section title="Movies - Watched" items={movieCompleted} strategy={strategy} />
          <Section title="Movies - Planning" items={moviePlanning} strategy={strategy} />
        </>
      )}
    </div>
  );
}
