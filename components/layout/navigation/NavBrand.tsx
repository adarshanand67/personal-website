"use client";

import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/lib/constants";

/**
 * Navigation Brand Component - displays logo and site name in navbar.
 * Features animated tilde icon with rotation effect on hover.
 * Scrolls to hero section when on home page.
 * @component
 */
export function NavBrand() {
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === routes.home;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

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
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-green-500/20">
                ~
            </div>
            Adarsh
        </button>
    );
}
