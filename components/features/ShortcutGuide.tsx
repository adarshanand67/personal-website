"use client";

import { useState, useEffect } from "react";
import {
  Command,
  ChevronUp,
  ChevronDown,
  CornerDownLeft,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ShortcutGuide() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const hk = (e: KeyboardEvent) => {
      if (
        e.key === "?" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      )
        setOpen(true);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", hk);
    return () => window.removeEventListener("keydown", hk);
  }, []);
  const shortcuts = [
    {
      keys: [<Command key="cmd" size={12} />, "K"],
      label: "Open Command Menu",
    },
    { keys: ["?"], label: "Show Keyboard Shortcuts" },
    { keys: ["ESC"], label: "Close Modals / Menus" },
    {
      keys: [
        <ChevronUp key="up" size={12} />,
        <ChevronDown key="down" size={12} />,
      ],
      label: "Navigate Lists",
    },
    { keys: [<CornerDownLeft key="enter" size={12} />], label: "Select Item" },
  ];
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
            >
              <X size={16} className="text-gray-400" />
            </button>
            <div className="mb-6">
              <h2 className="text-xl font-bold dark:text-white mb-1">
                Keyboard Shortcuts
              </h2>
              <p className="text-sm text-gray-500">
                Master the navigation with these keys.
              </p>
            </div>
            <div className="space-y-4">
              {shortcuts.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:dark:text-white">
                    {s.label}
                  </span>
                  <div className="flex gap-1.5">
                    {s.keys.map((k, ki) => (
                      <span
                        key={ki}
                        className="min-w-[24px] h-6 flex items-center justify-center px-1.5 rounded border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                Press ESC to close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
