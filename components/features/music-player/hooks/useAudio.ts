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

    // We use local state for immediate feedback during drag, but otherwise sync with store
    // actually, we can just read from store for consumption, but update store on timeupdate.
    // However, for performance, we might want to keep local state and only sync store?
    // No, the requirement is to share state. So we must write to store.

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

    // Handle external seek requests (e.g. from Music Page)
    useEffect(() => {
        if (seekTime !== null && audioRef.current) {
            audioRef.current.currentTime = seekTime;
            requestSeek(null); // Clear the request
        }
    }, [seekTime, requestSeek]);

    const handleTimeUpdate = () => {
        if (audioRef.current && !isDraggingTime) {
            // Update store
            setProgress(audioRef.current.currentTime, audioRef.current.duration || 0);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime, audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((error) => {
                console.error("Error replaying track:", error);
                setIsPlaying(false);
            });
        } else nextTrack();
    };

    const handleError = (e: any) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);

        // Potential logic: automatically try next track if one fails
        // but only after a delay to avoid infinite loops if all fail
        /*
        setTimeout(() => {
            nextTrack();
        }, 1000);
        */
    };

    /**
     * Seek to a specific time in the current track.
     * This is used by local controls if needed, or we can unify to use requestSeek.
     * But since we are inside useAudio, we can just seek directly.
     */
    const seek = (time: number) => {
        if (!audioRef.current || isNaN(time)) return;

        try {
            audioRef.current.currentTime = time;
            setProgress(time, audioRef.current.duration || 0);
        } catch (error) {
            console.error("Error seeking audio:", error);
        }
    };

    // We return store values now for consumers of this hook,
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
        handleError,
        seek,
        currentTrackSrc: tracks[currentTrackIndex]?.src || "",
    };
}
