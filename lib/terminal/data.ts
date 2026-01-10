import { routes } from "@/lib/constants";

export const mockFiles: Record<string, string> = {
  "README.md":
    "# Welcome\n\nWelcome to my interactive terminal portfolio. Type 'help' to see available commands.",
  "about.md":
    "I am a Software Engineer passionate about low-level systems and security.",
  "contact.txt":
    "Email: adarshan20302@gmail.com\nLinkedIn: linkedin.com/in/adarshanand67",
};

export const directories = ["projects", "blog", "config"];

export const directoryStructure: any = {
  root: {
    files: mockFiles,
    dirs: {
      projects: {},
      blog: {},
      config: {},
    },
  },
};

export const commands: Record<string, any> = {
  help: {
    execute: (_: any, { setLines }: any) => {
      setLines((lines: string[]) => [
        ...lines,
        "Available commands:",
        "  help      - Show this help message",
        "  clear     - Clear the terminal",
        "  ls        - List directory contents",
        "  cat       - Read a file",
        "  whoami    - Display user info",
        "  date      - Show current date",
        "  echo      - Print arguments",
        "  pwd       - Print working directory",
        "  neofetch  - Display system info",
      ]);
    },
  },
  clear: {
    execute: (_: any, { setLines }: any) => {
      setLines([]);
    },
  },
  ls: {
    execute: (_: any, { setLines }: any) => {
      setLines((prev: string[]) => [
        ...prev,
        Object.keys(mockFiles).join("  ") +
          "  " +
          directories.map((d) => d + "/").join("  "),
      ]);
    },
  },
  whoami: {
    execute: (_: any, { setLines }: any) => {
      setLines((prev: string[]) => [...prev, "guest@portfolio"]);
    },
  },
  date: {
    execute: (_: any, { setLines }: any) => {
      setLines((prev: string[]) => [...prev, new Date().toString()]);
    },
  },
  echo: {
    execute: (args: string[], { setLines }: any) => {
      setLines((prev: string[]) => [...prev, args.join(" ")]);
    },
  },
  pwd: {
    execute: (_: any, { setLines }: any) => {
      setLines((prev: string[]) => [...prev, "/home/guest"]);
    },
  },
  neofetch: {
    execute: (_: any, { setLines }: any) => {
      // This should trigger the intro lines again or similar
      // For now just basic info
      setLines((prev: string[]) => [...prev, "Adarsh's Portfolio System v1.0"]);
    },
  },
};
