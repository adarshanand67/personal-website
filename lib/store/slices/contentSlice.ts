/**
 * @fileoverview Content state slice for Zustand store.
 * Manages content selection state for anime, books, hobbies, and search.
 */

import { StateCreator } from 'zustand';
import { AppState, AnimeState, HobbyState, BookState, SearchState, RandomizerState } from '../types';

/**
 * Creates the content state slice.
 * Handles state for content shelves (anime, books, hobbies) and search functionality.
 * 
 * @param {Function} set - Zustand set function
 * @returns {AnimeState & HobbyState & BookState & SearchState & RandomizerState} Content state slice
 */
export const createContentSlice: StateCreator<AppState, [], [], AnimeState & HobbyState & BookState & SearchState & RandomizerState> = (set) => ({
    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),
    hobbySelectedItem: null,
    setHobbySelectedItem: (item) => set({ hobbySelectedItem: item }),
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),
    bookSelectedItem: null,
    setBookSelectedItem: (item) => set({ bookSelectedItem: item }),
    randomItemIndex: null,
    isRandomizing: false,
    setRandomItemIndex: (index) => set({ randomItemIndex: index }),
    setIsRandomizing: (isRandomizing) => set({ isRandomizing }),
});
