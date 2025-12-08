"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { PLAYLIST, TRACK_NAMES } from "@/lib/constants";

interface GlobalState {
    isMatrixEnabled: boolean;
    toggleMatrix: () => void;
    setMatrix: (enabled: boolean) => void;
    // Music State
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    volume: number;
    setVolume: (vol: number) => void;
    isMuted: boolean;
    toggleMute: () => void;
    currentTrackIndex: number;
    nextTrack: () => void;
    prevTrack: () => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    // Matrix enabled by default as requested
    const [isMatrixEnabled, setIsMatrixEnabled] = useState(true);

    // Music State
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const toggleMatrix = () => setIsMatrixEnabled((prev) => !prev);
    const setMatrix = (enabled: boolean) => setIsMatrixEnabled(enabled);

    const setVolume = (vol: number) => setVolumeState(Math.max(0, Math.min(1, vol)));
    const toggleMute = () => setIsMuted((prev) => !prev);
    const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);

    return (
        <GlobalContext.Provider
            value={{
                isMatrixEnabled,
                toggleMatrix,
                setMatrix,
                isPlaying,
                setIsPlaying,
                volume,
                setVolume,
                isMuted,
                toggleMute,
                currentTrackIndex,
                nextTrack,
                prevTrack,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
};
