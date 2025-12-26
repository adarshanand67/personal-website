"use client";

import React from "react";

export const parseAnsi = (text: string) => {
    if (typeof text !== "string") return "";

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
        "2": "opacity-50",
        "4": "underline",
        "0": "",
    };

    try {
        const parts = text.split(/(\x1b\[[0-9;]*m)/g);
        let currentClasses: string[] = [];

        return parts
            .map((part, idx) => {
                if (!part) return null;

                const match = part.match(/\x1b\[([0-9;]*)m/);
                if (match) {
                    const codes = match[1].split(";");
                    codes.forEach((code) => {
                        if (code === "0") {
                            currentClasses = [];
                        } else if (ansiColors[code]) {
                            // If it's a color (30-37, 90), replace current color
                            if ((parseInt(code) >= 30 && parseInt(code) <= 37) || code === "90") {
                                currentClasses = currentClasses.filter(
                                    (c) => !Object.values(ansiColors).slice(0, 9).includes(c)
                                );
                            }
                            currentClasses.push(ansiColors[code]);
                        }
                    });
                    return null;
                }

                const classes = currentClasses.join(" ");
                return classes ? (
                    <span key={idx} className={classes}>
                        {part}
                    </span>
                ) : (
                    part
                );
            })
            .filter(Boolean);
    } catch (error) {
        console.warn("Error parsing ANSI:", error);
        return text;
    }
};
