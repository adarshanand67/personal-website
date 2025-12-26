"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/constants";
import { FileText, Book, MonitorPlay, Palette } from "lucide-react";

/**
 * Props for NavLinks component.
 * @interface NavLinksProps
 * @property {string} [className] - Optional CSS classes
 * @property {Function} [onItemClick] - Optional callback when link is clicked
 */
interface NavLinksProps {
    className?: string;
    onItemClick?: () => void;
}

/**
 * Modern Navigation Links Component with active state indicators.
 * @component
 */
export function NavLinks({ className, onItemClick }: NavLinksProps) {
    const pathname = usePathname();

    const links = [
        {
            href: routes.articleShelf,
            label: "Articles",
            icon: FileText,
            subItems: [
                { href: routes.papers, label: "Papers", icon: FileText },
                { href: routes.blogs, label: "Blogs", icon: FileText },
            ],
        },
        { href: routes.bookShelf, label: "Books", icon: Book },
        { href: routes.animeShelf, label: "Anime", icon: MonitorPlay },
        { href: routes.hobbyShelf, label: "Hobby", icon: Palette },
    ];

    return (
        <div className={`flex items-center gap-1 md:gap-2 ${className || ""}`}>
            {links.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.subItems && link.subItems.some((sub) => pathname === sub.href));
                const hasSubItems = link.subItems && link.subItems.length > 0;

                return (
                    <div key={link.href} className="relative group">
                        <Link
                            href={link.href}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                                isActive
                                    ? "text-foreground"
                                    : "text-foreground/60 hover:text-foreground"
                            }`}
                            onClick={onItemClick}
                        >
                            <link.icon
                                size={18}
                                className={`transition-transform duration-300 group-hover:scale-110 text-black dark:text-gray-400`}
                            />
                            <span
                                className={`text-[11px] uppercase tracking-widest whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}
                            >
                                {link.label}
                            </span>
                        </Link>

                        {hasSubItems && (
                            <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl p-2 shadow-xl">
                                    {link.subItems!.map((subItem) => {
                                        const isSubActive = pathname === subItem.href;
                                        return (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                    isSubActive
                                                        ? "bg-black/5 dark:bg-white/10 text-foreground font-bold"
                                                        : "text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                                                }`}
                                                onClick={onItemClick}
                                            >
                                                <subItem.icon
                                                    size={14}
                                                    className={
                                                        isSubActive
                                                            ? "text-black dark:text-white"
                                                            : "text-black/60 dark:text-gray-400"
                                                    }
                                                />
                                                <span className="text-[11px] uppercase tracking-wider">
                                                    {subItem.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
