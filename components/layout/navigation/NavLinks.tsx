"use client";

import Link from "next/link";
import { routes } from "@/lib/constants";

interface NavLinksProps {
    className?: string;
    onItemClick?: () => void;
}

export function NavLinks({ className, onItemClick }: NavLinksProps) {
    const links = [
        { href: routes.articleShelf, label: "Articles" },
        { href: routes.bookShelf, label: "Books" },
        { href: routes.animeShelf, label: "Anime" },
        { href: routes.hobbyShelf, label: "Hobby" },
    ];

    return (
        <div className={className}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-xl text-foreground/70 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-500/5 transition-all"
                    onClick={onItemClick}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
