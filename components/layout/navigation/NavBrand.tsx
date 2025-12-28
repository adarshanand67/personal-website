"use client";

import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/constants";
import { useStore } from "@/lib/store/useStore";

/**
 * Navigation Brand Component - displays logo and site name in navbar.
 * Features animated tilde icon with rotation effect on hover.
 * Scrolls to hero section when on home page and switches to profile view.

 */
export function NavBrand() {
    const pathname = usePathname();
    const router = useRouter();
    const { setHeroViewMode } = useStore();
    const isHomePage = pathname === routes.home;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Always switch to profile view when clicking home
        setHeroViewMode("profile");

        if (isHomePage) {
            // Already on home page - scroll to hero section
            const heroSection = document.getElementById("hero");
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                // Fallback: scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // Navigate to home page
            router.push(routes.home);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="text-xl font-black tracking-tight flex items-center gap-3 mr-auto group cursor-pointer text-foreground"
        >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-black/10">
                ~
            </div>
            Adarsh
        </button>
    );
}
