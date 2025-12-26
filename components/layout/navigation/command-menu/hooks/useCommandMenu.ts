import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { siteConfig } from "@/lib/config";
import {
    Home,
    FileText,
    Tv,
    BookOpen,
    Gamepad2,
    ArrowRight,
    Sun,
    Moon,
    Laptop,
    Github,
    Linkedin,
    Mail,
    Copy,
    ArrowUp,
    ArrowDown,
    Music,
    Terminal,
    Maximize2,
    Maximize,
    Link2,
    RefreshCw,
    Printer,
    Code,
    Keyboard,
    ExternalLink,
    Share2,
    Bookmark,
    ZoomIn,
    ZoomOut,
    Clock,
    QrCode,
    Calculator,
    Hash,
    FileJson,
    Palette,
    Ruler,
    Globe,
} from "lucide-react";

export function useCommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const { setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === "Escape") setOpen(false);
        };
        const openEvent = () => setOpen(true);
        document.addEventListener("keydown", down);
        document.addEventListener("open-command-menu", openEvent);
        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("open-command-menu", openEvent);
        };
    }, []);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        setSearch("");
        command();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const commandGroups = useMemo(
        () => [
            {
                group: "Navigation",
                items: [
                    {
                        icon: Home,
                        label: "Home",
                        description: "Go to homepage",
                        action: () => router.push("/"),
                    },
                    {
                        icon: FileText,
                        label: "Articles",
                        description: "Browse technical articles",
                        action: () => router.push("/articleshelf"),
                    },
                    {
                        icon: Tv,
                        label: "Anime",
                        description: "View anime watchlist",
                        action: () => router.push("/animeshelf"),
                    },
                    {
                        icon: BookOpen,
                        label: "Books",
                        description: "Explore reading list",
                        action: () => router.push("/bookshelf"),
                    },
                    {
                        icon: Gamepad2,
                        label: "Hobbies",
                        description: "Discover hobbies & interests",
                        action: () => router.push("/hobbyshelf"),
                    },
                ],
            },
            {
                group: "Quick Actions",
                items: [
                    {
                        icon: Copy,
                        label: "Copy Email",
                        description: "Copy email to clipboard",
                        action: () => copyToClipboard(siteConfig.contact.email),
                    },
                    {
                        icon: Link2,
                        label: "Copy Page URL",
                        description: "Copy current page URL",
                        action: () => copyToClipboard(window.location.href),
                    },
                    {
                        icon: Github,
                        label: "Copy GitHub URL",
                        description: "Copy GitHub profile link",
                        action: () => copyToClipboard(`https://${siteConfig.contact.github}`),
                    },
                    {
                        icon: Linkedin,
                        label: "Copy LinkedIn URL",
                        description: "Copy LinkedIn profile link",
                        action: () => copyToClipboard(`https://${siteConfig.contact.linkedin}`),
                    },
                    {
                        icon: Copy,
                        label: "Copy Page Title",
                        description: "Copy current page title",
                        action: () => copyToClipboard(document.title),
                    },
                    {
                        icon: Terminal,
                        label: "Open Terminal",
                        description: "Toggle terminal view",
                        action: () =>
                            document.querySelector<HTMLElement>("[data-terminal-toggle]")?.click(),
                    },
                    {
                        icon: Music,
                        label: "Toggle Music",
                        description: "Play/pause music player",
                        action: () =>
                            document.querySelector<HTMLElement>("[data-music-toggle]")?.click(),
                    },
                    {
                        icon: ArrowUp,
                        label: "Scroll to Top",
                        description: "Jump to page top",
                        action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                    },
                    {
                        icon: ArrowDown,
                        label: "Scroll to Bottom",
                        description: "Jump to page bottom",
                        action: () =>
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth",
                            }),
                    },
                ],
            },
            {
                group: "Share",
                items: [
                    {
                        icon: Share2,
                        label: "Share on Twitter",
                        description: "Share this page on Twitter",
                        action: () =>
                            window.open(
                                `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
                                "_blank"
                            ),
                    },
                    {
                        icon: Share2,
                        label: "Share on LinkedIn",
                        description: "Share this page on LinkedIn",
                        action: () =>
                            window.open(
                                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                                "_blank"
                            ),
                    },
                    {
                        icon: Share2,
                        label: "Share via Email",
                        description: "Share this page via email",
                        action: () =>
                            window.open(
                                `mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}`
                            ),
                    },
                    {
                        icon: Bookmark,
                        label: "Bookmark Page",
                        description: "Add to browser bookmarks",
                        action: () => {
                            alert(
                                "Press " +
                                    (navigator.userAgent.toLowerCase().indexOf("mac") != -1
                                        ? "Cmd"
                                        : "Ctrl") +
                                    "+D to bookmark this page."
                            );
                        },
                    },
                ],
            },
            {
                group: "Home Sections",
                items: [
                    {
                        icon: ArrowRight,
                        label: "Hero Section",
                        description: "View profile & introduction",
                        action: () => scrollToSection("hero"),
                    },
                    {
                        icon: ArrowRight,
                        label: "Experience",
                        description: "See work experience",
                        action: () => scrollToSection("experience"),
                    },
                    {
                        icon: ArrowRight,
                        label: "Tech Stack",
                        description: "Explore skills & technologies",
                        action: () => scrollToSection("techstack"),
                    },
                    {
                        icon: ArrowRight,
                        label: "Contact",
                        description: "Get in touch",
                        action: () => scrollToSection("contact"),
                    },
                ],
            },
            {
                group: "View Controls",
                items: [
                    {
                        icon: Maximize,
                        label: "Enter Fullscreen",
                        description: "View in fullscreen mode",
                        action: () => document.documentElement.requestFullscreen(),
                    },
                    {
                        icon: ZoomIn,
                        label: "Zoom In",
                        description: "Increase page zoom",
                        action: () => {
                            document.body.style.zoom = `${parseFloat(document.body.style.zoom || "1") * 1.1}`;
                        },
                    },
                    {
                        icon: ZoomOut,
                        label: "Zoom Out",
                        description: "Decrease page zoom",
                        action: () => {
                            document.body.style.zoom = `${parseFloat(document.body.style.zoom || "1") / 1.1}`;
                        },
                    },
                    {
                        icon: ZoomIn,
                        label: "Reset Zoom",
                        description: "Reset to default zoom",
                        action: () => {
                            document.body.style.zoom = "1";
                        },
                    },
                ],
            },
            {
                group: "Appearance",
                items: [
                    {
                        icon: Sun,
                        label: "Light Mode",
                        description: "Switch to light theme",
                        action: () => setTheme("light"),
                    },
                    {
                        icon: Moon,
                        label: "Dark Mode",
                        description: "Switch to dark theme",
                        action: () => setTheme("dark"),
                    },
                    {
                        icon: Laptop,
                        label: "System Theme",
                        description: "Match system preferences",
                        action: () => setTheme("system"),
                    },
                ],
            },
            {
                group: "Social",
                items: [
                    {
                        icon: Github,
                        label: "GitHub Profile",
                        description: "View GitHub repositories",
                        action: () => window.open(`https://${siteConfig.contact.github}`, "_blank"),
                    },
                    {
                        icon: Linkedin,
                        label: "LinkedIn Profile",
                        description: "Connect on LinkedIn",
                        action: () =>
                            window.open(`https://${siteConfig.contact.linkedin}`, "_blank"),
                    },
                    {
                        icon: Mail,
                        label: "Send Email",
                        description: `Email ${siteConfig.contact.email}`,
                        action: () => window.open(`mailto:${siteConfig.contact.email}`),
                    },
                ],
            },
            {
                group: "Developer Tools",
                items: [
                    {
                        icon: Code,
                        label: "View Source Code",
                        description: "Open GitHub repository",
                        action: () =>
                            window.open(
                                "https://github.com/adarshanand67/adarshanand67.github.io",
                                "_blank"
                            ),
                    },
                    {
                        icon: ExternalLink,
                        label: "Open in New Tab",
                        description: "Open current page in new tab",
                        action: () => window.open(window.location.href, "_blank"),
                    },
                    {
                        icon: RefreshCw,
                        label: "Refresh Page",
                        description: "Reload the current page",
                        action: () => window.location.reload(),
                    },
                    {
                        icon: Printer,
                        label: "Print Page",
                        description: "Print current page",
                        action: () => window.print(),
                    },
                    {
                        icon: Code,
                        label: "View Page Info",
                        description: "Show page information",
                        action: () => {
                            alert(
                                `Page Info:\n\nTitle: ${document.title}\nURL: ${window.location.href}\nReferrer: ${document.referrer || "None"}\nLast Modified: ${document.lastModified}`
                            );
                        },
                    },
                    {
                        icon: FileJson,
                        label: "Format JSON",
                        description: "Format & validate JSON",
                        action: () => {
                            const json = prompt("Paste JSON to format:");
                            if (json) {
                                try {
                                    const formatted = JSON.stringify(JSON.parse(json), null, 2);
                                    copyToClipboard(formatted);
                                    alert("✅ JSON formatted and copied to clipboard!");
                                } catch (e) {
                                    alert("❌ Invalid JSON");
                                }
                            }
                        },
                    },
                    {
                        icon: Hash,
                        label: "Generate Hash",
                        description: "Generate SHA-256 hash",
                        action: async () => {
                            const text = prompt("Enter text to hash:");
                            if (text) {
                                const encoder = new TextEncoder();
                                const data = encoder.encode(text);
                                const hashBuffer = await crypto.subtle.digest("SHA-256", data);
                                const hashArray = Array.from(new Uint8Array(hashBuffer));
                                const hashHex = hashArray
                                    .map((b) => b.toString(16).padStart(2, "0"))
                                    .join("");
                                copyToClipboard(hashHex);
                                alert(`SHA-256:\n\n${hashHex}\n\n✅ Copied!`);
                            }
                        },
                    },
                    {
                        icon: Code,
                        label: "Encode Base64",
                        description: "Encode text to Base64",
                        action: () => {
                            const text = prompt("Enter text to encode:");
                            if (text) {
                                const encoded = btoa(text);
                                copyToClipboard(encoded);
                                alert(`Base64:\n\n${encoded}\n\n✅ Copied!`);
                            }
                        },
                    },
                    {
                        icon: Code,
                        label: "Decode Base64",
                        description: "Decode Base64 to text",
                        action: () => {
                            const text = prompt("Enter Base64:");
                            if (text) {
                                try {
                                    const decoded = atob(text);
                                    copyToClipboard(decoded);
                                    alert(`Decoded:\n\n${decoded}\n\n✅ Copied!`);
                                } catch (e) {
                                    alert("❌ Invalid Base64");
                                }
                            }
                        },
                    },
                    {
                        icon: Link2,
                        label: "Encode URL",
                        description: "URL encode text",
                        action: () => {
                            const text = prompt("Enter text:");
                            if (text) {
                                const encoded = encodeURIComponent(text);
                                copyToClipboard(encoded);
                                alert(`URL Encoded:\n\n${encoded}\n\n✅ Copied!`);
                            }
                        },
                    },
                    {
                        icon: Link2,
                        label: "Decode URL",
                        description: "URL decode text",
                        action: () => {
                            const text = prompt("Enter URL encoded text:");
                            if (text) {
                                try {
                                    const decoded = decodeURIComponent(text);
                                    copyToClipboard(decoded);
                                    alert(`Decoded:\n\n${decoded}\n\n✅ Copied!`);
                                } catch (e) {
                                    alert("❌ Invalid URL encoding");
                                }
                            }
                        },
                    },
                    {
                        icon: Globe,
                        label: "Network Info",
                        description: "Show network information",
                        action: () => {
                            const info = `Network:\n\nOnline: ${navigator.onLine ? "Yes" : "No"}\nLanguage: ${navigator.language}\nPlatform: ${navigator.platform}`;
                            alert(info);
                        },
                    },
                ],
            },
            {
                group: "Utilities",
                items: [
                    {
                        icon: QrCode,
                        label: "Generate QR Code",
                        description: "Create QR code for page",
                        action: () => {
                            const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`;
                            window.open(url, "_blank");
                        },
                    },
                    {
                        icon: Calculator,
                        label: "Calculator",
                        description: "Quick calculator",
                        action: () => {
                            const expr = prompt("Enter calculation (e.g., 2 + 2 * 3):");
                            if (expr) {
                                try {
                                    const result = eval(expr);
                                    alert(`Result: ${result}`);
                                } catch (e) {
                                    alert("❌ Invalid expression");
                                }
                            }
                        },
                    },
                    {
                        icon: Palette,
                        label: "Color Picker",
                        description: "Pick & copy color",
                        action: () => {
                            const color = prompt("Enter color:", "#00bf40");
                            if (color) {
                                copyToClipboard(color);
                                alert(`Color: ${color}\n\n✅ Copied!`);
                            }
                        },
                    },
                    {
                        icon: Ruler,
                        label: "Text Case Converter",
                        description: "Convert text case",
                        action: () => {
                            const text = prompt("Enter text:");
                            if (text) {
                                const choice = prompt("1=UPPER 2=lower 3=Title:");
                                let result = text;
                                if (choice === "1") result = text.toUpperCase();
                                else if (choice === "2") result = text.toLowerCase();
                                else if (choice === "3")
                                    result = text.replace(
                                        /\w\S*/g,
                                        (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
                                    );
                                copyToClipboard(result);
                                alert(`Converted:\n\n${result}\n\n✅ Copied!`);
                            }
                        },
                    },
                    {
                        icon: FileText,
                        label: "Word Counter",
                        description: "Count words & characters",
                        action: () => {
                            const text = prompt("Enter text:");
                            if (text) {
                                const words = text.trim().split(/\s+/).length;
                                const chars = text.length;
                                alert(`Words: ${words}\nCharacters: ${chars}`);
                            }
                        },
                    },
                    {
                        icon: Keyboard,
                        label: "Keyboard Shortcuts",
                        description: "View shortcuts",
                        action: () => {
                            alert(
                                "⌘K/Ctrl+K - Command menu\nEsc - Close\n↑↓ - Navigate\nEnter - Execute"
                            );
                        },
                    },
                    {
                        icon: Clock,
                        label: "Current Time",
                        description: "Show date & time",
                        action: () => {
                            const now = new Date();
                            alert(`${now.toLocaleString()}\n\nUTC: ${now.toUTCString()}`);
                        },
                    },
                ],
            },
        ],
        [router, setTheme]
    );

    const filteredItems = useMemo(
        () =>
            commandGroups
                .flatMap((g) => g.items)
                .filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
        [commandGroups, search]
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(
                    (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
                );
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredItems[selectedIndex]) runCommand(filteredItems[selectedIndex].action);
            }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [open, filteredItems, selectedIndex, runCommand]);

    return {
        open,
        setOpen,
        search,
        setSearch,
        selectedIndex,
        runCommand,
        commandGroups,
        filteredItems,
    };
}
