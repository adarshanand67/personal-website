"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { User, Terminal as TerminalIcon, ExternalLink } from "lucide-react";
import { TiltWrapper } from "@/components/ui";
import { SystemStatus } from "@/components/layout/layoutUI";
import { siteConfig } from "@/lib/config";
import { Terminal } from "@/components/layout/terminal";
import { Profile } from "@/types/definitions";
import { useStore } from "@/lib/store/useStore";

// --- Components ---

/** View Toggle Component */
export const ViewToggle = ({ viewMode, setViewMode }: { viewMode: "profile" | "terminal"; setViewMode: (mode: "profile" | "terminal") => void }) => (
    <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 ml-auto pointer-events-auto shadow-sm gap-1">
        <button
            onClick={() => setViewMode("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${viewMode === "profile" ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
        >
            <User size={14} /> <span>Profile</span>
        </button>
        <button
            onClick={() => setViewMode("terminal")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${viewMode === "terminal" ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
        >
            <TerminalIcon size={14} /> <span>Terminal</span>
        </button>
    </div>
);

/** Voice Visualizer Component */
export function VoiceVisualizer() {
    return (
        <div className="flex items-center gap-1 h-8 opacity-40 group-hover/container:opacity-100 transition-opacity duration-1000">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ height: [8, 24, 12, 32, 8], opacity: [0.3, 1, 0.5, 1, 0.3] }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    className="w-1 bg-foreground rounded-full"
                />
            ))}
            <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60">Deep Voice Optimized</span>
        </div>
    );
}

/** Social Button Component */
export function SocialButton({ label, name, icon, href, onClick, index }: { label: string; name: string; icon: ReactNode; href?: string; onClick?: () => void; index: number }) {
    const content = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform shadow-sm border border-zinc-200 dark:border-zinc-700">{icon}</div>
                <div className="flex-1 text-left">
                    <p className="text-[10px] font-black text-black dark:text-gray-200 uppercase tracking-widest mb-0.5 group-hover:text-foreground/60 transition-colors">{label}</p>
                    <h3 className="text-sm font-bold text-black dark:text-white group-hover:text-foreground transition-colors truncate max-w-[120px]">{name}</h3>
                </div>
            </div>
            {href && <ExternalLink size={16} className="text-black/40 dark:text-gray-500 group-hover/item:text-black dark:group-hover/item:text-gray-300 transition-all transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />}
        </div>
    );
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + index * 0.1 }} className="w-full md:flex-1 min-w-0">
            {href ? (
                <Link href={href} target="_blank" className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item">{content}</Link>
            ) : (
                <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 border border-white/20 dark:border-white/5 transition-all duration-300 hover:shadow-lg group/item">{content}</button>
            )}
        </motion.div>
    );
}

/** Profile View Component */
export function ProfileView({ profile, viewMode, setViewMode }: { profile: Profile; viewMode: "profile" | "terminal"; setViewMode: (mode: "profile" | "terminal") => void }) {
    return (
        <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="w-full relative">
            <div className="glass rounded-[2rem] p-6 md:p-10 border border-white/10 dark:border-white/5 relative overflow-hidden group/container shadow-xl">
                <div className="absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-1000 pointer-events-none" style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--primary-glow), transparent 40%)` }} />
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
                    <TiltWrapper intensity={15}>
                        <div className="relative group/avatar mb-6 md:mb-0">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-foreground/5 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-all duration-700" />
                            <div className="relative w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-2 border-foreground/10 shadow-2xl">
                                <Image src={profile.avatar || ""} alt={profile.name} fill className="object-cover scale-105 group-hover/avatar:scale-110 transition-transform duration-1000" priority />
                            </div>
                        </div>
                    </TiltWrapper>
                    <div className="flex-1 flex flex-col justify-center pt-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-black tracking-tighter title-gradient">
                                <span className="text-foreground uppercase">{profile.name}</span>
                            </motion.h1>
                            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                        </div>
                        <div className="mb-4 flex flex-col items-center md:items-start gap-2"><SystemStatus /></div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-foreground/20 to-transparent rounded-full hidden md:block" />
                            <blockquote className="text-lg md:text-xl font-medium text-foreground leading-tight md:leading-snug italic max-w-2xl group/quote pl-0 md:pl-6 leading-relaxed">
                                <span className="text-foreground/20 text-3xl font-serif absolute -top-4 -left-2 md:-left-4">"</span>
                                {profile.bio.paragraphs[0]}
                                <span className="text-foreground/20 text-3xl font-serif">"</span>
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4 mt-8 md:mt-10">
                    <SocialButton index={0} label="LinkedIn" name="Connect" href={`https://${siteConfig.contact.linkedin}`} icon={<svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>} />
                    <SocialButton index={1} label="Email" name="Say Hello" href={`mailto:${siteConfig.contact.email}`} icon={<svg className="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                    <SocialButton index={2} label="GitHub" name="Codebase" href={`https://${siteConfig.contact.github}`} icon={<svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>} />
                </div>
            </div>
        </motion.div>
    );
}

/** Terminal View Component */
export function TerminalView({ viewMode, setViewMode }: { viewMode: "profile" | "terminal"; setViewMode: (mode: "profile" | "terminal") => void }) {
    return (
        <motion.div key="terminal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="w-full relative">
            <div className="absolute top-6 right-8 z-20"><ViewToggle viewMode={viewMode} setViewMode={setViewMode} /></div>
            <Terminal />
        </motion.div>
    );
}

/** Main Hero Section Component */
export function Hero({ profile }: { profile: Profile }) {
    const { heroViewMode, setHeroViewMode } = useStore();
    return (
        <section id="hero" className="section max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative overflow-visible" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = ((e.clientX - rect.left) / rect.width) * 100; const y = ((e.clientY - rect.top) / rect.height) * 100; e.currentTarget.style.setProperty("--mouse-x", `${x}%`); e.currentTarget.style.setProperty("--mouse-y", `${y}%`); }}>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-foreground/20 via-foreground/5 to-transparent opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
            </div>
            <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {heroViewMode === "profile" ? <ProfileView profile={profile} viewMode={heroViewMode} setViewMode={setHeroViewMode} /> : <TerminalView viewMode={heroViewMode} setViewMode={setHeroViewMode} />}
                </AnimatePresence>
            </div>
        </section>
    );
}
