import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";
import { getBooks } from "@/lib/api";

export default async function Bookshelf() {
  const books = await getBooks();
  return <UniversalShelf config={shelfConfigs.books} items={books} />;
}
