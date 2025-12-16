export class AudioManager {
    private static instance: AudioManager;
    public audioContext: AudioContext | null = null;
    public analyser: AnalyserNode | null = null;
    public source: MediaElementAudioSourceNode | null = null;
    public gainNode: GainNode | null = null;

    private constructor() { }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public initialize() {
        if (typeof window !== 'undefined' && !this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
        }
    }

    public connectSource(audioElement: HTMLAudioElement) {
        if (!this.audioContext || !this.analyser || !this.gainNode) {
            this.initialize();
        }

        if (this.audioContext && !this.source) {
            try {
                this.source = this.audioContext.createMediaElementSource(audioElement);
                this.source.connect(this.analyser!);
                this.analyser!.connect(this.gainNode!);
            } catch (e) {
                console.warn("Audio source already connected or failed:", e);
            }
        }
    }

    public getFrequencyData(): Uint8Array {
        if (!this.analyser) return new Uint8Array(0);
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }

    public resume() {
        if (this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}
