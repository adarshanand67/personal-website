"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { ChevronDown, Book, FileText, Tv, Gamepad2, Feather, LayoutGrid, Network, User, Terminal as TerminalIcon, LayoutTemplate } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { SectionHeader, GlitchText, Terminal } from "@/components/layout";
import { linkifyTech } from "@/lib/techLinks";
import { getAssetPath } from "@/lib/utils";
import { techLinks } from "@/lib/techLinks";
import { shelfConfigs, siteConfig } from "@/lib/config";
import { Hero3D } from "@/components/hero-3d";
import { directoryMap, skillCategories } from "@/lib/constants";
import { SkillGraph } from "@/components/skill-graph";
import { ArchitectureViewer } from "@/components/architecture-viewer";
import { XRayWrapper } from "@/components/x-ray-wrapper";
import { withXRay } from "@/lib/withXRay";

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
            <Hero3D />
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
                                    <GlitchText text={profile.name} className="text-primary" />
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
const HeroWrapped = withXRay(HeroBase, 'Hero');
export function Hero(props: any) {
    return <HeroWrapped {...props} />;
}

function ContactSectionBase() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['contact'] ?? false;

    return (
        <div className="font-mono">
            <SectionHeader
                title="Let's Talk"
                command="echo $CONTACT_INFO"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded('contact')}
            />
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-base max-w-2xl leading-relaxed">
                    I&apos;m always open to discussing new opportunities, interesting projects, collaborations,
                    or just chatting about tech, security, and system programming. Feel free to reach out!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href={`https://${siteConfig.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">LinkedIn</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.linkedin.split('/').pop()}</div>
                            </div>
                            <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                    <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">Email</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.email}</div>
                            </div>
                            <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                    <a
                        href={`https://${siteConfig.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden glass rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-0.5">GitHub</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{siteConfig.contact.github.split('/').pop()}</div>
                            </div>
                            <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

const ContactSectionWrapped = withXRay(ContactSectionBase, 'ContactSection');
export function ContactSection() {
    return <ContactSectionWrapped />;
}

interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
    logo?: string;
    description?: string;
    highlights: string[];
}
interface ExperienceProps {
    items: ExperienceItem[];
}

const ExperienceWrapped = withXRay(ExperienceBase, 'Experience');
export function Experience(props: ExperienceProps) {
    return <ExperienceWrapped {...props} />;
}

