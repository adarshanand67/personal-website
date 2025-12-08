import { Command, CommandContext } from "./types";
import { DIRECTORY_MAP, DIRECTORIES, CONTACT_INFO, SYSTEM_STATS, WHOAMI_INFO } from "@/lib/constants";

export const commands: Record<string, Command> = {
    help: {
        name: "help",
        description: "List available commands",
        execute: (_, { setLines }) => {
            const helpText = [
                "Available commands:",
                "  ls              - List directories",
                "  cd [dir]        - Change directory",
                "  open [dir]      - Open directory",
                "  whoami          - Display profile info",
                "  theme [mode]    - Set theme (light/dark/system)",
                "  date            - Show current date/time",
                "  clear / cls     - Clear terminal",
                "  sudo            - Execute with superuser privileges",
                "  contact         - Show contact info",
                "  fetch           - Display system information",
                "  matrix          - Toggle Matrix Rain effect",
                "  music [cmd]     - Control music (play/pause/next/prev)",
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
            const dir = args[0].replace(/^\.\//, "").replace(/\/$/, "").replace("shelf", "");
            if (DIRECTORY_MAP[dir]) {
                setLines((prev) => [...prev, `Navigating to ${DIRECTORY_MAP[dir]}...`]);
                router.push(DIRECTORY_MAP[dir]);
            } else {
                setLines((prev) => [...prev, `Directory not found: ${args[0]}`]);
            }
        },
    },
    open: {
        name: "open",
        description: "Open directory",
        execute: (args, ctx) => commands.cd.execute(args, ctx),
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
                const mode = args[0].toLowerCase();
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
                const action = args[0].toLowerCase();
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
        description: "Clear terminal",
        execute: (_, ctx) => commands.clear.execute(_, ctx),
    },
    contact: {
        name: "contact",
        description: "Show contact info",
        execute: (_, { setLines }) => {
            setLines((prev) => [...prev, ...CONTACT_INFO]);
        },
    },
};
