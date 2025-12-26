/**
 * @fileoverview UI state slice for Zustand store.
 * Manages general UI state including modals, navbar, and section expansion.
 */

import { StateCreator } from "zustand";
import { AppState, UIState, BackToTopState } from "../types";

/**
 * Creates the UI state slice.
 * Handles UI-related state like modals, navigation, and back-to-top button.
 *
 * @param {Function} set - Zustand set function
 * @returns {UIState & BackToTopState} UI state slice
 */
export const createUISlice: StateCreator<AppState, [], [], UIState & BackToTopState> = (set) => ({
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    expandedSections: {
        experience: true,
        techstack: true,
        contact: true,
    },
    isBackToTopVisible: false,
    setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),
    setIsMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    toggleSectionExpanded: (section) =>
        set((state) => ({
            expandedSections: {
                ...state.expandedSections,
                [section]: !state.expandedSections[section],
            },
        })),
});
