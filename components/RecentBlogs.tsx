import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getBlogs } from "@/lib/api";

export default async function RecentBlogs() {
  const blogs = await getBlogs();
  const recentPosts = blogs.slice(0, 4);

  return (
    <div>
      <SectionHeader
        title="Recent blog posts"
        linkText="Full archive ➔"
        linkHref="/blogs"
        subtitle="Things I have written recently."
      />
      <ul className="space-y-2">
        {recentPosts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-col md:flex-row md:items-baseline"
          >
            <span className="text-gray-500 dark:text-gray-400 font-mono text-sm min-w-[120px] md:mr-2">
              {post.date} :
            </span>
            <Link
              href={`/blogs/${post.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
