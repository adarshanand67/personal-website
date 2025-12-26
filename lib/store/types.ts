/**
 * @fileoverview Zustand store type definitions.
 * Defines all state interfaces and their methods for the application store.
 */

import { AnimeItem, Hobby, Book } from "@/types/definitions";

/**
 * Terminal state interface - manages terminal emulator state.
 * @interface TerminalState
 * @property {string[]} lines - Array of terminal output lines
 * @property {string[]} history - Command history array
 * @property {number} historyIndex - Current position in command history
 * @property {string} input - Current input value
 * @property {boolean} isIntroDone - Whether intro animation has completed
 * @property {boolean} passwordMode - Whether input is masked (password mode)
 * @property {boolean} isExpanded - Whether terminal is expanded/visible
 * @property {{x: number, y: number}} position - Terminal window position
 * @property {boolean} isDragging - Whether terminal is being dragged
 * @property {Function} setLines - Set terminal output lines
 * @property {Function} addLine - Add single line to terminal output
 * @property {Function} clearLines - Clear all terminal output
 * @property {Function} setHistory - Set command history
 * @property {Function} addToHistory - Add command to history
 * @property {Function} setHistoryIndex - Set current history index
 * @property {Function} setInput - Set current input value
 * @property {Function} setIsIntroDone - Set intro completion status
 * @property {Function} setPasswordMode - Toggle password mode
 * @property {Function} setIsExpanded - Toggle terminal expanded state
 * @property {Function} setPosition - Set terminal window position
 * @property {Function} setIsDragging - Set dragging state
 */
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

/**
 * Music player state interface.
 * @interface MusicState
 * @property {boolean} showMusicPlayer - Whether music player is visible
 * @property {boolean} isPlaying - Whether music is currently playing
 * @property {number} volume - Volume level (0-1)
 * @property {boolean} isMuted - Whether audio is muted
 * @property {number} currentTrackIndex - Index of current track in playlist
 * @property {boolean} isShuffle - Whether shuffle mode is enabled
 * @property {boolean} isRepeat - Whether repeat mode is enabled
 * @property {Function} toggleMusicPlayer - Toggle music player visibility
 * @property {Function} toggleShuffle - Toggle shuffle mode
 * @property {Function} toggleRepeat - Toggle repeat mode
 * @property {Function} setIsPlaying - Set playing state
 * @property {Function} setVolume - Set volume level
 * @property {Function} toggleMute - Toggle mute state
 * @property {Function} nextTrack - Skip to next track
 * @property {Function} prevTrack - Go to previous track
 */
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
}

/**
 * Back to top button state interface.
 * @interface BackToTopState
 * @property {boolean} isBackToTopVisible - Whether back-to-top button is visible
 * @property {Function} setIsBackToTopVisible - Set button visibility
 */
export interface BackToTopState {
    isBackToTopVisible: boolean;
    setIsBackToTopVisible: (visible: boolean) => void;
}

/**
 * UI state interface - manages general UI state.
 * @interface UIState
 * @property {boolean} isMounted - Whether component is mounted (SSR safety)
 * @property {boolean} showHobbiesModal - Whether hobbies modal is visible
 * @property {boolean} isNavbarActive - Whether mobile navbar is active
 * @property {Record<string, boolean>} expandedSections - Map of section IDs to expanded state
 * @property {Function} setIsMounted - Set mounted state
 * @property {Function} toggleHobbiesModal - Toggle hobbies modal visibility
 * @property {Function} setIsNavbarActive - Set mobile navbar active state
 * @property {Function} toggleSectionExpanded - Toggle section expanded state
 */
export interface UIState {
    isMounted: boolean;
    showHobbiesModal: boolean;
    isNavbarActive: boolean;
    expandedSections: Record<string, boolean>;
    setIsMounted: (mounted: boolean) => void;
    toggleHobbiesModal: () => void;
    setIsNavbarActive: (active: boolean) => void;
    toggleSectionExpanded: (section: string) => void;
}

