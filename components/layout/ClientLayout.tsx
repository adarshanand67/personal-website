"use client";

import { ThemeProvider } from "@/components/layout/theme";
import { GlobalEffect } from "@/components/layout/effects/GlobalEffect";
import { Navbar } from "@/components/layout/navigation/Navbar";
import { Footer } from "@/components/layout/navigation/Footer";
import { CommandMenu } from "@/components/layout/navigation/CommandMenu";
import { MatrixRain } from "@/components/layout/effects/MatrixRain";
import { MusicToggleButton } from "@/components/layout/utils/MusicToggleButton";
import { MusicPlayer } from "@/components/features/musicPlayer";
import { ServiceWorker } from "@/components/features/serviceWorker";
import { HobbiesModal } from "@/components/modals/hobbiesModal";

import { SystemLogTicker } from "@/components/features/SystemLogTicker";
import { CommandHint } from "@/components/features/CommandHint";
import { NeuralNetwork } from "@/components/layout/effects/NeuralNetwork";
import { CRTOverlay } from "@/components/layout/effects/CRTOverlay";
import { KonamiCode } from "@/components/layout/utils/KonamiCode";
import { TerminalCursor } from "@/components/layout/ui/SectionHeader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ServiceWorker />
            <GlobalEffect />
            <TerminalCursor />
            <NeuralNetwork />
            <CRTOverlay />
            <KonamiCode />
            <Navbar />
            <MatrixRain />
            <SystemLogTicker />
            <CommandHint />
            <CommandMenu />
            <HobbiesModal />
            {children}
            <MusicPlayer />
            <MusicToggleButton />
            <Footer />
        </ThemeProvider>
    );
}
