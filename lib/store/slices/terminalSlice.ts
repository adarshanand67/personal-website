/**
 * @fileoverview Terminal state slice for Zustand store.
 * Manages terminal emulator state including lines, history, and UI state.
 */

import { StateCreator } from 'zustand';
import { AppState, TerminalState } from '../types';

/**
 * Creates the terminal state slice.
 * Provides state and actions for the interactive terminal component.
 * 
 * @param {Function} set - Zustand set function
 * @returns {TerminalState} Terminal state slice
 */
export const createTerminalSlice: StateCreator<AppState, [], [], TerminalState> = (set) => ({
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
});
