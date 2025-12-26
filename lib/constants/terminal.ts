/**
 * @fileoverview Terminal display constants - system stats, intro lines, and info displays.
 * Contains ANSI-colored terminal output for neofetch-style system information.
 */
import { siteConfig } from "@/lib/config";

/**
 * System stats display with ANSI color codes.
 * Mimics neofetch output for macOS system information.
 * @returns {readonly string[]} Array of formatted system stat lines
 */
export const systemStats = () =>
    [
        "                    \x1b[32m'c.\x1b[0m          \x1b[1madarsh@macbook\x1b[0m",
        "                 \x1b[33m,xNMM.\x1b[0m          --------------",
        "               \x1b[31m.OMMMMo\x1b[0m           \x1b[36mOS:\x1b[0m macOS Sonoma 14.1",
        "               \x1b[31mOMMM0,\x1b[0m            \x1b[36mHost:\x1b[0m MacBook Pro M3",
        "     \x1b[31m.;loddo:'\x1b[0m \x1b[33mloolloddol;.\x1b[0m      \x1b[36mKernel:\x1b[0m Darwin 23.1.0",
        "   \x1b[33mcKMMMMMMMMMMNWMMMMMMMMMM0:\x1b[0m    \x1b[36mUptime:\x1b[0m 2 hours, 45 mins",
        " \x1b[33m.KMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mPackages:\x1b[0m 142 (brew)",
        " \x1b[32mXMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mShell:\x1b[0m zsh 5.9",
        "\x1b[32m;MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mResolution:\x1b[0m 2880x1800",
        "\x1b[34m:MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mDE:\x1b[0m Aqua",
        "\x1b[34m.MMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mWM:\x1b[0m Quartz Compositor",
        " \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mTerminal:\x1b[0m portfolio-sh",
        " \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m   \x1b[36mCPU:\x1b[0m Apple M3 Max",
        "  \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m   \x1b[36mGPU:\x1b[0m Apple M3 Max",
        "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mMemory:\x1b[0m 64GB",
        "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m",
        "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m",
    ] as const;

/**
 * Terminal intro lines simulating Linux boot sequence.
 * @returns {readonly string[]} Array of boot log lines followed by neofetch output
 */
export const introLines = () => ["$ neofetch", ...systemStats(), ""];

/** Contact information display for terminal. */
export const contactInfo = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`,
] as const;

/** Whoami command output with user information. */
export const whoamiInfo = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`,
] as const;
