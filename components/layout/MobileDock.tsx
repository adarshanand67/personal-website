"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, FileText, BookOpen, Tv, Gamepad2, Music } from "lucide-react";
import { routes } from "@/lib/constants";

import { NAV_ITEMS } from "@/lib/constants";

export function MobileDock() {
  const pathname = usePathname();
  const iconMap: Record<string, any> = {
    Home: Home,
    Articles: FileText,
    Books: BookOpen,
    Anime: Tv,
    Hobbies: Gamepad2,
  };

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    icon: iconMap[item.label] || Home, // Fallback icon
  }));
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] w-full">
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200"}`}
              >
                {<item.icon size={20} />}
              </div>
              {isActive && (
                <motion.div
                  layoutId="dock-dot"
                  className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full"
                />
              )}
            </Link>
          );
        })}
        <Link
          href={routes.music}
          className="relative flex flex-col items-center gap-1 group"
        >
          <div
            className={`p-2 rounded-xl transition-all duration-300 ${pathname === routes.music ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md" : "text-black dark:text-gray-400 hover:text-black dark:hover:text-gray-200"}`}
          >
            <Music size={20} />
          </div>
          {pathname === routes.music && (
            <motion.div
              layoutId="dock-dot"
              className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
