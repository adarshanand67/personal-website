"use client";

import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/UniversalShelf";
import { Blog } from "@/types";

export default function BlogsClient({ blogs }: { blogs: Blog[] }) {
  // Pass initialData for blogs since it comes from ServerProp/CLI
  return <UniversalShelf config={shelfConfigs.blogs} initialData={blogs} />;
}
