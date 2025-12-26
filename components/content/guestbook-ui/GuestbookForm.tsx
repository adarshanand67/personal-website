import { Send } from "lucide-react";

interface GuestbookFormProps {
    name: string;
    onNameChange: (val: string) => void;
    message: string;
    onMessageChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

export function GuestbookForm({
    name,
    onNameChange,
    message,
    onMessageChange,
    onSubmit,
    isSubmitting,
}: GuestbookFormProps) {
    return (
        <div className="border-t border-green-900/50 bg-green-950/10 p-4">
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 bg-black/40 border border-green-900/30 rounded px-3 py-2 sm:w-1/3 focus-within:border-green-500/50 transition-colors">
                        <span className="text-green-500 text-xs font-bold">USER:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Enter alias..."
                            className="bg-transparent border-none outline-none text-green-100 text-sm w-full placeholder-green-900"
                            maxLength={20}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="flex-1 flex items-center gap-2 bg-black/40 border border-green-900/30 rounded px-3 py-2 focus-within:border-green-500/50 transition-colors">
                        <span className="text-green-500 text-xs font-bold">&gt;</span>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            placeholder='echo "Write a message..."'
                            className="bg-transparent border-none outline-none text-green-100 text-sm w-full placeholder-green-900"
                            maxLength={140}
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !message.trim() || !name.trim()}
                            className="text-green-500 hover:text-green-400 disabled:opacity-30 disabled:hover:text-green-500 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
