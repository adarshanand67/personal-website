import { introLines, systemStats, whoamiInfo } from "@/lib/constants";
import { directoryMap } from "@/lib/constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// --- TYPES ---

export type CommandCategory = "navigation" | "utility" | "filesystem" | "fun" | "system";

export interface CommandContext {
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void;
    setHistory: (history: string[] | ((prev: string[]) => string[])) => void;
    setInput: (input: string) => void;
    setTheme?: (theme: "light" | "dark" | "system") => void;
    router?: AppRouterInstance;
    files: Record<string, string>;
    setFiles: (
        files: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)
    ) => void;
    currentDir: string;
    setCurrentDir: (dir: string) => void;
}

export type CommandArgs = string[];

export interface Command {
    execute: (args: CommandArgs, context: CommandContext) => void;
    description: string;
    usage?: string;
    category?: CommandCategory;
}

// --- HELPERS ---

export const addLine = (
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void,
    line: string
) => {
    setLines((prev) => [...prev, line]);
};

export const addLines = (
    setLines: (lines: string[] | ((prev: string[]) => string[])) => void,
    lines: readonly string[] | string[]
) => {
    setLines((prev) => [...prev, ...lines]);
};

export const createCommand = (
    name: string,
    description: string,
    execute: (args: CommandArgs, context: CommandContext) => void,
    options: { usage?: string; category?: CommandCategory } = {}
): Command => ({
    description,
    execute,
    ...options,
});

/**
 * @fileoverview Consolidated terminal commands for the emulation environment.
 */

// --- CORE COMMANDS ---

export const clear: Command = createCommand(
    "clear",
    "Clear terminal",
    (_, { setLines, setInput }) => {
        setLines([]);
        setInput("");
    },
    { category: "utility", usage: "clear" }
);

export const help: Command = createCommand(
    "help",
    "Show available commands",
    (_, { setLines }) => {
        addLines(setLines, [
            "Available Commands:",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            "Navigation:",
            "  cd [dir]      - Navigate to directory",
            "  ls [-la]      - List directory contents",
            "  tree          - Show directory tree",
            "  pwd           - Show current directory",
            "  open [link]   - Open URL or directory",
            "",
            "Filesystem:",
            "  cat [file]    - Read file content",
            "  touch [file]  - Create empty file",
            "  mkdir [dir]   - Create directory",
            "  rm [file]     - Remove file",
            "  cp [src] [dst]- Copy file",
            "  mv [src] [dst]- Move file",
            "  vi [file]     - Sim text editor",
            "  grep [pat]    - Search in files",
            "  find [name]   - Find files",
            "  head/tail     - Top/bottom of file",
            "",
            "Information:",
            "  whoami        - Display profile info",
            "  contact       - Show contact info",
            "  skills        - Display technical skills",
            "  neofetch      - System snapshot",
            "  uptime        - System uptime",
            "  date          - Current date/time",
            "  uname         - System info",
            "  df/free       - Disk/Memory usage",
            "",
            "Utility:",
            "  git [cmd]     - Git (status, log, push)",
            "  curl [url]    - Fetch URL",
            "  ping [host]   - Ping a host",
            "  todo [cmd]    - Todo manager",
            "  calc [expr]   - Math calculator",
            "  history       - Command history",
            "  theme [mode]  - Set color theme",
            "  exit          - Close session",
            "",
            "Fun:",
            "  matrix        - Enter the matrix",
            "  cowsay [text] - Talking cow",
            "  banner [text] - Large text banner",
            "  haiku         - Tech haiku",
            "  joke/quote    - Programming fun",
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        ]);
    },
    { category: "utility", usage: "help" }
);

export const theme: Command = createCommand(
    "theme",
    "Switch color theme",
    (args, { setLines, setTheme }) => {
        const mode = args[0]?.toLowerCase();
        if (!mode || !["light", "dark", "system"].includes(mode)) {
            addLine(setLines, `Invalid theme: ${mode}. Use dark, light, or system.`);
            return;
        }
        setTheme?.(mode as "light" | "dark" | "system");
        addLine(setLines, `Theme set to ${mode} mode.`);
    },
    { category: "utility", usage: "theme [light|dark|system]" }
);

