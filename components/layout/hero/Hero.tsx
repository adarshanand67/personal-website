"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ProfileView } from "./components/ProfileView";
import { TerminalView } from "./components/TerminalView";
import { Profile } from "@/types/definitions";

/**
 * Props for the Hero component.
 * @interface HeroProps
 * @property {Profile} profile - Profile data containing name, avatar, bio, and other personal information
 */
interface HeroProps {
    profile: Profile;
}

/**
 * Hero Section Component
 *
 * The main landing section of the portfolio featuring a dual-view mode system:
 * - **Profile View**: Displays personal information, avatar, bio, and social links
 * - **Terminal View**: Interactive terminal interface for command-based navigation
 *
 * @component
 * @param {HeroProps} props - Component props
 * @param {any} props.profile - Profile data object containing personal information
 * @returns {JSX.Element} Hero section with animated view transitions
 *
 * @remarks
 * **Interactive Features:**
 * - Mouse tracking for radial gradient effects (sets CSS custom properties `--mouse-x` and `--mouse-y`)
 * - Smooth view mode transitions using Framer Motion's AnimatePresence
 * - Mesh gradient background for visual depth
 *
 * **View Modes:**
 * - `profile`: Default view showing personal branding and social links
 * - `terminal`: Interactive command-line interface for navigation
 *
 * **Styling:**
 * - Uses mesh gradient background with green color scheme
 * - Responsive padding and spacing
 * - Z-index layering for proper stacking context
 *
 * @example
 * ```tsx
 * const profile = await getProfile();
 * <Hero profile={profile} />
 * ```
 */
export function Hero({ profile }: HeroProps) {
    const [viewMode, setViewMode] = useState<"profile" | "terminal">("profile");

    return (
        <section
            id="hero"
            className="section max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative overflow-visible"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
            }}
        >
            {/* Mesh Gradient Background */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#22c55e] to-[#065f46] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {viewMode === "profile" ? (
                        <ProfileView
                            profile={profile}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                        />
                    ) : (
                        <TerminalView viewMode={viewMode} setViewMode={setViewMode} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
