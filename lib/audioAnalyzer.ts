"use client";

/**
 * AudioAnalyzer class for managing Web Audio API functionality.
 * Provides audio visualization and volume control capabilities.
 * Implements singleton pattern to ensure single audio context instance.
 *
 * @class
 *
 * @example
 * ```typescript
 * const analyzer = AudioAnalyzer.getInstance();
 * analyzer.init(audioElement);
 * const frequencyData = analyzer.getFrequencyData();
 * ```
 */
class AudioAnalyzer {
    private static instance: AudioAnalyzer;
    private context: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private gainNode: GainNode | null = null;
    private dataArray: Uint8Array | null = null;
    private source: MediaElementAudioSourceNode | null = null;
    private initialized = false;

    private constructor() {}

    /**
     * Get the singleton instance of AudioAnalyzer.
     * Creates a new instance if one doesn't exist.
     *
     * @returns {AudioAnalyzer} The singleton AudioAnalyzer instance
     */
    static getInstance(): AudioAnalyzer {
        if (!AudioAnalyzer.instance) {
            AudioAnalyzer.instance = new AudioAnalyzer();
        }
        return AudioAnalyzer.instance;
    }

    /**
     * Initialize the audio analyzer with an HTML audio element.
     * Creates AudioContext, AnalyserNode, and connects audio graph.
     * Only initializes once - subsequent calls are ignored.
     *
     * @param {HTMLAudioElement} audio - The audio element to analyze
     *
     * @example
     * ```typescript
     * const audioEl = document.querySelector('audio');
     * analyzer.init(audioEl);
     * ```
     */
    init(audio: HTMLAudioElement) {
        if (this.initialized) return;

        const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        this.context = new AudioContextClass();
        this.analyser = this.context.createAnalyser();
        this.gainNode = this.context.createGain();
        this.analyser.fftSize = 256;

        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);

        try {
            this.source = this.context.createMediaElementSource(audio);
            this.source.connect(this.analyser);
            this.analyser.connect(this.gainNode);
            this.gainNode.connect(this.context.destination);
            this.initialized = true;
        } catch (e) {
            console.warn("Audio Context already initialized or failed:", e);
        }
    }

    /**
     * Set the audio volume.
     * Uses exponential ramping for smooth volume transitions.
     *
     * @param {number} volume - Volume level (0.0 to 1.0)
     *
     * @example
     * ```typescript
     * analyzer.setVolume(0.5); // 50% volume
     * ```
     */
    setVolume(volume: number) {
        if (this.gainNode) {
            this.gainNode.gain.setTargetAtTime(volume, this.context!.currentTime, 0.01);
        }
    }

    /**
     * Get current frequency data from the analyzer.
     * Returns array of frequency values for visualization.
     *
     * @returns {Uint8Array | null} Frequency data array or null if not initialized
     *
     * @example
     * ```typescript
     * const data = analyzer.getFrequencyData();
     * if (data) {
     *   // Use data for visualization
     * }
     * ```
     */
    getFrequencyData(): Uint8Array | null {
        if (!this.analyser || !this.dataArray) return null;
        this.analyser.getByteFrequencyData(this.dataArray as any);
        return this.dataArray;
    }

    /**
     * Calculate the average frequency across all bins.
     * Useful for simple audio level visualization.
     *
     * @returns {number} Average frequency value (0-255)
     *
     * @example
     * ```typescript
     * const avgFreq = analyzer.getAverageFrequency();
     * console.log(`Audio level: ${avgFreq}`);
     * ```
     */
    getAverageFrequency(): number {
        const data = this.getFrequencyData();
        if (!data) return 0;
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i]!;
        }
        return sum / data.length;
    }

    resume() {
        if (this.context && this.context.state === "suspended") {
            this.context.resume();
        }
    }
}

export const audioAnalyzer = AudioAnalyzer.getInstance();
