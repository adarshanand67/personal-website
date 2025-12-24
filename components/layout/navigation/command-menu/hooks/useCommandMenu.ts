import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/lib/config';
import { Home, FileText, Tv, BookOpen, Gamepad2, ArrowRight, Sun, Moon, Laptop, Github, Linkedin, Mail } from 'lucide-react';

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
                setOpen(o => !o);
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

    const commandGroups = useMemo(() => [
        {
            group: "Navigation",
            items: [
                { icon: Home, label: "Home", action: () => router.push("/") },
                { icon: FileText, label: "Articleshelf", action: () => router.push("/articleshelf") },
                { icon: Tv, label: "Animeshelf", action: () => router.push("/animeshelf") },
                { icon: BookOpen, label: "Bookshelf", action: () => router.push("/bookshelf") },
                { icon: Gamepad2, label: "Hobbyshelf", action: () => router.push("/hobbyshelf") },
            ]
        },
        {
            group: "Home Sections",
            items: [
                { icon: ArrowRight, label: "Jump to Hero", action: () => scrollToSection("hero") },
                { icon: ArrowRight, label: "Jump to Experience", action: () => scrollToSection("experience") },
                { icon: ArrowRight, label: "Jump to Tech Stack", action: () => scrollToSection("techstack") },
                { icon: ArrowRight, label: "Jump to Contact", action: () => scrollToSection("contact") },
            ]
        },
        {
            group: "Appearance",
            items: [
                { icon: Sun, label: "Light Mode", action: () => setTheme("light") },
                { icon: Moon, label: "Dark Mode", action: () => setTheme("dark") },
                { icon: Laptop, label: "System Theme", action: () => setTheme("system") },
            ]
        },
        {
            group: "Social",
            items: [
                { icon: Github, label: "GitHub", action: () => window.open(`https://${siteConfig.contact.github}`, "_blank") },
                { icon: Linkedin, label: "LinkedIn", action: () => window.open(`https://${siteConfig.contact.linkedin}`, "_blank") },
                { icon: Mail, label: "Contact Email", action: () => window.open(`mailto:${siteConfig.contact.email}`) },
            ]
        }
    ], [router, setTheme]);

    const filteredItems = useMemo(() =>
        commandGroups.flatMap(g => g.items).filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        ), [commandGroups, search]
    );

    useEffect(() => { setSelectedIndex(0); }, [search]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (filteredItems[selectedIndex]) runCommand(filteredItems[selectedIndex].action);
            }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [open, filteredItems, selectedIndex, runCommand]);

    return {
        open, setOpen, search, setSearch, selectedIndex, runCommand, commandGroups, filteredItems
    };
}
