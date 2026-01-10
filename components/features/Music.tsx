"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  ChevronDown,
  Maximize2,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { tracks } from "@/lib/constants";

// ... (Copy Music related components: useAudio, MusicToggleButton, TrackInfo, ProgressBar, MusicPlayer)

function useAudio() {
  const {
    isPlaying,
    setIsPlaying,
    volume,
    isMuted,
    currentTrackIndex,
    nextTrack,
    isRepeat,
    setProgress,
    seekTime,
    requestSeek,
  } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isDraggingTime, setIsDraggingTime] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    else audioRef.current.pause();
  }, [isPlaying, setIsPlaying, currentTrackIndex]);

  useEffect(() => {
    if (seekTime !== null && audioRef.current) {
      audioRef.current.currentTime = seekTime;
      requestSeek(null);
    }
  }, [seekTime, requestSeek]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDraggingTime)
      setProgress(audioRef.current.currentTime, audioRef.current.duration || 0);
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current)
      setProgress(audioRef.current.currentTime, audioRef.current.duration);
  };
  const handleEnded = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else nextTrack();
  };
  const seek = (time: number) => {
    if (!audioRef.current || isNaN(time)) return;
    audioRef.current.currentTime = time;
    setProgress(time, audioRef.current.duration || 0);
  };

  const { currentTime, duration } = useStore();
  return {
    audioRef,
    currentTime,
    duration,
    isDraggingTime,
    setIsDraggingTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    seek,
    currentTrackSrc: tracks[currentTrackIndex]?.src || "",
  };
}

export function MusicToggleButton() {
  const { toggleMusicPlayer, isPlaying } = useStore();
  return (
    <button
      onClick={toggleMusicPlayer}
      className="hidden md:flex fixed bottom-8 right-6 md:right-8 z-[101] w-14 h-14 bg-white dark:bg-zinc-800 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <div className={`relative ${isPlaying ? "animate-pulse" : ""}`}>
        <Music size={22} className="text-zinc-900 dark:text-zinc-100" />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 dark:bg-zinc-100 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-zinc-900 dark:bg-zinc-100" />
          </span>
        )}
      </div>
    </button>
  );
}

function TrackInfo({ index, onClose }: { index: number; onClose: () => void }) {
  const track = tracks[index];
  if (!track)
    return (
      <div className="flex gap-4 items-center animate-pulse">
        <div className="w-20 h-20 shrink-0 bg-foreground/5 rounded-[1.5rem]" />
      </div>
    );
  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-20 h-20 shrink-0 rounded-[1.5rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-all duration-700">
        <Image
          src={track.image || "/icon.png"}
          alt={track.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xl font-black line-clamp-1 text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
          {track.title}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold mt-1 line-clamp-1 uppercase tracking-[0.2em]">
          {track.artist}
        </span>
      </div>
      <div className="flex gap-1">
        <Link
          href="/music"
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group/maximize"
        >
          <Maximize2
            size={20}
            className="text-zinc-400 dark:text-zinc-500 group-hover/maximize:text-zinc-900 dark:group-hover/maximize:text-zinc-100 transition-colors"
          />
        </Link>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all shrink-0 hover:scale-110 active:scale-90 group/close"
        >
          <ChevronDown
            size={20}
            className="text-zinc-400 dark:text-zinc-500 group-hover/close:text-zinc-900 dark:group-hover/close:text-zinc-100 transition-colors"
          />
        </button>
      </div>
    </div>
  );
}

function ProgressBar({
  currentTime,
  duration,
  onSeek,
  onDragStateChange,
}: any) {
  const formatTime = (t: number) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60),
      s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  const p = (currentTime / (duration || 1)) * 100;
  return (
    <div className="space-y-2 group/progress">
      <div className="relative h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-pointer overflow-visible">
        <div
          className="absolute top-0 left-0 h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-100 shadow-sm z-0"
          style={{ width: `${p}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-900 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all duration-300 border-2 border-zinc-900 dark:border-zinc-100 scale-75 group-hover/progress:scale-100 z-20"
          style={{ left: `calc(${p}% - 8px)` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          onMouseDown={() => onDragStateChange(true)}
          onMouseUp={() => onDragStateChange(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 tabular-nums tracking-widest px-0.5">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export function MusicPlayer() {
  const {
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentTrackIndex,
    nextTrack,
    prevTrack,
    showMusicPlayer,
    toggleMusicPlayer,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
  } = useStore();
  const {
    audioRef,
    currentTime,
    duration,
    setIsDraggingTime,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    seek,
    currentTrackSrc,
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
        preload="metadata"
      />
      <div
        className={`fixed bottom-28 right-4 md:right-8 z-[100] transition-all duration-700 ease-in-out origin-bottom-right transform ${showMusicPlayer ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"}`}
      >
        <div className="w-[320px] backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl rounded-[2.5rem] p-6 flex flex-col gap-6 overflow-hidden relative group">
          <TrackInfo index={currentTrackIndex} onClose={toggleMusicPlayer} />
          <div className="flex flex-col gap-4">
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={seek}
              onDragStateChange={setIsDraggingTime}
            />
            <div className="flex items-center justify-between px-2">
              <button
                onClick={toggleShuffle}
                className={`p-1.5 transition-all text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${isShuffle ? "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-400/10 rounded-full" : ""}`}
              >
                <Shuffle size={18} />
              </button>
              <div className="flex items-center gap-6">
                <button
                  onClick={prevTrack}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  <SkipBack size={24} fill="currentColor" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 flex items-center justify-center bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all group/play"
                >
                  {isPlaying ? (
                    <Pause
                      size={28}
                      className="text-zinc-900 dark:text-zinc-100"
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={28}
                      className="text-zinc-900 dark:text-zinc-100 ml-1"
                      fill="currentColor"
                    />
                  )}
                </button>
                <button
                  onClick={nextTrack}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  <SkipForward size={24} fill="currentColor" />
                </button>
              </div>
              <button
                onClick={toggleRepeat}
                className={`p-1.5 transition-all relative text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 ${isRepeat ? "text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-400/10 rounded-full" : ""}`}
              >
                <Repeat size={18} />
                {isRepeat && (
                  <span className="absolute -top-1 -right-1 text-[8px] bg-green-500 text-white w-3 h-3 rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3 px-1 group/volume">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={14} />
                ) : (
                  <Volume1 size={14} />
                )}
              </button>
              <div className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full relative">
                <div
                  className="absolute top-0 left-0 h-full bg-zinc-900/40 dark:bg-zinc-100/40 rounded-full"
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
              <Volume2 size={14} className="text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
