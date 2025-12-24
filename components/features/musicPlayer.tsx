"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { useAudio } from "./music-player/hooks/useAudio";
import { TrackInfo } from "./music-player/TrackInfo";
import { ProgressBar } from "./music-player/ProgressBar";
import { Controls } from "./music-player/Controls";
import { VolumeControl } from "./music-player/VolumeControl";

export { MusicToggleButton } from './music-player/MusicToggleButton';

export function MusicPlayer() {
    const {
        isPlaying, setIsPlaying, volume, setVolume, isMuted, toggleMute,
        currentTrackIndex, nextTrack, prevTrack, showMusicPlayer, toggleMusicPlayer,
        isShuffle, toggleShuffle, isRepeat, toggleRepeat
    } = useStore();

    const {
        audioRef, currentTime, duration, setIsDraggingTime,
        handleTimeUpdate, handleLoadedMetadata, handleEnded, seek, currentTrackSrc
    } = useAudio();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrackSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                crossOrigin="anonymous"
            />

            <div className={`fixed bottom-24 right-8 z-[100] transition-all duration-500 transform ${showMusicPlayer ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="w-72 glass-apple border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-5 flex flex-col gap-4">
                    <TrackInfo index={currentTrackIndex} onClose={toggleMusicPlayer} />
                    <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} onDragStateChange={setIsDraggingTime} />
                    <Controls
                        isPlaying={isPlaying}
                        onTogglePlay={() => setIsPlaying(!isPlaying)}
                        onNext={nextTrack}
                        onPrev={prevTrack}
                        isShuffle={isShuffle}
                        onToggleShuffle={toggleShuffle}
                        isRepeat={isRepeat}
                        onToggleRepeat={toggleRepeat}
                    />
                    <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={setVolume} onToggleMute={toggleMute} />
                </div>
            </div>
        </>
    );
}
