import { getBlogs } from "@/lib/api";
import UniversalShelf from "@/components/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <UniversalShelf config={shelfConfigs.blogs} items={blogs} />;
}
