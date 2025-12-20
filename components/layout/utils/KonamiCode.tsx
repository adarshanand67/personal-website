"use client";

import { useEffect } from "react";
import { sounds } from "@/lib/sounds";

export const KonamiCode = () => {
    useEffect(() => {
        const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let current = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === pattern[current]) {
                current++;
                if (current === pattern.length) {
                    current = 0;
                    activateEasterEgg();
                }
            } else {
                current = 0;
            }
        };

        const activateEasterEgg = () => {
            sounds.playTransition();
            // Trigger a global "hack" event that other components can listen to
            document.dispatchEvent(new CustomEvent("konami-activated"));

            // Visual alert
            const alert = document.createElement("div");
            alert.className = "fixed inset-0 z-[200] flex items-center justify-center bg-black/90 text-green-500 font-mono text-4xl text-center p-10 animate-pulse pointer-events-none";
            alert.innerHTML = "GOD MODE ACTIVATED<br/><span class='text-xl opacity-70'>UNLIMITED KNOWLEDGE UNLOCKED</span>";
            document.body.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return null;
};
