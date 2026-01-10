"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { MapPin, ChevronDown, ChevronRight } from "lucide-react";

import { useStore } from "@/lib/store";
import { Profile, BlogPost, Project } from "@/types/definitions";
import { siteConfig, featuresConfig, isFeatureEnabled } from "@/lib/config";
import {
  introLines,
  NAV_ITEMS,
  routes,
  skillCategories,
  tracks,
  contactInfo,
  techLinks,
} from "@/lib/constants";
import { getAssetPath, parseAnsi, linkifyTech } from "@/lib/utils";
import { getTechIcon } from "@/lib/icons";

// Dynamic Imports
const CommandMenu = dynamic(
  () =>
    import("@/components/layout/CommandMenu").then((mod) => mod.CommandMenu),
  { ssr: false },
);
const MusicToggleButton = dynamic(
  () => import("@/components/features").then((mod) => mod.MusicToggleButton),
  { ssr: false },
);
const MobileDock = dynamic(
  () => import("@/components/layout/MobileDock").then((mod) => mod.MobileDock),
  { ssr: false },
);
const TerminalPreloader = dynamic(
  () =>
    import("@/components/layout/TerminalPreloader").then(
      (mod) => mod.TerminalPreloader,
    ),
  { ssr: false },
);
const DLPProtection = dynamic(
  () => import("@/components/features").then((mod) => mod.DLPProtection),
  { ssr: false },
);
const HobbiesModal = dynamic(
  () => import("@/components/modals").then((mod) => mod.HobbiesModal),
  { ssr: false },
);
const ShortcutGuide = dynamic(
  () => import("@/components/features").then((mod) => mod.ShortcutGuide),
  { ssr: false },
);
const ScrollProgress = dynamic(
  () => import("@/components/ui").then((mod) => mod.ScrollProgress),
  { ssr: false },
);
const MusicPlayer = dynamic(
  () => import("@/components/features").then((mod) => mod.MusicPlayer),
  { ssr: false },
);

// Component Imports
import { Navbar, Footer, SectionHeader } from "@/components/layout";
import {
  Hero,
  ExperienceSection,
  TechStackSection,
  RecentSection,
  ContactSection,
} from "@/components/sections";
import { SpotlightCard } from "@/components/ui";

// Mock Files & Commands (Keep these or move to a data file if they grow)
/* ... (MockFS and Commands logic can be moved to lib/terminal/ if desired later) ... */
import {
  mockFiles,
  directoryStructure,
  commands,
  directories,
} from "@/lib/terminal/data"; // Assuming we might move this, but for now we'll keep it simple or inline if it's small.
// actually let's keep the terminal hooks here for now or extract them if urged.
// Given the massive refactor, let's keep the Hooks specific to Layout inline if they are not used elsewhere, OR better, let's just keep the necessary imports and logic.

// ... (Rest of the logic from original layout.tsx, but simplified)

// We need to re-implement `ClientLayout` effectively.

export function ClientLayout({
  children,
  profile,
  experience,
  recentPosts,
  projects,
}: {
  children: React.ReactNode;
  profile: Profile;
  experience: any[]; // Using any[] for now to match strictness later or import Experience type
  recentPosts: BlogPost[];
  projects: Project[];
}) {
  const { isMounted, setIsMounted, heroViewMode } = useStore();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    // Theme initialization
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, [setIsMounted, setTheme]);

  // Command Menu Event Listener
  useEffect(() => {
    const handleOpenCommandMenu = () => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", metaKey: true }),
      );
    };
    // ... logic ...
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-foreground/20 selection:text-foreground">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <DLPProtection />
      <ScrollProgress />
      <Navbar />

      {isFeatureEnabled("enableCommandMenu") && <CommandMenu />}
      {isFeatureEnabled("enableTerminal") && <TerminalPreloader />}
      <MobileDock />
      <ShortcutGuide />

      <main className="relative z-10 min-h-screen flex flex-col">
        {isHome ? (
          <>
            <Hero profile={profile} />
            <div className="space-y-4 pb-20">
              {isFeatureEnabled("enableExperience") && (
                <ExperienceSection items={experience} />
              )}

              <TechStackSection />

              {/* Sections removed as requested */}
            </div>
          </>
        ) : (
          <div className="pt-8 pb-20 animation-delay-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        )}
      </main>

      <Footer />

      {isFeatureEnabled("enableMusicPlayer") && (
        <>
          <MusicPlayer />
          <MusicToggleButton />
        </>
      )}

      <HobbiesModal />
    </div>
  );
}
