"use client";

import { ReactNode } from "react";
import { Blog, Paper } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";
import { PaperListStrategy } from "./PaperStrategy";
import { BlogListStrategy } from "./BlogStrategy";

export class ArticleListStrategy implements ShelfItemStrategy<Blog | Paper> {
    renderItem(item: Blog | Paper, index: number): ReactNode {
        if (!item) return null;

        try {
            if ("url" in item) {
                return new PaperListStrategy().renderItem(item as Paper, index);
            }
            return new BlogListStrategy().renderItem(item as Blog);
        } catch (error) {
            console.error("Error rendering article item:", error);
            return null;
        }
    }

    renderList(items: (Blog | Paper)[]): ReactNode {
        if (!items || !Array.isArray(items) || items.length === 0) return null;

        try {
            const papers = items.filter((i): i is Paper => i && "url" in i);
            const blogs = items.filter((i): i is Blog => i && "slug" in i);

            return (
                <div className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Research Papers Column */}
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-foreground/90">
                                <span className="text-foreground/10 text-4xl font-mono tracking-tighter">
                                    01
                                </span>
                                Research Papers
                            </h2>
                            <div className="space-y-4">
                                {papers.length > 0 ? (
                                    new PaperListStrategy().renderList(papers)
                                ) : (
                                    <p className="text-gray-500 italic">
                                        No research papers found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Blogs Column */}
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-foreground/90">
                                <span className="text-foreground/10 text-4xl font-mono tracking-tighter">
                                    02
                                </span>
                                Blogs
                            </h2>
                            <div className="space-y-4">
                                {blogs.length > 0 ? (
                                    new BlogListStrategy().renderList(blogs)
                                ) : (
                                    <p className="text-gray-500 italic">No blogs found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch (error) {
            console.error("Error rendering article list:", error);
            return <div className="py-12 text-center text-gray-500">Failed to load articles.</div>;
        }
    }

    filter(items: (Blog | Paper)[], query: string): (Blog | Paper)[] {
        if (!items || !Array.isArray(items)) return [];
        if (!query) return items;

        try {
            const papers = items.filter((i): i is Paper => i && "url" in i);
            const blogs = items.filter((i): i is Blog => i && "slug" in i);

            return [
                ...new PaperListStrategy().filter(papers, query),
                ...new BlogListStrategy().filter(blogs, query),
            ];
        } catch (error) {
            console.error("Error filtering articles:", error);
            return [];
        }
    }
}
