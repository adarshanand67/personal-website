"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { AnimeItem, Hobby, Book } from "@/types/definitions";
import { tracks } from "@/lib/constants";

// ============================================================================
// Types
// ============================================================================

export interface TerminalState {
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

export interface MusicState {
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
  setCurrentTrack: (index: number) => void;
  currentTime: number;
  duration: number;
  seekTime: number | null;
  setProgress: (currentTime: number, duration: number) => void;
  requestSeek: (time: number | null) => void;
}

export interface BackToTopState {
  isBackToTopVisible: boolean;
  setIsBackToTopVisible: (visible: boolean) => void;
}

export interface UIState {
  isMounted: boolean;
  showHobbiesModal: boolean;
  isNavbarActive: boolean;
  heroViewMode: "profile" | "terminal";
  expandedSections: Record<string, boolean>;
  setIsMounted: (mounted: boolean) => void;
  toggleHobbiesModal: () => void;
  setIsNavbarActive: (active: boolean) => void;
  setHeroViewMode: (mode: "profile" | "terminal") => void;
  toggleSectionExpanded: (section: string) => void;
}

export interface CollectionState {
  animeSelectedItem: AnimeItem | null;
  collectionSelectedTag: string | null;
  setAnimeSelectedItem: (item: AnimeItem | null) => void;
  setCollectionSelectedTag: (tag: string | null) => void;
}

export interface HobbyState {
  hobbySelectedItem: Hobby | null;
  setHobbySelectedItem: (item: Hobby | null) => void;
}

export interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface BookState {
  bookSelectedItem: Book | null;
  setBookSelectedItem: (item: Book | null) => void;
}

export interface RandomizerState {
  randomItemIndex: number | null;
  isRandomizing: boolean;
  setRandomItemIndex: (index: number | null) => void;
  setIsRandomizing: (isRandomizing: boolean) => void;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearTodos: () => void;
}

export interface AppState
  extends TerminalState,
    MusicState,
    BackToTopState,
    UIState,
    CollectionState,
    HobbyState,
    BookState,
    SearchState,
    RandomizerState,
    TodoState {}

// ============================================================================
// State Creators
// ============================================================================

const createTerminalSlice: StateCreator<AppState, [], [], TerminalState> = (
  set,
) => ({
  lines: [],
  history: [],
  historyIndex: -1,
  input: "",
  isIntroDone: false,
  passwordMode: false,
  isExpanded: true,
  position: { x: 0, y: 0 },
  isDragging: false,
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
});

const createMusicSlice: StateCreator<AppState, [], [], MusicState> = (set) => ({
  showMusicPlayer: false,
  isPlaying: false,
  volume: 1.0,
  isMuted: false,
  currentTrackIndex: 0,
  isShuffle: false,
  isRepeat: false,
  toggleMusicPlayer: () =>
    set((state) => ({ showMusicPlayer: !state.showMusicPlayer })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  nextTrack: () =>
    set((state) => {
      if (state.isShuffle) {
        const nextIndex = Math.floor(Math.random() * tracks.length);
        return { currentTrackIndex: nextIndex };
      }
      return {
        currentTrackIndex: (state.currentTrackIndex + 1) % tracks.length,
      };
    }),
  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        (state.currentTrackIndex - 1 + tracks.length) % tracks.length,
    })),
  setCurrentTrack: (index) =>
    set({ currentTrackIndex: index, isPlaying: true }),
  currentTime: 0,
  duration: 0,
  seekTime: null,
  setProgress: (currentTime, duration) => set({ currentTime, duration }),
  requestSeek: (time) => set({ seekTime: time }),
});

const createUISlice: StateCreator<
  AppState,
  [],
  [],
  UIState & BackToTopState
> = (set) => ({
  isMounted: false,
  showHobbiesModal: false,
  isNavbarActive: false,
  heroViewMode: "profile",
  expandedSections: { experience: true, techstack: true, contact: true },
  isBackToTopVisible: false,
  setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),
  setIsMounted: (mounted) => set({ isMounted: mounted }),
  toggleHobbiesModal: () =>
    set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
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

const createContentSlice: StateCreator<
  AppState,
  [],
  [],
  CollectionState & HobbyState & BookState & SearchState & RandomizerState
> = (set) => ({
  animeSelectedItem: null,
  collectionSelectedTag: null,
  setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
  setCollectionSelectedTag: (tag) => set({ collectionSelectedTag: tag }),
  hobbySelectedItem: null,
  setHobbySelectedItem: (item) => set({ hobbySelectedItem: item }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  bookSelectedItem: null,
  setBookSelectedItem: (item) => set({ bookSelectedItem: item }),
  randomItemIndex: null,
  isRandomizing: false,
  setRandomItemIndex: (index) => set({ randomItemIndex: index }),
  setIsRandomizing: (isRandomizing) => set({ isRandomizing }),
});

const createUtilitySlice: StateCreator<AppState, [], [], TodoState> = (
  set,
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
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  clearTodos: () => set({ todos: [] }),
});

// ============================================================================
// Store
// ============================================================================

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
      }),
    },
  ),
);
