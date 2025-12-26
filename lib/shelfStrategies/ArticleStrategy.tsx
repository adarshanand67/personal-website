"use client";

import { ReactNode } from "react";
import { Blog, Paper } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";
import { PaperListStrategy } from "./PaperStrategy";
import { BlogListStrategy } from "./BlogStrategy";

export class ArticleListStrategy implements ShelfItemStrategy<Blog | Paper> {
    renderItem(item: Blog | Paper, index: number): ReactNode {
        if ("url" in item) {
            return new PaperListStrategy().renderItem(item as Paper, index);
        }
        return new BlogListStrategy().renderItem(item as Blog);
    }

    renderList(items: (Blog | Paper)[]): ReactNode {
        const papers = items.filter((i): i is Paper => "url" in i);
        const blogs = items.filter((i): i is Blog => "slug" in i);

        return (
            <div className="space-y-24 py-8">
                {papers.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                            <span className="text-green-500/20 text-4xl font-mono">01</span>
                            Research Papers
                        </h2>
                        <div className="space-y-4">
                            {new PaperListStrategy().renderList(papers)}
                        </div>
                    </div>
                )}
                {blogs.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                            <span className="text-green-500/20 text-4xl font-mono">
                                {papers.length > 0 ? "02" : "01"}
                            </span>
                            Blogs & Articles
                        </h2>
                        {new BlogListStrategy().renderList(blogs)}
                    </div>
                )}
            </div>
        );
    }

    filter(items: (Blog | Paper)[], query: string): (Blog | Paper)[] {
        if (!query) return items;
        const papers = items.filter((i): i is Paper => "url" in i);
        const blogs = items.filter((i): i is Blog => "slug" in i);

        return [
            ...new PaperListStrategy().filter(papers, query),
            ...new BlogListStrategy().filter(blogs, query),
        ];
    }
}
