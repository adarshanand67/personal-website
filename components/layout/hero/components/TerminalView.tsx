/**
 * @fileoverview Terminal View Component - displays interactive terminal interface in hero section.
 * Renders the terminal mode of the hero section with view toggle button.
 */

import { motion } from "framer-motion";
import { Terminal } from "@/components/layout/terminal";
import { ViewToggle } from "../ViewToggle";

/**
 * Props for TerminalView component.

 * @property {'profile' | 'terminal'} viewMode - Current view mode
 * @property {Function} setViewMode - Function to switch between profile and terminal views
 */
interface TerminalViewProps {
    viewMode: "profile" | "terminal";
    setViewMode: (mode: "profile" | "terminal") => void;
}

/**
 * Terminal View Component - displays interactive terminal interface.
 * Features animated transitions and view toggle button positioned in top-right.
 *

 * @param {TerminalViewProps} props - Component props
 * @returns {JSX.Element} Rendered terminal view with toggle
 *
 * @example
 * ```tsx
 * <TerminalView
 *   viewMode={currentView}
 *   setViewMode={setCurrentView}
 * />
 * ```
 */
export function TerminalView({ viewMode, setViewMode }: TerminalViewProps) {
    return (
        <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full relative"
        >
            <div className="absolute top-6 right-8 z-20">
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            <Terminal />
        </motion.div>
    );
}
