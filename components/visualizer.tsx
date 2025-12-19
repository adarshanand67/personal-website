"use client";

import { useEffect, useRef } from 'react';

interface VisualizerProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
}

interface ExtendedHTMLAudioElement extends HTMLAudioElement {
    _sourceNode?: MediaElementAudioSourceNode;
}

interface ExtendedWindow extends Window {
    webkitAudioContext?: typeof AudioContext;
}

export function Visualizer({ audioRef, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!audioRef.current || !canvasRef.current) return;

        let analyser: AnalyserNode;
        let dataArray: Uint8Array;

        const initAudio = () => {
            if (!contextRef.current) {
                const AudioContextClass = window.AudioContext || (window as ExtendedWindow).webkitAudioContext;
                if (!AudioContextClass) return;
                contextRef.current = new AudioContextClass();
            }

            const ctx = contextRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            if (!analyserRef.current) {
                analyserRef.current = ctx.createAnalyser();
                analyserRef.current.fftSize = 64;
            }
            analyser = analyserRef.current;

            // Re-create source only if it doesn't exist
            if (!sourceRef.current && audioRef.current) {
                const audio = audioRef.current as ExtendedHTMLAudioElement;
                try {
                    // Check if source already exists on the element to avoid error
                    if (!audio._sourceNode) {
                        sourceRef.current = ctx.createMediaElementSource(audio);
                        audio._sourceNode = sourceRef.current;
                    } else {
                        sourceRef.current = audio._sourceNode;
                    }

                    if (sourceRef.current) {
                        sourceRef.current.connect(analyser);
                        analyser.connect(ctx.destination);
                    }
                } catch (e) {
                    console.error("Audio source creation failed:", e);
                }
            }

            dataArray = new Uint8Array(analyser.frequencyBinCount);
        };

        const render = () => {
            if (!canvasRef.current || !analyserRef.current || !dataArray) return;

            analyserRef.current.getByteFrequencyData(dataArray as any);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            const barWidth = (width / analyserRef.current.frequencyBinCount) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < analyserRef.current.frequencyBinCount; i++) {
                barHeight = (dataArray[i] / 255) * height;

                // Green gradient for terminal look
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, '#15803d');  // green-700
                gradient.addColorStop(1, '#4ade80');  // green-400

                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.6;
                ctx.fillRect(x, height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }

            if (isPlaying) {
                rafRef.current = requestAnimationFrame(render);
            }
        };

        if (isPlaying) {
            initAudio();
            render();
        } else {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [audioRef, isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            width={120}
            height={40}
            className="w-full h-full opacity-50"
        />
    );
}
