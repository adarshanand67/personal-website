"use client";

import React, { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TodoItem } from "@/lib/store";
import {
  directoryMap,
  contactInfo,
  whoamiInfo,
  systemStats,
} from "@/lib/constants";

// ============================================================================
// Types
// ============================================================================

export type ThemeMode = "light" | "dark" | "system";
export type CommandCategory = "navigation" | "utility";
export type CommandArgs = readonly string[];

export interface CommandContext {
  setLines: Dispatch<SetStateAction<string[]>>;
  setPasswordMode: (mode: boolean) => void;
  router: AppRouterInstance;
  setTheme: (theme: ThemeMode) => void;
  setInput: (input: string) => void;
  history: readonly string[];
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearTodos: () => void;
}

export type CommandFn = (
  args: CommandArgs,
  context: CommandContext,
  input?: string,
) => void | Promise<void>;

export interface Command {
  readonly name: string;
  readonly description: string;
  readonly category?: CommandCategory;
  readonly usage?: string;
  readonly execute: CommandFn;
}

// ============================================================================
// ANSI Parser
// ============================================================================

export const parseAnsi = (text: string) => {
  if (typeof text !== "string") return "";

  const ansiColors: Record<string, string> = {
    "30": "text-black",
    "31": "text-red-500",
    "32": "text-green-500",
    "33": "text-yellow-500",
    "34": "text-blue-500",
    "35": "text-purple-500",
    "36": "text-cyan-500",
    "37": "text-white",
    "90": "text-gray-500",
    "1": "font-bold",
    "2": "opacity-50",
    "4": "underline",
    "0": "",
  };

  try {
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentClasses: string[] = [];

    return parts
      .map((part, idx) => {
        if (!part) return null;
        const match = part.match(/\x1b\[([0-9;]*)m/);
        if (match) {
          const codes = match[1].split(";");
          codes.forEach((code) => {
            if (code === "0") {
              currentClasses = [];
            } else if (ansiColors[code]) {
              if (
                (parseInt(code) >= 30 && parseInt(code) <= 37) ||
                code === "90"
              ) {
                currentClasses = currentClasses.filter(
                  (c) => !Object.values(ansiColors).slice(0, 9).includes(c),
                );
              }
              currentClasses.push(ansiColors[code]);
            }
          });
          return null;
        }
        const classes = currentClasses.join(" ");
        return classes ? (
          <span key={idx} className={classes}>
            {" "}
            {part}{" "}
          </span>
        ) : (
          part
        );
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("Error parsing ANSI:", error);
    return text;
  }
};

// ============================================================================
// Mock File System
// ============================================================================

export const mockFiles: Record<string, string> = {
  "README.md": "# Portfolio\nWelcome to my interactive portfolio!",
  "about.txt":
    "Software Development Engineer @Trellix\nFocusing on data security and C++",
  ".secret.txt":
    "WW91IGZvdW5kIHRoZSBoaWRkZW4gdGV4dCBmaWxlISBZb3UgYXJlIHBlcnNpc3RlbnQu",
  ".config": '{"theme": "terminal", "autoInit": true, "secretMode": false}',
  ".ctf_hint.txt":
    "VGhlIHBhc3N3b3JkIHlvdSBzZWVrIGlzIHRoZSBuYW1lIG9mIHRoaXMgYXNzaXN0YW50OiAiQU5USUJSQVZJVFki",
  ".root_flag": "RkxBR3tZMFVfNFIzX1RIM19NNVNUMVJfMEZfVEgzX1VOMVYzUlMzfQ==",
};

export const getFileContent = (path: string): string | null =>
  mockFiles[path] || null;

// ============================================================================
// Command Helpers
// ============================================================================

const addLine = (
  setLines: Dispatch<SetStateAction<string[]>>,
  line: string,
) => {
  setLines((prev) => [...prev, line]);
};

const addLines = (
  setLines: Dispatch<SetStateAction<string[]>>,
  lines: string[],
) => {
  setLines((prev) => [...prev, ...lines]);
};

const createCommand = (
  name: string,
  description: string,
  execute: CommandFn,
  options?: { category?: CommandCategory; usage?: string },
): Command => ({
  name,
  description,
  execute,
  category: options?.category,
  usage: options?.usage || name,
});

const createAliasCommand = (
  name: string,
  description: string,
  getTarget: () => Command,
): Command => ({
  name,
  description,
  execute: (args, context) => getTarget().execute(args, context),
  category: "utility",
  usage: name,
});

// ============================================================================
// Commands
// ============================================================================

export const clear: Command = createCommand(
  "clear",
  "Clear terminal",
  (_, { setLines, setInput }) => {
    setLines([]);
    setInput("");
  },
  { category: "utility" },
);

export const help: Command = createCommand(
  "help",
  "Show available commands",
  (_, { setLines }) => {
    addLines(setLines, [
      "Available Commands:",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Navigation: cd [dir], ls, pwd, open [link]",
      "Info: whoami, cat [file], contact, skills, history, todo [cmd]",
      "Utility: clear, github, haiku, calc [expr], uptime, fortune, quote, joke, echo [text], help, theme [mode]",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ]);
  },
  { category: "utility" },
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
    setTheme?.(mode as any);
    addLine(setLines, `Theme set to ${mode} mode.`);
  },
  { category: "utility", usage: "theme [light|dark|system]" },
);

export const ls: Command = createCommand(
  "ls",
  "List directories",
  (args, { setLines }) => {
    const showAll = args.includes("-a") || args.includes("-la");
    const dirs = Object.keys(directoryMap);
    const files = showAll ? [...dirs, ".secret.txt", ".config"] : dirs;
    addLines(
      setLines,
      files.map((d) => `  ${d}${dirs.includes(d) ? "/" : ""}`),
    );
  },
  { category: "navigation", usage: "ls [-a]" },
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
    if (route) router?.push(route);
    else addLine(setLines, `cd: ${target}: No such directory`);
  },
  { category: "navigation" },
);

export const pwd: Command = createCommand(
  "pwd",
  "Print working directory",
  (_, { setLines }) => {
    addLine(setLines, "/home/portfolio");
  },
  { category: "navigation" },
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
      if (route) router?.push(route);
      else addLine(setLines, `open: ${target}: No such file or directory`);
    }
  },
  { category: "navigation", usage: "open [link]" },
);

