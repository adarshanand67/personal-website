"use client";

import { ThemeProvider } from "@/components/layout/theme";
import { GlobalEffect, MatrixRain } from "@/components/layout/effects";
import { Navbar } from "@/components/layout/navigation/Navbar";
import { Footer } from "@/components/layout/navigation/Footer";
import { CommandMenu } from "@/components/layout/navigation/CommandMenu";
import { MusicPlayer, MusicToggleButton } from "@/components/features/musicPlayer";
import { PWARegistration } from "@/components/features/serviceWorker";
import { HobbiesModal } from "@/components/modals/hobbiesModal";
import { ShortcutGuide } from "@/components/features/ShortcutGuide";
import { BackToTop } from "@/components/layout/navigation/BackToTop";
import { MobileDock } from "@/components/layout/navigation/MobileDock";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <PWARegistration />
            <GlobalEffect />
            <MatrixRain />
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
