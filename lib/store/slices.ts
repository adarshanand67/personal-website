/**
 * @fileoverview Consolidated terminal, music, UI, content, and utility state slices for Zustand store.
 */

import { StateCreator } from "zustand";
import { tracks } from "@/lib/constants";
import {
    AppState,
    TerminalState,
    MusicState,
    UIState,
    BackToTopState,
    AnimeState,
    HobbyState,
    BookState,
    SearchState,
    RandomizerState,
    TodoState,
    GuestbookState,
} from "./types";

// --- TERMINAL SLICE ---
export const createTerminalSlice: StateCreator<AppState, [], [], TerminalState> = (set) => ({
    lines: [],
    history: [],
    historyIndex: -1,
    input: "",
    isIntroDone: false,
    passwordMode: false,
    isExpanded: true,
    position: { x: 0, y: 0 },
    isDragging: false,
    files: {},
    currentDir: "/home/portfolio",
    setLines: (lines) =>
        set((state) => ({
            lines: typeof lines === "function" ? lines(state.lines) : lines,
        })),
    addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
    clearLines: () => set({ lines: [] }),
    setHistory: (history) =>
        set((state) => ({
            history: typeof history === "function" ? history(state.history) : history,
        })),
    addToHistory: (cmd) => set((state) => ({ history: [cmd, ...state.history] })),
    setHistoryIndex: (index) => set({ historyIndex: index }),
    setInput: (input) => set({ input }),
    setIsIntroDone: (done) => set({ isIntroDone: done }),
    setPasswordMode: (mode) => set({ passwordMode: mode }),
    setIsExpanded: (expanded) => set({ isExpanded: expanded }),
    setPosition: (pos) => set({ position: pos }),
    setIsDragging: (dragging) => set({ isDragging: dragging }),
    setFiles: (files) =>
        set((state) => ({
            files: typeof files === "function" ? files(state.files) : files,
        })),
    setCurrentDir: (currentDir) => set({ currentDir }),
});

// --- MUSIC SLICE ---
export const createMusicSlice: StateCreator<AppState, [], [], MusicState> = (set) => ({
    showMusicPlayer: false,
    isPlaying: false,
    volume: 1.0,
    isMuted: false,
    currentTrackIndex: 0,
    isShuffle: false,
    isRepeat: false,
    currentTime: 0,
    duration: 0,
    seekTime: null,
    toggleMusicPlayer: () => set((state) => ({ showMusicPlayer: !state.showMusicPlayer })),
    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
    toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setVolume: (volume) => set({ volume }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    nextTrack: () =>
        set((state) => ({
            currentTrackIndex: state.isShuffle
                ? Math.floor(Math.random() * tracks.length)
                : (state.currentTrackIndex + 1) % tracks.length,
        })),
    prevTrack: () =>
        set((state) => ({
            currentTrackIndex: (state.currentTrackIndex - 1 + tracks.length) % tracks.length,
        })),
    setCurrentTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),
    setProgress: (currentTime, duration) => set({ currentTime, duration }),
    requestSeek: (time) => set({ seekTime: time }),
});

// --- UI SLICE ---
export const createUISlice: StateCreator<AppState, [], [], UIState & BackToTopState> = (set) => ({
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    heroViewMode: "profile",
    expandedSections: { experience: true, techstack: true, contact: true },
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

// --- CONTENT SLICE ---
export const createContentSlice: StateCreator<
    AppState,
    [],
    [],
    AnimeState & HobbyState & BookState & SearchState & RandomizerState
> = (set) => ({
    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),
    hobbySelectedItem: null,
    setHobbySelectedItem: (item) => set({ hobbySelectedItem: item }),
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    bookSelectedItem: null,
    bookSelectedTag: null,
    setBookSelectedItem: (item) => set({ bookSelectedItem: item }),
    setBookSelectedTag: (tag) => set({ bookSelectedTag: tag }),
    randomItemIndex: null,
    isRandomizing: false,
    setRandomItemIndex: (index) => set({ randomItemIndex: index }),
    setIsRandomizing: (isRandomizing) => set({ isRandomizing }),
});

// --- UTILITY SLICE ---
export const createUtilitySlice: StateCreator<AppState, [], [], TodoState & GuestbookState> = (
    set
) => ({
    todos: [],
    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                { id: Math.random().toString(36).substr(2, 9), text, completed: false },
            ],
        })),
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),
    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
    clearTodos: () => set({ todos: [] }),
    guestbookEntries: [],
    addGuestbookEntry: (entry) =>
        set((state) => ({
            guestbookEntries: [entry, ...state.guestbookEntries],
        })),
});
