"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    User, Terminal as TerminalIcon, ChevronDown, Check, Copy,
    Feather, FileText, Book, Tv, Gamepad2, ExternalLink, MapPin
} from "lucide-react";
import { Terminal } from "@/components/layout/terminal";
import { SectionHeader, SpotlightCard, SystemStatus } from "@/components/layout/ui";
import { TiltWrapper } from "@/components/ui/TiltWrapper";
import { useStore } from "@/lib/store/useStore";
import { linkifyTech } from "@/lib/techLinks";
import { getAssetPath } from "@/lib/utils";
import { skillCategories, directoryMap } from "@/lib/constants";
import { techLinks } from "@/lib/techLinks";
import { siteConfig, shelfConfigs } from "@/lib/config";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Hero Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HeroBase({ profile }: { profile: any }) {
    const [viewMode, setViewMode] = useState<'profile' | 'terminal'>('profile');
    const [copied, setCopied] = useState(false);

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
            className="section max-w-6xl mx-auto px-4 md:px-6 mt-8 mb-8 relative"
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
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold title-gradient mb-4 tracking-tight">
                                    {profile.name}
                                </h1>
                                <SystemStatus />
                            </div>
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed space-y-4 mt-6 max-w-3xl">
                            {profile.bio.paragraphs.map((paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph
                                            .replace(/Trellix/g, `<a href="https://trellix.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold transition-colors">Trellix</a>`)
                                            .replace(/Intel Corporation/g, `<a href="https://intel.com" target="_blank" class="text-green-700 dark:text-green-400 hover:underline font-semibold transition-colors">Intel Corporation</a>`),
                                    }}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-8">
                            <Link href={`https://${siteConfig.contact.linkedin}`} target="_blank" className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">Connect</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">LinkedIn</div>
                                    </div>
                                </div>
                            </Link>

                            <div onClick={() => { navigator.clipboard.writeText(siteConfig.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">{copied ? "Copied!" : "Say Hello"}</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">Email Address</div>
                                    </div>
                                </div>
                            </div>

                            <Link href={`https://${siteConfig.contact.github}`} target="_blank" className="group relative overflow-hidden glass hover:bg-white dark:hover:bg-white/5 rounded-2xl p-5 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1.5 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0 w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.1em] mb-1">Codebase</div>
                                        <div className="text-sm text-gray-900 dark:text-white font-bold truncate">GitHub</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                {viewMode === 'terminal' && (
                    <div className="w-full max-w-5xl mx-auto animate-fade-in relative">
                        <div className="absolute top-0 right-0 z-20 p-4">
                            <ViewToggle />
                        </div>
                        <Terminal />
                    </div>
                )
                }
            </div >
        </section >
    );
}

export function Hero(props: any) { return <HeroBase {...props} />; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Experience Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Experience({ items }: { items: any[] }) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['experience'] ?? true;

    return (
        <div className="mb-4 font-mono max-w-6xl mx-auto px-4 md:px-6 section-padding" id="experience">
            <SectionHeader
                title="Experience"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded('experience')}
            />
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="grid grid-cols-1 gap-6 pt-4">
                    {items.map((exp, index) => (
                        <SpotlightCard key={index} className="hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 hover:border-green-500/20 group">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                                    {exp.logo && (
                                        <div className="shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <Image src={getAssetPath(exp.logo)} alt={`${exp.company} logo`} width={64} height={64} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{exp.company}</h3>
                                            <span className="text-xs font-bold px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">{exp.duration}</span>
                                        </div>
                                        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">{exp.role}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            <MapPin size={14} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                                {exp.description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium border-l-2 border-gray-100 dark:border-white/5 pl-6 italic">{exp.description}</p>}
                                {exp.highlights && (
                                    <ul className="space-y-3">
                                        {exp.highlights.map((h: string, i: number) => (
                                            <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-300 leading-relaxed font-medium group/item" dangerouslySetInnerHTML={{ __html: `<div class="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 group-hover/item:scale-150 transition-transform"></div><span>${linkifyTech(h)}</span>` }} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Tech Stack Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function TechStack() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['techstack'] ?? false;

    return (
        <div className="font-mono max-w-6xl mx-auto px-4 md:px-6 mb-8">
            <SectionHeader title="Tech Stack" isExpanded={isExpanded} onToggle={() => toggleSectionExpanded('techstack')} />
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {Object.entries(skillCategories).map(([category, skills]) => (
                        <SpotlightCard key={category} className="group hover:border-green-500/30 transition-all duration-300">
                            <div className="p-5">
                                <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-pulse"></span>
                                    {category}
                                    <span className="text-[10px] text-gray-400 ml-auto font-mono opacity-0 group-hover/spotlight:opacity-100 transition-opacity">{skills.length} items</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => {
                                        const url = techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
                                        let domain = 'google.com';
                                        try { domain = new URL(url).hostname; } catch { }
                                        const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                                        return (
                                            <Link key={skill} href={url} target="_blank" className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                                <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white dark:bg-gray-900 p-0.5 shrink-0">
                                                    <Image src={favicon} alt={skill} width={16} height={16} className="object-contain" />
                                                </div>
                                                {skill}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Recent Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function RecentSection({ title, command, items, linkText, linkUrl }: { title: string, command: string, items: any[], linkText: string, linkUrl: string }) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const sectionId = `recent-${title.toLowerCase().replace(/\s+/g, '-')}`;
    const isExpanded = expandedSections[sectionId] ?? false;

    return (
        <section className="font-mono group/section cursor-pointer max-w-6xl mx-auto px-6 md:px-12 mb-8" onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) return;
            toggleSectionExpanded(sectionId);
        }}>
            <div className="w-full text-left group">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <span className="text-primary text-glow">##</span>
                    <span className="group-hover/section:text-green-400 transition-colors duration-300">{title}</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                </h2>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3 text-xs">
                <span className="text-green-500 font-bold">$</span>
                <span className="opacity-75">{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-2 glass p-4 rounded-xl">
                    {items.map((item, index) => (
                        <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors py-1">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                {item.date && <span className="text-gray-500 text-xs">{item.date}</span>}
                                <Link href={item.url} target={item.isExternal ? "_blank" : undefined} className="text-green-700 dark:text-green-400 hover:underline">{item.title}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">→ <Link href={linkUrl} className="text-green-700 dark:text-green-400 hover:underline">{linkText}</Link></p>
            </div>
        </section>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Shelves (Directories) Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const shelfIcons: Record<string, React.ElementType> = { blogs: Feather, articles: FileText, books: Book, anime: Tv, hobby: Gamepad2 };
const shelves = (["blogs", "articles", "books", "anime", "hobby"] as const).map(key => ({
    name: key,
    path: directoryMap[key],
    description: shelfConfigs[key].description,
    icon: shelfIcons[key] as any,
    color: "text-green-500"
}));

export function ShelvesSection() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['shelves'] ?? false;

    return (
        <div className="section max-w-6xl mx-auto px-4 md:px-6 mb-8 section-padding">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div onClick={(e) => {
                    if ((e.target as HTMLElement).closest('a')) return;
                    toggleSectionExpanded('shelves');
                }} className="relative glass rounded-3xl p-6 md:p-8 hover:border-green-500/30 transition-all duration-500 cursor-pointer">
                    <section className="font-mono">
                        <div className="w-full text-left group mb-6">
                            <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3 tracking-tight text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                                <div className="h-8 w-1 rounded-full bg-green-500" />
                                Directories
                                <ChevronDown size={22} className={`transition-all duration-500 ${isExpanded ? "rotate-180" : "-rotate-90 opacity-40"}`} />
                            </h2>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-bold ml-4">
                                <span className="text-green-500">$</span><span>ls -F ~</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle ml-1 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            </div>
                        </div>
                        <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                                {shelves.map((shelf) => (
                                    <Link key={shelf.name} href={shelf.path} className="group/item flex items-center gap-5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500">
                                        <div className={`p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-100 dark:ring-white/10 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500 ${shelf.color}`}>
                                            <shelf.icon size={22} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors tracking-tight text-lg">{shelf.name}/</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-bold line-clamp-1">{shelf.description}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Contact Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ContactSection() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['contact'] ?? false;
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(siteConfig.contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="contact" className="font-mono max-w-6xl mx-auto px-6 md:px-12 mb-24">
            <SectionHeader title="Let's Talk" isExpanded={isExpanded} onToggle={() => toggleSectionExpanded('contact')} />
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-base max-w-2xl leading-relaxed">I&apos;m always open to discussing new opportunities, interesting projects, collaborations, or just chatting about tech, security, and system programming. Feel free to reach out!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href={`https://${siteConfig.contact.linkedin}`} target="_blank" className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">LinkedIn</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.linkedin.split('/').pop()}</div>
                            </div>
                            <ExternalLink size={16} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                    <div onClick={handleCopyEmail} className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">{copied ? "Copied!" : "Email"}</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.email}</div>
                            </div>
                            <ExternalLink size={16} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <Link href={`https://${siteConfig.contact.github}`} target="_blank" className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">GitHub</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.github.split('/').pop()}</div>
                            </div>
                            <ExternalLink size={16} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
