/** Content state slice for anime, books, hobbies, and search. */

import { StateCreator } from "zustand";
import {
    AppState,
    AnimeState,
    HobbyState,
    BookState,
    SearchState,
    RandomizerState,
} from "../types";

/** Creates the content state slice for content shelves and search. */
export const createContentSlice: StateCreator<
    AppState,
    [],
    [],
    AnimeState & HobbyState & BookState & SearchState & RandomizerState
> = (set) => ({
    animeSelectedItem: null,
    animeSelectedTag: null,
    setAnimeSelectedItem: (item) => set({ animeSelectedItem: item }),
    setAnimeSelectedTag: (tag) => set({ animeSelectedTag: tag }),
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
