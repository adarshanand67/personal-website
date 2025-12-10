"use client";

import Link from "next/link";
import { useState } from "react";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import { Heart, Zap, Sparkles, ChevronDown, Home } from "lucide-react";

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="relative py-16 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto font-mono overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 via-transparent to-transparent dark:from-green-950/20 dark:via-transparent dark:to-transparent pointer-events-none"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-sm">
          {/* Terminal prompt with Home Navigation */}
          <div className="flex justify-center mb-8">
            <Link
              href="/"
              scroll={false}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 dark:border-gray-800/50 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
            >
              <Home size={18} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Navigation Links */}
            <div className="mb-8">
              <h3 className="text-center text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Explore
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/blogshelf"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                >
                  📝 Blogs
                </Link>
                <Link
                  href="/papershelf"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                >
                  📄 Papers
                </Link>
                <Link
                  href="/bookshelf"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                >
                  📚 Books
                </Link>
                <Link
                  href="/animeshelf"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                >
                  📺 Anime
                </Link>
                <Link
                  href="/hobbyshelf"
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                >
                  🎮 Hobbies
                </Link>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="flex justify-center">
              <WeatherWidget />
            </div>

            {/* Inspired by badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 text-xs">
                <Sparkles size={14} className="text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Inspired by</span>
                <Link
                  href="https://arpitbhayani.me"
                  target="_blank"
                  className="text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-semibold transition-colors"
                >
                  arpitbhayani.me
                </Link>
              </div>
            </div>

            {/* Made with love badge */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse fill-red-500" />
              <span className="text-gray-600 dark:text-gray-400">and</span>
              <Zap size={16} className="text-green-500 fill-green-500" />
              <span className="text-gray-600 dark:text-gray-400">in</span>
              <span className="font-semibold bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">India</span>
            </div>

            {/* Copyright moved to end */}
            <p className="text-gray-500 dark:text-gray-400 font-medium text-center text-xs opacity-80 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
              <span className="mr-1">©</span>
              {new Date().getFullYear()}
              <span className="ml-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
                Adarsh Anand
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
