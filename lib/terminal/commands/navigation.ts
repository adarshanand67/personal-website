import { createCommand, addLines, addLine } from "./helpers";
import { Command } from "./types";
import { directoryMap } from "@/lib/constants";

export const ls: Command = createCommand(
    "ls",
    "List directories",
    (args, { setLines }) => {
        const showAll = args.some((arg) => arg.includes("a"));
        const showLong = args.some((arg) => arg.includes("l"));

        const dirs = Object.keys(directoryMap);
        const files = showAll
            ? [...dirs, ".secret.txt", ".config", ".ctf_hint.txt", ".root_flag"]
            : dirs;

        if (showLong) {
            const output = files.map((name) => {
                const isDir = dirs.includes(name);
                const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                const owner = "user user";
                const size = isDir ? "4096" : (name.length * 42).toString(); // Mock size
                const date = "Dec 27 00:00";
                return `${perms} 1 ${owner} ${size.padStart(5)} ${date} ${name}${isDir ? "/" : ""}`;
            });
            addLines(setLines, output);
        } else {
            addLines(
                setLines,
                files.map((d) => `  ${d}${dirs.includes(d) ? "/" : ""}`)
            );
        }
    },
    { category: "navigation", usage: "ls [-a] [-l]" }
);

export const cd: Command = createCommand(
    "cd",
    "Change directory",
    (args, { setLines, router }) => {
        const target = args[0];
        if (!target) {
            router?.push("/");
            return;
        }
        const route = directoryMap[target as keyof typeof directoryMap];
        if (route) {
            router?.push(route);
        } else {
            addLine(setLines, `cd: ${target}: No such directory`);
        }
    },
    { category: "navigation", usage: "cd [directory]" }
);

export const pwd: Command = createCommand(
    "pwd",
    "Print working directory",
    (_, { setLines }) => {
        addLine(setLines, "/home/portfolio");
    },
    { category: "navigation", usage: "pwd" }
);

export const open: Command = createCommand(
    "open",
    "Open directory or URL",
    (args, { router, setLines }) => {
        const target = args[0];
        if (!target) {
            addLine(setLines, "Usage: open [url/dir]");
            return;
        }
        if (target.startsWith("http")) {
            window.open(target, "_blank");
            addLine(setLines, `Opening ${target}...`);
        } else {
            const route = directoryMap[target as keyof typeof directoryMap];
            if (route) {
                router?.push(route);
            } else {
                addLine(setLines, `open: ${target}: No such file or directory`);
            }
        }
    },
    { category: "navigation", usage: "open [link]" }
);
