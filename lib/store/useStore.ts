import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { playlist } from '@/lib/constants';
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

interface CursorState {
    cursorPosition: { x: number; y: number };
    isCursorVisible: boolean;
    isCursorClicking: boolean;
    isCursorPointer: boolean;
    setCursorPosition: (position: { x: number; y: number }) => void;
    setIsCursorVisible: (visible: boolean) => void;
    setIsCursorClicking: (clicking: boolean) => void;
    setIsCursorPointer: (pointer: boolean) => void;
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

interface WeatherState {
    weather: { temperature: number; isDay: boolean; weatherCode: number } | null;
    locationName: string;
    setWeather: (weather: { temperature: number; isDay: boolean; weatherCode: number } | null) => void;
    setLocationName: (name: string) => void;
}

interface BackToTopState {
    isBackToTopVisible: boolean;
    setIsBackToTopVisible: (visible: boolean) => void;
}

interface UIState {
    isMatrixEnabled: boolean;
    isMounted: boolean;
    showHobbiesModal: boolean;
    showSystemMonitor: boolean;
    isNavbarActive: boolean;
    expandedSections: Record<string, boolean>;
    toggleMatrix: () => void;
    setIsMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    toggleSystemMonitor: () => void;
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

interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

interface GuestbookState {
    guestbookEntries: GuestbookEntry[];
    addGuestbookEntry: (entry: GuestbookEntry) => void;
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

export interface AppState extends TerminalState, UIState, CursorState, MusicState, WeatherState, BackToTopState, AnimeState, HobbyState, BookState, SearchState, RandomizerState, GuestbookState, TodoState { }

export const useStore = create<AppState>()(persist((set) => ({
    lines: [],
    history: [],
    historyIndex: -1,
    input: '',
    isIntroDone: false,
    passwordMode: false,
    isExpanded: true,
    position: { x: 0, y: 0 },
    isDragging: false,
    isMatrixEnabled: true,
    isMounted: false,
    showHobbiesModal: false,
    showSystemMonitor: false,
    isNavbarActive: false,
    expandedSections: {
        'experience': true,
        'techstack': false,
        'contact': false,
        'shelves': false
    },

    // Anime state
    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),

    // Hobby state
    hobbySelectedItem: null,
    setHobbySelectedItem: (item) => set({ hobbySelectedItem: item }),

    // Search state
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Book state
    bookSelectedItem: null,
    setBookSelectedItem: (item) => set({ bookSelectedItem: item }),

    setLines: (lines) => set((state) => ({ lines: typeof lines === 'function' ? lines(state.lines) : lines })),
    addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
    clearLines: () => set({ lines: [] }),
    setHistory: (history) => set((state) => ({ history: typeof history === 'function' ? history(state.history) : history })),
    addToHistory: (cmd) => set((state) => ({ history: [...state.history, cmd], historyIndex: state.history.length + 1 })),
    setHistoryIndex: (index) => set({ historyIndex: index }),
    setInput: (input) => set({ input }),
    setIsIntroDone: (done) => set({ isIntroDone: done }),
    setPasswordMode: (mode) => set({ passwordMode: mode }),
    setIsExpanded: (expanded) => set({ isExpanded: expanded }),
    setPosition: (pos) => set({ position: pos }),
    setIsDragging: (dragging) => set({ isDragging: dragging }),
    toggleMatrix: () => set((state) => ({ isMatrixEnabled: !state.isMatrixEnabled })),
    setIsMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    toggleSystemMonitor: () => set((state) => ({ showSystemMonitor: !state.showSystemMonitor })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    toggleSectionExpanded: (section) => set((state) => ({
        expandedSections: { ...state.expandedSections, [section]: !state.expandedSections[section] }
    })),

    // Cursor state
    cursorPosition: { x: 0, y: 0 },
    isCursorVisible: false,
    isCursorClicking: false,
    isCursorPointer: false,
    setCursorPosition: (position) => set({ cursorPosition: position }),
    setIsCursorVisible: (visible) => set({ isCursorVisible: visible }),
    setIsCursorClicking: (clicking) => set({ isCursorClicking: clicking }),
    setIsCursorPointer: (pointer) => set({ isCursorPointer: pointer }),

    // Music state
    showMusicPlayer: true,
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
    setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    nextTrack: () => set((state) => {
        if (state.isShuffle) {
            let nextIndex = Math.floor(Math.random() * playlist.length);
            while (nextIndex === state.currentTrackIndex && playlist.length > 1) {
                nextIndex = Math.floor(Math.random() * playlist.length);
            }
            return { currentTrackIndex: nextIndex };
        }
        return { currentTrackIndex: (state.currentTrackIndex + 1) % playlist.length };
    }),
    prevTrack: () => set((state) => ({ currentTrackIndex: (state.currentTrackIndex - 1 + playlist.length) % playlist.length })),

    // Weather state
    weather: null,
    locationName: '',
    setWeather: (weather) => set({ weather }),
    setLocationName: (name) => set({ locationName: name }),

    // Back to top state
    isBackToTopVisible: false,
    setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),

    // Randomizer state
    randomItemIndex: null,
    isRandomizing: false,
    setRandomItemIndex: (index) => set({ randomItemIndex: index }),
    setIsRandomizing: (isRandomizing) => set({ isRandomizing }),

    // Guestbook state
    guestbookEntries: [
        { name: "System", message: "Guestbook initialized.", timestamp: new Date().toISOString() }
    ],
    addGuestbookEntry: (entry) => set((state) => ({ guestbookEntries: [entry, ...state.guestbookEntries] })),

    // Todo state
    todos: [],
    addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Math.random().toString(36).substring(7), text, completed: false }]
    })),
    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter(t => t.id !== id)
    })),
    clearTodos: () => set({ todos: [] }),
}), {
    name: 'ui-storage',
    partialize: (state) => ({
        isMatrixEnabled: state.isMatrixEnabled,
        expandedSections: state.expandedSections,
        volume: state.volume,
        isMuted: state.isMuted,
        isShuffle: state.isShuffle,
        isRepeat: state.isRepeat,
        guestbookEntries: state.guestbookEntries,
        todos: state.todos
    }),
}));
