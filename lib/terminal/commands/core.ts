import { createCommand, addLines, addLine } from "./helpers";
import { Command } from "./types";

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
            "  ls            - List directory contents",
            "  tree          - Show directory tree",
            "  pwd           - Show current directory",
            "  open [link]   - Open URL or directory",
            "",
            "Information:",
            "  whoami        - Display profile info",
            "  cat [file]    - Read file content",
            "  contact       - Show contact information",
            "  skills        - Display technical skills",
            "  neofetch      - System snapshot",
            "  uptime        - System uptime",
            "  date          - Current date/time",
            "  uname         - System info",
            "  df            - Disk usage",
            "  free          - Memory usage",
            "  who           - Logged in users",
            "  id            - User identity",
            "",
            "Utility:",
            "  help          - Show this help",
            "  welcome       - Show welcome intro",
            "  todo [cmd]    - Todo manager",
            "  calc [expr]   - Math calculator",
            "  github        - GitHub stats",
            "  curl [url]    - Fetch URL",
            "  ping [host]   - Ping a host",
            "  history       - Command history",
            "  clear         - Clear terminal",
            "  theme [mode]  - Set color theme",
            "  exit          - Close session",
            "",
            "Fun:",
            "  matrix        - Enter the matrix",
            "  cowsay [text] - Talking cow",
            "  banner [text] - Large text banner",
            "  haiku         - Tech haiku",
            "  joke          - Random joke",
            "  quote         - Tech quote",
            "  fortune       - Tech fortune",
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
