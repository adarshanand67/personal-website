export const PLAYLIST = [
    "https://archive.org/download/tvtunes_30971/One%20Punch%20Man.mp3",
    "https://archive.org/download/fav-mikezillak/Pokemon%20Theme%20-%20Billy%20Crawford.mp3",
    "https://archive.org/download/cowboy-bebop-tank-the-best/Tank!%20(TV%20stretch).mp3",
    "https://archive.org/download/mythium/JLS_ATI.mp3",
];

export const TRACK_NAMES = [
    "A Cruel Angel's Thesis",
    "THE HERO!! (One Punch Man)",
    "Tank! (Cowboy Bebop)",
    "Lofi Chill Session",
];

export const INTRO_LINES = (toLeet: (t: string) => string) => [
    "> ./adarsh_profile.sh",
    "> Initializing SDE protocol...",
    "> Loading modules: C++, Make, Git...",
    `> Access granted :${toLeet("Type 'help' for commands.")}`,
];

export const DIRECTORIES = ["blogs", "papers", "books", "anime", "hobbieshelf"];

export const DIRECTORY_MAP: Record<string, string> = {
    blog: "/blogshelf",
    blogs: "/blogshelf",
    paper: "/papershelf",
    papers: "/papershelf",
    book: "/bookshelf",
    books: "/bookshelf",
    anime: "/animeshelf",
    animes: "/animeshelf",
    hobby: "/hobbieshelf",
    hobbies: "/hobbieshelf",
    hobbieshelf: "/hobbieshelf",
    home: "/",
    "~": "/",
    ".": "/",
};

export const CONTACT_INFO = [
    "Email: adarshan20302@gmail.com",
    "LinkedIn: linkedin.com/in/adarshanand67",
    "GitHub: github.com/adarshanand67"
];

export const SYSTEM_STATS = (isMatrix: boolean) => [
    "       Adarsh's Portfolio",
    "       ------------------",
    "OS:     Mac OS X (simulated)",
    "Host:   Personal Website",
    "Kernel: Next.js 16",
    "Uptime: Forever",
    "Shell:  Zsh (React)",
    "Theme:  Cyberpunk",
    `Matrix: ${isMatrix ? "Active" : "Disabled"}`
];

export const WHOAMI_INFO = [
    "User: Adarsh Anand",
    "Role: SDE @ Trellix",
    "Expertise: C++, System Design, Security",
    "Status: Online"
];
