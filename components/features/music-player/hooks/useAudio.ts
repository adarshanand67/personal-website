import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import { tracks } from "@/lib/constants";

/**
 * Custom hook for managing audio playback functionality.
 * Handles audio element lifecycle, playback controls, volume, and time tracking.
 * Integrates with global store for playback state and audio analyzer for visualization.
 *
 * @returns {Object} Audio control utilities and state
 * @returns {React.RefObject<HTMLAudioElement>} returns.audioRef - Reference to audio element
 * @returns {number} returns.currentTime - Current playback time in seconds
 * @returns {number} returns.duration - Total track duration in seconds
 * @returns {boolean} returns.isDraggingTime - Whether user is dragging time slider
 * @returns {Function} returns.setIsDraggingTime - Set dragging state
 * @returns {Function} returns.handleTimeUpdate - Audio timeupdate event handler
 * @returns {Function} returns.handleLoadedMetadata - Audio loadedmetadata event handler
 * @returns {Function} returns.handleEnded - Audio ended event handler
 * @returns {Function} returns.seek - Seek to specific time
 * @returns {string} returns.currentTrackSrc - Current track source URL
 *
 * @example
 * ```tsx
 * const { audioRef, currentTime, duration, seek } = useAudio();
 *
 * return (
 *   <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
 * );
 * ```
 */
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

    /**
     * Seek to a specific time in the current track.
     *
     * @param {number} time - Time in seconds to seek to
     */
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
