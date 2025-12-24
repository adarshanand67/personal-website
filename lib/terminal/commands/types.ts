import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type ThemeMode = 'light' | 'dark' | 'system';
export type CommandCategory = 'navigation' | 'utility';
export type CommandArgs = readonly string[];

export interface CommandContext {
    setLines: Dispatch<SetStateAction<string[]>>;
    setPasswordMode: (mode: boolean) => void;
    router: AppRouterInstance;
    setTheme: (theme: ThemeMode) => void;
    setInput: (input: string) => void;
    history: readonly string[];
    todos: any[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    clearTodos: () => void;
    toggleMatrix?: () => void;
}

export type CommandFn = (args: CommandArgs, context: CommandContext, input?: string) => void | Promise<void>;

export interface Command {
    readonly name: string;
    readonly description: string;
    readonly category?: CommandCategory;
    readonly usage?: string;
    readonly execute: CommandFn;
}
