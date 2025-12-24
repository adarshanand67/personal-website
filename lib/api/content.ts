import {
    profileData,
    experiencesData,
    papersData,
    booksData,
    animeData,
    hobbyData,
} from "@/data";
import { AnimeItem, AnimeType, WatchStatus } from "@/types/definitions";
import { getBlogs } from "./blogs";

export const getProfile = async () => profileData;
export const getExperiences = async () => experiencesData;
export const getPapers = async () => papersData;
export const getBooks = async () => booksData;
export const getProjects = async () => [];
export const getHobby = async () => hobbyData;

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
        rating: item.rating
    }));

export const getArticles = async () => {
    const blogs = await getBlogs();
    const papers = await getPapers();
    return [...papers, ...blogs];
};
