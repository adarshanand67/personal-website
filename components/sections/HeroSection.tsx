"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Mail,
  Github,
  User,
  Terminal as TerminalIcon,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { siteConfig } from "@/lib/config";
import { Profile } from "@/types/definitions";
import { Terminal } from "@/components/layout";
import { TiltWrapper, SystemStatus } from "@/components/features";

export const ViewToggle = ({
  viewMode,
  setViewMode,
}: {
  viewMode: "profile" | "terminal";
  setViewMode: (mode: "profile" | "terminal") => void;
}) => (
  <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 ml-auto pointer-events-auto shadow-sm gap-1">
    <button
      onClick={() => setViewMode("profile")}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
        viewMode === "profile"
          ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
      }`}
    >
      <User size={14} /> <span>Profile</span>
    </button>
    <button
      onClick={() => setViewMode("terminal")}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
        viewMode === "terminal"
          ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
      }`}
    >
      <TerminalIcon size={14} /> <span>Terminal</span>
    </button>
  </div>
);

export function Hero({ profile }: { profile: Profile }) {
  const { heroViewMode, setHeroViewMode } = useStore();
  return (
    <section
      id="hero"
      className="section max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative overflow-visible"
      onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
      }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {heroViewMode === "profile" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="glass rounded-[2rem] p-6 md:p-10 border border-white/10 relative overflow-hidden group/container shadow-xl">
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
                  <TiltWrapper intensity={15}>
                    <div className="relative w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-2 border-foreground/10 shadow-2xl">
                      <Image
                        src={profile.avatar || ""}
                        alt={profile.name}
                        fill
                        className="object-cover"
                        priority
                        unoptimized
                      />
                    </div>
                  </TiltWrapper>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                      <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                        {profile.name}
                      </h1>
                      <ViewToggle
                        viewMode={heroViewMode}
                        setViewMode={setHeroViewMode}
                      />
                    </div>
                    <SystemStatus />
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground/90 mt-6 pl-6 border-l-2 border-foreground/10 italic">
                      {profile.bio.paragraphs[0]}
                    </blockquote>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                  {[
                    {
                      label: "LinkedIn",
                      name: "Connect",
                      href: `https://${siteConfig.contact.linkedin}`,
                      icon: Linkedin,
                    },
                    {
                      label: "Email",
                      name: "Say Hello",
                      href: `mailto:${siteConfig.contact.email}`,
                      icon: Mail,
                    },
                    {
                      label: "GitHub",
                      name: "Codebase",
                      href: `https://${siteConfig.contact.github}`,
                      icon: Github,
                    },
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="p-4 rounded-3xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-background rounded-2xl flex items-center justify-center border border-foreground/10">
                          <social.icon size={20} />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                            {social.label}
                          </p>
                          <h3 className="text-sm font-bold">{social.name}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <div className="absolute top-6 right-8 z-20">
                <ViewToggle
                  viewMode={heroViewMode}
                  setViewMode={setHeroViewMode}
                />
              </div>
              <Terminal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
