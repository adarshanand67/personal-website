"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Disc, SkipBack, SkipForward } from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fallback tracks if one fails (Lofi / Chillhop style)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const PLAYLIST = [
        "https://archive.org/download/tvtunes_30971/One%20Punch%20Man.mp3",
        "https://archive.org/download/fav-mikezillak/Pokemon%20Theme%20-%20Billy%20Crawford.mp3",
        "https://archive.org/download/cowboy-bebop-tank-the-best/Tank!%20(TV%20stretch).mp3",
        "https://archive.org/download/mythium/JLS_ATI.mp3",
    ];

    const TRACK_NAMES = [
        "A Cruel Angel's Thesis",
        "THE HERO!! (One Punch Man)",
        "Tank! (Cowboy Bebop)",
        "Lofi Chill Session",
    ];

    // Try to autoplay on mount
    useEffect(() => {
        // give valid user interaction a chance or just try
        const timer = setTimeout(() => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => console.log("Autoplay blocked by browser - interaction required"));
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            // Reset and play when track changes if it was already playing
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                        // Try next track on failure
                        handleTrackError();
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const handlePrevious = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    };

    const handleTrackError = () => {
        console.warn("Track failed to load, switching to next...");
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        setCurrentTrackIndex(nextIndex);
        // Auto-play next if error occurred during playback intent
        if (isPlaying && audioRef.current) {
            audioRef.current.load();
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 font-mono">
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
                            onClick={handlePrevious}
                            className="hover:text-green-400 text-gray-300 transition-colors"
                        >
                            <SkipBack size={16} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="hover:text-green-400 text-gray-300 transition-colors"
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>

                        <button
                            onClick={handleNext}
                            className="hover:text-green-400 text-gray-300 transition-colors"
                        >
                            <SkipForward size={16} />
                        </button>

                        <button
                            onClick={toggleMute}
                            className="hover:text-green-400 text-gray-300 transition-colors"
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
