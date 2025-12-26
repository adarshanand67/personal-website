import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { tracks } from "@/lib/constants";

export function useAudio() {
    const { isPlaying, setIsPlaying, volume, isMuted, currentTrackIndex, nextTrack, isRepeat } =
        useStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDraggingTime, setIsDraggingTime] = useState(false);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
        import("@/lib/audioAnalyzer").then(({ audioAnalyzer }) => {
            audioAnalyzer.setVolume(isMuted ? 0 : volume);
        });
    }, [volume, isMuted]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
        else audioRef.current.pause();
    }, [isPlaying, setIsPlaying, currentTrackIndex]);

    const handleTimeUpdate = () => {
        if (audioRef.current && !isDraggingTime) setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };

    const handleEnded = () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else nextTrack();
    };

    const seek = (time: number) => {
        setCurrentTime(time);
        if (audioRef.current) audioRef.current.currentTime = time;
    };

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