export const whoami: Command = createCommand(
  "whoami",
  "Display profile info",
  (_, { setLines }) => {
    addLines(setLines, [...whoamiInfo] as string[]);
  },
  { category: "utility" },
);

export const cat: Command = createCommand(
  "cat",
  "Read file",
  (args, { setLines }) => {
    const filename = args[0];
    if (!filename) {
      addLine(setLines, "Usage: cat [filename]");
      return;
    }
    let content = getFileContent(filename);
    if (content) {
      if (filename.startsWith(".") && !content.includes(" ")) {
        try {
          content = atob(content);
        } catch (e) {}
      }
      addLines(setLines, content.split("\n"));
    } else addLine(setLines, `cat: ${filename}: No such file`);
  },
  { category: "utility", usage: "cat [file]" },
);

export const skills: Command = createCommand(
  "skills",
  "Display technical skills",
  (_, { setLines }) => {
    addLines(setLines, [
      "Technical Skills:",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Languages:    C++ | Python | Rust | TypeScript",
      "Security:     Intel SGX/TDX | Cryptography | DLP",
      "Systems:      Linux | Docker | LLVM | Fuzzing",
      "Web:          Next.js | React | Node.js",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ]);
  },
  { category: "utility" },
);

export const contact: Command = createCommand(
  "contact",
  "Show contact info",
  (_, { setLines }) => {
    addLines(setLines, [...contactInfo] as string[]);
  },
  { category: "utility" },
);

export const github: Command = createCommand(
  "github",
  "Show GitHub statistics",
  async (_, { setLines }) => {
    addLine(setLines, "Fetching GitHub stats...");
    try {
      const res = await fetch("https://api.github.com/users/adarshanand67");
      const data = await res.json();
      addLines(setLines, [
        `User: ${data.login}`,
        `Repos: ${data.public_repos}`,
        `Followers: ${data.followers}`,
        `Bio: ${data.bio || "N/A"}`,
      ]);
    } catch {
      addLine(setLines, "Error: Unable to fetch GitHub profile.");
    }
  },
  { category: "utility" },
);

export const neofetch: Command = createCommand(
  "neofetch",
  "Display system information",
  (_, { setLines }) => {
    addLines(setLines, [...systemStats()] as string[]);
  },
  { category: "utility" },
);

export const sudo: Command = createCommand(
  "sudo",
  "Execute as superuser",
  (args, { setLines }) => {
    const password = args[0];
    if (password === "ANTIGRAVITY") {
      setTimeout(() => {
        addLines(setLines, [
          "\x1b[32m[ACCESS GRANTED]\x1b[0m",
          "Root privileges escalated. Try: cat .root_flag",
        ]);
      }, 800);
    } else {
      setTimeout(() => addLine(setLines, "sudo: incorrect password"), 500);
    }
  },
  { category: "utility", usage: "sudo [password]" },
);

export const rm: Command = createCommand(
  "rm",
  "Remove files",
  (args, { setLines }) => {
    if (args.includes("/")) {
      setTimeout(() => {
        setLines([]);
        setTimeout(() => {
          addLine(setLines, "Kernel panic - not syncing: Fatal exception");
          setTimeout(() => location.reload(), 2000);
        }, 1000);
      }, 500);
    } else addLine(setLines, "rm: Permission denied.");
  },
  { category: "utility" },
);

