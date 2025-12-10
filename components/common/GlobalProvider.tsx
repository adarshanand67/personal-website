"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

import { PLAYLIST } from "@/lib/constants";

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
    // Music Player Visibility
    showMusicPlayer: boolean;
    toggleMusicPlayer: () => void;
    setShowMusicPlayer: (show: boolean) => void;
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

    // Music Player Visibility - hidden by default for better mobile UX
    const [showMusicPlayer, setShowMusicPlayer] = useState(false);

    const toggleMatrix = useCallback(() => setIsMatrixEnabled((prev) => !prev), []);
    const setMatrix = useCallback((enabled: boolean) => setIsMatrixEnabled(enabled), []);

    const setVolume = useCallback((vol: number) => setVolumeState(Math.max(0, Math.min(1, vol))), []);
    const toggleMute = useCallback(() => setIsMuted((prev) => !prev), []);
    const nextTrack = useCallback(() => setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length), []);
    const prevTrack = useCallback(() => setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length), []);

    const toggleMusicPlayer = useCallback(() => setShowMusicPlayer((prev) => !prev), []);

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
                showMusicPlayer,
                toggleMusicPlayer,
                setShowMusicPlayer,
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
