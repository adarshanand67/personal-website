import { create } from 'zustand';
import { AnimeItem } from '@/types/definitions';

interface WeatherData {
    temperature: number;
    isDay: boolean;
    weatherCode: number;
}

interface GithubRepo {
    name: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    description: string;
}

interface TerminalState {
    lines: string[];
    history: string[];
    historyIndex: number;
    input: string;
    isIntroDone: boolean;
    isExpanded: boolean;
    passwordMode: boolean;
    position: { x: number; y: number };
    isDragging: boolean;

    // Actions
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void;
    addLine: (line: string) => void;
    clearLines: () => void;
    setHistory: (history: string[] | ((prev: string[]) => string[])) => void;
    addToHistory: (cmd: string) => void;
    setHistoryIndex: (index: number) => void;
    setInput: (input: string) => void;
    setIsIntroDone: (done: boolean) => void;
    setIsExpanded: (expanded: boolean) => void;
    setPasswordMode: (mode: boolean) => void;
    setPosition: (pos: { x: number; y: number }) => void;
    setIsDragging: (dragging: boolean) => void;
}

interface UIState {
    // Global
    isMatrixEnabled: boolean;
    isMounted: boolean;

    // Modals & Overlays
    showHobbiesModal: boolean;
    showMusicPlayer: boolean;
    isNavbarActive: boolean;
    isCommandMenuOpen: boolean; // Managed by cmk internally mostly, but if we need trigger
    isBackToTopVisible: boolean;

    // Audio
    isPlaying: boolean;
    isMuted: boolean;

    // Actions
    toggleMatrix: () => void;
    setMatrix: (enabled: boolean) => void;
    setMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    setShowMusicPlayer: (show: boolean) => void;
    toggleMusicPlayer: () => void;
    setIsNavbarActive: (active: boolean) => void;
    setIsBackToTopVisible: (visible: boolean) => void;
    setIsPlaying: (playing: boolean) => void;
    toggleMute: () => void;
}

interface WidgetsState {
    // Weather
    weather: WeatherData | null;
    locationName: string;
    setWeather: (weather: WeatherData) => void;
    setLocationName: (name: string) => void;

    // GitHubStats
    githubRepos: GithubRepo[];
    isGithubExpanded: boolean;
    setGithubRepos: (repos: GithubRepo[]) => void;
    setIsGithubExpanded: (expanded: boolean) => void;
}

interface ShelvesState {
    // Universal & Uses Shelf
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    // Anime Shelf
    animeSelectedItem: AnimeItem | null;
    animeSelectedTag: string | null;
    setAnimeSelectedItem: (item: AnimeItem | null) => void;
    setAnimeSelectedTag: (tag: string | null) => void;
}

interface SectionsState {
    // Home Sections Expansion
    expandedSections: Record<string, boolean>; // key: sectionId, value: isExpanded
    setSectionExpanded: (sectionId: string, expanded: boolean) => void;
    toggleSectionExpanded: (sectionId: string) => void;
}

interface CursorState {
    cursorPosition: { x: number; y: number };
    isCursorVisible: boolean;
    isCursorClicking: boolean;
    isCursorPointer: boolean;
    setCursorPosition: (pos: { x: number; y: number }) => void;
    setIsCursorVisible: (visible: boolean) => void;
    setIsCursorClicking: (clicking: boolean) => void;
    setIsCursorPointer: (pointer: boolean) => void;
}

export interface AppState extends TerminalState, UIState, WidgetsState, ShelvesState, SectionsState, CursorState { }

export const useStore = create<AppState>((set) => ({
    // --- Terminal State ---
    lines: [],
    history: [],
    historyIndex: -1,
    input: "",
    isIntroDone: false,
    isExpanded: true,
    passwordMode: false,
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
    setIsExpanded: (expanded) => set({ isExpanded: expanded }),
    setPasswordMode: (mode) => set({ passwordMode: mode }),
    setPosition: (pos) => set({ position: pos }),
    setIsDragging: (dragging) => set({ isDragging: dragging }),

    // --- UI State ---
    isMatrixEnabled: true,
    isMounted: false,
    showHobbiesModal: false,
    showMusicPlayer: false,
    isNavbarActive: false,
    isCommandMenuOpen: false,
    isBackToTopVisible: false,
    isPlaying: false,
    isMuted: false,

    toggleMatrix: () => set((state) => ({ isMatrixEnabled: !state.isMatrixEnabled })),
    setMatrix: (enabled) => set({ isMatrixEnabled: enabled }),
    setMounted: (mounted) => set({ isMounted: mounted }),
    toggleHobbiesModal: () => set((state) => ({ showHobbiesModal: !state.showHobbiesModal })),
    setShowMusicPlayer: (show) => set({ showMusicPlayer: show }),
    toggleMusicPlayer: () => set((state) => ({ showMusicPlayer: !state.showMusicPlayer })),
    setIsNavbarActive: (active) => set({ isNavbarActive: active }),
    setIsBackToTopVisible: (visible) => set({ isBackToTopVisible: visible }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    // --- Widgets State ---
    weather: null,
    locationName: "Bengaluru",
    setWeather: (weather) => set({ weather }),
    setLocationName: (name) => set({ locationName: name }),

    githubRepos: [],
    isGithubExpanded: false,
    setGithubRepos: (repos) => set({ githubRepos: repos }),
    setIsGithubExpanded: (expanded) => set({ isGithubExpanded: expanded }),

    // --- Shelves State ---
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),

    // --- Sections State ---
    expandedSections: {},
    setSectionExpanded: (sectionId, expanded) => set((state) => ({
        expandedSections: { ...state.expandedSections, [sectionId]: expanded }
    })),
    toggleSectionExpanded: (sectionId) => set((state) => ({
        expandedSections: { ...state.expandedSections, [sectionId]: !state.expandedSections[sectionId] }
    })),

    // --- Cursor State ---
    cursorPosition: { x: -100, y: -100 },
    isCursorVisible: false,
    isCursorClicking: false,
    isCursorPointer: false,
    setCursorPosition: (pos) => set({ cursorPosition: pos }),
    setIsCursorVisible: (visible) => set({ isCursorVisible: visible }),
    setIsCursorClicking: (clicking) => set({ isCursorClicking: clicking }),
    setIsCursorPointer: (pointer) => set({ isCursorPointer: pointer }),
}));
