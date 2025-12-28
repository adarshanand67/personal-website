"use client";

import {
    Heart,
    MoreVertical,
    ArrowLeft,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    ListMusic,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tracks } from "@/lib/constants/music";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

export default function MusicPage() {
    const {
        currentTrackIndex,
        isPlaying,
        setIsPlaying,
        setCurrentTrack,
        nextTrack,
        prevTrack,
        isShuffle,
        toggleShuffle,
        isRepeat,
        toggleRepeat,
        volume,
        setVolume,
        currentTime,
        duration,
        requestSeek,
        showMusicPlayer,
        toggleMusicPlayer,
    } = useStore();

    // Validate tracks array
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        No Music Available
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        There are no tracks available to play.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-105 transition-transform inline-block"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    // Validate current track index
    const safeTrackIndex = Math.max(0, Math.min(currentTrackIndex, tracks.length - 1));
    const currentTrack = tracks[safeTrackIndex];

    // Validate current track object
    if (!currentTrack || typeof currentTrack !== "object") {
        console.error("Invalid track at index:", safeTrackIndex);
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Track Error
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        The current track could not be loaded.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-105 transition-transform inline-block"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate progress percentage with safety checks
    const progress =
        duration && duration > 0 && !isNaN(duration) ? (currentTime / duration) * 100 : 0;

    // Handle seeking with validation
    const handleSeek = (vals: number[]) => {
        if (!vals || !Array.isArray(vals) || vals.length === 0) return;
        if (!duration || duration <= 0 || isNaN(duration)) return;

        const newTime = (vals[0] / 100) * duration;
        if (!isNaN(newTime) && newTime >= 0 && newTime <= duration) {
            requestSeek(newTime);
        }
    };

    // Format time (mm:ss) with validation
    const formatTime = (time: number) => {
        if (!time || isNaN(time) || time < 0) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Local state for volume slider with validation
    const handleVolumeChange = (vals: number[]) => {
        if (!vals || !Array.isArray(vals) || vals.length === 0) return;
        const newVolume = vals[0];
        if (!isNaN(newVolume) && newVolume >= 0 && newVolume <= 1) {
            setVolume(newVolume);
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const [isMaximized, setIsMaximized] = useState(false);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    // Close floating widget when this page loads, re-open when leaving
    useEffect(() => {
        try {
            // Explicitly close the mini player
            if (showMusicPlayer) {
                toggleMusicPlayer();
            }

            // Re-open widget when component unmounts (user navigates away)
            return () => {
                if (!showMusicPlayer) {
                    toggleMusicPlayer();
                }
            };
        } catch (error) {
            console.error("Error managing music player visibility:", error);
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            // Spacebar - Play/Pause
            if (e.code === "Space") {
                e.preventDefault();
                setIsPlaying(!isPlaying);
            }

            // M key - Toggle maximize
            if (e.key === "m" || e.key === "M") {
                e.preventDefault();
                setIsMaximized(!isMaximized);
            }

            // Arrow Right - Next track
            if (e.key === "ArrowRight") {
                e.preventDefault();
                nextTrack();
            }

            // Arrow Left - Previous track
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prevTrack();
            }

            // Arrow Up - Volume up
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setVolume(Math.min(1, volume + 0.1));
            }

            // Arrow Down - Volume down
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setVolume(Math.max(0, volume - 0.1));
            }

            // S key - Toggle shuffle
            if (e.key === "s" || e.key === "S") {
                e.preventDefault();
                toggleShuffle();
            }

            // R key - Toggle repeat
            if (e.key === "r" || e.key === "R") {
                e.preventDefault();
                toggleRepeat();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [
        isPlaying,
        isMaximized,
        volume,
        setIsPlaying,
        nextTrack,
        prevTrack,
        setVolume,
        toggleShuffle,
        toggleRepeat,
    ]);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
            {/* Desktop Maximize/Minimize Toggle */}
            <div className="hidden sm:flex fixed top-6 right-6 z-50">
                <button
                    onClick={toggleMaximize}
                    className="bg-white dark:bg-neutral-900 p-3 rounded-full hover:scale-110 transition-all shadow-lg border border-gray-200 dark:border-gray-700 text-black dark:text-white"
                    aria-label={isMaximized ? "Minimize player" : "Maximize player"}
                >
                    {isMaximized ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 3h6v6" />
                            <path d="M9 21H3v-6" />
                            <path d="M21 3l-7 7" />
                            <path d="M3 21l7-7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Header - iOS Style */}
            <div className="sticky top-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl p-4 pt-8 md:pt-4 flex items-center justify-center lg:hidden border-b border-black/5 dark:border-white/5">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full absolute top-2" />
                <Link
                    href="/"
                    className="absolute left-4 p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors pt-6 md:pt-2"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <span className="font-semibold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mt-2 md:mt-0">
                    NOW PLAYING
                </span>
                <button className="absolute right-4 p-2 -mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors pt-6 md:pt-2">
                    <MoreVertical className="w-6 h-6" />
                </button>
            </div>

            {/* Main Content - Apple Music Style: Left Player, Right Playlist */}
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] lg:overflow-hidden pt-4 lg:pt-8 px-4 lg:px-8 max-w-[1800px] mx-auto">
                {/* LEFT SIDE - Music Player */}
                <div
                    className={cn(
                        "flex flex-col justify-start lg:justify-center transition-all duration-500 ease-in-out pb-8 lg:pb-0 lg:overflow-y-auto",
                        isMaximized ? "lg:w-2/3 px-4 lg:px-12" : "lg:w-1/2 px-4 lg:px-8"
                    )}
                >
                    {/* Album Art Section */}
                    <div
                        className={cn(
                            "w-full max-w-md mx-auto mb-8 transition-all duration-500 ease-out",
                            isMaximized ? "lg:max-w-2xl" : "lg:max-w-lg"
                        )}
                    >
                        {/* Glow Effect */}
                        <div
                            className={cn(
                                "absolute inset-0 rounded-[2rem] bg-black/20 dark:bg-white/10 blur-3xl translate-y-4 transition-opacity duration-1000",
                                isPlaying ? "opacity-100" : "opacity-30"
                            )}
                        />

                        {/* Album Art Container - Fixed aspect ratio */}
                        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.1)] border border-black/5 dark:border-white/5">
                            {currentTrack?.image && (
                                <Image
                                    src={currentTrack.image}
                                    alt={currentTrack.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )}
                        </div>
                    </div>

                    {/* Controls & Details Section */}
                    <div className="flex flex-col justify-center w-full max-w-md lg:max-w-lg mx-auto pb-4">
                        {/* Track Info */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-1 min-w-0 mr-4">
                                <h1
                                    className={cn(
                                        "font-bold mb-2 text-gray-900 dark:text-gray-50 truncate tracking-tight transition-all",
                                        isMaximized
                                            ? "text-3xl lg:text-4xl"
                                            : "text-2xl lg:text-3xl"
                                    )}
                                >
                                    {currentTrack?.title}
                                </h1>
                                <p
                                    className={cn(
                                        "text-pink-500 dark:text-pink-400 font-medium truncate",
                                        isMaximized ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"
                                    )}
                                >
                                    {currentTrack?.artist}
                                </p>
                            </div>
                            <button className="p-3 bg-gray-100 dark:bg-white/10 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 active:scale-95 transition-all">
                                <Heart
                                    className={cn(
                                        "transition-all",
                                        isMaximized ? "w-7 h-7" : "w-6 h-6"
                                    )}
                                />
                            </button>
                        </div>

                        {/* Progress Slider */}
                        <div className="mb-6 group w-full">
                            <Slider
                                value={[progress]}
                                min={0}
                                max={100}
                                step={0.1}
                                onValueChange={handleSeek}
                                className="cursor-pointer py-4"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-[-6px] font-medium font-mono">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Main Controls - iOS Style */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <button
                                onClick={toggleShuffle}
                                className={cn(
                                    "p-2 transition-colors",
                                    isShuffle
                                        ? "text-pink-500"
                                        : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                                )}
                            >
                                <Shuffle className={cn(isMaximized ? "w-6 h-6" : "w-5 h-5")} />
                            </button>

                            <button
                                onClick={prevTrack}
                                className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-transform active:scale-90"
                            >
                                <SkipBack
                                    className={cn(
                                        "fill-current",
                                        isMaximized ? "w-11 h-11" : "w-10 h-10"
                                    )}
                                />
                            </button>

                            <button
                                onClick={handlePlayPause}
                                className={cn(
                                    "bg-gray-100 dark:bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
                                    isMaximized ? "w-20 h-20" : "w-16 h-16"
                                )}
                            >
                                {isPlaying ? (
                                    <Pause
                                        className={cn(
                                            "fill-current",
                                            isMaximized ? "w-10 h-10" : "w-8 h-8"
                                        )}
                                    />
                                ) : (
                                    <Play
                                        className={cn(
                                            "fill-current ml-1",
                                            isMaximized ? "w-10 h-10" : "w-8 h-8"
                                        )}
                                    />
                                )}
                            </button>

                            <button
                                onClick={nextTrack}
                                className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-transform active:scale-90"
                            >
                                <SkipForward
                                    className={cn(
                                        "fill-current",
                                        isMaximized ? "w-11 h-11" : "w-10 h-10"
                                    )}
                                />
                            </button>

                            <button
                                onClick={toggleRepeat}
                                className={cn(
                                    "p-2 transition-colors",
                                    isRepeat
                                        ? "text-pink-500"
                                        : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                                )}
                            >
                                <Repeat className={cn(isMaximized ? "w-6 h-6" : "w-5 h-5")} />
                            </button>
                        </div>

                        {/* Volume Slider - iOS Style */}
                        <div className="flex items-center gap-4 px-2 mb-8">
                            <Volume2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            <Slider
                                value={[volume * 100]}
                                min={0}
                                max={100}
                                step={1}
                                onValueChange={(val) => handleVolumeChange([val[0] / 100])}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Playlist */}
                <div
                    className={cn(
                        "flex flex-col transition-all duration-500 bg-gray-50 dark:bg-white/5 lg:border-l border-black/5 dark:border-white/5 lg:rounded-2xl lg:m-4",
                        isMaximized ? "lg:w-1/3 lg:overflow-y-auto" : "lg:w-1/2 lg:overflow-y-auto",
                        "px-6 py-6 lg:px-8 lg:py-8"
                    )}
                >
                    <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white sticky top-0 bg-gray-50 dark:bg-white/5 pb-4 z-10">
                        <ListMusic className="w-5 h-5" />
                        <h2 className="text-lg font-bold">Up Next</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                            {tracks.length} songs
                        </span>
                    </div>

                    <div className="space-y-1">
                        {tracks.map((track, index) => {
                            const isCurrent = currentTrackIndex === index;
                            return (
                                <div
                                    key={track.src}
                                    onClick={() => setCurrentTrack(index)}
                                    className={cn(
                                        "flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer group",
                                        isCurrent
                                            ? "bg-white dark:bg-white/10 shadow-sm"
                                            : "hover:bg-white/50 dark:hover:bg-white/5 active:scale-[0.98]"
                                    )}
                                >
                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                        <Image
                                            src={track.image}
                                            alt={track.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            sizes="56px"
                                        />
                                        {isCurrent && isPlaying && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-[3px]">
                                                <div className="w-[3px] h-3 bg-white animate-music-bar-1" />
                                                <div className="w-[3px] h-5 bg-white animate-music-bar-2" />
                                                <div className="w-[3px] h-2 bg-white animate-music-bar-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={cn(
                                                "font-semibold truncate text-base",
                                                isCurrent
                                                    ? "text-pink-500 dark:text-pink-400"
                                                    : "text-gray-900 dark:text-white"
                                            )}
                                        >
                                            {track.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {track.artist}
                                        </p>
                                    </div>
                                    <div
                                        className={cn(
                                            "transition-opacity",
                                            isCurrent
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        <Play className="w-5 h-5 fill-current text-gray-400 dark:text-gray-500" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
