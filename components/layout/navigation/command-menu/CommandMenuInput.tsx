import { Search } from "lucide-react";

interface CommandMenuInputProps {
    value: string;
    onChange: (val: string) => void;
}

export function CommandMenuInput({ value, onChange }: CommandMenuInputProps) {
    return (
        <div className="flex items-center border-b border-gray-100 dark:border-white/5 px-4 h-14">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for anything..."
                className="w-full bg-transparent border-none outline-none text-base dark:text-white placeholder:text-gray-500 font-medium"
                autoFocus
            />
            <div className="flex items-center gap-1.5 ml-auto">
                <span className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/10 text-[10px] text-gray-400 font-mono">
                    ESC
                </span>
            </div>
        </div>
    );
}