// --- NAVIGATION COMMANDS ---

export const ls: Command = createCommand(
    "ls",
    "List directories",
    (args, { setLines, files }) => {
        const showAll = args.some((arg) => arg.includes("a"));
        const showLong = args.some((arg) => arg.includes("l"));

        const dirs = Object.keys(directoryMap);
        const allFileNames = Object.keys(files);

        let displayItems = [...dirs, ...allFileNames.filter((f) => !dirs.includes(f))];

        if (!showAll) {
            displayItems = displayItems.filter((f) => !f.startsWith("."));
        }

        if (showLong) {
            const output = displayItems.sort().map((name) => {
                const isDir = dirs.includes(name);
                const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                const owner = "user user";
                const size = isDir ? "4096" : (files[name]?.length || 0).toString();
                const date = "Dec 27 01:30";
                return `${perms} 1 ${owner} ${size.padStart(5)} ${date} ${name}${isDir ? "/" : ""}`;
            });
            addLines(setLines, output);
        } else {
            addLines(
                setLines,
                displayItems.sort().map((d) => `  ${d}${dirs.includes(d) ? "/" : ""}`)
            );
        }
    },
    { category: "navigation", usage: "ls [-a] [-l]" }
);

export const cd: Command = createCommand(
    "cd",
    "Change directory",
    (args, { setLines, router, setCurrentDir }) => {
        const target = args[0];
        if (!target || target === "~") {
            router?.push("/");
            setCurrentDir("/home/portfolio");
            return;
        }
        if (target === ".." || target === "/") {
            router?.push("/");
            setCurrentDir("/home");
            return;
        }
        const route = directoryMap[target as keyof typeof directoryMap];
        if (route) {
            router?.push(route);
            setCurrentDir(`/home/portfolio/${target}`);
        } else {
            addLine(setLines, `cd: ${target}: No such directory`);
        }
    },
    { category: "navigation", usage: "cd [directory]" }
);

export const pwd: Command = createCommand(
    "pwd",
    "Print working directory",
    (_, { setLines, currentDir }) => {
        addLine(setLines, currentDir);
    },
    { category: "navigation", usage: "pwd" }
);

export const tree: Command = createCommand(
    "tree",
    "Display directory structure as tree",
    (_, { setLines, files }) => {
        const dirs = Object.keys(directoryMap);
        const lines = ["."];
        dirs.forEach((dir, i) => {
            const connector = i === dirs.length - 1 ? "└── " : "├── ";
            lines.push(`${connector}${dir}/`);
        });
        Object.keys(files)
            .filter((f) => !f.startsWith("."))
            .forEach((file) => {
                lines.push(`├── ${file}`);
            });
        addLines(setLines, lines);
    },
    { category: "navigation", usage: "tree" }
);

// --- FILESYSTEM COMMANDS ---

export const cat: Command = createCommand(
    "cat",
    "Read file",
    (args, { setLines, files }) => {
        const filename = args[0];
        if (!filename) {
            addLine(setLines, "Usage: cat [filename]");
            return;
        }
        let content = files[filename];
        if (content !== undefined) {
            if (filename.startsWith(".") && !content.includes(" ")) {
                try {
                    content = atob(content);
                } catch (e) {}
            }
            addLines(setLines, content.split("\n"));
        } else {
            addLine(setLines, `cat: ${filename}: No such file`);
        }
    },
    { category: "utility", usage: "cat [file]" }
);

export const touch: Command = createCommand(
    "touch",
    "Create empty file",
    (args, { setFiles, setLines }) => {
        const filenames = args.filter((arg) => !arg.startsWith("-"));
        if (filenames.length === 0) {
            addLine(setLines, "touch: missing file operand");
            return;
        }
        setFiles((prev) => {
            const next = { ...prev };
            filenames.forEach((name) => {
                if (!next[name]) next[name] = "";
            });
            return next;
        });
    },
    { category: "utility", usage: "touch [file...]" }
);

