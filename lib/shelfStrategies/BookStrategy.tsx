"use client";

import { ReactNode } from "react";
import { Star } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { Book } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

import { getBookGradient } from "@/lib/utils/color";

import { PillTag } from "@/components/ui/PillTag";

export class BookListStrategy implements ShelfItemStrategy<Book> {
    renderItem(book: Book, index: number): ReactNode {
        const coverGradient = getBookGradient(book.title);
        // Extract the base color for the spine (e.g. 'red-900' from 'from-red-900 to-red-950')
        const spineColor = coverGradient.split(" ")[0].replace("from-", "bg-");

        return (
            <div id={`shelf-item-${book.title}`} key={index} className="group flex flex-col gap-4">
                <div
                    onClick={() => useStore.getState().setBookSelectedItem(book)}
                    className="relative block w-full aspect-[2/3] perspective-1000 cursor-pointer"
                >
                    <div
                        className={`
              relative w-full h-full transition-all duration-500 transform-style-3d 
              group-hover:rotate-y-[-20deg] group-hover:translate-x-2 group-hover:-translate-y-2
              shadow-lg group-hover:shadow-2xl
            `}
                    >
                        <div
                            className={`
                 absolute top-1 left-0 w-4 h-[98%] -translate-x-3 translate-z-[-2px] rotate-y-[-90deg] origin-right
                 ${spineColor} brightness-75 rounded-l-sm
               `}
                        ></div>

                        <div
                            className={`
                 absolute inset-0 flex flex-col p-3 md:p-4 bg-gradient-to-br ${coverGradient}
                 border-r-2 border-white/10 rounded-r-md rounded-l-sm
               `}
                        >
                            <div className="flex-1 border-2 border-white/20 p-2 flex flex-col items-center justify-center text-center">
                                <h3 className="font-serif font-bold text-white text-lg leading-tight line-clamp-4 drop-shadow-md">
                                    {book.title}
                                </h3>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate max-w-full">
                                    {book.author}
                                </p>
                            </div>
                            {book.recommended && (
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                                    <Star size={12} fill="currentColor" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                            <div className="absolute top-0 left-2 bottom-0 w-1 bg-black/20 blur-[1px]"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                    {book.tags &&
                        Array.isArray(book.tags) &&
                        book.tags.slice(0, 3).map((tag, i) => (
                            <PillTag
                                key={i}
                                label={tag}
                                onClick={(e) => {
                                    try {
                                        e.stopPropagation();
                                        useStore.getState().setBookSelectedTag(tag);
                                    } catch (error) {
                                        console.error("Error selecting tag:", error);
                                    }
                                }}
                                variant="filter"
                            />
                        ))}
                </div>
            </div>
        );
    }

    renderList(items: Book[]): ReactNode {
        if (items.length === 0) return null;
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-4 py-8">
                {items.map((book, index) => this.renderItem(book, index))}
            </div>
        );
    }

    filter(items: Book[], query: string, selectedTag?: string | null): Book[] {
        if (!items || !Array.isArray(items)) return [];

        try {
            let filtered = [...items];

            if (query) {
                const lowerQuery = query.toLowerCase();
                filtered = filtered.filter(
                    (book) =>
                        book.title.toLowerCase().includes(lowerQuery) ||
                        book.author.toLowerCase().includes(lowerQuery) ||
                        book.description?.toLowerCase().includes(lowerQuery) ||
                        book.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
                );
            }

            if (selectedTag === "Recommended") {
                filtered = filtered.filter((book) => book.recommended);
            } else if (selectedTag) {
                filtered = filtered.filter((book) => book.tags?.some((tag) => tag === selectedTag));
            }

            return filtered;
        } catch (error) {
            console.error("Error filtering books:", error);
            return [];
        }
    }
}
