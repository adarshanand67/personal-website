"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Home,
  FileText,
  MonitorPlay,
  Book,
  Gamepad2 as GamepadIcon,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Terminal as TerminalIcon,
  Music,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Laptop,
  Command as CommandIcon,
} from "lucide-react";

import { routes, NAV_ITEMS } from "@/lib/constants";
import { siteConfig } from "@/lib/config";

// Hooks
export function useCommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openEvent = () => setOpen(true);
    document.addEventListener("keydown", down);
    document.addEventListener("open-command-menu", openEvent);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-command-menu", openEvent);
    };
  }, []);

  const descriptionMap: Record<string, string> = {
    Home: "Go to homepage",
    Articles: "Browse technical articles",
    Books: "Explore reading list",
    Anime: "View anime watchlist",
    Hobbies: "Discover hobbies & interests",
  };

  const iconMap: Record<string, any> = {
    Home: Home,
    Articles: FileText,
    Books: Book,
    Anime: MonitorPlay,
    Hobbies: GamepadIcon,
  };

  const navItemsFormatted = NAV_ITEMS.map((item) => ({
    icon: iconMap[item.label] || Home,
    label: item.label,
    description: descriptionMap[item.label] || "Navigate to page",
    action: () => router.push(item.path),
  }));

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    setSearch("");
    command();
  }, []);

  const commandGroups = useMemo(
    () => [
      {
        group: "Navigation",
        items: navItemsFormatted,
      },
      {
        group: "Quick Actions",
        items: [
          {
            icon: Copy,
            label: "Copy Email",
            description: "Copy email to clipboard",
            action: () => {
              navigator.clipboard.writeText(siteConfig.contact.email);
            },
          },
          {
            icon: ExternalLink,
            label: "Copy Page URL",
            description: "Copy current page URL",
            action: () => {
              navigator.clipboard.writeText(window.location.href);
            },
          },
          {
            icon: Github,
            label: "Copy GitHub URL",
            description: "Copy GitHub profile link",
            action: () => {
              navigator.clipboard.writeText(
                `https://${siteConfig.contact.github}`,
              );
            },
          },
          {
            icon: Linkedin,
            label: "Copy LinkedIn URL",
            description: "Copy LinkedIn profile link",
            action: () => {
              navigator.clipboard.writeText(
                `https://${siteConfig.contact.linkedin}`,
              );
            },
          },
          {
            icon: Copy,
            label: "Copy Page Title",
            description: "Copy current page title",
            action: () => {
              navigator.clipboard.writeText(document.title);
            },
          },
          {
            icon: TerminalIcon,
            label: "Open Terminal",
            description: "Toggle terminal view",
            action: () =>
              document
                .querySelector<HTMLElement>("[data-terminal-toggle]")
                ?.click(),
          },
          {
            icon: Music,
            label: "Toggle Music",
            description: "Play/pause music player",
            action: () =>
              document
                .querySelector<HTMLElement>("[data-music-toggle]")
                ?.click(),
          },
          {
            icon: ArrowUp,
            label: "Scroll to Top",
            description: "Jump to page top",
            action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
          },
          {
            icon: ArrowDown,
            label: "Scroll to Bottom",
            description: "Jump to page bottom",
            action: () =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              }),
          },
        ],
      },
      {
        group: "Appearance",
        items: [
          {
            icon: Sun,
            label: "Light Mode",
            description: "Switch to light theme",
            action: () => setTheme("light"),
          },
          {
            icon: Moon,
            label: "Dark Mode",
            description: "Switch to dark theme",
            action: () => setTheme("dark"),
          },
          {
            icon: Laptop,
            label: "System Theme",
            description: "Match system preferences",
            action: () => setTheme("system"),
          },
        ],
      },
    ],
    [router, setTheme],
  );

  const filteredItems = useMemo(
    () =>
      commandGroups
        .flatMap((g) => g.items)
        .filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase()),
        ),
    [commandGroups, search],
  );
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex])
          runCommand(filteredItems[selectedIndex].action);
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [open, filteredItems, selectedIndex, runCommand]);

  return {
    open,
    setOpen,
    search,
    setSearch,
    selectedIndex,
    runCommand,
    commandGroups,
    filteredItems,
  };
}

