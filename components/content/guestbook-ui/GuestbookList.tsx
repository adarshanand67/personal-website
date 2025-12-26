interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

interface GuestbookListProps {
    entries: GuestbookEntry[];
}

export function GuestbookList({ entries }: GuestbookListProps) {
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-transparent">
            {entries.length === 0 ? (
                <div className="text-gray-500 italic text-sm text-center py-8">
                    &lt; No entries found in system log... /&gt;
                </div>
            ) : (
                entries.map((entry, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm animate-fade-in"
                    >
                        <span className="text-gray-500 shrink-0">
                            [{formatDate(entry.timestamp)}]
                        </span>
                        <div className="flex flex-col">
                            <span className="text-green-400 font-bold">
                                {entry.name}
                                <span className="text-gray-500">@guest:~$</span>
                            </span>
                            <span className="text-gray-300 break-words">{entry.message}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
