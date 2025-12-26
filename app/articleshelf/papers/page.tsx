import { getArticles } from "@/lib/api";
import { UniversalShelf } from "@/components/shelves";
import { shelfConfigs } from "@/lib/config";
import { Paper } from "@/types/definitions";

export default async function PapersPage() {
    const allArticles = await getArticles();
    const papers = allArticles.filter((item): item is Paper => "url" in item);

    return <UniversalShelf config={shelfConfigs.papers} items={papers} />;
}
