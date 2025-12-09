/**
 * Comprehensive Type Definitions for Terminal System
 * 
 * This file contains all type definitions used throughout the terminal system
 * with strong typing to ensure type safety across the codebase.
 */

import { Dispatch, SetStateAction } from 'react';

// ============================================================================
// Core Command Types
// ============================================================================

/**
 * Command execution context containing all available functions and state
 */
export interface CommandContext {
    /** Function to update terminal output lines */
    setLines: Dispatch<SetStateAction<string[]>>;
    /** Function to toggle password input mode */
    setPasswordMode: (mode: boolean) => void;
    /** Next.js router instance for navigation */
    router: any; // Using any for compatibility with Next.js router
    /** Function to set the theme */
    setTheme: (theme: ThemeMode) => void;
    /** Current state of Matrix effect */
    isMatrixEnabled: boolean;
    /** Function to toggle Matrix rain effect */
    toggleMatrix: () => void;
    /** Function to control music playback */
    setIsPlaying: (playing: boolean) => void;
    /** Function to skip to next track */
    nextTrack: () => void;
    /** Function to go to previous track */
    prevTrack: () => void;
    /** Function to toggle mute */
    toggleMute: () => void;
    /** Function to update input field */
    setInput: (input: string) => void;
    /** Array of previously executed commands */
    commandHistory: readonly string[];
}

/**
 * Command line arguments (array of strings)
 */
export type CommandArgs = readonly string[];

/**
 * Command execution function signature
 */
export type CommandFn = (
    args: CommandArgs,
    context: CommandContext
) => void | Promise<void>;

/**
 * Command category for organization
 */
export type CommandCategory =
    | 'navigation'
    | 'system'
    | 'file'
    | 'text'
    | 'network'
    | 'dev'
    | 'fun'
    | 'utility'
    | 'environment'
    | 'math';

/**
 * Complete command definition
 */
export interface Command {
    /** Command name (lowercase) */
    readonly name: string;
    /** Brief description of what the command does */
    readonly description: string;
    /** Category for grouping in help */
    readonly category?: CommandCategory;
    /** Alternative names for this command */
    readonly aliases?: readonly string[];
    /** Usage syntax string */
    readonly usage?: string;
    /** Example usage strings */
    readonly examples?: readonly string[];
    /** Function to execute when command is called */
    readonly execute: CommandFn;
}

/**
 * Collection of all commands indexed by name
 */
export type CommandRegistry = Readonly<Record<string, Command>>;

// ============================================================================
// Theme Types
// ============================================================================

/**
 * Available theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme configuration
 */
export interface ThemeConfig {
    readonly mode: ThemeMode;
    readonly primaryColor: string;
    readonly backgroundColor: string;
    readonly textColor: string;
}

// ============================================================================
// File System Types
// ============================================================================

/**
 * File type in mock file system
 */
export type FileType = 'file' | 'directory';

/**
 * File permissions string (e.g., "-rw-r--r--")
 */
export type FilePermissions = string;

/**
 * Mock file entry
 */
export interface MockFile {
    readonly type: 'file';
    readonly size: number;
    readonly permissions: FilePermissions;
    readonly owner: string;
    readonly group: string;
    readonly modified: string;
    readonly content: readonly string[];
}

/**
 * Mock directory entry
 */
export interface MockDirectory {
    readonly type: 'directory';
    readonly size: number;
    readonly permissions: FilePermissions;
    readonly owner: string;
    readonly group: string;
    readonly modified: string;
}

/**
 * Union type for file system entries
 */
export type MockFileSystemEntry = MockFile | MockDirectory;

/**
 * Mock file system structure
 */
export type MockFileSystem = Readonly<Record<string, MockFile>>;

// ============================================================================
// Command Option Types
// ============================================================================

/**
 * Options for ls command
 */
export interface LsOptions {
    readonly longFormat: boolean;
    readonly showHidden: boolean;
    readonly humanReadable?: boolean;
    readonly sortByTime?: boolean;
    readonly reverseOrder?: boolean;
}

/**
 * Options for grep command
 */
export interface GrepOptions {
    readonly caseInsensitive: boolean;
    readonly showLineNumbers: boolean;
    readonly invertMatch: boolean;
    readonly recursive: boolean;
    readonly count?: boolean;
    readonly filesWithMatches?: boolean;
}

/**
 * Options for date command
 */
export interface DateOptions {
    readonly utc: boolean;
    readonly iso: boolean;
    readonly rfc: boolean;
    readonly format?: string;
}

