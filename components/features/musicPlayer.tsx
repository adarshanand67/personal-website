"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle, ChevronDown, Music } from "lucide-react";
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDraggingTime, setIsDraggingTime] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
        import('@/lib/audioAnalyzer').then(({ audioAnalyzer }) => {
            audioAnalyzer.setVolume(isMuted ? 0 : volume);
        });
    }, [volume, isMuted]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, setIsPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const handleTimeUpdate = () => {
        if (audioRef.current && !isDraggingTime) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };
    const handleEnded = () => isRepeat ? (audioRef.current!.currentTime = 0, audioRef.current!.play()) : nextTrack();

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) audioRef.current.currentTime = newTime;
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (!mounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrackIndex]}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                crossOrigin="anonymous"
            />

            <div
                ref={playerRef}
                className={`fixed bottom-24 right-8 z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${showMusicPlayer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
            >
                <div className="w-72 glass-apple border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-5 flex flex-col gap-4">
                    {/* Top Info */}
                    <div className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                            <Image
                                src={trackImages[currentTrackIndex] || "/icon.png"}
                                alt="Album Art"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate text-gray-900 dark:text-white">
                                {trackNames[currentTrackIndex]}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                Adarsh Anand
                            </span>
                        </div>
                        <button
                            onClick={toggleMusicPlayer}
                            className="ml-auto p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <ChevronDown size={18} className="text-gray-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 group">
                        <div className="flex justify-between text-[9px] font-mono text-gray-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div className="relative h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                onMouseDown={() => setIsDraggingTime(true)}
                                onMouseUp={() => setIsDraggingTime(false)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-2">
                        <button
                            onClick={toggleShuffle}
                            className={`p-1.5 transition-colors ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
                        >
                            <Shuffle size={16} />
                        </button>

                        <div className="flex items-center gap-4">
                            <button onClick={prevTrack} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <SkipBack size={20} fill="currentColor" />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                            >
                                {isPlaying ? <Pause size={20} className="text-white dark:text-black" fill="currentColor" /> : <Play size={20} className="text-white dark:text-black ml-0.5" fill="currentColor" />}
                            </button>
                            <button onClick={nextTrack} className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <SkipForward size={20} fill="currentColor" />
                            </button>
                        </div>

                        <button
                            onClick={toggleRepeat}
                            className={`p-1.5 transition-colors relative ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
                        >
                            <Repeat size={16} />
                            {isRepeat && <span className="absolute top-0 right-0 text-[8px] font-bold">1</span>}
                        </button>
                    </div>

                    {/* Volume Slider */}
                    <div className="flex items-center gap-3 px-2 group">
                        <button onClick={toggleMute} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <div className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-gray-600 dark:bg-green-500/80 rounded-full"
                                style={{ width: `${volume * 100}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function MusicToggleButton() {
    const { toggleMusicPlayer, isPlaying } = useStore();
    return (
        <button
            onClick={toggleMusicPlayer}
            className="fixed bottom-8 right-8 z-[101] w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            title="Open Music Player"
        >
            <div className={`relative ${isPlaying ? 'animate-pulse' : ''}`}>
                <Music size={22} />
                {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                )}
            </div>
        </button>
    );
}