function ExperienceBase({ items }: ExperienceProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['experience'] ?? false;

    return (
        <div className="mb-4 font-mono" id="experience">
            <SectionHeader
                title="Experience"
                command="cat ~/work/history.log"
                isExpanded={isExpanded}
                onToggle={() => toggleSectionExpanded('experience')}
            />
            { }
            <div
                className={`relative transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pt-4 pl-2">
                    {items.map((exp, index) => (
                        <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0 last:border-l-transparent hover:border-green-500 transition-colors group/item">
                            { }
                            <div className="absolute left-0 top-0 z-10 w-4 h-4 -translate-x-[9px] rounded-full bg-green-500 border-4 border-white dark:border-gray-900 group-hover/item:scale-125 transition-transform"></div>
                            <div className="flex flex-col gap-3 glass p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                { }
                                <div className="flex items-start gap-3">
                                    {exp.logo && (
                                        <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
                                            <Image
                                                src={getAssetPath(exp.logo)}
                                                alt={`${exp.company} logo`}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{exp.company}</h3>
                                        <p className="text-green-600 dark:text-green-400 font-semibold mt-0.5">{exp.role}</p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            <span>{exp.duration}</span>
                                            <span className="text-gray-400">•</span>
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                                { }
                                {exp.description && (
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {exp.description}
                                    </p>
                                )}
                                { }
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <ul className="space-y-2">
                                        {exp.highlights.map((highlight, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-2 text-gray-700 dark:text-gray-300 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: `<span class="text-green-500 shrink-0">▸</span><span>${linkifyTech(highlight)}</span>`
                                                }}
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const TechStackWrapped = withXRay(TechStackBase, 'TechStack');
export function TechStack() {
    return <TechStackWrapped />;
}

function TechStackBase() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['techstack'] ?? false;
    const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');

    return (
        <div className="font-mono">
            <div className="flex items-center justify-between mb-4">
                <SectionHeader
                    title="Tech Stack"
                    command="cat ~/.skills"
                    isExpanded={isExpanded}
                    onToggle={() => toggleSectionExpanded('techstack')}
                />
            </div>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {/* View Toggle */}
                <div className="flex justify-end px-1 mb-4">
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'list'
                                ? 'bg-white dark:bg-black text-green-600 dark:text-green-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            <LayoutGrid size={14} />
                            <span>Skills List</span>
                        </button>
                        <button
                            onClick={() => setViewMode('graph')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'graph'
                                ? 'bg-white dark:bg-black text-green-600 dark:text-green-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                }`}
                        >
                            <Network size={14} />
                            <span>Architecture</span>
                        </button>
                    </div>
                </div>

                {viewMode === 'graph' ? (
                    <div className="mt-4 mb-8">
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-500 max-w-lg mx-auto">
                                Interactive visualization of the system architecture. Hover over nodes to see data flow.
                            </p>
                        </div>
                        <SkillGraph />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {Object.entries(skillCategories).map(([category, skills]) => (
                            <div
                                key={category}
                                className="glass p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-green-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/5"
                            >
                                <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-pulse"></span>
                                    {category}
                                    <span className="text-[10px] text-gray-400 ml-auto font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                        {skills.length} items
                                    </span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => {
                                        const url = techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
                                        let domain = 'google.com';
                                        try {
                                            domain = new URL(url).hostname;
                                        } catch {
                                        }
                                        const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

                                        return (
                                            <Link
                                                key={skill}
                                                href={url}
                                                target="_blank"
                                                className="
                                                    flex items-center gap-2 pl-2 pr-3 py-1.5 
                                                    bg-gray-50/50 dark:bg-gray-800/30 
                                                    border border-gray-200 dark:border-gray-700 
                                                    rounded-full text-xs font-medium 
                                                    text-gray-700 dark:text-gray-300 
                                                    hover:bg-white dark:hover:bg-gray-800 
                                                    hover:text-green-600 dark:hover:text-green-400 
                                                    hover:border-green-500/50 hover:shadow-md 
                                                    hover:-translate-y-0.5 transition-all duration-200
                                                "
                                            >
                                                <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white dark:bg-gray-900 p-0.5 shrink-0">
                                                    <Image
                                                        src={favicon}
                                                        alt={skill}
                                                        width={16}
                                                        height={16}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                {skill}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface Item {
    title: string;
    url: string;
    date?: string;
    isExternal?: boolean;
}
interface RecentSectionProps {
    title: string;
    command: string;
    items: Item[];
    linkText: string;
    linkUrl: string;
}
const RecentSectionWrapped = withXRay(RecentSectionBase, 'RecentSection');
export function RecentSection(props: RecentSectionProps) {
    return <RecentSectionWrapped {...props} />;
}

function RecentSectionBase({
    title,
    command,
    items,
    linkText,
    linkUrl,
}: RecentSectionProps) {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const sectionId = `recent-${title.toLowerCase().replace(/\s+/g, '-')}`;
    const isExpanded = expandedSections[sectionId] ?? false;

    return (
        <section
            className="font-mono group/section cursor-pointer"
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('a')) return;
                toggleSectionExpanded(sectionId);
            }}
        >
            <div className="w-full text-left group">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <span className="text-primary text-glow">##</span>
                    <span className="group-hover/section:text-green-400 transition-colors duration-300">{title}</span>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                </h2>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3 text-xs">
                <span className="text-green-500 font-bold">$</span>
                <span className="opacity-75">{command}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </div>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="space-y-2 glass p-4 rounded-xl">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors py-1"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                                {item.date && <span className="text-gray-500 text-xs">{item.date}</span>}
                                <Link
                                    href={item.url}
                                    target={item.isExternal ? "_blank" : undefined}
                                    className="text-green-700 dark:text-green-400 hover:underline"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    →{" "}
                    <Link href={linkUrl} className="text-green-700 dark:text-green-400 hover:underline">
                        {linkText}
                    </Link>
                </p>
            </div>
        </section>
    );
}

const shelfIcons: Record<string, React.ElementType> = {
    blogs: Feather,
    articles: FileText,
    books: Book,
    anime: Tv,
    hobby: Gamepad2
};

const shelves = ["blogs", "articles", "books", "anime", "hobby"].map(key => ({
    name: key,
    path: directoryMap[key],
    description: shelfConfigs[key].description,
    icon: shelfIcons[key],
    color: "text-green-500"
}));
const ShelvesSectionWrapped = withXRay(ShelvesSectionBase, 'ShelvesSection');
export function ShelvesSection() {
    return <ShelvesSectionWrapped />;
}

function ShelvesSectionBase() {
    const { expandedSections, toggleSectionExpanded } = useStore();
    const isExpanded = expandedSections['shelves'] ?? false;

    return (
        <div className="section max-w-4xl mx-auto px-4 mb-8">
            <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div
                    onClick={(e) => {
                        if ((e.target as HTMLElement).closest('a')) return;
                        toggleSectionExpanded('shelves');
                    }}
                    className="relative glass rounded-xl p-4 hover:border-green-500/50 transition-colors duration-300 cursor-pointer"
                >
                    <section className="font-mono">
                        <div className="w-full text-left group mb-3">
                            <h2 className="text-2xl font-bold flex items-center gap-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                                <span className="text-primary">##</span> <span className="text-green-700 dark:text-green-400">Directories</span>
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                />
                            </h2>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                <span className="text-green-500 font-bold">$</span>
                                <span>tree -d -L 1 ~</span>
                                <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                            </div>
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {shelves.map((shelf) => (
                                    <Link
                                        key={shelf.name}
                                        href={shelf.path}
                                        className="group/item flex items-start gap-3 p-3 rounded-lg border border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:border-green-500/30 transition-all duration-300"
                                    >
                                        <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover/item:scale-110 transition-transform duration-300 ${shelf.color}`}>
                                            <shelf.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-700 dark:text-gray-200 group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors">
                                                {shelf.name}/
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {shelf.description}
                                            </div>
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
