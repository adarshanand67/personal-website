import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";
import { getPapers } from "@/lib/api";

export default async function Papershelf() {
  const papers = await getPapers();
  return <UniversalShelf config={shelfConfigs.papers} items={papers} />;
}
