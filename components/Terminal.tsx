"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Terminal() {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");

    const allLines = [
        "> ./adarsh_profile.exe",
        "> Initializing SDE protocol...",
        "> Loading modules: C++, Rust, System Design...",
        "> Access granted: Welcome to my portfolio.",
    ];

    useEffect(() => {
        if (currentLineIndex >= allLines.length) return;

        const targetLine = allLines[currentLineIndex];
        if (currentText.length < targetLine.length) {
            const timeout = setTimeout(() => {
                setCurrentText(targetLine.slice(0, currentText.length + 1));
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev, targetLine]);
                setCurrentText("");
                setCurrentLineIndex((prev) => prev + 1);
            }, 500); // Delay before next line
            return () => clearTimeout(timeout);
        }
    }, [currentText, currentLineIndex, allLines]);

    return (
        <div className="w-full max-w-lg bg-[#1e1e1e] rounded-lg shadow-xl overflow-hidden border border-gray-800 font-mono text-sm my-6">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-gray-400 text-xs">adarsh@linux:~</span>
            </div>
            <div className="p-4 text-green-400 h-[160px] overflow-y-auto">
                {lines.map((line, i) => (
                    <div key={i} className="mb-1">{line}</div>
                ))}
                {currentLineIndex < allLines.length && (
                    <div>
                        {currentText}
                        <span className="animate-pulse">_</span>
                    </div>
                )}
            </div>
        </div>
    );
}
