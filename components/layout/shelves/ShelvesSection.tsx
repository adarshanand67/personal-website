"use client";

import Link from "next/link";
import { ChevronDown, Feather, FileText, Book, Tv, Gamepad2 } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { directoryMap } from "@/lib/constants";
import { shelfConfigs } from "@/lib/config";

const shelfIcons: Record<string, React.ElementType> = {
    blogs: Feather,
    articles: FileText,
    books: Book,
    anime: Tv,
    hobby: Gamepad2,
};
const shelves = (["blogs", "articles", "books", "anime", "hobby"] as const).map((key) => ({
    name: key,
    path: directoryMap[key],
    description: shelfConfigs[key].description,
    icon: shelfIcons[key] as any,
    color: "text-foreground",
}));

/**
 * Shelves Section Component - displays directory-style navigation to content shelves.
 * Features collapsible grid of shelf cards (blogs, articles, books, anime, hobby).

 */
export function ShelvesSection() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections["shelves"] ?? false;

    return (
        <div className="section max-w-6xl mx-auto px-4 md:px-6 mb-8 section-padding">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-foreground/5 to-foreground/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div
                    onClick={(e) => {
                        if ((e.target as HTMLElement).closest("a")) return;
                        toggleSectionExpanded("shelves");
                    }}
                    className="relative glass rounded-3xl p-6 md:p-8 hover:border-foreground/30 transition-all duration-500 cursor-pointer"
                >
                    <section className="font-mono">
                        <div className="w-full text-left group mb-6">
                            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white group-hover:text-foreground transition-colors mb-2">
                                <div className="h-8 w-1 rounded-full bg-foreground" />
                                Directories
                                <ChevronDown
                                    size={22}
                                    className={`transition-all duration-500 text-black dark:text-gray-400 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40 group-hover:opacity-100"}`}
                                />
                            </h2>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-bold ml-4">
                                <span className="text-foreground">$</span>
                                <span>ls -F ~</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-foreground align-middle ml-1 shadow-[0_0_8px_rgba(255,255,255,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)]"></span>
                            </div>
                        </div>
                        <div
                            className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                                {shelves.map((shelf) => (
                                    <Link
                                        key={shelf.name}
                                        href={shelf.path}
                                        className="group/item flex items-center gap-5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-foreground/30 hover:shadow-xl hover:shadow-foreground/5 transition-all duration-500"
                                    >
                                        <div
                                            className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-100 dark:ring-white/10 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500 text-black dark:text-gray-400 group-hover/item:text-black dark:group-hover/item:text-gray-200`}
                                        >
                                            <shelf.icon size={22} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-gray-900 dark:text-white group-hover/item:text-foreground transition-colors tracking-tight text-lg">
                                                {shelf.name}/
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-bold line-clamp-1">
                                                {shelf.description}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
