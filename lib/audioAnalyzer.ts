"use client";

class AudioAnalyzer {
    private static instance: AudioAnalyzer;
    private context: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private gainNode: GainNode | null = null;
    private dataArray: Uint8Array | null = null;
    private source: MediaElementAudioSourceNode | null = null;
    private initialized = false;

    private constructor() { }

    static getInstance(): AudioAnalyzer {
        if (!AudioAnalyzer.instance) {
            AudioAnalyzer.instance = new AudioAnalyzer();
        }
        return AudioAnalyzer.instance;
    }

    init(audio: HTMLAudioElement) {
        if (this.initialized) return;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
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

    setVolume(volume: number) {
        if (this.gainNode) {
            this.gainNode.gain.setTargetAtTime(volume, this.context!.currentTime, 0.01);
        }
    }

    getFrequencyData(): Uint8Array | null {
        if (!this.analyser || !this.dataArray) return null;
        this.analyser.getByteFrequencyData(this.dataArray as any);
        return this.dataArray;
    }

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
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}

export const audioAnalyzer = AudioAnalyzer.getInstance();
