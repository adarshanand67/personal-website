import { Dispatch, SetStateAction } from 'react';
export interface CommandContext {
    setLines: Dispatch<SetStateAction<string[]>>;
    setPasswordMode: (mode: boolean) => void;
    router: any;
    setTheme: (theme: ThemeMode) => void;
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    setIsPlaying: (playing: boolean) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    toggleMute: () => void;
    setInput: (input: string) => void;
    commandHistory: readonly string[];
    toggleMusicPlayer: () => void;
    setShowMusicPlayer: (show: boolean) => void;

}
export type CommandArgs = readonly string[];
export type CommandFn = (
    args: CommandArgs,
    context: CommandContext,
    input?: string
) => void | Promise<void>;
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
export interface Command {
    readonly name: string;
    readonly description: string;
    readonly category?: CommandCategory;
    readonly aliases?: readonly string[];
    readonly usage?: string;
    readonly examples?: readonly string[];
    readonly execute: CommandFn;
}
export type CommandRegistry = Readonly<Record<string, Command>>;
export type ThemeMode = 'light' | 'dark' | 'system';
export interface ThemeConfig {
    readonly mode: ThemeMode;
    readonly primaryColor: string;
    readonly backgroundColor: string;
    readonly textColor: string;
}
export type FileType = 'file' | 'directory';
export type FilePermissions = string;
export interface MockFile {
    readonly type: 'file';
    readonly size: number;
    readonly permissions: FilePermissions;
    readonly owner: string;
    readonly group: string;
    readonly modified: string;
    readonly content: readonly string[];
}
export interface MockDirectory {
    readonly type: 'directory';
    readonly size: number;
    readonly permissions: FilePermissions;
    readonly owner: string;
    readonly group: string;
    readonly modified: string;
}
export type MockFileSystemEntry = MockFile | MockDirectory;
export type MockFileSystem = Readonly<Record<string, MockFile>>;
export interface LsOptions {
    readonly longFormat: boolean;
    readonly showHidden: boolean;
    readonly humanReadable?: boolean;
    readonly sortByTime?: boolean;
    readonly reverseOrder?: boolean;
}
export interface GrepOptions {
    readonly caseInsensitive: boolean;
    readonly showLineNumbers: boolean;
    readonly invertMatch: boolean;
    readonly recursive: boolean;
    readonly count?: boolean;
    readonly filesWithMatches?: boolean;
}
export interface DateOptions {
    readonly utc: boolean;
    readonly iso: boolean;
    readonly rfc: boolean;
    readonly format?: string;
}
export interface TarOptions {
    readonly extract: boolean;
    readonly create: boolean;
    readonly gzip: boolean;
    readonly verbose: boolean;
    readonly filename?: string;
}
export interface PsOptions {
    readonly showAll: boolean;
    readonly fullFormat: boolean;
    readonly forest?: boolean;
}
export interface GitOptions {
    readonly oneline?: boolean;
    readonly all?: boolean;
    readonly verbose?: boolean;
    readonly limit?: number;
}
export interface TerminalLine {
    readonly id: string;
    readonly content: string;
    readonly timestamp: Date;
    readonly type: 'input' | 'output' | 'error';
}
export interface TerminalState {
    readonly lines: readonly string[];
    readonly input: string;
    readonly history: readonly string[];
    readonly historyIndex: number;
    readonly isPasswordMode: boolean;
    readonly isMatrixEnabled: boolean;
    readonly currentTheme: ThemeMode;
}
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
export interface MusicTrack {
    readonly id: string;
    readonly title: string;
    readonly artist?: string;
    readonly url: string;
    readonly duration?: number;
}
export interface MusicPlayerState {
    readonly isPlaying: boolean;
    readonly isMuted: boolean;
    readonly currentTrackIndex: number;
    readonly volume: number;
    readonly playlist: readonly MusicTrack[];
}
export interface FlagParseResult {
    readonly hasFlags: Readonly<Record<string, boolean>>;
    readonly nonFlagArgs: readonly string[];
}
export interface ValidationResult {
    readonly isValid: boolean;
    readonly error?: string;
}
export type NumberValidationResult = number | null;
export type FileContentResult = readonly string[] | null;
export type DirectoryMap = Readonly<Record<string, string>>;
export interface RouteConfig {
    readonly HOME: string;
    readonly BLOG_SHELF: string;
    readonly PAPER_SHELF: string;
    readonly BOOK_SHELF: string;
    readonly ANIME_SHELF: string;
    readonly HOBBY_SHELF: string;
}
export interface SystemInfo {
    readonly os: string;
    readonly host: string;
    readonly kernel: string;
    readonly uptime: string;
    readonly shell: string;
    readonly theme: string;
    readonly matrix: boolean;
}
export interface ContactInfo {
    readonly email: string;
    readonly linkedin: string;
    readonly github: string;
    readonly twitter?: string;
    readonly website?: string;
}
export interface UserInfo {
    readonly user: string;
    readonly role: string;
    readonly expertise: string;
    readonly status: string;
}
export type CommandErrorType =
    | 'INVALID_ARGS'
    | 'PERMISSION_DENIED'
    | 'FILE_NOT_FOUND'
    | 'COMMAND_NOT_FOUND'
    | 'SYNTAX_ERROR'
    | 'NETWORK_ERROR';
export interface CommandError {
    readonly type: CommandErrorType;
    readonly message: string;
    readonly command: string;
    readonly args?: readonly string[];
}
export type {
    Dispatch,
    SetStateAction,
};
