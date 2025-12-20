"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/lib/sounds";

export const SoundToggle = () => {
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        setIsMuted(sounds.getMuted());
    }, []);

    const toggle = () => {
        const newState = !isMuted;
        sounds.setMuted(newState);
        setIsMuted(newState);
        if (!newState) {
            sounds.playClick();
        }
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            title={isMuted ? "Unmute UI Sounds" : "Mute UI Sounds"}
        >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
    );
};