/**
 * Options for tar command
 */
export interface TarOptions {
    readonly extract: boolean;
    readonly create: boolean;
    readonly gzip: boolean;
    readonly verbose: boolean;
    readonly filename?: string;
}

/**
 * Options for ps command
 */
export interface PsOptions {
    readonly showAll: boolean;
    readonly fullFormat: boolean;
    readonly forest?: boolean;
}

/**
 * Options for git command
 */
export interface GitOptions {
    readonly oneline?: boolean;
    readonly all?: boolean;
    readonly verbose?: boolean;
    readonly limit?: number;
}

// ============================================================================
// Terminal State Types
// ============================================================================

/**
 * Terminal line entry
 */
export interface TerminalLine {
    readonly id: string;
    readonly content: string;
    readonly timestamp: Date;
    readonly type: 'input' | 'output' | 'error';
}

/**
 * Terminal state
 */
export interface TerminalState {
    readonly lines: readonly string[];
    readonly input: string;
    readonly history: readonly string[];
    readonly historyIndex: number;
    readonly isPasswordMode: boolean;
    readonly isMatrixEnabled: boolean;
    readonly currentTheme: ThemeMode;
}

/**
 * Terminal actions
 */
export type TerminalAction =
    | { type: 'ADD_LINE'; payload: string }
    | { type: 'ADD_LINES'; payload: readonly string[] }
    | { type: 'CLEAR_LINES' }
    | { type: 'SET_INPUT'; payload: string }
    | { type: 'ADD_TO_HISTORY'; payload: string }
    | { type: 'SET_HISTORY_INDEX'; payload: number }
    | { type: 'TOGGLE_PASSWORD_MODE' }
    | { type: 'TOGGLE_MATRIX' }
    | { type: 'SET_THEME'; payload: ThemeMode };

// ============================================================================
// Music Player Types
// ============================================================================

/**
 * Music track information
 */
export interface MusicTrack {
    readonly id: string;
    readonly title: string;
    readonly artist?: string;
    readonly url: string;
    readonly duration?: number;
}

/**
 * Music player state
 */
export interface MusicPlayerState {
    readonly isPlaying: boolean;
    readonly isMuted: boolean;
    readonly currentTrackIndex: number;
    readonly volume: number;
    readonly playlist: readonly MusicTrack[];
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Flag parsing result
 */
export interface FlagParseResult {
    readonly hasFlags: Readonly<Record<string, boolean>>;
    readonly nonFlagArgs: readonly string[];
}

/**
 * Command validation result
 */
export interface ValidationResult {
    readonly isValid: boolean;
    readonly error?: string;
}

/**
 * Number validation result
 */
export type NumberValidationResult = number | null;

/**
 * File content result
 */
export type FileContentResult = readonly string[] | null;

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Directory mapping configuration
 */
export type DirectoryMap = Readonly<Record<string, string>>;

/**
 * Route configuration
 */
export interface RouteConfig {
    readonly HOME: string;
    readonly BLOG_SHELF: string;
    readonly PAPER_SHELF: string;
    readonly BOOK_SHELF: string;
    readonly ANIME_SHELF: string;
    readonly HOBBY_SHELF: string;
}

/**
 * System information
 */
export interface SystemInfo {
    readonly os: string;
    readonly host: string;
    readonly kernel: string;
    readonly uptime: string;
    readonly shell: string;
    readonly theme: string;
    readonly matrix: boolean;
}

/**
 * Contact information
 */
export interface ContactInfo {
    readonly email: string;
    readonly linkedin: string;
    readonly github: string;
    readonly twitter?: string;
    readonly website?: string;
}

/**
 * User information (whoami)
 */
export interface UserInfo {
    readonly user: string;
    readonly role: string;
    readonly expertise: string;
    readonly status: string;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Command error types
 */
export type CommandErrorType =
    | 'INVALID_ARGS'
    | 'PERMISSION_DENIED'
    | 'FILE_NOT_FOUND'
    | 'COMMAND_NOT_FOUND'
    | 'SYNTAX_ERROR'
    | 'NETWORK_ERROR';

/**
 * Command error
 */
export interface CommandError {
    readonly type: CommandErrorType;
    readonly message: string;
    readonly command: string;
    readonly args?: readonly string[];
}

// ============================================================================
// Export all types
// ============================================================================

export type {
    // Re-export for convenience
    Dispatch,
    SetStateAction,
};
