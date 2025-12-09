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
                "  whoami, fetch, uname, uptime, df, top, ps, free, hostname",
                "",
                "Utilities:",
                "  date, clear, echo, cat, grep, find, man, wc, diff, file, which",
                "",
                "File Operations:",
                "  mkdir, touch, mv, cp, rm, chmod, chown, ln, tar, zip",
                "",
                "Text Processing:",
                "  head, tail, grep, cat, wc",
                "",
                "Environment:",
                "  env, export, printenv, alias",
                "",
                "Network:",
                "  ping, curl, wget, ssh",
                "",
                "Development:",
                "  git, npm, docker",
                "",
                "Math & Text:",
                "  bc, factor, seq, yes, banner, figlet",
                "",
                "Fun:",
                "  hack, fortune, cowsay, exit, reboot, shutdown, cal",
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
    mkdir: {
        name: "mkdir",
        description: "Make directory",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: mkdir [directory]"]);
            } else {
                setLines((prev) => [...prev, `mkdir: cannot create directory '${args[0]}': Read-only file system 😅`]);
            }
        },
    },
    touch: {
        name: "touch",
        description: "Create empty file",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: touch [file]"]);
            } else {
                setLines((prev) => [...prev, `touch: cannot touch '${args[0]}': Read-only file system`]);
            }
        },
    },
    chmod: {
        name: "chmod",
        description: "Change file permissions",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: chmod [mode] [file]"]);
            } else {
                setLines((prev) => [...prev, `chmod: changing permissions of '${args[1]}': Operation not permitted`]);
            }
        },
    },
    chown: {
        name: "chown",
        description: "Change file owner",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: chown [owner] [file]"]);
            } else {
                setLines((prev) => [...prev, `chown: changing ownership of '${args[1]}': Operation not permitted`]);
            }
        },
    },
    mv: {
        name: "mv",
        description: "Move/rename files",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: mv [source] [destination]"]);
            } else {
                setLines((prev) => [...prev, `mv: cannot move '${args[0]}': Permission denied`]);
            }
        },
    },
    cp: {
        name: "cp",
        description: "Copy files",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: cp [source] [destination]"]);
            } else {
                setLines((prev) => [...prev, `cp: cannot create regular file '${args[1]}': Permission denied`]);
            }
        },
    },
    ln: {
        name: "ln",
        description: "Create links",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: ln [-s] [target] [link]"]);
            } else {
                setLines((prev) => [...prev, `ln: failed to create link: Operation not permitted`]);
            }
        },
    },
    head: {
        name: "head",
        description: "Output first part of files",
        execute: (args, { setLines }) => {
            const file = args[0] || "file";
            setLines((prev) => [...prev,
            `==> ${file} <==`,
                "Line 1: Welcome to my portfolio!",
                "Line 2: Built with Next.js and TypeScript",
                "Line 3: Featuring a terminal interface",
                "Line 4: Type 'help' for available commands",
                "Line 5: Enjoy exploring! 🚀"
            ]);
        },
    },
    tail: {
        name: "tail",
        description: "Output last part of files",
        execute: (args, { setLines }) => {
            const file = args[0] || "file";
            setLines((prev) => [...prev,
            `==> ${file} <==`,
                "...",
                "Last line: Thanks for visiting!",
                "EOF"
            ]);
        },
    },
    wc: {
        name: "wc",
        description: "Word count",
        execute: (args, { setLines }) => {
            const file = args[0] || "file";
            setLines((prev) => [...prev, `  42  256  1337 ${file}`]);
        },
    },
    diff: {
        name: "diff",
        description: "Compare files",
        execute: (args, { setLines }) => {
            if (args.length < 2) {
                setLines((prev) => [...prev, "usage: diff [file1] [file2]"]);
            } else {
                setLines((prev) => [...prev, `Files ${args[0]} and ${args[1]} are identical (probably) ✓`]);
            }
        },
    },
    tar: {
        name: "tar",
        description: "Archive utility",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: tar [options] [file]"]);
            } else {
                setLines((prev) => [...prev, `tar: This is a web portfolio, not a real filesystem! 📦`]);
            }
        },
    },
    zip: {
        name: "zip",
        description: "Package files",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: zip [archive] [files...]"]);
            } else {
                setLines((prev) => [...prev, `  adding: ${args[0]} (deflated 42%)`]);
            }
        },
    },
    unzip: {
        name: "unzip",
        description: "Extract files",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: unzip [archive]"]);
            } else {
                setLines((prev) => [...prev,
                `Archive:  ${args[0]}`,
                    "  inflating: portfolio.html",
                    "  inflating: styles.css",
                    "Done! 📂"
                ]);
            }
        },
    },
    alias: {
        name: "alias",
        description: "Create command alias",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev,
                    "alias ll='ls -la'",
                    "alias ..='cd ..'",
                    "alias please='sudo'"
                ]);
            } else {
                setLines((prev) => [...prev, `alias: ${args.join(" ")} - Aliases are temporary in this session`]);
            }
        },
    },
    env: {
        name: "env",
        description: "Display environment",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "USER=adarsh",
                "HOME=/home/adarsh",
                "SHELL=/bin/zsh",
                "PATH=/usr/local/bin:/usr/bin:/bin",
                "LANG=en_US.UTF-8",
                "PORTFOLIO=awesome"
            ]);
        },
    },
    export: {
        name: "export",
        description: "Set environment variable",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: export VAR=value"]);
            } else {
                setLines((prev) => [...prev, `export: ${args[0]} - Variable set (temporarily)`]);
            }
        },
    },
    printenv: {
        name: "printenv",
        description: "Print environment",
        execute: (args, { setLines }) => {
            const varName = args[0] || "PATH";
            setLines((prev) => [...prev, `/usr/local/bin:/usr/bin:/bin`]);
        },
    },
    file: {
        name: "file",
        description: "Determine file type",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: file [filename]"]);
            } else {
                const filename = args[0];
                if (filename.endsWith(".md")) {
                    setLines((prev) => [...prev, `${filename}: Markdown document, UTF-8 Unicode text`]);
                } else if (filename.endsWith(".json")) {
                    setLines((prev) => [...prev, `${filename}: JSON data`]);
                } else if (filename.endsWith(".ts") || filename.endsWith(".tsx")) {
                    setLines((prev) => [...prev, `${filename}: TypeScript source, UTF-8 Unicode text`]);
                } else {
                    setLines((prev) => [...prev, `${filename}: data`]);
                }
            }
        },
    },
    which: {
        name: "which",
        description: "Locate command",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: which [command]"]);
            } else {
                const cmd = args[0];
                if (["ls", "cd", "pwd", "cat", "echo"].includes(cmd)) {
                    setLines((prev) => [...prev, `/usr/bin/${cmd}`]);
                } else {
                    setLines((prev) => [...prev, `${cmd} not found`]);
                }
            }
        },
    },
    whereis: {
        name: "whereis",
        description: "Locate binary, source, and manual",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: whereis [command]"]);
            } else {
                const cmd = args[0];
                setLines((prev) => [...prev, `${cmd}: /usr/bin/${cmd} /usr/share/man/man1/${cmd}.1.gz`]);
            }
        },
    },
    free: {
        name: "free",
        description: "Display memory usage",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "              total        used        free      shared  buff/cache   available",
                "Mem:          16384        8192        4096         512        4096        7680",
                "Swap:          8192           0        8192"
            ]);
        },
    },
    hostname: {
        name: "hostname",
        description: "Show system hostname",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, "adarsh-portfolio.local"]);
        },
    },
    whoami: {
        name: "whoami",
        description: "Display current user",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...WHOAMI_INFO]);
        },
    },
    reboot: {
        name: "reboot",
        description: "Reboot system",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev,
                "Broadcast message from adarsh@portfolio",
                "The system is going down for reboot NOW!",
                "Just kidding! This is a web portfolio 😄"
            ]);
        },
    },
    shutdown: {
        name: "shutdown",
        description: "Shutdown system",
        execute: (args, { setLines }) => {
            const time = args[0] || "now";
            setLines((prev) => [...prev,
            `Shutdown scheduled for ${time}`,
                "Nice try, but this portfolio stays online! 💪"
            ]);
        },
    },
    cal: {
        name: "cal",
        description: "Display calendar",
        execute: (_, { setLines }) => {
            const now = new Date();
            const month = now.toLocaleString('default', { month: 'long' });
            const year = now.getFullYear();
            setLines((prev) => [...prev,
            `      ${month} ${year}`,
                "Su Mo Tu We Th Fr Sa",
                " 1  2  3  4  5  6  7",
                " 8  9 10 11 12 13 14",
                "15 16 17 18 19 20 21",
                "22 23 24 25 26 27 28",
                "29 30 31"
            ]);
        },
    },
    bc: {
        name: "bc",
        description: "Calculator",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "bc: arbitrary precision calculator", "Type 'echo \"2+2\" | bc' to calculate"]);
            } else {
                try {
                    const expr = args.join(" ");
                    // Simple eval for basic math (sanitized)
                    if (/^[\d\s+\-*/().]+$/.test(expr)) {
                        const result = eval(expr);
                        setLines((prev) => [...prev, String(result)]);
                    } else {
                        setLines((prev) => [...prev, "bc: syntax error"]);
                    }
                } catch {
                    setLines((prev) => [...prev, "bc: syntax error"]);
                }
            }
        },
    },
    factor: {
        name: "factor",
        description: "Prime factorization",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: factor [number]"]);
            } else {
                const num = parseInt(args[0]);
                if (isNaN(num)) {
                    setLines((prev) => [...prev, "factor: invalid number"]);
                } else {
                    setLines((prev) => [...prev, `${num}: ${num} (prime factorization not implemented 😅)`]);
                }
            }
        },
    },
    yes: {
        name: "yes",
        description: "Output string repeatedly",
        execute: (args, { setLines }) => {
            const text = args.join(" ") || "y";
            const repeated = Array(10).fill(text);
            setLines((prev) => [...prev, ...repeated, "... (stopped after 10 lines)"]);
        },
    },
    seq: {
        name: "seq",
        description: "Print sequence of numbers",
        execute: (args, { setLines }) => {
            if (args.length === 0) {
                setLines((prev) => [...prev, "usage: seq [last] or seq [first] [last]"]);
            } else {
                const start = args.length === 1 ? 1 : parseInt(args[0]);
                const end = parseInt(args[args.length - 1]);
                if (isNaN(start) || isNaN(end)) {
                    setLines((prev) => [...prev, "seq: invalid number"]);
                } else {
                    const nums = [];
                    for (let i = start; i <= Math.min(end, start + 20); i++) {
                        nums.push(String(i));
                    }
                    if (end > start + 20) nums.push("... (truncated)");
                    setLines((prev) => [...prev, ...nums]);
                }
            }
        },
    },
    banner: {
        name: "banner",
        description: "Print large banner",
        execute: (args, { setLines }) => {
            const text = args.join(" ") || "HI";
            setLines((prev) => [...prev,
                "╔═══════════════════════════╗",
            `║   ${text.toUpperCase().padEnd(21)}  ║`,
                "╚═══════════════════════════╝"
            ]);
        },
    },
    figlet: {
        name: "figlet",
        description: "ASCII art text",
        execute: (args, { setLines }) => {
            const text = args.join(" ") || "HELLO";
            setLines((prev) => [...prev,
                " _   _  _____ _     _     ___  ",
                "| | | || ____| |   | |   / _ \\ ",
                "| |_| ||  _| | |   | |  | | | |",
                "|  _  || |___| |___| |__| |_| |",
                "|_| |_||_____|_____|_____\\___/ ",
                "",
            `(Showing default - input was: ${text})`
            ]);
        },
    },
};
