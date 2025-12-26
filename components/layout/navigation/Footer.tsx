import Link from "next/link";
import { Home } from "lucide-react";
import { NavLinks } from "./NavLinks";

/**
 * Footer Component - site footer with navigation links and branding.
 * Features glassmorphic design with gradient backgrounds.
 * @component
 */
export function Footer() {
    return (
        <footer className="relative py-16 border-t border-foreground/5 mt-auto font-mono overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.02] via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0, 0.1) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                ></div>
            </div>

            <div className="absolute top-0 left-1/4 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border border-foreground/10 p-4 md:p-6 shadow-2xl mb-8 w-fit mx-auto">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link
                            href="/"
                            scroll={false}
                            className="group flex items-center gap-2 text-foreground/40 hover:text-foreground transition-all duration-300"
                            title="Back to Home"
                        >
                            <Home
                                size={18}
                                className="group-hover:scale-110 transition-transform"
                            />
                            <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">
                                Home
                            </span>
                        </Link>
                        <div className="w-px h-5 md:h-6 bg-foreground/10"></div>
                        <NavLinks />
                    </div>
                </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-center text-[10px] opacity-60 pb-8 tracking-widest uppercase">
                <span className="mr-1">©</span>
                {new Date().getFullYear()}
                <span className="ml-2">All Rights Reserved</span>
            </p>
        </footer>
    );
}
