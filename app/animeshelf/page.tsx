"use client";

import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";

export default function Animeshelf() {
  return <UniversalShelf config={shelfConfigs.anime} />;
}
