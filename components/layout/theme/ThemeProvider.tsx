"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useStore } from "@/lib/store/useStore";
import { useMounted } from "@/lib/hooks";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { isMounted, setIsMounted } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, [setIsMounted]);

    if (!isMounted) {
        return (
            <button
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
            >
                <div className="h-5 w-5" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}

function createClientIcon(Icon: React.ComponentType<{ className?: string }>) {
    return function ClientIcon(props: { className?: string }) {
        const mounted = useMounted();
        if (!mounted) return <div className={props.className} aria-hidden="true" />;
        return <Icon {...props} />;
    };
}

import { Github, Linkedin, Mail } from "lucide-react";
export const ClientLinkedin = createClientIcon(Linkedin);
export const ClientGithub = createClientIcon(Github);
export const ClientMail = createClientIcon(Mail);
