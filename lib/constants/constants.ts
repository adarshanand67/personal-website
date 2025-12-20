import { siteConfig, featuresConfig as config, basePath as configBasePath } from "@/lib/config";
export const basePath = configBasePath;
export const playlist = [
    `${basePath}/assets/music/theWorld.mp3`,
    `${basePath}/assets/music/cruelAngelsThesis.mp3`,
    `${basePath}/assets/music/onePunchMan.mp3`,
    `${basePath}/assets/music/pokemonTheme.mp3`,
    `${basePath}/assets/music/tank.mp3`,
    `${basePath}/assets/music/unravel.mp3`,

    `${basePath}/assets/music/blueBird.mp3`,
    `${basePath}/assets/music/go.mp3`,
    `${basePath}/assets/music/gurenNoYumiya.mp3`
] as const;
export const trackNames = [
    "The World (Death Note)",
    "A Cruel Angel's Thesis (Evangelion)",
    "THE HERO!! (One Punch Man)",
    "Pokemon Theme (Instrumental)",
    "Tank! (Cowboy Bebop)",
    "Unravel (Tokyo Ghoul)",
    "Blue Bird (Naruto)",
    "GO!!! (Naruto)",
    "Guren no Yumiya (Attack on Titan)",
] as const;
export const trackImages = [
    "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
    "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
    "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
    "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
    "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
    "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",

    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
] as const;
export const introLines = () => {
    const lines = [
        "[  0.000000] Linux version 27.0.0-ADARSH (gcc version 14.2.1)",
        "[  0.004123] Command line: initrd=intel-ucode.img root=UUID=ADARSH-OS",
        "[  0.012541] x86/fpu: Supporting XSAVE feature 0x01: 'x87 floating point registers'",
        "[  0.045129] secureboot: Secure boot enabled",
        "[  0.154210] Memory: 16383K/1048576K available",
        "[  0.412589] Mount-cache hash table entries: 16384 (order: 5, 131072 bytes)",
        "[  0.841253] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0",
        "[  1.124589] NET: Registered protocol family 2 (AF_INET)",
        "[  1.458963] usb 1-1: new high-speed USB device number 2 using xhci_hcd",
        "[  2.012458] clocksource: Switched to clocksource tsc",
        "[  2.415896] systemd[1]: Inserted module 'autofs4'",
        "[  2.784125] systemd[1]: Set hostname to <ADARSH-AIR>",
        "[  3.124589] adarsh-os login: adarsh (automatic login)",
        "Welcome to Adarsh OS 27.0.0-LTS (GNU/Linux arm64)",
        "* Documentation: https://adarshanand.dev",
        "* Management: https://github.com/adarshanand67",
        "",
        "$ neofetch",
        ...systemStats(),
        "",
    ];
    return lines;
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
export const systemStats = () => [
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
    "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mCPU:\x1b[0m Apple M4 (10-core)",
    "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m      \x1b[36mGPU:\x1b[0m Apple M4 Integrated",
    "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m        \x1b[36mMemory:\x1b[0m 3226MiB / 16384MiB",
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
        "PostgreSQL",
    ],
    "Frontend & Web": [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
        "Zustand",
    ],
    "DevOps & Infrastructure": [
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "AWS",
    ],
};


