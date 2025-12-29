import { getBlogs } from "@/lib/api";
export const dynamic = "force-static";
export async function GET() {
  const blogs = await getBlogs();
  const baseUrl = "https://adarshanand.dev";
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Adarsh Anand - Blog</title>
    <link>${baseUrl}</link>
    <description>Writings on software engineering, security, and systems programming</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${blogs
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blogshelf/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogshelf/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;
  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
