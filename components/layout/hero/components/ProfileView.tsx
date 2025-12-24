import Image from "next/image";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { TiltWrapper } from "@/components/ui/TiltWrapper";
import { SystemStatus } from "@/components/layout/ui";
import { siteConfig } from "@/lib/config";
import { ViewToggle } from "../ViewToggle";
import { SocialButton } from "./SocialButton";
import { VoiceVisualizer } from "./VoiceVisualizer";

interface ProfileViewProps {
    profile: any;
    viewMode: 'profile' | 'terminal';
    setViewMode: (mode: 'profile' | 'terminal') => void;
}

export function ProfileView({ profile, viewMode, setViewMode }: ProfileViewProps) {
    const [copied, setCopied] = useState(false);

    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
        >
            <div className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/10 dark:border-white/5 relative overflow-hidden group/container shadow-2xl">
                <div
                    className="absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-1000 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.08), transparent 40%)`
                    }}
                />

                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
                    <TiltWrapper intensity={15}>
                        <div className="relative group/avatar">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 to-emerald-500/0 rounded-full blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-all duration-700" />
                            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-[3rem] overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    fill
                                    className="object-cover scale-105 group-hover/avatar:scale-110 transition-transform duration-1000"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-900 border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-2 scale-90 group-hover/avatar:scale-100 transition-transform duration-500">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Online</span>
                            </div>
                        </div>
                    </TiltWrapper>

                    <div className="flex-1 flex flex-col justify-center pt-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl font-black tracking-tighter title-gradient"
                            >
                                {profile.name}
                            </motion.h1>
                            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                        </div>

                        <div className="mb-8">
                            <SystemStatus />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/50 to-transparent rounded-full hidden md:block" />
                            <div className="flex flex-col gap-4 pl-0 md:pl-6">
                                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-zinc-200 leading-tight md:leading-snug italic max-w-2xl group/quote">
                                    <span className="text-green-500 opacity-50 text-4xl font-serif absolute -top-4 -left-2 md:-left-4">"</span>
                                    {profile.bio.paragraphs[0]}
                                    <span className="text-green-500 opacity-50 text-4xl font-serif">"</span>
                                </blockquote>
                                <VoiceVisualizer />
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                    <SocialButton
                        index={0}
                        label="Connect"
                        name="LinkedIn"
                        href={`https://${siteConfig.contact.linkedin}`}
                        icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}
                    />
                    <SocialButton
                        index={1}
                        label={copied ? "Copied!" : "Say Hello"}
                        name="Email Address"
                        onClick={() => { navigator.clipboard.writeText(siteConfig.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                        icon={copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                    />
                    <SocialButton
                        index={2}
                        label="Codebase"
                        name="GitHub"
                        href={`https://${siteConfig.contact.github}`}
                        icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}
                    />
                </div>
            </div>
        </motion.div>
    );
}
