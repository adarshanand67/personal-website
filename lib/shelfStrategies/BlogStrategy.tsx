"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Blog } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

export class BlogListStrategy implements ShelfItemStrategy<Blog> {
    renderItem(blog: Blog): ReactNode {
        return (
            <div
                id={`shelf-item-${blog.title}`}
                key={blog.slug}
                className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
            >
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                    <span className="text-gray-500 text-xs min-w-[80px] font-mono">{blog.date}</span>
                    <Link
                        href={`/articleshelf/${blog.slug}`}
                        className="group/link inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 font-bold hover:underline"
                    >
                        <span>{blog.title}</span>
                        <ArrowUpRight size={14} className="opacity-50 group-hover/link:opacity-100 transition-all transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        );
    }
    renderList(items: Blog[]): ReactNode {
        const blogsByYear = items.reduce(
            (acc: Record<string, Blog[]>, blog: Blog) => {
                const year = blog.date.split("-")[0] || 'Unknown';
                if (!acc[year]) acc[year] = [];
                acc[year]!.push(blog);
                return acc;
            },
            {} as Record<string, Blog[]>
        );
        const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));
        return (
            <div className="space-y-12 py-8">
                {years.map((year) => (
                    <div key={year}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-4">
                            <span className="text-green-500/20 text-3xl font-mono">/</span>
                            {year}
                        </h2>
                        <div className="space-y-4">
                            {blogsByYear[year]!.map((post) => this.renderItem(post))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    filter(items: Blog[], query: string): Blog[] {
        if (!query) return items;
        const lowerQuery = query.toLowerCase();
        return items.filter(
            (blog) => blog.title.toLowerCase().includes(lowerQuery) || blog.date.includes(lowerQuery)
        );
    }
}