export const rm: Command = createCommand(
    "rm",
    "Remove files",
    (args, { setLines, setFiles, files }) => {
        if (args.includes("/")) {
            setTimeout(() => {
                setLines([]);
                setTimeout(() => {
                    addLine(setLines, "Kernel panic - not syncing: Fatal exception in interrupt");
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }, 1000);
            }, 500);
            return;
        }
        const filename = args[0];
        if (!filename) {
            addLine(setLines, "rm: missing operand");
            return;
        }
        if (files[filename] !== undefined) {
            setFiles((prev) => {
                const next = { ...prev };
                delete next[filename];
                return next;
            });
            addLine(setLines, `Removed '${filename}'`);
        } else {
            addLine(setLines, `rm: cannot remove '${filename}': No such file`);
        }
    },
    { category: "utility", usage: "rm [file]" }
);

export const cp: Command = createCommand(
    "cp",
    "Copy file",
    (args, { setLines, setFiles, files }) => {
        const src = args[0];
        const dst = args[1];
        if (!src || !dst) {
            addLine(setLines, "Usage: cp [source] [destination]");
            return;
        }
        if (files[src] !== undefined) {
            setFiles((prev) => ({ ...prev, [dst]: prev[src]! }));
            addLine(setLines, `Copied '${src}' to '${dst}'`);
        } else {
            addLine(setLines, `cp: cannot stat '${src}': No such file`);
        }
    },
    { category: "utility", usage: "cp [src] [dst]" }
);

export const mv: Command = createCommand(
    "mv",
    "Move file",
    (args, { setLines, setFiles, files }) => {
        const src = args[0];
        const dst = args[1];
        if (!src || !dst) {
            addLine(setLines, "Usage: mv [source] [destination]");
            return;
        }
        if (files[src] !== undefined) {
            setFiles((prev) => {
                const next = { ...prev, [dst]: prev[src]! };
                delete next[src];
                return next;
            });
            addLine(setLines, `Renamed '${src}' to '${dst}'`);
        } else {
            addLine(setLines, `mv: cannot stat '${src}': No such file`);
        }
    },
    { category: "utility", usage: "mv [src] [dst]" }
);

export const grep: Command = createCommand(
    "grep",
    "Search for patterns",
    (args, { setLines, files }) => {
        const pattern = args[0];
        const filename = args[1];
        if (!pattern || !filename) {
            addLine(setLines, "Usage: grep [pattern] [file]");
            return;
        }
        const content = files[filename];
        if (content === undefined) {
            addLine(setLines, `grep: ${filename}: No such file`);
            return;
        }
        const results = content
            .split("\n")
            .filter((l) => l.toLowerCase().includes(pattern.toLowerCase()));
        if (results.length > 0) addLines(setLines, results);
    },
    { category: "utility", usage: "grep [pattern] [file]" }
);

export const vi: Command = createCommand(
    "vi",
    "Text editor",
    (args, { setLines, setFiles }) => {
        const filename = args[0];
        const content = args.slice(1).join(" ");
        if (!filename) {
            addLine(setLines, "vi: missing filename");
            return;
        }
        if (content) {
            setFiles((prev) => ({ ...prev, [filename]: content }));
            addLine(setLines, `vi: ${filename} saved.`);
        } else {
            addLine(setLines, "vi: (Simulated) Enter content as: vi [file] [content]");
        }
    },
    { category: "utility", usage: "vi [file] [content]" }
);

// --- INFO COMMANDS ---

export const whoami: Command = createCommand(
    "whoami",
    "Display user info",
    (_, { setLines }) => {
        addLines(setLines, [...whoamiInfo]);
    },
    { category: "utility", usage: "whoami" }
);

