"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export const useKonamiCode = () => {
    const [triggered, setTriggered] = useState(false);
    const [inputIndex, setInputIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check if the key matches the current expected key in the sequence
            if (e.key === KONAMI_CODE[inputIndex]) {
                const nextIndex = inputIndex + 1;

                if (nextIndex === KONAMI_CODE.length) {
                    // Full code entered!
                    setTriggered((prev) => !prev);
                    setInputIndex(0);
                } else {
                    // Advance to next key
                    setInputIndex(nextIndex);
                }
            } else {
                // Reset if wrong key, but check if the key is the start of the sequence again (ArrowUp)
                // to allow for retrying immediately without a gap.
                setInputIndex(e.key === KONAMI_CODE[0] ? 1 : 0);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [inputIndex]);

    return triggered;
};
