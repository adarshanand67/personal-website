import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";
import { getEntertainment } from "@/lib/api";

export default async function Animeshelf() {
  const anime = await getEntertainment();
  return <UniversalShelf config={shelfConfigs.anime} items={anime} />;
}
