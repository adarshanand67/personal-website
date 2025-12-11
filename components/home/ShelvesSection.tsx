"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Folder, Book, FileText, Tv, Gamepad2, Feather } from "lucide-react";
interface Shelf {
    name: string;
    path: string;
    description: string;
    icon: React.ElementType;
    color: string;
}
import { shelfConfigs } from "@/config/shelves";
import { DIRECTORY_MAP } from "@/lib/constants";

const SHELF_ICONS: Record<string, any> = {
    blogs: Feather,
    papers: FileText,
    books: Book,
    anime: Tv,
    hobby: Gamepad2
};

const SHELVES = ["blogs", "papers", "books", "anime", "hobby"].map(key => ({
    name: key,
    path: DIRECTORY_MAP[key],
    description: shelfConfigs[key].description,
    icon: SHELF_ICONS[key],
    color: "text-green-500"
}));
export default function ShelvesSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="section max-w-4xl mx-auto px-4 mb-8">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div
                    onClick={(e) => {
                        if ((e.target as HTMLElement).closest('a')) return;
                        setIsExpanded(!isExpanded);
                    }}
                    className="relative glass rounded-xl p-4 hover:border-green-500/50 transition-colors duration-300 cursor-pointer"
                >
                    <section className="font-mono">
                        <div className="w-full text-left group mb-3">
                            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                                <span className="text-primary">##</span> <span className="text-green-700 dark:text-green-400">Directories</span>
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                />
                            </h2>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <span className="text-green-500 font-bold">$</span>
                                <span>tree -d -L 1 ~</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                            </div>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {SHELVES.map((shelf) => (
                                    <Link
                                        key={shelf.name}
                                        href={shelf.path}
                                        className="group/item flex items-start gap-3 p-3 rounded-lg border border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:border-green-500/30 transition-all duration-300"
                                    >
                                        <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover/item:scale-110 transition-transform duration-300 ${shelf.color}`}>
                                            <shelf.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-700 dark:text-gray-200 group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors">
                                                {shelf.name}/
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
