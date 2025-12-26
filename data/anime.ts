/**
 * @fileoverview Anime and movie collection data entry point.
 * Consolidates data from modular sub-files.
 */

import { completedAnime } from "./anime/completed";
import { planningAnime } from "./anime/planning";
import { planningMovies } from "./anime/movies";

/**
 * Consolidated array of all anime and movie data.
 * Used by the shelf components for rendering.
 */
export const animeData = [...completedAnime, ...planningAnime, ...planningMovies];
