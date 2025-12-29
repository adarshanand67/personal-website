import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://adarshanand.dev";
  const blogs = await getBlogs();

  const blogUrls = blogs.map((post) => ({
    url: `${baseUrl}/articleshelf/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const routes = [
    "",
    "/articleshelf",
    "/bookshelf",
    "/animeshelf",
    "/hobbyshelf",
    "/experience",
    "/guestbook",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogUrls];
}