// Components
function CommandMenuInput({ value, onChange }: any) {
  return (
    <div className="flex items-center border-b border-gray-200 dark:border-white/10 px-4 h-14">
      <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for anything..."
        className="w-full bg-transparent border-none outline-none text-base text-gray-900 dark:text-white placeholder:text-gray-400"
        autoFocus
      />
      <span className="px-1.5 py-0.5 rounded border border-gray-300 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
        ESC
      </span>
    </div>
  );
}

function CommandMenuItem({ item, isSelected, onSelect }: any) {
  return (
    <button
      onClick={() => onSelect(item.action)}
      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isSelected ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`p-2 rounded-lg transition-colors ${isSelected ? "bg-white dark:bg-black/20 text-zinc-900 dark:text-zinc-100 shadow-sm" : "bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
        >
          <item.icon size={18} />
        </div>
        <div className="flex flex-col items-start gap-0.5">
          <span
            className={`font-semibold tracking-tight ${isSelected ? "text-zinc-900 dark:text-zinc-100" : "text-gray-900 dark:text-white"}`}
          >
            {item.label}
          </span>
          {item.description && (
            <span
              className={`text-xs ${isSelected ? "text-zinc-500 dark:text-zinc-400" : "text-gray-500 dark:text-gray-400"}`}
            >
              {item.description}
            </span>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="flex items-center gap-1.5 opacity-90 pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Open
          </span>
          <ArrowRight size={14} />
        </div>
      )}
    </button>
  );
}

function CommandMenuItems({
  groups,
  search,
  selectedIndex,
  filteredItems,
  onSelect,
}: any) {
  if (filteredItems.length === 0)
    return (
      <div className="py-12 text-center text-gray-500 text-sm">
        No results found for &ldquo;{search}&rdquo;
      </div>
    );
  return (
    <div className="space-y-4">
      {groups.map((group: any) => {
        const groupFiltered = group.items.filter((item: any) =>
          item.label.toLowerCase().includes(search.toLowerCase()),
        );
        if (groupFiltered.length === 0) return null;
        return (
          <div key={group.group} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {group.group}
            </div>
            {groupFiltered.map((item: any) => (
              <CommandMenuItem
                key={item.label}
                item={item}
                isSelected={filteredItems.indexOf(item) === selectedIndex}
                onSelect={onSelect}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function CommandMenu() {
  const {
    open,
    setOpen,
    search,
    setSearch,
    selectedIndex,
    runCommand,
    commandGroups,
    filteredItems,
  } = useCommandMenu();
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="w-full max-w-[640px] bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden pointer-events-auto ring-1 ring-black/5"
          >
            <CommandMenuInput value={search} onChange={setSearch} />
            <div className="max-h-[60vh] overflow-y-auto py-3 px-2 custom-scrollbar">
              <CommandMenuItems
                groups={commandGroups}
                search={search}
                selectedIndex={selectedIndex}
                filteredItems={filteredItems}
                onSelect={runCommand}
              />
            </div>
            <div className="bg-gray-50/50 dark:bg-white/5 px-4 h-11 flex items-center justify-between text-[10px] uppercase tracking-wider font-medium text-gray-400 dark:text-gray-500 border-t border-gray-200/50 dark:border-white/5">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-gray-200 dark:bg-white/10 px-1 rounded text-[9px]">
                    ↑↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-gray-200 dark:bg-white/10 px-1 rounded text-[9px]">
                    ↵
                  </kbd>{" "}
                  Select
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CommandIcon size={12} className="opacity-70" />K
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
