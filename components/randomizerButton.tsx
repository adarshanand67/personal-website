"use client";

import { useState, useRef, useEffect } from "react";
import { Shuffle } from "lucide-react";
import { useStore } from "@/lib/store/useStore";

interface RandomizerButtonProps {
    items: unknown[];
    onPick: (item: unknown) => void;
}

export function RandomizerButton({ items, onPick }: RandomizerButtonProps) {
    const { isRandomizing, setIsRandomizing } = useStore();
    const [displayIndex, setDisplayIndex] = useState<number | null>(null);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    const handleRandomize = () => {
        if (items.length === 0 || isRandomizing) return;

        setIsRandomizing(true);
        setDisplayIndex(null);
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        const totalDuration = 800; // 0.8 seconds spin (Faster)
        let interval = 30;
        let elapsed = 0;

        const spin = () => {
            const randomIndex = Math.floor(Math.random() * items.length);
            setDisplayIndex(randomIndex);

            elapsed += interval;
            interval *= 1.1; // Slow down

            if (elapsed < totalDuration) {
                const timeout = setTimeout(spin, interval);
                timeoutsRef.current.push(timeout);
            } else {
                // Final pick
                const finalIndex = Math.floor(Math.random() * items.length);
                setDisplayIndex(finalIndex);
                setTimeout(() => {
                    setIsRandomizing(false);
                    onPick(items[finalIndex]);
                }, 200);
            }
        };

        spin();
    };

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    return (
        <button
            onClick={handleRandomize}
            disabled={isRandomizing || items.length === 0}
            className={`
                relative group flex items-center gap-2 px-4 py-2 
                bg-gray-100 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 
                rounded-lg font-mono text-sm font-bold
                hover:border-green-500 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isRandomizing ? 'border-green-500 text-green-500' : 'text-gray-700 dark:text-gray-300'}
            `}
        >
            <Shuffle
                size={16}
                className={`transition-transform duration-500 ${isRandomizing ? 'animate-spin' : 'group-hover:rotate-12'}`}
            />
            <span>
                {isRandomizing ? "Picking..." : "Pick for Me"}
            </span>
            {isRandomizing && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            )}
        </button>
    );
}