export const neofetch: Command = createCommand(
    "neofetch",
    "System snapshot",
    (_, { setLines }) => {
        addLines(setLines, [...systemStats()]);
    },
    { category: "utility", usage: "neofetch" }
);

export const uname: Command = createCommand(
    "uname",
    "Display system information",
    (args, { setLines }) => {
        if (args.includes("-a")) {
            addLine(
                setLines,
                "Darwin portfolio-sh 23.0.0 Darwin Kernel Version 23.0.0: Fri Sep 15 14:41:43 PDT 2023; root:xnu-10002.1.13~1/RELEASE_ARM64_T6030 arm64"
            );
        } else if (args.includes("-s")) {
            addLine(setLines, "Darwin");
        } else if (args.includes("-m")) {
            addLine(setLines, "arm64");
        } else {
            addLine(setLines, "Darwin");
        }
    },
    { category: "utility", usage: "uname [-a|-s|-m]" }
);

export const skills: Command = createCommand(
    "skills",
    "List technical skills",
    (_, { setLines }) => {
        addLines(setLines, [
            "Languages:  TypeScript, JavaScript, Python, Java, C++, SQL",
            "Frontend:   React, Next.js, TailwindCSS, Framer Motion, Redux",
            "Backend:    Node.js, Express, PostgreSQL, MongoDB, Redis",
            "DevOps:     Docker, Kubernetes, AWS, CI/CD, Git",
        ]);
    },
    { category: "utility", usage: "skills" }
);

export const contact: Command = createCommand(
    "contact",
    "Show contact info",
    (_, { setLines }) => {
        addLines(setLines, [
            "Email:      adarsh.anand.dev@gmail.com",
            "GitHub:     github.com/adarshanand67",
            "LinkedIn:   linkedin.com/in/adarshanand67",
            "Twitter:    @adarshanand67",
        ]);
    },
    { category: "utility", usage: "contact" }
);

export const history: Command = createCommand(
    "history",
    "Show command history",
    (_, { setLines, setHistory }) => {
        setHistory((prev) => {
            const histWithIndex = prev.map((cmd, i) => `${i + 1}  ${cmd}`);
            addLines(setLines, histWithIndex);
            return prev;
        });
    },
    { category: "utility", usage: "history" }
);

export const cowsay: Command = createCommand(
    "cowsay",
    "Talking cow",
    (args, { setLines }) => {
        const text = args.join(" ") || "Moo!";
        const len = text.length + 2;
        const top = " " + "_".repeat(len);
        const bottom = " " + "-".repeat(len);
        const cow = [
            top,
            `< ${text} >`,
            bottom,
            "        \\   ^__^",
            "         \\  (oo)\\_______",
            "            (__)\\       )\\/\\",
            "                ||----w |",
            "                ||     ||",
        ];
        addLines(setLines, cow);
    },
    { category: "fun", usage: "cowsay [text]" }
);

export const matrix: Command = createCommand(
    "matrix",
    "Enter the matrix",
    (_, { setLines }) => {
        addLines(setLines, [
            "Wake up, Neo...",
            "The Matrix has you...",
            "Follow the white rabbit.",
            "Knock, knock, Neo.",
        ]);
    },
    { category: "fun", usage: "matrix" }
);

// --- UTILITY COMMANDS ---

export const git: Command = createCommand(
    "git",
    "Version control",
    (args, { setLines }) => {
        const sub = args[0]?.toLowerCase();
        if (sub === "status") {
            addLine(setLines, "On branch main\nnothing to commit, working tree clean");
        } else if (sub === "push") {
            addLine(setLines, "Everything up-to-date");
        } else {
            addLine(setLines, "git: common commands [status, push, commit, log]");
        }
    },
    { category: "utility", usage: "git [cmd]" }
);

export const date: Command = createCommand(
    "date",
    "Current date",
    (_, { setLines }) => {
        addLine(setLines, new Date().toString());
    },
    { category: "utility", usage: "date" }
);

