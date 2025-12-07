import Link from "next/link";
import { getBlogs, Blog } from "@/lib/api";

export default async function Blogs() {
  const blogs = await getBlogs();

  // Group blogs by year
  const blogsByYear = blogs.reduce(
    (acc, blog) => {
      const year = blog.date.split("-")[0] || "Unknown"; // Assuming date format YYYY-MM-DD
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>,
  );

  // Sort years descending
  const sortedYears = Object.keys(blogsByYear).sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-8">
        Writings <span className="text-gray-400 text-2xl">({blogs.length})</span>
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 italic">No writings found.</p>
      ) : (
        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-bold font-serif mb-4 border-b border-gray-200 pb-2 text-gray-700 dark:text-gray-300">
                {year}
              </h2>
              <ul className="space-y-4">
                {blogsByYear[year].map((post) => (
                  <li
                    key={post.slug}
                    className="flex flex-col md:flex-row md:items-baseline"
                  >
                    <span className="text-gray-500 font-mono text-sm min-w-[120px] md:mr-2">
                      {post.date} :
                    </span>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-blue-600 hover:underline font-medium text-lg"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
