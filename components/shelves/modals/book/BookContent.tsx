
import { ExternalLink } from "lucide-react";

interface BookContentProps {
    item: any;
}

export function BookContent({ item }: BookContentProps) {
    return (
        <div className="p-8 md:p-12 space-y-8">
            {/* Key Takeaways */}
            {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                            Key Takeaways
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                    </div>

                    <ul className="space-y-3 list-disc pl-5 marker:text-gray-400">
                        {item.keyTakeaways.map((takeaway: string, idx: number) => (
                            <li key={idx} className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                {takeaway}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Notes (if no takeaways) */}
            {item.notes && !item.keyTakeaways && (
                <div className="p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed italic">
                        "{item.notes}"
                    </p>
                </div>
            )}

            {/* CTA Button */}
            {item.amazonLink && (
                <div className="pt-4">
                    <a
                        href={item.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-black font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                        Get it on Amazon
                    </a>
                </div>
            )}
        </div>
    );
}
