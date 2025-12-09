import { Command, CommandContext } from "./types";
import { DIRECTORY_MAP, DIRECTORIES, CONTACT_INFO, SYSTEM_STATS, WHOAMI_INFO } from "@/lib/constants";

export const commands: Record<string, Command> = {
    help: {
        name: "help",
        description: "List available commands",
        execute: (_, { setLines }) => {
            const helpText = [
                "Available commands:",
                "Navigation:",
                "  ls, cd, open, pwd, tree",
                "",
                "System Info:",
                "  whoami, fetch, uname, uptime, df, top, ps",
                "",
                "Utilities:",
                "  date, clear, echo, cat, grep, find, man",
                "",
                "Network:",
                "  ping, curl, wget, ssh",
                "",
                "Development:",
                "  git, npm, docker",
                "",
                "Fun:",
                "  hack, fortune, cowsay, exit",
                "",
                "Other:",
                "  theme, sudo, matrix, music, contact, skills",
                "",
                "Type 'help' anytime to see this list again!"
            ];
            setLines((prev) => [...prev, ...helpText]);
        },
    },
    ls: {
        name: "ls",
        description: "List directories",
        execute: (_, { setLines }) => {
            setLines((prev) => [
                ...prev,
                ...DIRECTORIES.map(d => `drwxr-xr-x  ${d}/`)
            ]);
        },
    },
    cd: {
        name: "cd",
        description: "Change directory",
        execute: (args, { setLines, router }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: cd [directory]"]);
                return;
            }
            const dir = (args[0] || '').replace(/^\.\//, "").replace(/\/$/, "").replace("shelf", "");
            if (DIRECTORY_MAP[dir]) {
                setLines((prev) => [...prev, `Navigating to ${DIRECTORY_MAP[dir]}...`]);
                router.push(DIRECTORY_MAP[dir]!);
            } else {
                setLines((prev) => [...prev, `Directory not found: ${args[0] || ''}`]);
            }
        },
    },
    open: {
        name: "open",
        description: "Open directory",
        execute: (args, ctx) => commands.cd!.execute(args, ctx),
    },
    whoami: {
        name: "whoami",
        description: "Display profile info",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...WHOAMI_INFO]);
        },
    },
    date: {
        name: "date",
        description: "Show current date/time",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, new Date().toString()]);
        },
    },
    theme: {
        name: "theme",
        description: "Set theme (light/dark/system)",
        execute: (args, { setLines, setTheme }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: theme [light|dark|system]"]);
            } else {
                const mode = (args[0] || '').toLowerCase();
                if (["light", "dark", "system"].includes(mode)) {
                    setTheme(mode);
                    setLines((prev) => [...prev, `Theme set to ${mode}`]);
                } else {
                    setLines((prev) => [...prev, `Invalid theme: ${mode}. Use light, dark, or system.`]);
                }
            }
        },
    },
    sudo: {
        name: "sudo",
        description: "Execute with superuser privileges",
        execute: (_, { setPasswordMode, setLines }) => {
            setPasswordMode(true);
            setLines((prev) => [...prev, "Password:"]);
        },
    },
    matrix: {
        name: "matrix",
        description: "Toggle Matrix Rain effect",
        execute: (_, { toggleMatrix }) => {
            toggleMatrix();
        },
    },
    music: {
        name: "music",
        description: "Control music",
        execute: (args, { setLines, setIsPlaying, nextTrack, prevTrack, toggleMute }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: music [play|pause|next|prev|mute]"]);
            } else {
                const action = (args[0] || '').toLowerCase();
                switch (action) {
                    case "play":
                        setIsPlaying(true);
                        setLines((prev) => [...prev, "Music: Playing"]);
                        break;
                    case "pause":
                        setIsPlaying(false);
                        setLines((prev) => [...prev, "Music: Paused"]);
                        break;
                    case "next":
                        nextTrack();
                        setLines((prev) => [...prev, "Music: Next Track"]);
                        break;
                    case "prev":
                        prevTrack();
                        setLines((prev) => [...prev, "Music: Previous Track"]);
                        break;
                    case "mute":
                        toggleMute();
                        setLines((prev) => [...prev, "Music: Mute Toggled"]);
                        break;
                    default:
                        setLines((prev) => [...prev, `Invalid music command: ${action}`]);
                }
            }
        },
    },
    fetch: {
        name: "fetch",
        description: "Display system information",
        execute: (_, { setLines, isMatrixEnabled }) => {
            setLines((prev) => [...prev, ...SYSTEM_STATS(isMatrixEnabled)]);
        },
    },
    rm: {
        name: "rm",
        description: "Remove file",
        execute: (args, { setLines }) => {
            if (args.includes("-rf") && args.includes("/")) {
                setLines((prev) => [...prev, "Nice try, but I need this website."]);
            } else {
                setLines((prev) => [...prev, "Permission denied."]);
            }
        },
    },
    clear: {
        name: "clear",
        description: "Clear terminal",
        execute: (_, { setLines, setInput }) => {
            setLines([]);
            setInput("");
            // Logic for clear is special in component mostly, but here we can reset lines
        },
    },
    cls: {
        name: "cls",
        description: "Clear screen (alias)",
        execute: (args, ctx) => commands.clear!.execute(args, ctx),
    },
    contact: {
        name: "contact",
        description: "Show contact info",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...CONTACT_INFO]);
        },
    },
    echo: {
        name: "echo",
        description: "Print text to terminal",
        execute: (args, { setLines }) => {
            setLines((prev) => [...prev, args.join(" ")]);
        },
    },
    pwd: {
        name: "pwd",
        description: "Print working directory",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "/home/adarsh"]);
        },
    },
    cat: {
        name: "cat",
        description: "Display file contents",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: cat [file]"]);
                return;
            }
            const file = args[0]?.toLowerCase();
            if (file === "readme.md" || file === "readme") {
                setLines((prev) => [...prev,
                    "# Adarsh Anand - Portfolio",
                    "",
                    "Software Development Engineer @Trellix",
                    "Specializing in C++, Data Security, and System Programming",
                    "",
                    "Type 'help' for available commands"
                ]);
            } else if (file === "skills.txt" || file === "skills") {
                setLines((prev) => [...prev,
                    "Languages: C++, Python, JavaScript, TypeScript, Rust",
                    "Technologies: Next.js, React, Node.js, Docker",
                    "Security: Intel SGX, TDX, Cryptography, DLP",
                    "Tools: Git, Linux, LLVM, Fuzzing"
                ]);
            } else {
                setLines((prev) => [...prev, `cat: ${args[0]}: No such file or directory`]);
            }
        },
    },
    history: {
        name: "history",
        description: "Show command history",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "Use arrow keys (↑/↓) to navigate command history"]);
        },
    },
    skills: {
        name: "skills",
        description: "Display technical skills",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "Technical Skills:",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                "Languages:    C++ | Python | Rust | TypeScript",
                "Security:     Intel SGX/TDX | Cryptography | DLP",
                "Systems:      Linux | Docker | LLVM | Fuzzing",
                "Web:          Next.js | React | Node.js",
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            ]);
        },
    },
    neofetch: {
        name: "neofetch",
        description: "Display system info (alias for fetch)",
        execute: (args, ctx) => commands.fetch!.execute(args, ctx),
    },
    exit: {
        name: "exit",
        description: "Close terminal (just kidding)",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "Nice try! This terminal is here to stay 😎"]);
        },
    },
    hack: {
        name: "hack",
        description: "Initiate hacking sequence",
        execute: (_, { setLines, toggleMatrix }) => {
            setLines((prev) => [...prev,
                "Initializing hacking sequence...",
                "Bypassing firewall... ✓",
                "Cracking encryption... ✓",
                "Accessing mainframe... ✓",
                "Just kidding! Try 'sudo' for real power 😄"
            ]);
            setTimeout(() => toggleMatrix(), 1000);
        },
    },
    uptime: {
        name: "uptime",
        description: "Show system uptime",
        execute: (_, { setLines }) => {
            const uptime = Math.floor(performance.now() / 1000);
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            setLines((prev) => [...prev, `up ${hours}h ${minutes}m`]);
        },
    },
    uname: {
        name: "uname",
        description: "Print system information",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "Portfolio OS 1.0.0 (Next.js 16.0.7)"]);
        },
    },
    ping: {
        name: "ping",
        description: "Ping a host",
        execute: (args, { setLines }) => {
            const host = args[0] || "localhost";
            setLines((prev) => [...prev,
            `PING ${host} (127.0.0.1): 56 data bytes`,
            `64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.042 ms`,
            `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.037 ms`,
            `--- ${host} ping statistics ---`,
                `2 packets transmitted, 2 packets received, 0.0% packet loss`
            ]);
        },
    },
    curl: {
        name: "curl",
        description: "Transfer data from URL",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: curl [url]"]);
            } else {
                setLines((prev) => [...prev, `Fetching ${args[0]}...`, "200 OK - Portfolio loaded successfully!"]);
            }
        },
    },
    tree: {
        name: "tree",
        description: "List directory tree",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                ".",
                "├── blogshelf/",
                "├── papershelf/",
                "├── bookshelf/",
                "├── animeshelf/",
                "└── HobbyShelf/"
            ]);
        },
    },
    df: {
        name: "df",
        description: "Display disk space",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "Filesystem     Size  Used  Avail  Use%",
                "/dev/sda1      100G   42G    58G   42%",
                "tmpfs          8.0G  1.2G   6.8G   15%"
            ]);
        },
    },
    top: {
        name: "top",
        description: "Display running processes",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "PID    COMMAND          %CPU   %MEM",
                "1      next-server      12.3   256M",
                "42     music-player     2.1    64M",
                "69     matrix-rain      5.4    128M"
            ]);
        },
    },
    ps: {
        name: "ps",
        description: "List processes",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "PID TTY      TIME CMD",
                "  1 pts/0    00:00:01 portfolio",
                " 42 pts/0    00:00:00 music",
                " 69 pts/0    00:00:02 matrix"
            ]);
        },
    },
    kill: {
        name: "kill",
        description: "Terminate process",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: kill [pid]"]);
            } else {
                setLines((prev) => [...prev, `kill: (${args[0]}) - Operation not permitted 😅`]);
            }
        },
    },
    grep: {
        name: "grep",
        description: "Search for patterns",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: grep [pattern] [file]"]);
            } else {
                setLines((prev) => [...prev, `Searching for '${args[0]}' in ${args[1]}...`, "No matches found (or maybe I'm just lazy 😴)"]);
            }
        },
    },
    find: {
        name: "find",
        description: "Search for files",
        execute: (args, { setLines }) => {
            const query = args.join(" ") || "files";
            setLines((prev) => [...prev, `Searching for ${query}...`, "./blogshelf/hello-world.md", "./papershelf/research.pdf"]);
        },
    },
    man: {
        name: "man",
        description: "Display manual pages",
        execute: (args, { setLines }) => {
            const cmd = args[0] || "help";
            setLines((prev) => [...prev,
                `MAN(1)                    User Commands                    MAN(1)`,
                "",
                `NAME`,
            `       ${cmd} - try typing 'help' instead!`,
                "",
                `DESCRIPTION`,
                `       This is a portfolio website, not a real terminal 😄`
            ]);
        },
    },
    wget: {
        name: "wget",
        description: "Download files",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: wget [url]"]);
            } else {
                setLines((prev) => [...prev,
                `--2024-12-09 22:16:00--  ${args[0]}`,
                `Resolving ${args[0]}... done.`,
                `Connecting to ${args[0]}... connected.`,
                    `HTTP request sent, awaiting response... 200 OK`,
                    `Download complete! (Just kidding, this is a portfolio 😉)`
                ]);
            }
        },
    },
    ssh: {
        name: "ssh",
        description: "Connect via SSH",
        execute: (args, { setLines }) => {
            const host = args[0] || "localhost";
            setLines((prev) => [...prev,
            `ssh: connect to host ${host} port 22: Connection refused`,
                `(This is a web portfolio, not a real SSH client! 🔒)`
            ]);
        },
    },
    git: {
        name: "git",
        description: "Version control",
        execute: (args, { setLines }) => {
            const subcommand = args[0] || "status";
            if (subcommand === "status") {
                setLines((prev) => [...prev,
                    "On branch main",
                    "Your branch is up to date with 'origin/main'.",
                    "",
                    "nothing to commit, working tree clean ✨"
                ]);
            } else {
                setLines((prev) => [...prev, `git ${subcommand}: Check out the real repo on GitHub! 🚀`]);
            }
        },
    },
    npm: {
        name: "npm",
        description: "Node package manager",
        execute: (args, { setLines }) => {
            const cmd = args[0] || "help";
            setLines((prev) => [...prev, `npm ${cmd} - This portfolio uses pnpm actually! 📦`]);
        },
    },
    docker: {
        name: "docker",
        description: "Container management",
        execute: (args, { setLines }) => {
            setLines((prev) => [...prev,
                "CONTAINER ID   IMAGE              STATUS",
                "a1b2c3d4e5f6   portfolio:latest   Up 42 minutes",
                "🐳 Containers running smoothly!"
            ]);
        },
    },
    fortune: {
        name: "fortune",
        description: "Display random quote",
        execute: (_, { setLines }) => {
            const fortunes = [
                "Code is like humor. When you have to explain it, it's bad.",
                "The best error message is the one that never shows up.",
                "Debugging is twice as hard as writing the code in the first place.",
                "Talk is cheap. Show me the code. - Linus Torvalds",
                "First, solve the problem. Then, write the code.",
                "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
            ];
            const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            setLines((prev) => [...prev, `💭 ${fortune}`]);
        },
    },
    cowsay: {
        name: "cowsay",
        description: "ASCII cow says something",
        execute: (args, { setLines }) => {
            const message = args.join(" ") || "Hello!";
            setLines((prev) => [...prev,
            ` ${"_".repeat(message.length + 2)}`,
            `< ${message} >`,
            ` ${"-".repeat(message.length + 2)}`,
                "        \\   ^__^",
                "         \\  (oo)\\_______",
                "            (__)\\       )\\/\\",
                "                ||----w |",
                "                ||     ||"
            ]);
        },
    },
};
