"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState } from "./types";
import { createTerminalSlice } from "./slices/terminalSlice";
import { createMusicSlice } from "./slices/musicSlice";
import { createUISlice } from "./slices/uiSlice";
import { createContentSlice } from "./slices/contentSlice";
import { createUtilitySlice } from "./slices/utilitySlice";

/**
 * @fileoverview Main Zustand store combining all application state slices.
 * Uses persist middleware for localStorage synchronization.
 */

/**
 * Global application store hook.
 * Combines terminal, music, UI, content, and utility state slices.
 * Persists selected state to localStorage under 'adarsh-storage' key.
 *
 * @returns {AppState} Complete application state and actions
 *
 * @example
 * ```tsx
 * const { isPlaying, setIsPlaying, currentTrackIndex } = useStore();
 * ```
 */
export const useStore = create<AppState>()(
    persist(
        (...a) => ({
            ...createTerminalSlice(...a),
            ...createMusicSlice(...a),
            ...createUISlice(...a),
            ...createContentSlice(...a),
            ...createUtilitySlice(...a),
        }),
        {
            name: "adarsh-storage",
            partialize: (state) => ({
                expandedSections: state.expandedSections,
                todos: state.todos,
                volume: state.volume,
                isMuted: state.isMuted,
                guestbookEntries: state.guestbookEntries,
            }),
        }
    )
);
