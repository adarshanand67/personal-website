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
            <div className="p-8 md:p-10 space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                        {item.title}
                    </h2>

                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium mb-6">
                        by {item.author}
                    </p>

                    {item.description && (
                        <div className="relative">
                            <Quote
                                size={18}
                                className="absolute -left-2 -top-2 text-foreground/10"
                            />
                            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed italic pl-6">
                                {item.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

                {/* Key Takeaways */}
                {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="bg-foreground/[0.02] rounded-3xl p-8 border border-foreground/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/10">
                                <BookOpen size={16} className="text-foreground/60" />
                            </div>
                            <h3 className="text-[9px] font-black text-foreground/80 uppercase tracking-widest">
                                Key Takeaways
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {item.keyTakeaways.map((takeaway: string, idx: number) => (
                                <li
                                    key={idx}
                                    className="group flex items-start gap-4 text-sm md:text-base text-foreground/80 leading-relaxed font-normal p-3 rounded-xl transition-all hover:bg-foreground/5"
                                >
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/50 shrink-0 transition-colors" />
                                    <span>{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Notes (if no takeaways) */}
                {item.notes && !item.keyTakeaways && (
                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/5">
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed italic">
                            "{item.notes}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
