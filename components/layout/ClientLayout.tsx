"use client";

import { ThemeProvider } from "@/components/layout/theme";
import { GlobalEffect } from "@/components/layout/effects";
import { Navbar } from "@/components/layout/navigation/Navbar";
import { Footer } from "@/components/layout/navigation/Footer";
import { CommandMenu } from "@/components/layout/navigation/CommandMenu";
import { MusicPlayer, MusicToggleButton } from "@/components/features/musicPlayer";
import { PWARegistration } from "@/components/features/serviceWorker";
import { HobbiesModal } from "@/components/modals/hobbiesModal";
import { ShortcutGuide } from "@/components/features/ShortcutGuide";
import { BackToTop } from "@/components/layout/navigation/BackToTop";
import { MobileDock } from "@/components/layout/navigation/MobileDock";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { DLPProtection } from "@/components/features/security/DLPProtection";
import { TerminalPreloader } from "@/components/layout/terminal/TerminalPreloader";

/**
 * Client Layout Component - wraps all client-side providers and global components.
 * Provides theme, state management, navigation, modals, and feature components.
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
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
            <PWARegistration />
            <ScrollProgress />
            <div className="page-glow" />
            <GlobalEffect />
            <Navbar />
            <CommandMenu />
            <HobbiesModal />
            {children}

            <ShortcutGuide />
            <BackToTop />
            <MobileDock />
            <MusicPlayer />
            <MusicToggleButton />
            <Footer />
        </ThemeProvider>
    );
}
