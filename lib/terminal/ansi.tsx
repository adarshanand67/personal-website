"use client";

import React from "react";

export const parseAnsi = (text: string) => {
    const ansiColors: Record<string, string> = {
        "30": "text-black",
        "31": "text-red-500",
        "32": "text-green-500",
        "33": "text-yellow-500",
        "34": "text-blue-500",
        "35": "text-purple-500",
        "36": "text-cyan-500",
        "37": "text-white",
        "90": "text-gray-500",
        "1": "font-bold",
        "0": "",
    };

    const parts = text.split(/(\x1b\[\d+m)/g);
    let currentColor = "";

    return parts
        .map((part, idx) => {
            const match = part.match(/\x1b\[(\d+)m/);
            if (match) {
                currentColor = ansiColors[match[1]] || "";
                return null;
            }
            if (!part) return null;
            return currentColor ? (
                <span key={idx} className={currentColor}>
                    {part}
                </span>
            ) : (
                part
            );
        })
        .filter(Boolean);
};
