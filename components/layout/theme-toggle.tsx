"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useStore } from "@/lib/store/useStore";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { isMounted, setMounted } = useStore();

  React.useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!isMounted) {
    return (
      <button
        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-900 dark:text-gray-100" />
      <Moon
        className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-900 dark:text-gray-100"
        style={{ marginTop: "-20px" }}
      />
    </button>
  );
}
