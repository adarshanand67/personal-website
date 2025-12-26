"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCommandMenu } from "./command-menu/hooks/useCommandMenu";
import { CommandMenuInput } from "./command-menu/CommandMenuInput";
import { CommandMenuItems } from "./command-menu/CommandMenuItems";
import { CommandMenuFooter } from "./command-menu/CommandMenuFooter";

/**
 * Command Menu Component - keyboard-driven command palette.
 * Features fuzzy search, keyboard navigation, and grouped commands.
 * @component
 */
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-[600px] bg-white/90 dark:bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden pointer-events-auto"
                    >
                        <CommandMenuInput value={search} onChange={setSearch} />

                        <div className="max-h-[60vh] overflow-y-auto py-2 px-2 custom-scrollbar">
                            <CommandMenuItems
                                groups={commandGroups}
                                search={search}
                                selectedIndex={selectedIndex}
                                filteredItems={filteredItems}
                                onSelect={runCommand}
                            />
                        </div>

                        <CommandMenuFooter />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
