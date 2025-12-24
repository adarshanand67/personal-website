/**
 * @fileoverview Book Modal Content Component - displays book details and key takeaways.
 * Renders the main content area of the book modal including title, author, description,
 * and key takeaways or notes.
 */

import { BookOpen, Quote } from "lucide-react";

/**
 * Props for BookContent component.
 * @interface BookContentProps
 * @property {any} item - Book data object with title, author, description, keyTakeaways, and notes
 */
interface BookContentProps {
    item: any;
}

/**
 * Book Content Component - displays detailed book information and insights.
 * Features scrollable content area with book title, author, description quote,
 * and either key takeaways list or general notes.
 * 
 * @component
 * @param {BookContentProps} props - Component props
 * @returns {JSX.Element} Rendered content area with book details
 * 
 * @example
 * ```tsx
 * <BookContent item={{
 *   title: "Clean Code",
 *   author: "Robert C. Martin",
 *   description: "A handbook of agile software craftsmanship",
 *   keyTakeaways: ["Write readable code", "Keep functions small"]
 * }} />
 * ```
 */
export function BookContent({ item }: BookContentProps) {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 md:p-12 space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-6">
                        by {item.author}
                    </p>

                    {item.description && (
                        <div className="relative">
                            <Quote size={24} className="absolute -left-2 -top-2 text-green-500/30" />
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6">
                                {item.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

                {/* Key Takeaways */}
                {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <BookOpen size={18} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                Key Takeaways
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                <li
                                    key={idx}
                                    className="group flex items-start gap-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-normal p-3 rounded-xl transition-all hover:bg-green-500/5"
                                >
                                    <span className="mt-2.5 w-2 h-2 rounded-full bg-gray-400 group-hover:bg-green-500 shrink-0 transition-colors" />
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Notes (if no takeaways) */}
                {item.notes && !item.keyTakeaways && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed italic">
                            "{item.notes}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
