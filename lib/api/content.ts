/**
 * @fileoverview Content API - data fetching functions for all content types.
 * Provides async functions to retrieve profile, experiences, papers, books, anime, and articles.
 */

import { profileData, experiencesData, papersData, booksData, animeData, hobbyData } from "@/data";
import { AnimeItem, AnimeType, WatchStatus } from "@/types/definitions";
import { getBlogs } from "./blogs";

/** Fetches profile data. */
export const getProfile = async () => profileData;

/** Fetches work experience data. */
export const getExperiences = async () => experiencesData;

/** Fetches research papers data. */
export const getPapers = async () => papersData;

/** Fetches books data. */
export const getBooks = async () => booksData;

/** Fetches projects data (currently empty). */
export const getProjects = async () => [];

/** Fetches hobby data. */
export const getHobby = async () => hobbyData;

/**
 * Fetches anime/movie data with proper type casting.
 * @returns {Promise<AnimeItem[]>} Array of anime items
 */
export const getAnime = async (): Promise<AnimeItem[]> =>
    (animeData as AnimeItem[]).map((item) => ({
        ...item,
        type: item.type as AnimeType,
        status: item.status as WatchStatus,
        image: item.image,
        seasons: item.seasons,
        recommended: item.recommended,
        description: item.description,
        tags: item.tags,
        year: item.year,
        rating: item.rating,
    }));

/**
 * Fetches all articles (blogs + papers combined).
 * @returns {Promise<Array>} Combined array of blogs and papers
 */
export const getArticles = async () => {
    const blogs = await getBlogs();
    const papers = await getPapers();
    return [...papers, ...blogs];
};