export const todo: Command = createCommand(
  "todo",
  "Todo list manager",
  (args, context) => {
    const { setLines, todos, addTodo, toggleTodo, removeTodo, clearTodos } =
      context;
    const sub = args[0]?.toLowerCase();
    if (!sub || sub === "ls" || sub === "list") {
      if (todos.length === 0) addLine(setLines, "Todo list is empty.");
      else
        addLines(setLines, [
          "Todo List:",
          ...todos.map(
            (t, i) =>
              `${i + 1}. [${t.completed ? "x" : " "}] ${t.text} (${t.id})`,
          ),
        ]);
    } else if (sub === "add") {
      const text = args.slice(1).join(" ");
      if (!text) addLine(setLines, "Usage: todo add [task]");
      else {
        addTodo(text);
        addLine(setLines, `Added: ${text}`);
      }
    } else if (sub === "done") {
      if (!args[1]) addLine(setLines, "Usage: todo done [id]");
      else {
        toggleTodo(args[1]);
        addLine(setLines, `Toggled: ${args[1]}`);
      }
    } else if (sub === "rm") {
      if (!args[1]) addLine(setLines, "Usage: todo rm [id]");
      else {
        removeTodo(args[1]);
        addLine(setLines, `Removed: ${args[1]}`);
      }
    } else if (sub === "clear") {
      clearTodos();
      addLine(setLines, "Cleared all todos.");
    }
  },
  { category: "utility", usage: "todo [ls|add|done|rm|clear]" },
);

export const haiku: Command = createCommand(
  "haiku",
  "Generate a tech haiku",
  (_, { setLines }) => {
    const haikus = [
      [
        "Code flows like a stream,",
        "Bugs hide in the shadows deep,",
        "Logic finds the way.",
      ],
    ];
    const pick = haikus[Math.floor(Math.random() * haikus.length)];
    addLines(setLines, ["", ...pick, ""]);
  },
  { category: "utility" },
);

export const history: Command = createCommand(
  "history",
  "Show command history",
  (_, { setLines, history }) => {
    if (history.length === 0) {
      addLine(setLines, "No history found.");
      return;
    }
    addLines(
      setLines,
      [...history]
        .slice(0)
        .reverse()
        .map((cmd, i) => `${i + 1}  ${cmd}`),
    );
  },
  { category: "utility" },
);

export const calc: Command = createCommand(
  "calc",
  "Evaluate math",
  (args, { setLines }) => {
    const expr = args.join(" ");
    if (!expr) {
      addLine(setLines, "Usage: calc [expression]");
      return;
    }
    try {
      if (/[^0-9+\-*/().\s]/.test(expr)) throw new Error();
      addLine(setLines, `${expr} = ${new Function(`return ${expr}`)()}`);
    } catch {
      addLine(setLines, "Error: Invalid expression");
    }
  },
  { category: "utility" },
);

export const uptime: Command = createCommand(
  "uptime",
  "Show system uptime",
  (_, { setLines }) => {
    const startTime = (globalThis as any)._terminalStartTime || Date.now();
    const diff = Math.floor((Date.now() - startTime) / 1000);
    addLine(setLines, `up ${Math.floor(diff / 60)} min, ${diff % 60} sec`);
  },
  { category: "utility" },
);

export const fortune: Command = createCommand(
  "fortune",
  "Your daily tech fortune",
  (_, { setLines }) => {
    const fortunes = [
      "Coffee is the input, code is the output.",
      "A bug you found today will be fixed tomorrow.",
    ];
    addLine(setLines, fortunes[Math.floor(Math.random() * fortunes.length)]!);
  },
  { category: "utility" },
);

export const quote: Command = createCommand(
  "quote",
  "Get a tech quote",
  async (_, { setLines }) => {
    addLine(
      setLines,
      '"The best way to predict the future is to invent it." — Alan Kay',
    );
  },
  { category: "utility" },
);

export const joke: Command = createCommand(
  "joke",
  "Random programmer joke",
  (_, { setLines }) => {
    addLine(
      setLines,
      "Why do programmers prefer dark mode? Because light attracts bugs.",
    );
  },
  { category: "utility" },
);

export const echo: Command = createCommand(
  "echo",
  "Print text",
  (args, { setLines }) => {
    addLine(setLines, args.join(" "));
  },
  { category: "utility" },
);

export const cls: Command = createAliasCommand(
  "cls",
  "Clear screen",
  () => clear,
);

export const commands: Record<string, Command> = {
  clear,
  help,
  skills,
  contact,
  theme,
  ls,
  cd,
  pwd,
  whoami,
  cat,
  sudo,
  rm,
  open,
  neofetch,
  github,
  haiku,
  history,
  calc,
  uptime,
  fortune,
  todo,
  joke,
  quote,
  echo,
  cls,
};
