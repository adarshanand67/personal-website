import { useRef, useEffect } from 'react';

interface ExtendedHTMLAudioElement extends HTMLAudioElement {
    _sourceNode?: MediaElementAudioSourceNode;
}

interface ExtendedWindow extends Window {
    webkitAudioContext?: typeof AudioContext;
}

export function useVisualizer(audioRef: React.RefObject<HTMLAudioElement | null>, isPlaying: boolean) {
    const contextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    const initAudio = () => {
        if (!contextRef.current) {
            const AudioContextClass = window.AudioContext || (window as ExtendedWindow).webkitAudioContext;
            if (!AudioContextClass) return null;
            contextRef.current = new AudioContextClass();
        }

        const ctx = contextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        if (!analyserRef.current) {
            analyserRef.current = ctx.createAnalyser();
            analyserRef.current.fftSize = 64;
        }

        if (!sourceRef.current && audioRef.current) {
            const audio = audioRef.current as ExtendedHTMLAudioElement;
            try {
                if (!audio._sourceNode) {
                    sourceRef.current = ctx.createMediaElementSource(audio);
                    audio._sourceNode = sourceRef.current;
                } else {
                    sourceRef.current = audio._sourceNode;
                }
                if (sourceRef.current) {
                    sourceRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(ctx.destination);
                }
            } catch (e) {
                console.error("Audio source creation failed:", e);
            }
        }

        return analyserRef.current;
    };

    return { initAudio, analyserRef };
}
