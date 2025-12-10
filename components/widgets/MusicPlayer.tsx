"use client";
import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, X, Minus, Maximize2, Music } from "lucide-react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { useMounted } from "@/lib/hooks/useMounted";
import { PLAYLIST, TRACK_NAMES, TRACK_IMAGES, AUDIO_CONFIG } from "@/lib/constants";
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
    const [offset, setOffset] = useState({ x: 24, y: 24 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });
    const playerRef = useRef<HTMLDivElement>(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const hasMoved = useRef(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOffset({ x: 24, y: 24 });
        }
    }, [mounted]);
    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, input')) return;
        setIsDragging(true);
        hasMoved.current = false;
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialOffset({ ...offset });
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            hasMoved.current = true;
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setOffset({
                x: initialOffset.x - dx,
                y: initialOffset.y - dy
            });
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button, input')) return;
        setIsDragging(true);
        hasMoved.current = false;
        const touch = e.touches[0];
        setDragStart({ x: touch.clientX, y: touch.clientY });
        setInitialOffset({ ...offset });
    };
    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
            e.preventDefault();
            hasMoved.current = true;
            const touch = e.touches[0];
            const dx = touch.clientX - dragStart.x;
            const dy = touch.clientY - dragStart.y;
            setOffset({
                x: initialOffset.x - dx,
                y: initialOffset.y - dy
            });
        }
    };
    const handleTouchEnd = () => {
        setIsDragging(false);
    };
    const handleClick = (e: React.MouseEvent) => {
        if (!hasMoved.current) {
            setIsMinimized(!isMinimized);
        }
    };
    useEffect(() => {
        setOffset(prev => ({
            x: Math.max(10, prev.x),
            y: Math.max(10, prev.y)
        }));
    }, [isMinimized]);
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging]);
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
                    console.error('Playback failed:', e);
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
        console.warn('Track load failed');
        errorTimeoutRef.current = setTimeout(() => {
            nextTrack();
            errorTimeoutRef.current = null;
        }, 2000);
    };
    const handleMute = () => {
        if (audioRef.current) audioRef.current.muted = !isMuted;
        toggleMute();
    };
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
    };
    if (!mounted) return null;
    if (!showMusicPlayer) {
        return (
            <button
                onClick={toggleMusicPlayer}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/60 backdrop-blur-md border border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-110 hover:bg-green-500 hover:text-black transition-all duration-300 group"
                aria-label="Show Music Player"
            >
                <Music size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                    Open Player
                </span>
            </button>
        );
    }
    return (
        <div
            ref={playerRef}
            className={`fixed z-50 font-sans select-none transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-move'} ${isMinimized ? 'w-72' : 'w-80 md:w-96'}`}
            style={{
                right: `${offset.x}px`,
                bottom: `${offset.y}px`
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={handleClick}
        >        <audio
                ref={audioRef}
                src={PLAYLIST[currentTrackIndex]}
                onEnded={nextTrack}
                onError={handleTrackError}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                crossOrigin="anonymous"
            />
            { }
            <div className={`relative bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 group active:scale-[0.99] transition-transform duration-200`}>
                { }
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden h-full">
                    {isMinimized ? (
                        <div className="flex items-center justify-between p-3 gap-3">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-white text-sm font-bold truncate">
                                        {TRACK_NAMES[currentTrackIndex]}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white" />}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
                                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <Maximize2 size={14} className="text-gray-400 hover:text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleMusicPlayer(); }}
                                    className="p-1.5 rounded-full hover:bg-red-500/20 transition-colors"
                                >
                                    <X size={14} className="text-gray-400 hover:text-red-400" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            { }
                            <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-sm border-b border-gray-800/50">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                                    <span className="text-sm text-gray-300 font-medium">
                                        {isPlaying ? 'Playing' : 'Paused'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsMinimized(true);
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                        aria-label="Minimize"
                                    >
                                        <Minus size={16} className="text-gray-400 hover:text-white" />
                                    </button>
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
                            </div>
                            { }
                            <div className="relative h-40 md:h-72 overflow-hidden bg-gray-900">
                                <Image
                                    src={TRACK_IMAGES[currentTrackIndex]}
                                    alt={TRACK_NAMES[currentTrackIndex] || "Album Art"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                { }
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                                { }
                                {isPlaying && (
                                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-sm text-white font-medium">Playing</span>
                                    </div>
                                )}
                            </div>
                            { }
                            <div className="px-4 py-3 bg-black/20">
                                <h3 className="text-base font-bold text-white truncate mb-1">
                                    {TRACK_NAMES[currentTrackIndex] || "Unknown Track"}
                                </h3>
                                <p className="text-sm text-gray-400">Track {currentTrackIndex + 1}/{PLAYLIST.length}</p>
                            </div>
                            { }
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
                            { }
                            <div className="px-3 py-3 bg-black/30 flex flex-col gap-3">
                                { }
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevTrack(); }}
                                        className="p-1.5 rounded-full hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
                                        aria-label="Previous"
                                    >
                                        <SkipBack size={16} className="text-gray-300" fill="currentColor" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                        className="p-2.5 rounded-full bg-white hover:bg-gray-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ?
                                            <Pause size={18} className="text-black" fill="currentColor" /> :
                                            <Play size={18} className="text-black ml-0.5" fill="currentColor" />
                                        }
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                                        className="p-1.5 rounded-full hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
                                        aria-label="Next"
                                    >
                                        <SkipForward size={16} className="text-gray-300" fill="currentColor" />
                                    </button>
                                </div>
                                { }
                                <div className="flex items-center gap-2 px-4 pb-1">
                                    <button onClick={(e) => { e.stopPropagation(); handleMute(); }} className="p-1 hover:text-white text-gray-400">
                                        {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                                        style={{
                                            background: `linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) ${volume * 100}%, rgb(55, 65, 81) ${volume * 100}%, rgb(55, 65, 81) 100%)`
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