/**
 * Anime shelf state interface.
 * @interface AnimeState
 * @property {AnimeItem|null} animeSelectedItem - Currently selected anime item
 * @property {string|null} animeSelectedTag - Currently selected filter tag
 * @property {Function} setAnimeSelectedItem - Set selected anime item
 * @property {Function} setAnimeSelectedTag - Set selected filter tag
 */
export interface AnimeState {
    animeSelectedItem: AnimeItem | null;
    animeSelectedTag: string | null;
    setAnimeSelectedItem: (item: AnimeItem | null) => void;
    setAnimeSelectedTag: (tag: string | null) => void;
}

/**
 * Hobby shelf state interface.
 * @interface HobbyState
 * @property {Hobby|null} hobbySelectedItem - Currently selected hobby item
 * @property {Function} setHobbySelectedItem - Set selected hobby item
 */
export interface HobbyState {
    hobbySelectedItem: Hobby | null;
    setHobbySelectedItem: (item: Hobby | null) => void;
}

/**
 * Search state interface.
 * @interface SearchState
 * @property {string} searchQuery - Current search query string
 * @property {Function} setSearchQuery - Set search query
 */
export interface SearchState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

/**
 * Book shelf state interface.
 * @interface BookState
 * @property {Book|null} bookSelectedItem - Currently selected book item
 * @property {Function} setBookSelectedItem - Set selected book item
 */
export interface BookState {
    bookSelectedItem: Book | null;
    setBookSelectedItem: (item: Book | null) => void;
}

/**
 * Randomizer state interface - for random item selection.
 * @interface RandomizerState
 * @property {number|null} randomItemIndex - Index of randomly selected item
 * @property {boolean} isRandomizing - Whether randomization animation is active
 * @property {Function} setRandomItemIndex - Set random item index
 * @property {Function} setIsRandomizing - Set randomizing animation state
 */
export interface RandomizerState {
    randomItemIndex: number | null;
    isRandomizing: boolean;
    setRandomItemIndex: (index: number | null) => void;
    setIsRandomizing: (isRandomizing: boolean) => void;
}

/**
 * Todo item type.
 * @interface TodoItem
 * @property {string} id - Unique todo ID
 * @property {string} text - Todo text content
 * @property {boolean} completed - Whether todo is completed
 */
export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

/**
 * Todo list state interface.
 * @interface TodoState
 * @property {TodoItem[]} todos - Array of todo items
 * @property {Function} addTodo - Add new todo
 * @property {Function} toggleTodo - Toggle todo completion status
 * @property {Function} removeTodo - Remove todo by ID
 * @property {Function} clearTodos - Clear all todos
 */
export interface TodoState {
    todos: TodoItem[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearTodos: () => void;
}

/**
 * Guestbook entry type.
 * @interface GuestbookEntry
 * @property {string} name - Visitor name
 * @property {string} message - Guestbook message
 * @property {string} timestamp - ISO timestamp string
 */
export interface GuestbookEntry {
    name: string;
    message: string;
    timestamp: string;
}

/**
 * Guestbook state interface.
 * @interface GuestbookState
 * @property {GuestbookEntry[]} guestbookEntries - Array of guestbook entries
 * @property {Function} addGuestbookEntry - Add new guestbook entry
 */
export interface GuestbookState {
    guestbookEntries: GuestbookEntry[];
    addGuestbookEntry: (entry: GuestbookEntry) => void;
}

/**
 * Combined application state - merges all state slices.
 * @interface AppState
 * @extends {TerminalState}
 * @extends {MusicState}
 * @extends {BackToTopState}
 * @extends {UIState}
 * @extends {AnimeState}
 * @extends {HobbyState}
 * @extends {BookState}
 * @extends {SearchState}
 * @extends {RandomizerState}
 * @extends {TodoState}
 * @extends {GuestbookState}
 */
export interface AppState
    extends
        TerminalState,
        MusicState,
        BackToTopState,
        UIState,
        AnimeState,
        HobbyState,
        BookState,
        SearchState,
        RandomizerState,
        TodoState,
        GuestbookState {}
