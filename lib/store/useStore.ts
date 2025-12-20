"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnimeItem, Hobby, Book } from '@/types/definitions';

interface TerminalState {
    lines: string[];
    history: string[];
    historyIndex: number;
    input: string;
    isIntroDone: boolean;
    passwordMode: boolean;
    isExpanded: boolean;
    position: { x: number; y: number };
    isDragging: boolean;
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void;
    addLine: (line: string) => void;
    clearLines: () => void;
    setHistory: (history: string[] | ((prev: string[]) => string[])) => void;
    addToHistory: (cmd: string) => void;
    setHistoryIndex: (index: number) => void;
    setInput: (input: string) => void;
    setIsIntroDone: (done: boolean) => void;
    setPasswordMode: (mode: boolean) => void;
    setIsExpanded: (expanded: boolean) => void;
    setPosition: (pos: { x: number; y: number }) => void;
    setIsDragging: (dragging: boolean) => void;
}

interface MusicState {
    showMusicPlayer: boolean;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    currentTrackIndex: number;
    isShuffle: boolean;
    isRepeat: boolean;
    toggleMusicPlayer: () => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
    setIsPlaying: (playing: boolean) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

interface BackToTopState {
    isBackToTopVisible: boolean;
    setIsBackToTopVisible: (visible: boolean) => void;
}

interface UIState {
    isMatrixEnabled: boolean;
    isMounted: boolean;
    showHobbiesModal: boolean;
    isNavbarActive: boolean;
    expandedSections: Record<string, boolean>;
    toggleMatrix: () => void;
    setIsMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    setIsNavbarActive: (active: boolean) => void;
    toggleSectionExpanded: (section: string) => void;
}

interface AnimeState {
    animeSelectedItem: AnimeItem | null;
    animeSelectedTag: string | null;
    setAnimeSelectedItem: (item: AnimeItem | null) => void;
    setAnimeSelectedTag: (tag: string | null) => void;
}

interface HobbyState {
    hobbySelectedItem: Hobby | null;
    setHobbySelectedItem: (item: Hobby | null) => void;
}

interface SearchState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

interface BookState {
    bookSelectedItem: Book | null;
    setBookSelectedItem: (item: Book | null) => void;
}

interface RandomizerState {
    randomItemIndex: number | null;
    isRandomizing: boolean;
    setRandomItemIndex: (index: number | null) => void;
    setIsRandomizing: (isRandomizing: boolean) => void;
}

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: TodoItem[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearTodos: () => void;
}

interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

interface GuestbookState {
    guestbookEntries: GuestbookEntry[];
    addGuestbookEntry: (entry: GuestbookEntry) => void;
}

export interface AppState extends TerminalState, MusicState, BackToTopState, UIState, AnimeState, HobbyState, BookState, SearchState, RandomizerState, TodoState, GuestbookState { }

export const useStore = create<AppState>()(persist((set) => ({
    // Terminal
    lines: [],
    history: [],
    historyIndex: -1,
    input: '',
    isIntroDone: false,
    passwordMode: false,
    isExpanded: true,
    position: { x: 0, y: 0 },
    isDragging: false,
    setLines: (lines) => set((state) => ({
        lines: typeof lines === 'function' ? lines(state.lines) : lines
    })),
    addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
    clearLines: () => set({ lines: [] }),
    setHistory: (history) => set((state) => ({
        history: typeof history === 'function' ? history(state.history) : history
    })),
    addToHistory: (cmd) => set((state) => ({ history: [cmd, ...state.history] })),
    setHistoryIndex: (index) => set({ historyIndex: index }),
    setInput: (input) => set({ input }),
    setIsIntroDone: (done) => set({ isIntroDone: done }),
    setPasswordMode: (mode) => set({ passwordMode: mode }),
    setIsExpanded: (expanded) => set({ isExpanded: expanded }),
    setPosition: (pos) => set({ position: pos }),
    setIsDragging: (dragging) => set({ isDragging: dragging }),

    // Music
    showMusicPlayer: false,
    isPlaying: false,
    volume: 1.0,
    isMuted: false,
    currentTrackIndex: 0,
    isShuffle: false,
    isRepeat: false,
    toggleMusicPlayer: () => set((state) => ({ showMusicPlayer: !state.showMusicPlayer })),
    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
    toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setVolume: (volume) => set({ volume }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    nextTrack: () => set((state) => ({
        currentTrackIndex: (state.currentTrackIndex + 1)
    })),
    prevTrack: () => set((state) => ({
        currentTrackIndex: state.currentTrackIndex - 1
    })),

    // Back to Top
    isBackToTopVisible: false,
    setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),

    // UI
    isMatrixEnabled: true,
    isMounted: false,
    showHobbiesModal: false,
    isNavbarActive: false,
    expandedSections: {
        experience: true,
        techstack: true,
        contact: true
    },
    toggleMatrix: () => set((state) => ({ isMatrixEnabled: !state.isMatrixEnabled })),
    setIsMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    toggleSectionExpanded: (section) => set((state) => ({
        expandedSections: {
            ...state.expandedSections,
            [section]: !state.expandedSections[section]
        }
    })),

    // Anime
    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),

    // Hobby
    hobbySelectedItem: null,
    setHobbySelectedItem: (item) => set({ hobbySelectedItem: item }),

    // Search
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Book
    bookSelectedItem: null,
    setBookSelectedItem: (item) => set({ bookSelectedItem: item }),

    // Randomizer
    randomItemIndex: null,
    isRandomizing: false,
    setRandomItemIndex: (index) => set({ randomItemIndex: index }),
    setIsRandomizing: (isRandomizing) => set({ isRandomizing: isRandomizing }),

    // Todo
    todos: [],
    addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Math.random().toString(36).substr(2, 9), text, completed: false }]
    })),
    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id)
    })),
    clearTodos: () => set({ todos: [] }),

    // Guestbook
    guestbookEntries: [],
    addGuestbookEntry: (entry) => set((state) => ({
        guestbookEntries: [entry, ...state.guestbookEntries]
    })),
}), {
    name: 'adarsh-storage',
    partialize: (state) => ({
        expandedSections: state.expandedSections,
        todos: state.todos,
        volume: state.volume,
        isMuted: state.isMuted,
        isMatrixEnabled: state.isMatrixEnabled,
        guestbookEntries: state.guestbookEntries
    }),
}));
