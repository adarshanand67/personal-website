import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Props for SocialButton component.

 * @property {string} label - Small label text (e.g., "EMAIL", "LINKEDIN")
 * @property {string} name - Display name/value (e.g., email address, username)
 * @property {ReactNode} icon - Icon component to display
 * @property {string} [href] - Optional external link URL
 * @property {Function} [onClick] - Optional click handler for button mode
 * @property {number} index - Animation delay index
 */
interface SocialButtonProps {
    label: string;
    name: string;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
    index: number;
}

/**
 * Social Button Component - animated card for social links or actions.
 * Renders as either a link or button with icon, label, and name.
 * Features staggered fade-in animation and hover effects.

 * @param {SocialButtonProps} props - Component props
 */

export function SocialButton({ label, name, icon, href, onClick, index }: SocialButtonProps) {
    const content = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform shadow-sm border border-zinc-200 dark:border-zinc-700">
                    {icon}
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[10px] font-black text-black dark:text-gray-200 uppercase tracking-widest mb-0.5 group-hover:text-foreground/60 transition-colors">
                        {label}
                    </p>
                    <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-foreground transition-colors truncate max-w-[120px]">
                        {name}
                    </h3>
                </div>
            </div>
            {href && (
                <ExternalLink
                    size={16}
                    className="text-black/40 dark:text-gray-500 group-hover/item:text-black dark:group-hover/item:text-gray-300 transition-all transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                />
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="w-full md:flex-1 min-w-0"
        >
            {href ? (
                <Link
                    href={href}
                    target="_blank"
                    className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item"
                >
                    {content}
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item"
                >
                    {content}
                </button>
            )}
        </motion.div>
    );
}
