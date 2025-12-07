"use client";

import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";

export default function Bookshelf() {
  return <UniversalShelf config={shelfConfigs.books} />;
}
