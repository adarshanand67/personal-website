/**
 * @fileoverview Utility state slice for Zustand store.
 * Manages todos and guestbook entries.
 */

import { StateCreator } from 'zustand';
import { AppState, TodoState, GuestbookState } from '../types';

/**
 * Creates the utility state slice.
 * Handles todo list and guestbook functionality.
 * 
 * @param {Function} set - Zustand set function
 * @returns {TodoState & GuestbookState} Utility state slice
 */
export const createUtilitySlice: StateCreator<AppState, [], [], TodoState & GuestbookState> = (set) => ({
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
    guestbookEntries: [],
    addGuestbookEntry: (entry) => set((state) => ({
        guestbookEntries: [entry, ...state.guestbookEntries]
    })),
});
