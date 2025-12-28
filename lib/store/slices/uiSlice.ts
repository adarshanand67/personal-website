/** UI state slice for Zustand store. */

import { StateCreator } from "zustand";
import { AppState, UIState, BackToTopState } from "../types";

/** Creates the UI state slice for modals, navigation, and back-to-top. */
export const createUISlice: StateCreator<AppState, [], [], UIState & BackToTopState> = (set) => ({
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    heroViewMode: "profile",
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
    setHeroViewMode: (mode) => set({ heroViewMode: mode }),
    toggleSectionExpanded: (section) =>
        set((state) => ({
            expandedSections: {
                ...state.expandedSections,
                [section]: !state.expandedSections[section],
            },
        })),
});
