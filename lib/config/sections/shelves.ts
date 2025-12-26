/**
 * @fileoverview Shelf configurations for content pages.
 * Defines metadata and settings for each content shelf (books, anime, articles, etc.).
 */

import { ShelfType } from "@/types/definitions";

/**
 * Configuration interface for a content shelf.
 * @interface ShelfConfig
 * @property {string} title - Display title for the shelf
 * @property {string} description - Shelf description
 * @property {string} command - Terminal-style command representation
 * @property {string} searchPlaceholder - Placeholder text for search input
 * @property {ShelfType} type - Type of shelf content
 */
export interface ShelfConfig {
    title: string;
    description: string;
    command: string;
    searchPlaceholder: string;
    type: ShelfType;
}

/**
 * Shelf configurations mapped by shelf key.
 * Contains settings for all content shelves in the application.
 * @constant
 */
export const shelfConfigs: Record<string, ShelfConfig> = {
    books: {
        title: "Bookshelf",
        description: "A curated collection of books I've read and recommend.",
        command: "ls ~/books",
        searchPlaceholder: "Search books...",
        type: ShelfType.Book,
    },
    articles: {
        title: "Articles",
        description: "Research papers and thoughts on technology.",
        command: "ls ~/articles",
        searchPlaceholder: "Search articles...",
        type: ShelfType.Article,
    },
    anime: {
        title: "Animeshelf",
        description: "Anime series I've watched and enjoyed.",
        command: "ls ~/anime",
        searchPlaceholder: "Search anime & movies...",
        type: ShelfType.Anime,
    },
    blogs: {
        title: "Blogshelf",
        description: "Thoughts, tutorials, and insights on technology.",
        command: 'find ~/blog -type f -name "*.md"',
        searchPlaceholder: "Search blogs...",
        type: ShelfType.Blog,
    },

    hobby: {
        title: "HobbyShelf",
        description: "What I do when I'm not coding.",
        command: "ls -la ~/freetime",
        searchPlaceholder: "Search hobby...",
        type: ShelfType.Hobby,
    },
};
