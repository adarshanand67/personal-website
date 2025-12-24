import { Command as CommandIcon } from "lucide-react";

export function CommandMenuFooter() {
    return (
        <div className="bg-gray-50 dark:bg-white/5 px-4 h-10 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">↑↓</span>
                    <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="p-1 rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">↵</span>
                    <span>Select</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <CommandIcon size={12} />
                <span className="font-mono">K</span>
            </div>
        </div>
    );
}
