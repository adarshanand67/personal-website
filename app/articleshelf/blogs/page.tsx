import { getArticles } from "@/lib/api";
import { UniversalShelf } from "@/components/shelves";
import { shelfConfigs } from "@/lib/config";
import { Blog } from "@/types/definitions";

export default async function BlogsPage() {
    const allArticles = await getArticles();
    const blogs = allArticles.filter((item): item is Blog => "slug" in item);

    return <UniversalShelf config={shelfConfigs.blogs} items={blogs} />;
}
