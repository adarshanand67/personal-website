import { siteConfig } from "@/config";
import { CONFIG } from "./config";

// Re-export for backward compatibility
export const BASE_PATH = CONFIG.BASE_PATH;

export const PLAYLIST = [
    `${BASE_PATH}/assets/music/cruel_angels_thesis.mp3`,
    `${BASE_PATH}/assets/music/one_punch_man.mp3`,
    `${BASE_PATH}/assets/music/pokemon_theme.mp3`,
    `${BASE_PATH}/assets/music/tank.mp3`,
    `${BASE_PATH}/assets/music/unravel.mp3`,
    `${BASE_PATH}/assets/music/battlecry.mp3`,
    `${BASE_PATH}/assets/music/blue_bird.mp3`,
    `${BASE_PATH}/assets/music/go.mp3`,
    `${BASE_PATH}/assets/music/the_world.mp3`,
    `${BASE_PATH}/assets/music/guren_no_yumiya.mp3`
] as const;

export const TRACK_NAMES = [
    "A Cruel Angel's Thesis (Evangelion)",
    "THE HERO!! (One Punch Man)",
    "Pokemon Theme (Instrumental)",
    "Tank! (Cowboy Bebop)",
    "Unravel (Tokyo Ghoul)",
    "Battlecry (Samurai Champloo)",
    "Blue Bird (Naruto)",
    "GO!!! (Naruto)",
    "The World (Death Note)",
    "Guren no Yumiya (Attack on Titan)",
] as const;

export const TRACK_IMAGES = [
    "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg", // Neon Genesis Evangelion
    "https://cdn.myanimelist.net/images/anime/12/76049l.jpg", // One Punch Man
    "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg", // Pokémon
    "https://cdn.myanimelist.net/images/anime/4/19644l.jpg", // Cowboy Bebop
    "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg", // Tokyo Ghoul
    "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg", // Samurai Champloo (using placeholder)
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg", // Naruto
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg", // Naruto
    "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg", // Death Note
    "https://cdn.myanimelist.net/images/anime/10/47347l.jpg", // Attack on Titan
] as const;

export const INTRO_LINES = (toLeet: (t: string) => string) => [
    `> ./${siteConfig.author.name.toLowerCase().replace(' ', '_')}_profile.sh`,
    "> Initializing SDE protocol...",
    "> Loading modules: C++, Make, Git...",
    `> Access granted :${toLeet("Type 'help' for commands.")}`,
] as const;

export const DIRECTORIES = ["blogs", "papers", "books", "anime", "HobbyShelf"] as const;

export const ROUTES = {
    HOME: "/",
    BLOG_SHELF: "/blogshelf",
    PAPER_SHELF: "/papershelf",
    BOOK_SHELF: "/bookshelf",
    ANIME_SHELF: "/animeshelf",
    HOBBY_SHELF: "/HobbyShelf", // CamelCase as requested
} as const;

export const DIRECTORY_MAP: Record<string, string> = {
    blog: ROUTES.BLOG_SHELF,
    blogs: ROUTES.BLOG_SHELF,
    paper: ROUTES.PAPER_SHELF,
    papers: ROUTES.PAPER_SHELF,
    book: ROUTES.BOOK_SHELF,
    books: ROUTES.BOOK_SHELF,
    anime: ROUTES.ANIME_SHELF,
    animes: ROUTES.ANIME_SHELF,
    hobby: ROUTES.HOBBY_SHELF,
    hobbies: ROUTES.HOBBY_SHELF,
    HobbyShelf: ROUTES.HOBBY_SHELF,
    home: ROUTES.HOME,
    "~": ROUTES.HOME,
    ".": ROUTES.HOME,
};

// Contact info from config
export const CONTACT_INFO = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`
] as const;

export const SYSTEM_STATS = (isMatrix: boolean) => [
    `       ${siteConfig.name}'s Portfolio`,
    "       ------------------",
    "OS:     Mac OS X (simulated)",
    "Host:   Personal Website",
    "Kernel: Next.js 16",
    "Uptime: Forever",
    "Shell:  Zsh (React)",
    "Theme:  Cyberpunk",
    `Matrix: ${isMatrix ? "Active" : "Disabled"}`
] as const;

// Whoami info from config
export const WHOAMI_INFO = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`
] as const;
