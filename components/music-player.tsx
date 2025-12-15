"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { playlist, trackNames, trackImages } from "@/lib/constants";

export function MusicPlayer() {
    const {
        isPlaying, setIsPlaying,
        volume, setVolume,
        isMuted, toggleMute,
        currentTrackIndex, nextTrack, prevTrack,
        showMusicPlayer, toggleMusicPlayer,
        isShuffle, toggleShuffle,
        isRepeat, toggleRepeat
    } = useStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Seekbar state
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDraggingTime, setIsDraggingTime] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showMusicPlayer && playerRef.current && !playerRef.current.contains(event.target as Node)) {
                toggleMusicPlayer();
            }
        };

        if (showMusicPlayer) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMusicPlayer, toggleMusicPlayer]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current && !isPlaying) {
                // strict autoplay off
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
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Playback failed:", e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, setIsPlaying, currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTrackError = () => {
        console.warn("Track failed to load, switching to next...");
        nextTrack();
    };

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        toggleMute();
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && !isDraggingTime) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        if (isRepeat) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            nextTrack();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleSeekStart = () => setIsDraggingTime(true);
    const handleSeekEnd = () => setIsDraggingTime(false);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (!mounted) {
        return null;
    }

    // Fixed position bottom-8 right-8
    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex]}
                onError={handleTrackError}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                crossOrigin="anonymous"
            />
            <div
                ref={playerRef}
                className={`fixed bottom-8 right-8 z-[60] font-sans transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom-right ${showMusicPlayer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}
            >
                <div className="bg-white/90 dark:bg-[#121212] backdrop-blur-md w-80 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-2xl border border-gray-200 dark:border-[#282828] overflow-hidden flex flex-col transition-colors duration-300">

                    {/* 1. Header (Close) */}
                    <div className="flex justify-between items-center px-4 pt-3 pb-1 border-b border-gray-100 dark:border-[#282828]/50">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">
                            Track {currentTrackIndex + 1} / {playlist.length}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={toggleMusicPlayer}
                                className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-[#282828] transition-colors"
                                title="Close"
                            >
                                <ChevronDown size={16} />
                            </button>
                        </div>
                    </div>

                    {/* 2. Album Art & Info */}
                    <div className="p-4 flex gap-4 items-center">
                        {/* No rotation as requested */}
                        <div className="relative w-16 h-16 shrink-0 rounded-md shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
                            <Image
                                src={trackImages[currentTrackIndex] || "/icon.png"}
                                alt="Album Art"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col overflow-hidden min-w-0 flex-1">
                            <div className="w-full relative overflow-hidden h-5">
                                <div className="absolute whitespace-nowrap animate-marquee hover:animate-pause text-gray-900 dark:text-white font-bold text-sm">
                                    {trackNames[currentTrackIndex] || "Unknown Track"}
                                </div>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                                Adarsh's Playlist
                            </span>
                        </div>
                    </div>

                    {/* 3. Seekbar */}
                    <div className="px-4 flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                        <span className="w-8 text-right">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative group">
                            <div
                                className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                onMouseDown={handleSeekStart}
                                onMouseUp={handleSeekEnd}
                                onTouchStart={handleSeekStart}
                                onTouchEnd={handleSeekEnd}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                aria-label="Seek"
                            />
                        </div>
                        <span className="w-8">{formatTime(duration)}</span>
                    </div>

                    {/* 4. Controls */}
                    <div className="px-4 py-3 flex flex-col gap-3">
                        <div className="flex items-center justify-between w-full">
                            <button
                                onClick={toggleShuffle}
                                className={`transition-colors ${isShuffle ? 'text-green-500 hover:text-green-600' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                title="Shuffle"
                            >
                                <Shuffle size={16} />
                            </button>

                            <div className="flex items-center gap-4">
                                <button onClick={prevTrack} className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors">
                                    <SkipBack size={20} fill="currentColor" />
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ?
                                        <Pause size={18} fill="currentColor" className="text-white dark:text-black" /> :
                                        <Play size={18} fill="currentColor" className="text-white dark:text-black ml-0.5" />
                                    }
                                </button>

                                <button onClick={nextTrack} className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors">
                                    <SkipForward size={20} fill="currentColor" />
                                </button>
                            </div>

                            <button
                                onClick={toggleRepeat}
                                className={`transition-colors ${isRepeat ? 'text-green-500 hover:text-green-600' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                title="Repeat One"
                            >
                                <Repeat size={16} />
                                {isRepeat && <span className="absolute text-[8px] -mt-1 ml-0.5 font-bold">1</span>}
                            </button>
                        </div>

                        {/* Volume Slider */}
                        <div className="flex items-center gap-2 mt-1">
                            <button onClick={handleMute} className="text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
                            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full relative group">
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full group-hover:bg-green-400 transition-colors"
                                    style={{ width: `${volume * 100}%` }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    aria-label="Volume"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
