"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
    { id: "hero", label: "Hero" },
    { id: "experience", label: "Experience" },
    { id: "techstack", label: "Tech Stack" },
    { id: "contact", label: "Contact" },
];

export function QuickJump() {
    const [activeSection, setActiveSection] = useState("");
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
            {sections.map((section) => (
                <div
                    key={section.id}
                    className="relative flex items-center justify-end"
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <AnimatePresence>
                        {hoveredSection === section.id && (
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute right-8 mr-2 px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-mono text-gray-500 uppercase tracking-widest pointer-events-none"
                            >
                                {section.label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id
                            ? "bg-green-500 scale-125 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                            : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500 scale-100"
                            }`}
                        aria-label={`Jump to ${section.label}`}
                    />
                </div>
            ))}
        </div>
    );
}
