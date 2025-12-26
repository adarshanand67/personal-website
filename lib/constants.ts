/**
 * @fileoverview Consolidated constants for the application.
 * Includes base path, navigation routes, terminal output, music data, and skill categories.
 */

import { siteConfig } from "@/lib/config";
import { SkillCategoryName } from "@/data/enums";

// --- BASE ---

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// --- NAVIGATION ---

/** Valid directory names for content shelves. */
export const directories = ["blogs", "papers", "books", "anime", "hobby"] as const;

/**
 * Application route paths.
 * @constant
 */
export const routes = {
    home: "/",
    articleShelf: "/articleshelf",
    papers: "/articleshelf/papers",
    blogs: "/articleshelf/blogs",
    bookShelf: "/bookshelf",
    animeShelf: "/animeshelf",
    hobbyShelf: "/hobbyshelf",
    music: "/music",
} as const;

/**
 * Directory name to route path mapping.
 * Supports aliases and plural/singular variations.
 * @constant
 */
export const directoryMap: Record<string, string> = {
    blog: routes.articleShelf,
    blogs: routes.articleShelf,
    paper: routes.articleShelf,
    papers: routes.articleShelf,
    article: routes.articleShelf,
    articles: routes.articleShelf,
    book: routes.bookShelf,
    books: routes.bookShelf,
    anime: routes.animeShelf,
    animes: routes.animeShelf,
    hobby: routes.hobbyShelf,
    hobbies: routes.hobbyShelf,
    hobbyshelf: routes.hobbyShelf,
    home: routes.home,
    "~": routes.home,
    ".": routes.home,
};

// --- TERMINAL ---

/**
 * System stats for neofetch command.
 * Styled with ANSI color codes for realistic terminal look.
 */
export const systemStats = () =>
    [
        "\x1b[32m                    'c.\x1b[0m       \x1b[36mAdarsh Anand\x1b[0m@\x1b[36mmacbook-pro\x1b[0m",
        "\x1b[32m                 ,xNMM.\x1b[0m       -------------------------",
        "\x1b[32m               .OMMMMo\x1b[0m        \x1b[36mOS:\x1b[0m macOS Sonoma 14.2.1",
        "\x1b[32m               OMMM0,\x1b[0m         \x1b[36mHost:\x1b[0m MacBookPro18,3",
        "\x1b[32m     .;loddo:' loolloddol;.\x1b[0m   \x1b[36mKernel:\x1b[0m 23.2.0",
        "\x1b[32m   cKMMMMMMMMMMNWMMMMMMMMMM0:\x1b[0m \x1b[36mUptime:\x1b[0m 14 days, 2 hours, 42 mins",
        "\x1b[33m .KMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m \x1b[36mPackages:\x1b[0m 184 (brew)",
        "\x1b[33m XMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m   \x1b[36mShell:\x1b[0m zsh 5.9",
        "\x1b[31m;MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m    \x1b[36mResolution:\x1b[0m 2880x1800",
        "\x1b[31m:MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m    \x1b[36mDE:\x1b[0m Aqua",
        "\x1b[31m.MMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m    \x1b[36mWM:\x1b[0m Quartz Compositor",
        "\x1b[35m kMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m   \x1b[36mTerminal:\x1b[0m portfolio-sh",
        "\x1b[35m .XMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m  \x1b[36mCPU:\x1b[0m Apple M3 Max",
        "\x1b[35m  .XMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m  \x1b[36mGPU:\x1b[0m Apple M3 Max",
        "\x1b[35m    kMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m   \x1b[36mMemory:\x1b[0m 64GB",
        "\x1b[35m     ;KMMMMMMMWXXWMMMMMMMk.\x1b[0m",
        "\x1b[35m       .cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m",
    ] as const;

/**
 * Terminal intro lines simulating Linux boot sequence.
 * @returns {readonly string[]} Array of boot log lines followed by neofetch output
 */
export const introLines = () => ["$ neofetch", ...systemStats(), ""];

/** Contact information display for terminal. */
export const contactInfo = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`,
] as const;

/** Whoami command output with user information. */
export const whoamiInfo = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`,
] as const;

// --- MUSIC ---

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

// --- SKILLS ---

/**
 * Skill categories object mapping category names to skill arrays.
 * Each category contains an array of technology/skill names.
 * @constant
 */
export const skillCategories = {
    [SkillCategoryName.Languages]: ["C", "C++", "Python", "JavaScript", "TypeScript", "Bash"],
    [SkillCategoryName.SystemKernel]: [
        "Intel SGX/TDX",
        "Gramine",
        "System Programming",
        "Windows Internals",
        "Ubuntu",
        "CentOS",
        "RHEL",
    ],
    [SkillCategoryName.SecurityPrivacy]: [
        "Data Loss Prevention",
        "Trellix ePO",
        "Endpoint Security",
        "EDR",
        "XDR",
        "PowerShell",
        "Boldon James",
        "Full-Disk Encryption",
        "Hashicorp Vault",
        "OpenSSL",
        "Post-Quantum Cryptography",
        "libFuzzer",
        "RESTler",
        "SIEM",
        "Threat Intelligence",
        "Address Sanitizer",
        "Memory Sanitizer",
        "FIDO Device Onboarding",
    ],
    [SkillCategoryName.AIML]: [
        "vLLM",
        "PyTorch",
        "OpenVINO",
        "NumPy",
        "Pandas",
        "Jupyter",
        "CUDA",
        "ONNX",
        "MLflow",
    ],
    [SkillCategoryName.DatabasesTools]: ["Redis", "MySQL"],
    [SkillCategoryName.FrontendWeb]: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
        "Zustand",
        "TypeScript",
    ],
    [SkillCategoryName.DevOpsInfra]: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Jenkins"],
};
