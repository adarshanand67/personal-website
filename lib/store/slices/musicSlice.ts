import { StateCreator } from 'zustand';
import { AppState, MusicState } from '../types';
import { playlist } from '@/lib/constants';

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
    nextTrack: () => set((state) => {
        if (state.isShuffle) {
            const nextIndex = Math.floor(Math.random() * playlist.length);
            return { currentTrackIndex: nextIndex };
        }
        return {
            currentTrackIndex: (state.currentTrackIndex + 1) % playlist.length
        };
    }),
    prevTrack: () => set((state) => ({
        currentTrackIndex: (state.currentTrackIndex - 1 + playlist.length) % playlist.length
    })),
});
