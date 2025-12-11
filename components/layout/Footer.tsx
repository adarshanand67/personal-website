"use client";
import Link from "next/link";
import { Home } from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto font-mono overflow-hidden">
      { }
      <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 via-transparent to-transparent dark:from-green-950/20 dark:via-transparent dark:to-transparent pointer-events-none"></div>
      { }
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      { }
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 glass rounded-2xl p-4 shadow-sm mx-auto w-fit">
          { }
          <Link
            href="/"
            scroll={false}
            className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-sm"
            title="Back to Home"
          >
            <Home size={18} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium hidden sm:inline-block">Home</span>
          </Link>
          { }
          <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
          { }
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/blogshelf", label: "Blogs", icon: "📝" },
              { href: "/papershelf", label: "Papers", icon: "📄" },
              { href: "/bookshelf", label: "Books", icon: "📚" },
              { href: "/animeshelf", label: "Anime", icon: "📺" },
              { href: "/hobbyshelf", label: "Hobby", icon: "🎮" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 text-sm font-medium flex items-center gap-2"
              >
                <span className="text-xs opacity-70">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          { }
          <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-800"></div>
        </div>
        { }
        <p className="text-gray-500 dark:text-gray-400 font-medium text-center text-xs opacity-80 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <span className="mr-1">©</span>
          {new Date().getFullYear()}
          <span className="ml-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
            Adarsh Anand
          </span>
        </p>
      </div>
    </footer>
  );
}
