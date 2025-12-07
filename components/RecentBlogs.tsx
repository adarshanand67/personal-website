import Link from "next/link";
import { getBlogs } from "@/lib/api";

export default async function RecentBlogs() {
  const blogs = await getBlogs();
  const recentPosts = blogs.slice(0, 4);

  return (
    <section className="font-mono">
      <h2 className="text-2xl font-bold mb-2">
        <span className="text-gray-500">##</span> Recent Blog Posts
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">$ cat ~/blog/recent.md</p>

      <div className="space-y-2">
        {recentPosts.map((post) => (
          <div
            key={post.slug}
            className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
              <span className="text-gray-500 text-xs">{post.date}</span>
              <Link
                href={`/blogshelf/${post.slug}`}
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        →{" "}
        <Link href="/blogshelf" className="text-green-700 dark:text-green-400 hover:underline">
          Full archive
        </Link>
      </p>
    </section>
  );
}
