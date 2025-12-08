import Link from "next/link";
import WeatherWidget from "@/components/widgets/WeatherWidget";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-auto font-mono">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <span className="text-gray-500">$</span> cat ~/footer.txt
          </p>
          <p className="mb-4">© {new Date().getFullYear()} Adarsh Anand</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500">→</span>
            <Link
              href="https://github.com/adarshanand67"
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              GitHub
            </Link>
            <span className="text-gray-500">•</span>
            <Link
              href="https://linkedin.com/in/adarshanand67"
              target="_blank"
              className="text-green-700 dark:text-green-400 hover:underline"
            >
              LinkedIn
            </Link>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500 text-xs">
              Inspired by{" "}
              <Link
                href="https://arpitbhayani.me"
                target="_blank"
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                arpitbhayani.me
              </Link>
            </span>
            <span className="text-gray-500">•</span>
            <WeatherWidget />
          </div>
          <p className="mt-4 text-xs text-gray-500 hidden md:block">
            Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">⌘K</kbd> to
            navigate
          </p>
        </div>
      </div>
    </footer>
  );
}
