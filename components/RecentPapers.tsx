import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getPapers } from "@/lib/api";

export default async function RecentPapers() {
    const papers = await getPapers();
    const recentPapers = papers.slice(0, 5);

    return (
        <div>
            <SectionHeader
                title="Recent papers"
                linkText="Papershelf ➔"
                linkHref="/papershelf"
                subtitle="Papers I have read recently."
            />
            <ul className="space-y-2">
                {recentPapers.map((paper, index) => (
                    <li key={index} className="flex items-start">
                        <span className="mr-2 text-gray-400">•</span>
                        <Link
                            href={paper.url}
                            target="_blank"
                            className="text-blue-600 hover:underline"
                        >
                            {paper.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
