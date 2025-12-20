"use client";

import Image from "next/image";
import { useState } from "react";
import { User, Terminal as TerminalIcon } from "lucide-react";
import { Terminal } from "@/components/layout";
import { TiltWrapper } from "@/components/ui/TiltWrapper";

function HeroBase({ profile }: { profile: any }) {
    const [viewMode, setViewMode] = useState<'profile' | 'terminal'>('profile');

    const ViewToggle = () => (
        <div className="flex bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-lg border border-gray-200 dark:border-gray-700 ml-auto pointer-events-auto shadow-sm">
            <button
                onClick={() => setViewMode('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${viewMode === 'profile'
                    ? 'bg-white dark:bg-black text-green-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                title="Switch to Profile"
            >
                <User size={14} className="sm:w-4 sm:h-4" />
                <span className="max-sm:hidden">Profile</span>
            </button>
            <button
                onClick={() => setViewMode('terminal')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${viewMode === 'terminal'
                    ? 'bg-white dark:bg-black text-green-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                title="Switch to Terminal"
            >
                <TerminalIcon size={14} className="sm:w-4 sm:h-4" />
                <span className="max-sm:hidden">Terminal</span>
            </button>
        </div>
    );

    return (
        <section
            id="hero"
            className="section max-w-6xl mx-auto px-6 md:px-12 mt-8 mb-8 relative"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
        >
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div
                    className="absolute inset-0 opacity-30 dark:opacity-20 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.15) 0%, transparent 50%)`
                    }}
                />
            </div>

            <div className="relative z-10 min-h-[500px]">
                {/* Profile Section */}
                {viewMode === 'profile' && (
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 glass p-6 sm:p-8 rounded-2xl animate-fade-in relative">
                        <div className="flex items-start justify-between mb-2">
                            <div className="font-mono flex items-center gap-2 group mt-1">
                                <span className="text-gray-500 dark:text-gray-400 text-sm tracking-wider uppercase">whoami</span>
                            </div>
                            <ViewToggle />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            {profile.avatar && (
                                <TiltWrapper intensity={20} className="shrink-0">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-green-500/30 dark:border-emerald-500/20 shadow-xl shadow-green-500/10 flex-shrink-0">
                                            <Image
                                                src={profile.avatar}
                                                alt={profile.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </TiltWrapper>
                            )}
                            <div className="text-center md:text-left">
                                <h1 className="title text-4xl md:text-6xl font-bold font-serif bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                                    {profile.name}
                                </h1>
                                <div className="relative inline-block">
                                    <div className="w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="content text-lg leading-relaxed space-y-4 mt-4">
                            {profile.bio.paragraphs.map((paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph
                                            .replace(
                                                "Trellix",
                                                `<a href="https://trellix.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold hover:text-green-600 dark:hover:text-green-300 transition-colors">Trellix</a>`
                                            )
                                            .replace(
                                                "Intel Corporation",
                                                `<a href="https://intel.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold hover:text-green-600 dark:hover:text-green-300 transition-colors">Intel Corporation</a>`
                                            ),
                                    }}
                                    className="text-gray-700 dark:text-gray-300"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Terminal Section */}
                {viewMode === 'terminal' && (
                    <div className="w-full max-w-5xl mx-auto animate-fade-in relative">
                        <div className="absolute top-0 right-0 z-20 p-4">
                            <ViewToggle />
                        </div>

                        <Terminal />
                    </div>
                )}
            </div>
        </section>
    );
}

export function Hero(props: any) {
    return <HeroBase {...props} />;
}
