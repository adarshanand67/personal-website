import { createCommand, addLines, addLine } from "./helpers";
import { Command } from "./types";
import { introLines } from "@/lib/constants";

export const date: Command = createCommand(
    "date",
    "Show current date and time",
    (_, { setLines }) => {
        addLine(setLines, new Date().toString());
    },
    { category: "utility", usage: "date" }
);

export const uname: Command = createCommand(
    "uname",
    "Display system information",
    (args, { setLines }) => {
        const flag = args[0];
        if (flag === "-a") {
            addLine(setLines, "Linux terminal-emulator 5.15.0-generic #1 SMP x86_64 GNU/Linux");
        } else if (flag === "-r") {
            addLine(setLines, "5.15.0-generic");
        } else if (flag === "-m") {
            addLine(setLines, "x86_64");
        } else {
            addLine(setLines, "Linux");
        }
    },
    { category: "utility", usage: "uname [-a|-r|-m]" }
);

export const top: Command = createCommand(
    "top",
    "Display process information",
    (_, { setLines }) => {
        addLines(setLines, [
            "Tasks: 12 total,   1 running,  11 sleeping,   0 stopped,   0 zombie",
            "%Cpu(s):  1.5 us,  0.5 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st",
            "MiB Mem :   8192.0 total,   4096.0 free,   2048.0 used,   2048.0 buff/cache",
            "",
            "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
            "    1 root      20   0   12345   1234   1234 S   0.0   0.0   0:01.23 init",
            "   42 user      20   0   54321   5432   5432 S   1.0   0.1   0:05.67 next-dev",
            "   89 user      20   0   67890   6789   6789 R   1.5   0.1   0:00.12 top",
            "  123 user      20   0   32109   3210   3210 S   0.0   0.0   0:02.34 bash",
        ]);
    },
    { category: "utility", usage: "top" }
);

export const curl: Command = createCommand(
    "curl",
    "Fetch URL content",
    async (args, { setLines }) => {
        const url = args[0];
        if (!url) {
            addLine(setLines, "Usage: curl [url]");
            return;
        }
        addLine(setLines, `Fetching content from ${url}...`);
        try {
            const res = await fetch(url);
            const text = await res.text();
            addLines(setLines, text.split("\n").slice(0, 20)); // Limit output
            if (text.split("\n").length > 20) {
                addLine(setLines, "...");
            }
        } catch {
            addLine(setLines, "curl: (7) Failed to connect to host");
        }
    },
    { category: "utility", usage: "curl [url]" }
);

export const matrix: Command = createCommand(
    "matrix",
    "Matrix digital rain effect",
    (_, { setLines }) => {
        const matrixLines = [
            "\x1b[32m0101010101010101010101010101010101010101\x1b[0m",
            "\x1b[32m1010101010101010101010101010101010101010\x1b[0m",
            "\x1b[32m0101010101010101010101010101010101010101\x1b[0m",
            "\x1b[32mTHE MATRIX HAS YOU\x1b[0m",
            "\x1b[32m1010101010101010101010101010101010101010\x1b[0m",
            "\x1b[32m0101010101010101010101010101010101010101\x1b[0m",
            "\x1b[32mFOLLOW THE WHITE RABBIT\x1b[0m",
        ];
        addLines(setLines, matrixLines);
    },
    { category: "utility", usage: "matrix" }
);

export const man: Command = createCommand(
    "man",
    "Show manual page",
    (args, { setLines }) => {
        const cmd = args[0];
        if (!cmd) {
            addLine(setLines, "What manual page do you want?");
            return;
        }
        addLine(setLines, `No manual entry for ${cmd}`);
        addLine(setLines, "Try: help");
    },
    { category: "utility", usage: "man [command]" }
);

export const exit: Command = createCommand(
    "exit",
    "Close terminal session",
    (_, { setLines, setInput }) => {
        addLine(setLines, "logout");
        addLine(setLines, "[Process completed]");
        setTimeout(() => {
            setLines([]);
            setInput("");
        }, 1000);
    },
    { category: "utility", usage: "exit" }
);

