import Link from "next/link";
import { getPapers } from "@/lib/api";

interface Paper {
  title: string;
  url: string;
}

export default async function Papershelf() {
  const papers = await getPapers();

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12 font-mono">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-500">#</span> Papershelf
        <span className="text-gray-500 text-lg ml-2">({papers.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">$ find ~/papers -name "*.pdf"</p>

      <div className="space-y-2">
        {papers.map((paper: Paper, index: number) => (
          <div
            key={index}
            className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
          >
            <Link
              href={paper.url}
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              {paper.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
