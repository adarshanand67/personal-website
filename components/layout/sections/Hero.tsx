"use client";

import Image from "next/image";
import { useState } from "react";
import { User, Terminal as TerminalIcon } from "lucide-react";
import { Terminal } from "@/components/layout";

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
        <section className="section max-w-7xl mx-auto px-4 mt-8 mb-8 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 min-h-[500px]">
                {/* Profile Section */}
                {viewMode === 'profile' && (
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 glass p-6 sm:p-8 rounded-2xl animate-fade-in relative">
                        <div className="flex items-start justify-between mb-2">
                            <div className="font-mono flex items-center gap-2 group mt-1">
                                <span className="text-green-500 font-bold text-lg group-hover:scale-110 transition-transform">$</span>{" "}
                                <span className="text-gray-700 dark:text-gray-300">whoami</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                            </div>
                            <ViewToggle />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            {profile.avatar && (
                                <div className="relative group shrink-0">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-green-500 shadow-lg shadow-green-500/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src={profile.avatar}
                                            alt={profile.name}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
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
                        <div className="flex justify-center mb-12 sm:mb-4">
                            <div className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass hover:scale-105 transition-all duration-300 cursor-help opacity-0 sm:opacity-100 transition-opacity">
                                <span className="text-xs text-green-700 dark:text-green-400">🔐</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                    Psst... hidden CTF challenge
                                </span>
                            </div>
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
