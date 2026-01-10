import { notFound } from "next/navigation";
import { getBooks, getAnime, getHobby, getArticles } from "@/lib/api";
import { UniversalCollection } from "@/components/collections";
import { collectionConfigs } from "@/lib/config";

const COLLECTION_MAPPING = {
  articles: { api: getArticles, config: collectionConfigs.articles },
  books: { api: getBooks, config: collectionConfigs.books },
  anime: { api: getAnime, config: collectionConfigs.anime },
  hobbies: { api: getHobby, config: collectionConfigs.hobby },
} as const;

type CollectionSlug = keyof typeof COLLECTION_MAPPING;

export async function generateStaticParams() {
  return [
    { collection: "articles" },
    { collection: "books" },
    { collection: "anime" },
    { collection: "hobbies" },
  ];
}

export const dynamicParams = false;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const collectionData = COLLECTION_MAPPING[collection as CollectionSlug];

  if (!collectionData) {
    notFound();
  }

  const items = await collectionData.api();
  return <UniversalCollection config={collectionData.config} items={items} />;
}
