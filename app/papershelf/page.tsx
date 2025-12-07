"use client";

import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";

export default function Papershelf() {
  return <UniversalShelf config={shelfConfigs.papers} />;
}
