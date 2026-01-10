"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Book,
  FileText,
  MonitorPlay,
  Gamepad2,
  X,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/features";
import { useStore } from "@/lib/store";
import { routes, NAV_ITEMS } from "@/lib/constants";
import { siteConfig } from "@/lib/config";

export function NavBrand() {
  const pathname = usePathname();
  const router = useRouter();
  const { setHeroViewMode } = useStore();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setHeroViewMode("profile");
    if (pathname === routes.home) {
      document
        .getElementById("hero")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }) ||
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else router.push(routes.home);
  };
  return (
    <button
      onClick={handleClick}
      className="text-xl font-black tracking-tight flex items-center gap-3 mr-auto group cursor-pointer text-foreground"
    >
      <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-black/10">
        ~
      </div>
      {siteConfig.author.name.split(" ")[0]}
    </button>
  );
}

export function NavLinks({
  className,
  onItemClick,
}: {
  className?: string;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();
  const iconMap: Record<string, any> = {
    Articles: FileText,
    Books: Book,
    Anime: MonitorPlay,
    Hobbies: Gamepad2,
  };

  const links = NAV_ITEMS.filter((item) => item.label !== "Home").map(
    (item) => ({
      href: item.path,
      label: item.label,
      icon: iconMap[item.label] || Book,
    }),
  );
  return (
    <div className={`flex items-center gap-1 md:gap-2 ${className || ""}`}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"}`}
          >
            <link.icon
              size={18}
              className="transition-transform duration-300 group-hover:scale-110 text-black dark:text-gray-400"
            />
            <span
              className={`text-[11px] uppercase tracking-widest whitespace-nowrap ${isActive ? "font-black" : "font-bold"}`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function NavActions({ isMounted }: { isMounted: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex items-center gap-2 px-3 h-10 rounded-xl hover:bg-foreground/5 text-foreground/70 hover:text-foreground transition-all border border-foreground/10"
        onClick={() => document.dispatchEvent(new Event("open-command-menu"))}
        aria-label="Search"
        title="Search (⌘K)"
      >
        {isMounted ? (
          <>
            <Search size={22} className="text-black dark:text-gray-400" />
            <span className="hidden md:inline text-sm text-foreground/50">
              Search
            </span>
            <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-foreground/5 border border-foreground/10 rounded">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        ) : (
          <div className="w-5 h-5" />
        )}
      </button>
      <ThemeToggle />
    </div>
  );
}

export function Navbar() {
  const { isNavbarActive, setIsNavbarActive, isMounted, setIsMounted } =
    useStore();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight)
        setScrollProgress(
          Number((currentScroll / scrollHeight).toFixed(2)) * 100,
        );
      setIsScrolled(currentScroll > 20);
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, [setIsMounted]);

  return (
    <>
      <div className="hidden md:block h-20" />
      <div className="fixed top-0 left-0 right-0 z-[70] h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full bg-slate-900 dark:bg-slate-200 transition-all duration-300 shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-[60] transition-all duration-300">
        <div
          className={`mx-auto px-4 transition-all duration-500 ${isScrolled ? "py-3" : "py-4"}`}
        >
          <div
            className={`max-w-7xl mx-auto backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border transition-all duration-700 ${isScrolled ? "border-foreground/10 shadow-2xl" : "border-foreground/5 shadow-xl"}`}
          >
            <div className="px-6 flex items-center justify-between h-20">
              <NavBrand />
              <div className="hidden md:flex items-center gap-1">
                <NavLinks />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <NavActions isMounted={isMounted} />
              </div>
              <div className="md:hidden flex items-center gap-2">
                <NavActions isMounted={isMounted} />
                <button
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95"
                  onClick={() => setIsNavbarActive(!isNavbarActive)}
                >
                  {isNavbarActive ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
            {isNavbarActive && (
              <div className="md:hidden border-t border-gray-200/50 dark:border-white/10 p-6">
                <NavLinks
                  className="flex flex-col gap-1"
                  onItemClick={() => setIsNavbarActive(false)}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
