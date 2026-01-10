"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { NavLinks } from "./Navbar"; // Importing NavLinks from sibling component

export function Footer() {
  return (
    <footer className="hidden md:block relative py-16 border-t border-foreground/5 mt-auto font-mono overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-6 backdrop-blur-3xl bg-white/50 dark:bg-black/40 rounded-3xl border border-foreground/10 p-6 shadow-2xl mb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-foreground/40 hover:text-foreground"
          >
            <Home
              size={18}
              className="text-black dark:text-gray-400 group-hover:scale-110"
            />
            <span className="font-black uppercase tracking-widest text-xs">
              Home
            </span>
          </Link>
          <div className="w-px h-6 bg-foreground/10" />
          <NavLinks />
        </div>
        <p className="text-gray-500 font-medium text-center text-[10px] opacity-60 pb-8 tracking-widest uppercase">
          ©{new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
