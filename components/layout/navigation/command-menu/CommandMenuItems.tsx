import { ArrowRight } from "lucide-react";

interface CommandMenuItemProps {
    item: any;
    isSelected: boolean;
    onSelect: (action: () => void) => void;
}

export function CommandMenuItem({ item, isSelected, onSelect }: CommandMenuItemProps) {
    return (
        <button
            onClick={() => onSelect(item.action)}
            className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-300
                ${
                    isSelected
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 dark:text-gray-500 opacity-40 hover:opacity-70"
                }
            `}
        >
            <div className="flex items-center gap-3 flex-1">
                <item.icon
                    size={18}
                    className={`transition-colors duration-300 ${
                        isSelected
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 dark:text-gray-600"
                    }`}
                />
                <div className="flex flex-col items-start gap-0.5">
                    <span
                        className={`transition-all duration-300 ${
                            isSelected ? "font-bold scale-[1.02] origin-left" : "font-medium"
                        }`}
                    >
                        {item.label}
                    </span>
                    {item.description && (
                        <span
                            className={`text-xs transition-colors duration-300 ${
                                isSelected
                                    ? "text-gray-500 dark:text-gray-400"
                                    : "text-gray-400/60 dark:text-gray-500/60"
                            }`}
                        >
                            {item.description}
                        </span>
                    )}
                </div>
            </div>
            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500"
                >
                    <span className="text-[10px] font-mono">Enter</span>
                    <ArrowRight size={14} />
                </motion.div>
            )}
        </button>
    );
}

interface CommandMenuItemsProps {
    groups: any[];
    search: string;
    selectedIndex: number;
    filteredItems: any[];
    onSelect: (action: () => void) => void;
}

export function CommandMenuItems({
    groups,
    search,
    selectedIndex,
    filteredItems,
    onSelect,
}: CommandMenuItemsProps) {
    if (filteredItems.length === 0) {
        return (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400 text-sm">
                No results found for &ldquo;{search}&rdquo;
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {groups.map((group) => {
                const groupFiltered = group.items.filter((item: any) =>
                    item.label.toLowerCase().includes(search.toLowerCase())
                );
                if (groupFiltered.length === 0) return null;

                return (
                    <div key={group.group} className="space-y-1">
                        <div className="px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-widest">
                            {group.group}
                        </div>
                        {groupFiltered.map((item: any) => (
                            <CommandMenuItem
                                key={item.label}
                                item={item}
                                isSelected={filteredItems.indexOf(item) === selectedIndex}
                                onSelect={onSelect}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
