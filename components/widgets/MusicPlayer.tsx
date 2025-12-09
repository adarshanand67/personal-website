"use client";

import { useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Disc, SkipBack, SkipForward } from "lucide-react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { PLAYLIST, TRACK_NAMES, AUDIO_CONFIG, ERROR_MESSAGES } from "@/lib";
import { useMounted } from "@/lib/hooks";
import { POSITION_STYLES, BUTTON_STYLES } from "@/lib/styles";

export default function MusicPlayer() {
    const {
        isPlaying, setIsPlaying,
        volume, setVolume,
        isMuted, toggleMute,
        currentTrackIndex, nextTrack, prevTrack
    } = useGlobalState();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mounted = useMounted();

    // Try to autoplay on mount
    useEffect(() => {
        // give valid user interaction a chance or just try
        const timer = setTimeout(() => {
            if (audioRef.current && !isPlaying) {
                // Initial autoplay might still be blocked, but state is now global
                // audioRef.current.play().then(() => setIsPlaying(true)).catch(...)
                // We'll leave strict autoplay off or handled by user interaction for safer UX
            }
        }, AUDIO_CONFIG.AUTOPLAY_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause sync
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error(ERROR_MESSAGES.AUDIO.PLAYBACK_FAILED, e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, setIsPlaying]); // Added setIsPlaying to dep array

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTrackError = () => {
        console.warn(ERROR_MESSAGES.AUDIO.TRACK_LOAD_FAILED);
        nextTrack();
    };

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        toggleMute();
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className={`${POSITION_STYLES.FIXED_BOTTOM_RIGHT} z-50 font-mono`}>
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex]}
                loop
                onError={handleTrackError}
                crossOrigin="anonymous"
            />

            <div className="bg-[#1e1e1e]/90 backdrop-blur-sm border border-green-500/50 p-4 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-start gap-4 transition-all hover:border-green-400">
                {/* Animated Icon */}
                <div className={`relative w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-gray-700 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <Disc className={`w-6 h-6 text-green-500 ${isPlaying ? 'animate-pulse' : ''}`} />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="text-xs text-green-400 font-bold uppercase tracking-wider flex justify-between w-full gap-4">
                        <span>{isPlaying ? "Now Playing" : "Paused"}</span>
                        <span className="text-[10px] opacity-70">Track {currentTrackIndex + 1}/{PLAYLIST.length}</span>
                    </div>
                    <div className="text-xs text-gray-400 w-32 truncate">
                        {TRACK_NAMES[currentTrackIndex] || "Unknown Track"}
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                        <button
                            onClick={togglePlay}
                            className={BUTTON_STYLES.ICON_BUTTON}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <button
                            onClick={nextTrack}
                            className={BUTTON_STYLES.ICON_BUTTON}
                            aria-label="Next Track"
                        >
                            <SkipForward size={16} />
                        </button>

                        <button
                            onClick={handleMute}
                            className={BUTTON_STYLES.ICON_BUTTON}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>

                        <input
                            type="range"
                            min={AUDIO_CONFIG.MIN_VOLUME}
                            max={AUDIO_CONFIG.MAX_VOLUME}
                            step={AUDIO_CONFIG.VOLUME_STEP}
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full"
                            aria-label="Volume Control"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
