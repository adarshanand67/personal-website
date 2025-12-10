"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, X } from "lucide-react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { PLAYLIST, TRACK_NAMES, TRACK_IMAGES, AUDIO_CONFIG, ERROR_MESSAGES } from "@/lib";
import { useMounted } from "@/lib/hooks";
import Image from "next/image";

export default function MusicPlayer() {
    const {
        isPlaying, setIsPlaying,
        volume, setVolume,
        isMuted, toggleMute,
        currentTrackIndex, nextTrack, prevTrack,
        showMusicPlayer, toggleMusicPlayer
    } = useGlobalState();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mounted = useMounted();

    // Dragging state
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const playerRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Initialize position safely on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPosition({
                x: window.innerWidth - 300,
                y: window.innerHeight - 500
            });
        }
    }, [mounted]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, input')) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current && !isPlaying) {
                // Initial setup
            }
        }, AUDIO_CONFIG.AUTOPLAY_DELAY_MS);
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
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error(ERROR_MESSAGES.AUDIO.PLAYBACK_FAILED, e);
                    setIsPlaying(false);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex, setIsPlaying]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            if (audioRef.current.readyState >= 3) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleTrackError = () => {
        if (errorTimeoutRef.current) return;
        console.warn(ERROR_MESSAGES.AUDIO.TRACK_LOAD_FAILED);
        errorTimeoutRef.current = setTimeout(() => {
            nextTrack();
            errorTimeoutRef.current = null;
        }, 2000);
    };

    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        toggleMute();
    };

    if (!mounted || !showMusicPlayer) {
        return null;
    }

    return (
        <div
            ref={playerRef}
            className={`fixed z-50 font-sans select-none transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-move'} w-72 md:w-80`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            onMouseDown={handleMouseDown}
        >
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex]}
                onEnded={nextTrack}
                onError={handleTrackError}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                crossOrigin="anonymous"
            />

            {/* Mini Cute Player */}
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500"></div>

                {/* Main player container */}
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm border-b border-gray-800/50">
                        <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                            <span className="text-sm text-gray-300 font-medium">
                                {isPlaying ? 'Playing' : 'Paused'}
                            </span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMusicPlayer();
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                            aria-label="Close"
                        >
                            <X size={16} className="text-gray-400 hover:text-red-400" />
                        </button>
                    </div>

                    {/* Anime Image */}
                    <div className="relative h-40 md:h-72 overflow-hidden bg-gray-900">
                        <Image
                            src={TRACK_IMAGES[currentTrackIndex]}
                            alt={TRACK_NAMES[currentTrackIndex] || "Album Art"}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                        {/* Playing indicator */}
                        {isPlaying && (
                            <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm text-white font-medium">Playing</span>
                            </div>
                        )}
                    </div>

                    {/* Track info */}
                    <div className="px-4 py-3 bg-black/20">
                        <h3 className="text-base font-bold text-white truncate mb-1">
                            {TRACK_NAMES[currentTrackIndex] || "Unknown Track"}
                        </h3>
                        <p className="text-sm text-gray-400">Track {currentTrackIndex + 1}/{PLAYLIST.length}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="px-4 py-2 bg-black/20">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                            <div className="flex-1 group/progress">
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 100}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer
                                        [&::-webkit-slider-thumb]:appearance-none 
                                        [&::-webkit-slider-thumb]:w-3.5 
                                        [&::-webkit-slider-thumb]:h-3.5 
                                        [&::-webkit-slider-thumb]:bg-white 
                                        [&::-webkit-slider-thumb]:rounded-full
                                        [&::-webkit-slider-thumb]:shadow-lg
                                        [&::-webkit-slider-thumb]:opacity-0
                                        group-hover/progress:[&::-webkit-slider-thumb]:opacity-100
                                        [&::-webkit-slider-thumb]:transition-opacity
                                        hover:bg-green-600/50
                                        transition-colors"
                                    style={{
                                        background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${(currentTime / duration) * 100}%, rgb(55, 65, 81) ${(currentTime / duration) * 100}%, rgb(55, 65, 81) 100%)`
                                    }}
                                />
                            </div>
                            <span className="text-sm text-gray-400 w-10">{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="px-3 py-3 bg-black/30">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <button
                                onClick={prevTrack}
                                className="p-1.5 rounded-full hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
                                aria-label="Previous"
                            >
                                <SkipBack size={16} className="text-gray-300" fill="currentColor" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-2.5 rounded-full bg-white hover:bg-gray-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ?
                                    <Pause size={18} className="text-black" fill="currentColor" /> :
                                    <Play size={18} className="text-black ml-0.5" fill="currentColor" />
                                }
                            </button>

                            <button
                                onClick={nextTrack}
                                className="p-1.5 rounded-full hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
                                aria-label="Next"
                            >
                                <SkipForward size={16} className="text-gray-300" fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
