/**
 * @fileoverview Book Modal Header Component - displays book cover and metadata in header.
 * Renders a gradient header section with book cover image, badges, title, author,
 * and description quote.
 */

import Image from "next/image";
import { BookOpen, Star, Quote } from "lucide-react";

/**
 * Props for BookHeader component.
 * @interface BookHeaderProps
 * @property {any} item - Book data object with cover image, title, author, and badges
 */
interface BookHeaderProps {
    item: any;
}

/**
 * Book Header Component - displays book cover and primary information.
 * Features gradient background, responsive layout, cover image with hover effect,
 * featured/recommended badges, and description quote.
 * 
 * @component
 * @param {BookHeaderProps} props - Component props
 * @returns {JSX.Element} Rendered header with book cover and metadata
 * 
 * @example
 * ```tsx
 * <BookHeader item={{
 *   title: "Design Patterns",
 *   author: "Gang of Four",
 *   image: "/books/design-patterns.jpg",
 *   description: "Elements of reusable object-oriented software",
 *   recommended: true
 * }} />
 * ```
 */
export function BookHeader({ item }: BookHeaderProps) {
    return (
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 md:p-12 border-b border-gray-200 dark:border-white/10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Book Cover */}
                <div className="shrink-0 mx-auto md:mx-0">
                    {item.image ? (
                        <div className="relative w-40 md:w-48 aspect-[2/3] shadow-2xl rounded-xl overflow-hidden ring-4 ring-white/50 dark:ring-white/10 group">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="w-40 md:w-48 aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                            <BookOpen className="text-gray-400" size={56} />
                        </div>
                    )}
                </div>

                {/* Book Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                            Featured Book
                        </span>
                        {item.recommended && (
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-bold flex items-center gap-1.5 border border-amber-500/20">
                                <Star size={11} fill="currentColor" /> Must Read
                            </span>
                        )}
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-3 text-gray-900 dark:text-white leading-tight">
                        {item.title}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-6">
                        by {item.author}
                    </p>

                    {item.description && (
                        <div className="relative">
                            <Quote size={24} className="absolute -left-2 -top-2 text-green-500/30" />
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6 max-w-2xl">
                                {item.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
