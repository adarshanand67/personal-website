"use client";
import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

export default function BackToTop() {
  const { isBackToTopVisible, setIsBackToTopVisible } = useStore();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };
    // Initial check
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [setIsBackToTopVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isBackToTopVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 md:p-5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all z-50 font-mono text-sm hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
}
