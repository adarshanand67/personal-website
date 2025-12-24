import { TerminalSquare } from "lucide-react";

export function GuestbookHeader() {
    return (
        <div className="bg-green-900/20 px-4 py-2 border-b border-green-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-500">
                <TerminalSquare size={16} />
                <span className="text-sm font-bold tracking-wider">/var/log/guestbook.log</span>
            </div>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
        </div>
    );
}
