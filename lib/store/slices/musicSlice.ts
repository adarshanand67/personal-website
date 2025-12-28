/** Music player state slice for Zustand store. */

import { StateCreator } from "zustand";
import { AppState, MusicState } from "../types";
import { tracks } from "@/lib/constants";

/** Creates the music player state slice for playback controls and track management. */
export const createMusicSlice: StateCreator<AppState, [], [], MusicState> = (set) => ({
    showMusicPlayer: false,
    isPlaying: false,
    volume: 1.0,
    isMuted: false,
    currentTrackIndex: 0,
    isShuffle: false,
    isRepeat: false,
    toggleMusicPlayer: () => set((state) => ({ showMusicPlayer: !state.showMusicPlayer })),
    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
    toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setVolume: (volume) => set({ volume }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    nextTrack: () =>
        set((state) => {
            if (state.isShuffle) {
                const nextIndex = Math.floor(Math.random() * tracks.length);
                return { currentTrackIndex: nextIndex };
            }
            return {
                currentTrackIndex: (state.currentTrackIndex + 1) % tracks.length,
            };
        }),
    prevTrack: () =>
        set((state) => ({
            currentTrackIndex: (state.currentTrackIndex - 1 + tracks.length) % tracks.length,
        })),
    setCurrentTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),
    currentTime: 0,
    duration: 0,
    seekTime: null,
    setProgress: (currentTime, duration) => set({ currentTime, duration }),
    requestSeek: (time) => set({ seekTime: time }),
});
