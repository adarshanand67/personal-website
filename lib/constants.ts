import { siteConfig, basePath as configBasePath } from "@/lib/config";
import { SkillCategoryName } from "@/data";

export const basePath = configBasePath;

export interface Track {
  title: string;
  artist: string;
  image: string;
  src: string;
}

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

// Legacy exports for backward compatibility
export const playlist = tracks.map((t) => t.src);
export const trackNames = tracks.map((t) => t.title);
export const trackImages = tracks.map((t) => t.image);

export const skillCategories = {
  [SkillCategoryName.Languages]: [
    "C",
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "Bash",
  ],
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
  [SkillCategoryName.DevOpsInfra]: [
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "AWS",
    "Jenkins",
  ],
};

export const systemStats = () =>
  [
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
    " \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mWM Theme:\x1b[0m Blue (Light)",
    " \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m   \x1b[36mTerminal:\x1b[0m Apple_Terminal",
    "  \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m   \x1b[36mTerminal Font:\x1b[0m SFMonoTerminal-Regular",
    "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mCPU:\x1b[0m Apple M4 (10-core)",
    "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m      \x1b[36mGPU:\x1b[0m Apple M4 Integrated",
    "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m        \x1b[36mMemory:\x1b[0m 3226MiB / 16384MiB",
  ] as const;

export const introLines = () => ["$ neofetch", ...systemStats(), ""];

export const contactInfo = [
  `Email: ${siteConfig.contact.email}`,
  `LinkedIn: ${siteConfig.contact.linkedin}`,
  `GitHub: ${siteConfig.contact.github}`,
] as const;

export const whoamiInfo = [
  `User: ${siteConfig.whoami.user}`,
  `Role: ${siteConfig.whoami.role}`,
  `Expertise: ${siteConfig.whoami.expertise}`,
  `Status: ${siteConfig.whoami.status}`,
] as const;

export const directories = [
  "blogs",
  "papers",
  "books",
  "anime",
  "hobby",
] as const;

export const routes = {
  home: "/",
  articles: "/articles",
  books: "/books",
  anime: "/anime",
  hobbies: "/hobbies",
  music: "/music",
} as const;

export const directoryMap: Record<string, string> = {
  blog: routes.articles,
  blogs: routes.articles,
  paper: routes.articles,
  papers: routes.articles,
  article: routes.articles,
  articles: routes.articles,
  book: routes.books,
  books: routes.books,
  anime: routes.anime,
  animes: routes.anime,
  hobby: routes.hobbies,
  hobbies: routes.hobbies,
  home: routes.home,
  "~": routes.home,
  ".": routes.home,
};
