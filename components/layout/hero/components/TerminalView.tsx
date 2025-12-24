import { motion } from "framer-motion";
import { Terminal } from "@/components/layout/terminal";
import { ViewToggle } from "../ViewToggle";

interface TerminalViewProps {
    viewMode: 'profile' | 'terminal';
    setViewMode: (mode: 'profile' | 'terminal') => void;
}

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
