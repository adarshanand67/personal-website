import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { getPost, getBlogs } from "@/lib/api";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({
    collection: "articles",
    slug: post.slug,
  }));
}

export default async function GenericCollectionItem({
  params,
}: {
  params: { collection: string; slug: string };
}) {
  const { collection, slug } = await params;

  if (collection !== "articles") {
    notFound();
  }

  const content = await getPost(slug);
  const blogs = await getBlogs();
  const meta = blogs.find((b) => b.slug === slug);

  if (!content || !meta) {
    notFound();
  }

  return (
    <div className="section max-w-4xl mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-4">{meta.title}</h1>
      <p className="text-gray-500 font-mono mb-8">{meta.date}</p>
      <div className="content prose dark:prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
