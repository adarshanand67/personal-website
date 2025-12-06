import Link from "next/link";
import { getBlogs } from "@/lib/api";

export default async function Blogs() {
    const blogs = await getBlogs();

    return (
        <div className="section container mx-auto px-4 mt-12 mb-12">
            <h1 className="title text-4xl font-bold font-serif mb-8">
                Writings
            </h1>

            <ul className="space-y-4">
                {blogs.map((post) => (
                    <li key={post.slug} className="flex flex-col md:flex-row md:items-baseline">
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
    );
}
