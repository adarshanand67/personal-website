import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface SocialButtonProps {
    label: string;
    name: string;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
    index: number;
}

export function SocialButton({ label, name, icon, href, onClick, index }: SocialButtonProps) {
    const content = (
        <>
            <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform shadow-lg shadow-green-500/20">
                {icon}
            </div>
            <div className="flex flex-col text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">{label}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{name}</span>
            </div>
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
        >
            {href ? (
                <Link href={href} target="_blank" className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item">
                    {content}
                </Link>
            ) : (
                <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item">
                    {content}
                </button>
            )}
        </motion.div>
    );
}
