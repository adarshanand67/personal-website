"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Paper } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

export class PaperListStrategy implements ShelfItemStrategy<Paper> {
    renderItem(paper: Paper, index: number): ReactNode {
        return (
            <div
                id={`shelf-item-${paper.title}`}
                key={index}
                className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
                <Link
                    href={paper.url}
                    target="_blank"
                    className="group/link inline-flex items-center gap-2 text-green-500 font-bold hover:underline"
                >
                    <span>{paper.title}</span>
                    <ExternalLink size={14} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                </Link>
            </div>
        );
    }
    renderList(items: Paper[]): ReactNode {
        if (items.length === 0) return null;
        return (
            <div className="space-y-4">{items.map((paper, index) => this.renderItem(paper, index))}</div>
        );
    }
    filter(items: Paper[], query: string): Paper[] {
        if (!query) return items;
        return items.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase()));
    }
}