export const ping: Command = createCommand(
    "ping",
    "Ping host",
    (args, { setLines }) => {
        const host = args[0] || "google.com";
        addLine(
            setLines,
            `PING ${host}: 56 data bytes\n64 bytes from ${host}: icmp_seq=1 ttl=64 time=10.2 ms`
        );
    },
    { category: "utility", usage: "ping [host]" }
);

export const exit: Command = createCommand(
    "exit",
    "Close terminal",
    (_, { setLines, setInput }) => {
        addLine(setLines, "logout...");
        setTimeout(() => {
            setLines([]);
            setInput("");
        }, 500);
    },
    { category: "utility", usage: "exit" }
);

export const welcome: Command = createCommand(
    "welcome",
    "Show intro",
    (_, { setLines }) => {
        addLines(setLines, introLines());
    },
    { category: "utility", usage: "welcome" }
);

export const calc: Command = createCommand(
    "calc",
    "Calculator",
    (args, { setLines }) => {
        const expr = args.join("");
        try {
            addLine(setLines, `${expr} = ${eval(expr)}`);
        } catch {
            addLine(setLines, "Error: Invalid expression");
        }
    },
    { category: "utility", usage: "calc [expr]" }
);

// --- EXTRA EMULATION COMMANDS ---

export const find: Command = createCommand(
    "find",
    "Find files",
    (args, { setLines, files }) => {
        const name = args[0];
        if (!name) {
            addLine(setLines, "Usage: find [name]");
            return;
        }
        const matches = Object.keys(files).filter((f) => f.includes(name));
        addLines(setLines, matches.length ? matches : ["No matches found."]);
    },
    { category: "utility", usage: "find [name]" }
);

export const head: Command = createCommand(
    "head",
    "Show top lines",
    (args, { setLines, files }) => {
        const filename = args[0];
        if (!filename || !files[filename]) {
            addLine(setLines, "File not found.");
            return;
        }
        addLines(setLines, files[filename]!.split("\n").slice(0, 5));
    },
    { category: "utility", usage: "head [file]" }
);

export const tail: Command = createCommand(
    "tail",
    "Show bottom lines",
    (args, { setLines, files }) => {
        const filename = args[0];
        if (!filename || !files[filename]) {
            addLine(setLines, "File not found.");
            return;
        }
        addLines(setLines, files[filename]!.split("\n").slice(-5));
    },
    { category: "utility", usage: "tail [file]" }
);

export const uptime: Command = createCommand(
    "uptime",
    "Display system uptime",
    (_, { setLines }) => {
        addLine(setLines, " 01:50:42 up 2:45, 1 user, load averages: 2.34 2.12 1.98");
    },
    { category: "utility", usage: "uptime" }
);

export const df: Command = createCommand(
    "df",
    "Disk free space",
    (_, { setLines }) => {
        addLines(setLines, [
            "Filesystem   Size   Used  Avail Capacity iused      ifree %iused  Mounted on",
            "/dev/disk3s1 932Gi  234Gi  698Gi    26% 1423456 731234512    0%   /",
        ]);
    },
    { category: "utility", usage: "df" }
);

export const free: Command = createCommand(
    "free",
    "Memory usage",
    (_, { setLines }) => {
        addLines(setLines, [
            "              total        used        free      shared  buff/cache   available",
            "Mem:       65536MiB    24576MiB    40960MiB     1024MiB     2048MiB    40960MiB",
        ]);
    },
    { category: "utility", usage: "free" }
);

// --- AGGREGATED EXPORT ---

export const commands: Record<string, Command> = {
    clear,
    help,
    theme,
    ls,
    cd,
    pwd,
    tree,
    cat,
    touch,
    rm,
    cp,
    mv,
    grep,
    vi,
    whoami,
    neofetch,
    uname,
    uptime,
    df,
    free,
    skills,
    contact,
    history,
    cowsay,
    matrix,
    git,
    date,
    ping,
    exit,
    welcome,
    calc,
    find,
    head,
    tail,
};