export const banner: Command = createCommand(
    "banner",
    "Display a banner",
    (args, { setLines }) => {
        const text = args.join(" ") || "ADARSH";
        addLines(setLines, [
            "  _____  _____  _____  _____  _____  _____  ",
            " |  _  ||  _  ||  _  ||  _  ||  _  ||  _  | ",
            " | |_| || |_| || |_| || |_| || |_| || |_| | ",
            " |  _  ||  _  ||  _  ||  _  ||  _  ||  _  | ",
            " |_| |_||_| |_||_| |_||_| |_||_| |_||_| |_| ",
            `             ${text.toUpperCase()}             `,
        ]);
    },
    { category: "utility", usage: "banner [text]" }
);

export const cowsay: Command = createCommand(
    "cowsay",
    "Make the cow say something",
    (args, { setLines }) => {
        const text = args.join(" ") || "Moo!";
        const line = " ".repeat(text.length + 2).replace(/./g, "-");
        addLines(setLines, [
            `  ${line}`,
            `< ${text} >`,
            `  ${line}`,
            "        \\   ^__^",
            "         \\  (oo)\\_______",
            "            (__)\\       )\\/\\",
            "                ||----w |",
            "                ||     ||",
        ]);
    },
    { category: "utility", usage: "cowsay [text]" }
);

export const df: Command = createCommand(
    "df",
    "Show disk usage",
    (_, { setLines }) => {
        addLines(setLines, [
            "Filesystem     1K-blocks      Used Available Use% Mounted on",
            "udev             4065608         0   4065608   0% /dev",
            "tmpfs             816736      1564    815172   1% /run",
            "/dev/sda1       51172312  24567890  26604422  48% /",
            "tmpfs            4083676         0   4083676   0% /dev/shm",
        ]);
    },
    { category: "utility", usage: "df" }
);

export const free: Command = createCommand(
    "free",
    "Show memory usage",
    (_, { setLines }) => {
        addLines(setLines, [
            "              total        used        free      shared  buff/cache   available",
            "Mem:        8167352     2048567     4096123      123456     1024567     6048765",
            "Swap:       2097148           0     2097148",
        ]);
    },
    { category: "utility", usage: "free" }
);

export const who: Command = createCommand(
    "who",
    "Show who is logged in",
    (_, { setLines }) => {
        addLine(setLines, "user     tty1         2025-12-27 00:00 (:0)");
    },
    { category: "utility", usage: "who" }
);

export const id: Command = createCommand(
    "id",
    "Show user and group IDs",
    (_, { setLines }) => {
        addLine(setLines, "uid=1000(user) gid=1000(user) groups=1000(user),27(sudo),46(plugdev)");
    },
    { category: "utility", usage: "id" }
);

export const ping: Command = createCommand(
    "ping",
    "Ping a host",
    (args, { setLines }) => {
        const host = args[0] || "google.com";
        addLine(setLines, `PING ${host} (${host}): 56 data bytes`);
        addLine(setLines, `64 bytes from ${host}: icmp_seq=0 ttl=64 time=10.2 ms`);
        addLine(setLines, `64 bytes from ${host}: icmp_seq=1 ttl=64 time=12.5 ms`);
        addLine(setLines, `64 bytes from ${host}: icmp_seq=2 ttl=64 time=11.1 ms`);
        addLine(setLines, `--- ${host} ping statistics ---`);
        addLine(setLines, "3 packets transmitted, 3 packets received, 0.0% packet loss");
    },
    { category: "utility", usage: "ping [host]" }
);

export const tree: Command = createCommand(
    "tree",
    "Display directory structure as tree",
    (_, { setLines }) => {
        addLines(setLines, [
            ".",
            "├── articles/",
            "├── bookshelf/",
            "├── animeshelf/",
            "├── hobbyshelf/",
            "├── .secret.txt",
            "├── .config",
            "└── README.md",
        ]);
    },
    { category: "navigation", usage: "tree" }
);

export const welcome: Command = createCommand(
    "welcome",
    "Show welcome message",
    (_, { setLines }) => {
        addLines(setLines, introLines());
    },
    { category: "utility", usage: "welcome" }
);
