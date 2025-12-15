import { siteConfig, featuresConfig as config, basePath as configBasePath } from "@/lib/config";
export const basePath = configBasePath;
export const playlist = [
    `${basePath}/assets/music/cruel_angels_thesis.mp3`,
    `${basePath}/assets/music/one_punch_man.mp3`,
    `${basePath}/assets/music/pokemon_theme.mp3`,
    `${basePath}/assets/music/tank.mp3`,
    `${basePath}/assets/music/unravel.mp3`,

    `${basePath}/assets/music/blue_bird.mp3`,
    `${basePath}/assets/music/go.mp3`,
    `${basePath}/assets/music/the_world.mp3`,
    `${basePath}/assets/music/guren_no_yumiya.mp3`
] as const;
export const trackNames = [
    "A Cruel Angel's Thesis (Evangelion)",
    "THE HERO!! (One Punch Man)",
    "Pokemon Theme (Instrumental)",
    "Tank! (Cowboy Bebop)",
    "Unravel (Tokyo Ghoul)",

    "Blue Bird (Naruto)",
    "GO!!! (Naruto)",
    "The World (Death Note)",
    "Guren no Yumiya (Attack on Titan)",
] as const;
export const trackImages = [
    "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
    "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
    "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
    "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
    "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",

    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
    "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
] as const;
export const introLines = (modifier?: (s: string) => string) => {
    const lines = [
        `$ ./${siteConfig.author.name.toLowerCase().replace(' ', '_')}_profile.sh`,
        "",
        "[    0.001] Loading kernel modules",
        "[    0.023] ✓ gcc-12.2.0 | glibc-2.36 | binutils-2.39",
        "[    0.045] ✓ make-4.3 | git-2.39.0 | vim-9.0",
        "[    0.067] ✓ ssh.service | docker.service",
        "[    0.089] System ready.",
        "",
        "macOS Tahoe 27.0",
        `Last login: ${new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
        "",
    ];
    return modifier ? lines.map(modifier) : lines;
};
export const directories = ["blogs", "papers", "books", "anime", "hobby"] as const;
export const routes = {
    home: "/",
    articleShelf: "/articleshelf",
    bookShelf: "/bookshelf",
    animeShelf: "/animeshelf",
    hobbyShelf: "/hobbyshelf",
} as const;
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
export const contactInfo = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`
] as const;
export const systemStats = (isMatrix: boolean) => [
    "                    \x1b[32m'c.\x1b[0m          \x1b[1madarsh_anand@Adarshs-MacBook-Air.local\x1b[0m",
    "                 \x1b[33m,xNMM.\x1b[0m          ",
    "               \x1b[31m.OMMMMo\x1b[0m           \x1b[36mOS:\x1b[0m macOS 27.0 26A5289h arm64",
    "               \x1b[31mOMMM0,\x1b[0m            \x1b[36mHost:\x1b[0m Mac16,13",
    "     \x1b[31m.;loddo:'\x1b[0m \x1b[33mloolloddol;.\x1b[0m      \x1b[36mKernel:\x1b[0m 27.0.0",
    "   \x1b[33mcKMMMMMMMMMMNWMMMMMMMMMM0:\x1b[0m    \x1b[36mUptime:\x1b[0m 3 days, 16 hours, 14 mins",
    " \x1b[33m.KMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mPackages:\x1b[0m 295 (brew)",
    " \x1b[32mXMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mShell:\x1b[0m zsh 5.9",
    "\x1b[32m;MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mResolution:\x1b[0m 1440x932",
    "\x1b[34m:MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mDE:\x1b[0m Aqua",
    "\x1b[34m.MMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mWM:\x1b[0m Quartz Compositor",
    " \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mWM Theme:\x1b[0m Blue (Light)",
    " \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m   \x1b[36mTerminal:\x1b[0m Apple_Terminal",
    "  \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m   \x1b[36mTerminal Font:\x1b[0m SFMonoTerminal-Regular",
    "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mCPU:\x1b[0m Apple M4",
    "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m      \x1b[36mGPU:\x1b[0m Apple M4",
    "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m        \x1b[36mMemory:\x1b[0m 3226MiB / 16384MiB",
    "",
    `                                 \x1b[36mMatrix:\x1b[0m ${isMatrix ? "🟢 Active" : "🔴 Disabled"}`,
] as const;
export const whoamiInfo = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`
] as const;

export const skillCategories = {
    "Languages": [
        "C",
        "C++",
        "Python",
        "Java",
        "JavaScript",
    ],
    "System & Kernel": [
        "Intel SGX/TDX",
        "Kernel Development",
        "System Programming",
        "Windows Internals",
        "Ubuntu",
        "CentOS",
        "RHEL",
    ],
    "Security & Privacy": [
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
    ],
    "AI & Machine Learning": [
        "vLLM",
        "PyTorch",
        "OpenVINO",
    ],
    "Databases & Tools": [
        "Redis",
        "MySQL",
    ],
};


