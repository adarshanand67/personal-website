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
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                ${isSelected
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'}
            `}
        >
            <div className="flex items-center gap-3">
                <item.icon size={18} className={isSelected ? 'text-white' : 'text-gray-400 dark:text-gray-500'} />
                <span className="font-medium">{item.label}</span>
            </div>
            {isSelected && (
                <div className="flex items-center gap-1.5 opacity-80">
                    <span className="text-[10px] font-mono">Enter</span>
                    <ArrowRight size={14} />
                </div>
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

export function CommandMenuItems({ groups, search, selectedIndex, filteredItems, onSelect }: CommandMenuItemsProps) {
    if (filteredItems.length === 0) {
        return (
            <div className="py-12 text-center text-gray-500 text-sm">
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
                        <div className="px-3 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
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
