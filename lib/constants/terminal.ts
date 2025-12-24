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
export const systemStats = () => [
    "                    \x1b[32m'c.\x1b[0m          \x1b[1madarsh_anand@Adarshs-MacBook-Air.local\x1b[0m",
    "                 \x1b[33m,xNMM.\x1b[0m          ",
    "               \x1b[31m.OMMMMo\x1b[0m           \x1b[36mOS:\x1b[0m macOS 27.0 26A5289h arm64",
    "               \x1b[31mOMMM0,\x1b[0m            \x1b[36mHost:\x1b[0m Mac16,13",
    "     \x1b[31m.;loddo:'\x1b[0m \x1b[33mloolloddol;.\x1b[0m      \x1b[36mKernel:\x1b[0m 27.0.0",
    "   \x1b[33mcKMMMMMMMMMMNWMMMMMMMMMM0:\x1b[0m    \x1b[36mUptime:\x1b[0m 3 days, 16 hours, 14 mins",
    " \x1b[33m.KMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mPackages:\x1b[0m 295 (brew)",
    " \x1b[32mXMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mShell:\x1b[0m zsh 5.9",
    "\x1b[32m;MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mResolution:\x1b[0m 1440x932",
    "\x1b[34m:MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mDE:\x1b[0m Aqua",
    "\x1b[34m.MMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mWM:\x1b[0m Quartz Compositor",
    " \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mWM Theme:\x1b[0m Blue (Light)",
    " \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m   \x1b[36mTerminal:\x1b[0m Apple_Terminal",
    "  \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m   \x1b[36mTerminal Font:\x1b[0m SFMonoTerminal-Regular",
    "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mCPU:\x1b[0m Apple M4 (10-core)",
    "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m      \x1b[36mGPU:\x1b[0m Apple M4 Integrated",
    "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m        \x1b[36mMemory:\x1b[0m 3226MiB / 16384MiB",
] as const;

/**
 * Terminal intro lines simulating Linux boot sequence.
 * @returns {readonly string[]} Array of boot log lines followed by neofetch output
 */
export const introLines = () => [
    "[  0.000000] Linux version 27.0.0-ADARSH (gcc version 14.2.1)",
    "[  0.004123] Command line: initrd=intel-ucode.img root=UUID=ADARSH-OS",
    "[  0.012541] x86/fpu: Supporting XSAVE feature 0x01: 'x87 floating point registers'",
    "[  0.045129] secureboot: Secure boot enabled",
    "[  0.154210] Memory: 16383K/1048576K available",
    "[  0.412589] Mount-cache hash table entries: 16384 (order: 5, 131072 bytes)",
    "[  0.841253] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0",
    "[  1.124589] NET: Registered protocol family 2 (AF_INET)",
    "[  1.458963] usb 1-1: new high-speed USB device number 2 using xhci_hcd",
    "[  2.012458] clocksource: Switched to clocksource tsc",
    "[  2.415896] systemd[1]: Inserted module 'autofs4'",
    "[  2.784125] systemd[1]: Set hostname to <ADARSH-AIR>",
    "[  3.124589] adarsh-os login: adarsh (automatic login)",
    "Welcome to Adarsh OS 27.0.0-LTS (GNU/Linux arm64)",
    "* Documentation: https://adarshanand.dev",
    "* Management: https://github.com/adarshanand67",
    "",
    "$ neofetch",
    ...systemStats(),
    "",
];

/** Contact information display for terminal. */
export const contactInfo = [
    `Email: ${siteConfig.contact.email}`,
    `LinkedIn: ${siteConfig.contact.linkedin}`,
    `GitHub: ${siteConfig.contact.github}`
] as const;

/** Whoami command output with user information. */
export const whoamiInfo = [
    `User: ${siteConfig.whoami.user}`,
    `Role: ${siteConfig.whoami.role}`,
    `Expertise: ${siteConfig.whoami.expertise}`,
    `Status: ${siteConfig.whoami.status}`
] as const;
