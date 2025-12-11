import {
    getBlogs,
    getPapers,
    getBooks,
    getEntertainment,
    getHobby,
    getProjects
} from "@/lib/api";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";
import { notFound } from "next/navigation";

const SHELF_MAPPING = {
    blogshelf: { api: getBlogs, config: shelfConfigs.blogs },
    papershelf: { api: getPapers, config: shelfConfigs.papers },
    bookshelf: { api: getBooks, config: shelfConfigs.books },
    animeshelf: { api: getEntertainment, config: shelfConfigs.anime },
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
