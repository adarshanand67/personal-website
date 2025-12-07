"use client";

import entertainmentData from "@/data/entertainment.json";
import { Star, Search } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useState, useMemo } from "react";

interface EntertainmentItem {
  title: string;
  type: string;
  status: string;
  notes?: string;
  image?: string;
  recommended?: boolean;
}

export default function AnimeShelf() {
  const items: EntertainmentItem[] = entertainmentData;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (searchQuery.trim() === "") return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.notes?.toLowerCase().includes(query) ?? false)
    );
  }, [searchQuery, items]);

  const anime = filteredItems.filter((item) => item.type === "Anime");
  const movies = filteredItems.filter((item) => item.type === "Movie");

  const Card = ({ item }: { item: EntertainmentItem }) => (
    <SpotlightCard className="h-full flex flex-col p-0">
      {item.image ? (
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center p-2">
          <span className="text-gray-500 dark:text-gray-400 text-xs text-center font-mono leading-tight">
            {item.title}
          </span>
        </div>
      )}
      <div className="p-2 flex flex-col flex-grow">
        <div className="flex items-start gap-1 mb-1">
          <h3 className="font-bold text-xs leading-tight line-clamp-2">{item.title}</h3>
          {item.recommended && (
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
          )}
        </div>
        {item.notes && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.notes}</p>
        )}
        <div className="mt-auto pt-1">
          <span
            className={`text-xs px-1.5 py-0.5 rounded ${item.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"}`}
          >
            {item.status}
          </span>
        </div>
      </div>
    </SpotlightCard>
  );

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-2">
        Animeshelf <span className="text-gray-400 text-2xl">({filteredItems.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        A collection of anime and movies I&apos;ve watched and enjoyed.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anime or movies..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <>
          {/* Anime */}
          {anime.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                Anime <span className="text-gray-400 text-lg">({anime.length})</span>
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {anime.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Movies */}
          {movies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                Movies <span className="text-gray-400 text-lg">({movies.length})</span>
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {movies.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
