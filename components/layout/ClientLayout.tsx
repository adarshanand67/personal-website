"use client";

import {
    ThemeProvider, GlobalEffect, Navbar, Footer, CommandMenu,
    MobileDock, TerminalPreloader
} from "@/components/layout";
import { MusicPlayer, MusicToggleButton } from "@/components/features/musicPlayer";

import { HobbiesModal } from "@/components/modals";
import { ShortcutGuide } from "@/components/features/ShortcutGuide";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { DLPProtection } from "@/components/features/security/DLPProtection";

/**
 * Client Layout Component - wraps all client-side providers and global components.
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
        >
            <DLPProtection />
            <TerminalPreloader />

            <ScrollProgress />
            <div className="page-glow" />
            <GlobalEffect />
            <Navbar />
            <CommandMenu />
            <HobbiesModal />
            {children}
            <ShortcutGuide />
            <MobileDock />
            <MusicPlayer />
            <MusicToggleButton />
            <Footer />
        </ThemeProvider>
    );
}
