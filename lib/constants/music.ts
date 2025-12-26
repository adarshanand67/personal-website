/**
 * @fileoverview Music player constants - playlist tracks with rich metadata.
 */
import { basePath } from "./base";

/**
 * Track interface definition.
 */
export interface Track {
    title: string;
    artist: string;
    image: string;
    src: string;
}

/**
 * Music playlist - array of track objects for the music player.
 * @constant
 */
export const tracks: Track[] = [
    {
        title: "The World",
        artist: "Death Note",
        image: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
        src: `${basePath}/assets/music/theWorld.mp3`,
    },
    {
        title: "A Cruel Angel's Thesis",
        artist: "Neon Genesis Evangelion",
        image: "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
        src: `${basePath}/assets/music/cruelAngelsThesis.mp3`,
    },
    {
        title: "THE HERO!!",
        artist: "One Punch Man",
        image: "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
        src: `${basePath}/assets/music/onePunchMan.mp3`,
    },
    {
        title: "Pokemon Theme",
        artist: "Pokémon",
        image: "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
        src: `${basePath}/assets/music/pokemonTheme.mp3`,
    },
    {
        title: "Tank!",
        artist: "Cowboy Bebop",
        image: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
        src: `${basePath}/assets/music/tank.mp3`,
    },
    {
        title: "Unravel",
        artist: "Tokyo Ghoul",
        image: "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
        src: `${basePath}/assets/music/unravel.mp3`,
    },
    {
        title: "Blue Bird",
        artist: "Naruto Shippuden",
        image: "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
        src: `${basePath}/assets/music/blueBird.mp3`,
    },
    {
        title: "GO!!!",
        artist: "Naruto",
        image: "https://cdn.myanimelist.net/images/anime/1141/142502l.jpg",
        src: `${basePath}/assets/music/go.mp3`,
    },
    {
        title: "Guren no Yumiya",
        artist: "Attack on Titan",
        image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
        src: `${basePath}/assets/music/gurenNoYumiya.mp3`,
    },
];

// Legacy exports for backward compatibility if needed during migration
export const playlist = tracks.map((t) => t.src);
export const trackNames = tracks.map((t) => t.title);
export const trackImages = tracks.map((t) => t.image);
