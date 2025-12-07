"use client";

import { useMemo, useState } from "react";
import { ShelfHeader } from "@/components/ShelfHeader";
import { Blog } from "@/types";
import { ShelfStrategyFactory } from "@/lib/shelf-strategies";
import { shelfConfigs } from "@/config/shelves";
import { ReactNode } from "react";

export default function BlogsClient({ blogs }: { blogs: Blog[] }) {
  const config = shelfConfigs.blogs;
  const strategy = useMemo(() => ShelfStrategyFactory.getStrategy(config.type), [config.type]);
  const [query, setQuery] = useState("");

  const filteredBlogs = useMemo(
    () => strategy.filter(blogs, query) as Blog[],
    [blogs, query, strategy]
  );

  // Group blogs by year (specific logic for blogs, kept here or could be moved to Strategy if genericized,
  // but "grouping" is specific to Blog shelf presentation.
  // The Strategy renderItem usually renders a single item.
  // However, the Blog shelf renders grouped items.
  // Design Pattern: The current Strategy `renderItem` assumes a flat list.
  // For Blogs, we want a grouped list.
  // We can let the Strategy handle the *Item* rendering, but the Page/Component handles the Grouping.
  // OR we abstract the "ListView" entirely.
  // Given constraints, I will keep grouping logic here but use the strategy to render individual items inside the groups.

  const blogsByYear = filteredBlogs.reduce(
    (acc: Record<string, Blog[]>, blog: Blog) => {
      const year = blog.date.split("-")[0];
      if (!acc[year]) acc[year] = [];
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>
  );

  const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <ShelfHeader
        title={config.title}
        count={filteredBlogs.length}
        command={config.command}
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder={config.searchPlaceholder}
      />

      {filteredBlogs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No blogs found matching &quot;{query}&quot;
        </p>
      ) : (
        years.map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-gray-500">##</span> {year}
            </h2>
            <div className="space-y-2">
              {blogsByYear[year].map((post, index) => strategy.renderItem(post, index))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
