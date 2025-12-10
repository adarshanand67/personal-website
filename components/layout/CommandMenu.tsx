"use client";

import * as React from "react";
import { Command } from "cmdk";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useGlobalState } from "@/components/common/GlobalProvider";
import {
  Laptop,
  Moon,
  Sun,
  FileText,
  Home,
  BookOpen,
  Tv,
  Search,
  Mail,
  Github,
  Linkedin,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Sparkles,
} from "lucide-react";
import { useUISound } from "@/hooks/useUISound";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const {
    toggleMusicPlayer,
    isPlaying,
    setIsPlaying,
    nextTrack,
    prevTrack,
    toggleMatrix,
    isSoundEnabled,
  } = useGlobalState();
  const { playSound } = useUISound(isSoundEnabled);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        if (!open) playSound('hover'); // Play sound on open
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const openEvent = () => {
      setOpen(true);
      playSound('hover');
    };

    document.addEventListener("keydown", down);
    document.addEventListener("open-command-menu", openEvent);
    return () => {
      document.removeEventListener("keydown", down);
      document.removeEventListener("open-command-menu", openEvent);
    };
  }, [open, playSound]);

  const runCommand = React.useCallback((command: () => unknown) => {
    playSound('click');
    setOpen(false);
    command();
  }, [playSound]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[640px]">
        <Command
          className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-800 p-2 overflow-hidden"
          loop
        >
          <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-3 pb-2 mb-2">
            <Search className="w-4 h-4 text-gray-600 dark:text-gray-300 mr-2" />
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none outline-none text-sm h-8 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              autoFocus
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden px-1 scroll-py-1">
            <Command.Empty className="py-6 text-center text-sm text-gray-700 dark:text-gray-300">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2"
            >
              <Command.Item
                onSelect={() => runCommand(() => router.push("/"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/blogs"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Blogshelf
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/papershelf"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Papershelf
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/animeshelf"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Tv className="w-4 h-4" />
                Animeshelf
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/bookshelf"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Bookshelf
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <Command.Group heading="Media Control" className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
              <Command.Item
                onSelect={() => runCommand(() => setIsPlaying(!isPlaying))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause Music" : "Play Music"}
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(nextTrack)}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
                Next Track
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(prevTrack)}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <SkipBack className="w-4 h-4" />
                Previous Track
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <Command.Group heading="System Actions" className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
              <Command.Item
                onSelect={() => runCommand(toggleMatrix)}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Toggle Matrix Rain
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <Command.Group heading="Theme" className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2">
              <Command.Item
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Sun className="w-4 h-4" />
                Light Mode
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Moon className="w-4 h-4" />
                Dark Mode
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Laptop className="w-4 h-4" />
                System Theme
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-gray-800 my-2" />

            <Command.Group
              heading="Socials"
              className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-2"
            >
              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open("https://github.com/adarshanand67", "_blank"))
                }
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open("https://linkedin.com/in/adarshanand67", "_blank"))
                }
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    window.open("mailto:adarshan20302@gmail.com");
                  })
                }
                className="flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Email
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 px-2 flex justify-between items-center text-[10px] text-gray-400">
            <span>Open with ⌘ K</span>
            <span>Select with ↵</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
