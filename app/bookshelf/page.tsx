"use client";

import booksData from "@/data/books.json";
import { useState, useMemo } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { Book } from "@/types";
import { ShelfStrategyFactory } from "@/lib/shelf-strategies";
import { shelfConfigs } from "@/config/shelves";

export default function Bookshelf() {
  const books: Book[] = booksData;
  const config = shelfConfigs.books;
  const strategy = useMemo(
    () =>
      ShelfStrategyFactory.getStrategy(
        config.type
      ) as unknown as import("@/lib/shelf-strategies").ShelfItemStrategy<Book>,
    [config.type]
  );

  const [query, setQuery] = useState("");
  // Filter using the strategy method
  const filteredBooks = useMemo(() => strategy.filter(books, query), [books, query, strategy]);

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
        count={filteredBooks.length}
        command={config.command}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder={config.searchPlaceholder}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No books found matching &quot;{query}&quot;
        </p>
      ) : (
        <div className="space-y-2">
          {filteredBooks.map((book, index) =>
            // Render using strategy
            strategy.renderItem(book, index)
          )}
        </div>
      )}
    </div>
  );
}
