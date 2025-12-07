import { getPost, getBlogs } from "@/lib/api";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const content = await getPost(slug);
  const blogs = await getBlogs();
  const meta = blogs.find((b) => b.slug === slug);

  if (!content || !meta) {
    notFound();
  }

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 max-w-3xl">
      <h1 className="title text-4xl font-bold font-serif mb-4">{meta.title}</h1>
      <p className="text-gray-500 font-mono mb-8">{meta.date}</p>
      <div className="content prose dark:prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
