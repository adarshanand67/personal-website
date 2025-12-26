"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Tv, Check, Star } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { AnimeItem, WatchStatus, AnimeType } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

export class AnimeCardStrategy implements ShelfItemStrategy<AnimeItem> {
    renderItem(anime: AnimeItem, index: number): ReactNode {
        return (
            <div
                id={`shelf-item-${anime.title}`}
                key={index}
                onClick={() => useStore.getState().setAnimeSelectedItem(anime)}
                className="group flex flex-col gap-3 cursor-pointer relative"
            >
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                    {anime.image ? (
                        <Image
                            src={anime.image}
                            alt={anime.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Tv size={48} />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-background text-xs font-bold uppercase tracking-wider bg-foreground px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                        </div>
                    </div>
                </div>

                <div className="px-1 text-center">
                    <h3 className="text-foreground font-black text-sm leading-tight group-hover:text-foreground transition-colors line-clamp-2 mb-1.5 flex items-center justify-center gap-1.5 uppercase tracking-tighter">
                        {anime.title}
                        {anime.status === WatchStatus.Completed && (
                            <Check size={12} className="text-foreground flex-shrink-0" />
                        )}
                        {anime.recommended && (
                            <Star
                                size={12}
                                fill="currentColor"
                                className="text-foreground/60 flex-shrink-0"
                            />
                        )}
                    </h3>
                    {anime.seasons && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 mb-1.5 font-semibold">
                            {anime.seasons}
                        </p>
                    )}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                        {anime.tags?.slice(0, 3).map((tag, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    useStore.getState().setAnimeSelectedTag(tag);
                                }}
                                className="text-[9px] font-black uppercase tracking-widest text-foreground/40 bg-foreground/5 px-2 py-1 rounded-full border border-foreground/10 hover:bg-foreground hover:text-background hover:border-foreground transition-all cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    renderList(items: AnimeItem[]): ReactNode {
        if (items.length === 0) return null;

        const series = items.filter(
            (item) => item.type === AnimeType.Anime || item.type === AnimeType.WebSeries
        );
        const movies = items.filter((item) => item.type === AnimeType.Movie);

        return (
            <div className="space-y-16">
                {series.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                            <span className="text-foreground/20 text-3xl font-mono">/</span>
                            Anime Series
                            <span className="text-gray-400 text-sm font-normal">
                                ({series.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                            {series.map((anime, index) => this.renderItem(anime, index))}
                        </div>
                    </div>
                )}

                {movies.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                            <span className="text-foreground/20 text-3xl font-mono">/</span>
                            Anime Movies
                            <span className="text-gray-400 text-sm font-normal">
                                ({movies.length})
                            </span>
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                            {movies.map((anime, index) => this.renderItem(anime, index))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    filter(items: AnimeItem[], query: string, selectedTag?: string | null): AnimeItem[] {
        let filtered = [...items];

        if (selectedTag === "Recommended") {
            filtered = filtered.filter((item) => item.recommended);
        } else if (selectedTag) {
            filtered = filtered.filter((item) => item.tags?.some((tag) => tag === selectedTag));
        }

        if (!query) return filtered;
        const lowerQuery = query.toLowerCase();
        return filtered.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerQuery) ||
                (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
                (item.tags &&
                    item.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
        );
    }
}
