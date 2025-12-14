export const TERMINAL_MESSAGES = {
    ERRORS: {
        READ_ONLY: "Read-only file system",
        PERMISSION_DENIED: (cmd: string) => `${cmd}: Operation not permitted`,
        NO_SUCH_FILE: (cmd: string, file: string) => `${cmd}: ${file}: No such file or directory`,
        CMD_NOT_FOUND: (cmd: string) => `Command not found: ${cmd}`,
        USAGE: (usage: string) => `Usage: ${usage}`,
        NO_INPUT: "Error: No input provided",
        INVALID_THEME: (mode: string) => `Invalid theme: ${mode}. Use dark, light, or system.`,
    },
    SUCCESS: {
        THEME_SET: (mode: string) => `Theme set to ${mode} mode.`,
    },
    RESUME: {
        SUMMARY: "SUMMARY",
        EXPERIENCE: "EXPERIENCE",
        EDUCATION: "EDUCATION",
        SKILLS: "SKILLS",
        FOOTER: "Type 'skills' for detailed technical breakdown.",
    },
    FILE_OPS: {
        MKDIR_FAIL: (dir: string) => `mkdir: cannot create directory '${dir}': Read-only file system`,
        TOUCH_FAIL: (file: string) => `touch: cannot touch '${file}': Read-only file system`,
        TAR_MSG: "tar: This is a web portfolio, not a real filesystem.",
        ZIP_MSG: (file: string) => `  adding: ${file}`,
        UNZIP_DONE: "Done!",
    },
    CTF: {
        CONGRATS_HEADER: "CONGRATS!",
        FOUND_FLAG: "You found the hidden flag!",
        RICKROLL: "Enjoy your reward!",
    }
} as const;
