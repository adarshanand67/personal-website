import { notFound } from "next/navigation";
import {
    getBooks,
    getAnime,
    getHobby,
    getProjects,
    getArticles
} from "@/lib/api";
import { UniversalShelf } from "@/components/shelves";
import { shelfConfigs } from "@/lib/config";

const SHELF_MAPPING = {
    articleshelf: { api: getArticles, config: shelfConfigs.articles },
    bookshelf: { api: getBooks, config: shelfConfigs.books },
    animeshelf: { api: getAnime, config: shelfConfigs.anime },
    hobbyshelf: { api: getHobby, config: shelfConfigs.hobby },
    projectshelf: { api: getProjects, config: shelfConfigs.projects }
} as const;

type ShelfSlug = keyof typeof SHELF_MAPPING;

export async function generateStaticParams() {
    return Object.keys(SHELF_MAPPING).map((shelf) => ({
        shelf: shelf,
    }));
}

export default async function ShelfPage({ params }: { params: { shelf: string } }) {
    const { shelf } = await params;
    const shelfData = SHELF_MAPPING[shelf as ShelfSlug];

    if (!shelfData) {
        notFound();
    }

    const items = await shelfData.api();
    return <UniversalShelf config={shelfData.config} items={items} />;
}
