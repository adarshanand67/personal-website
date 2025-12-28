"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { introLines } from "@/lib/constants";

/**
 * Terminal Preloader Component - preloads terminal content on app initialization.
 * Runs once on mount to populate terminal lines before user switches to terminal view.

 */
export function TerminalPreloader() {
    const { isIntroDone, setLines, setIsIntroDone } = useStore();

    useEffect(() => {
        if (!isIntroDone) {
            // Preload all intro lines immediately
            const allIntroLines = introLines();
            setLines(allIntroLines);
            setIsIntroDone(true);
        }
    }, [isIntroDone, setLines, setIsIntroDone]);

    return null;
}
