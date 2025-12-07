import Link from "next/link";
import { getPapers } from "@/lib/api";

export default async function RecentPapers() {
  const papers = await getPapers();
  const recentPapers = papers.slice(0, 5);

  return (
    <section className="font-mono">
      <h2 className="text-2xl font-bold mb-2">
        <span className="text-gray-500">##</span> Recent Papers
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">$ ls ~/papers --recent</p>

      <div className="space-y-2">
        {recentPapers.map((paper: { title: string; url: string }, index: number) => (
          <div
            key={index}
            className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
          >
            <Link
              href={paper.url}
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline text-sm"
            >
              {paper.title}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        →{" "}
        <Link href="/papershelf" className="text-green-700 dark:text-green-400 hover:underline">
          Papershelf
        </Link>
      </p>
    </section>
  );
}
