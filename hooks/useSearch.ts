"use client";

import { useState, useMemo } from "react";

export function useSearch<T>(items: T[], searchFields: (keyof T)[], defaultQuery: string = "") {
  const [query, setQuery] = useState(defaultQuery);

  const filteredItems = useMemo(() => {
    if (query.trim() === "") return items;
    const lowerQuery = query.toLowerCase();

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerQuery);
        }
        return false;
      })
    );
  }, [items, query, searchFields]);

  return {
    query,
    setQuery,
    filteredItems,
  };
}
