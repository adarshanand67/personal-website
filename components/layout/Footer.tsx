import Link from "next/link";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import { Heart, Zap, Sparkles } from "lucide-react";

export default function Footer() {
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
        <div className="text-sm space-y-6">
          {/* Terminal prompt */}
          <div className="group">
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <span className="text-green-500 font-bold group-hover:scale-110 transition-transform inline-block">$</span>
              <span className="opacity-75">cat ~/footer.txt</span>
              <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle ml-1"></span>
            </p>
          </div>

          {/* Copyright */}
          <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
            <span className="text-gray-500 mr-2">©</span>
            {new Date().getFullYear()}
            <span className="ml-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
              Adarsh Anand
            </span>
          </p>

          {/* Weather Widget */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50">
              <WeatherWidget />
            </div>
          </div>

          {/* Inspired by badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200/50 dark:border-gray-700/50">
              <Sparkles size={14} className="text-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Inspired by</span>
              <Link
                href="https://arpitbhayani.me"
                target="_blank"
                className="text-xs text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-semibold transition-colors"
              >
                arpitbhayani.me
              </Link>
            </div>
          </div>

          {/* CTF Challenge hint */}
          <div className="flex justify-center">
            <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50 hover:border-green-500/50 transition-all duration-300">
              <span className="text-xs text-green-700 dark:text-green-400">🔐</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Psst... there's a hidden CTF challenge in the terminal
              </span>
              <span className="text-xs text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">👀</span>
            </div>
          </div>

          {/* Keyboard shortcut hint */}
          <div className="pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 group">
              <span className="opacity-75">Press</span>
              <kbd className="px-3 py-1.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md font-semibold text-gray-700 dark:text-gray-300 group-hover:scale-105 group-hover:shadow-lg transition-all">
                ⌘K
              </kbd>
              <span className="opacity-75">to navigate</span>
              <span className="ml-1 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
            </p>
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
        </div>
      </div>
    </footer>
  );
}
