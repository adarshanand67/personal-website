import Link from "next/link";
import { getPapers } from "@/lib/api";

export default async function Papershelf() {
    const papers = await getPapers();

    return (
        <div className="section container mx-auto px-4 mt-12 mb-12">
            <h1 className="title text-4xl font-bold font-serif mb-2">
                Papershelf
            </h1>
            <p className="text-gray-600 mb-8">Papers I have read recently.</p>

            <ul className="space-y-4">
                {papers.map((paper, index) => (
                    <li key={index} className="flex items-start">
                        <span className="mr-2 text-gray-400">•</span>
                        <Link
                            href={paper.url}
                            target="_blank"
                            className="text-blue-600 hover:underline text-lg"
                        >
                            {paper.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
