"use client";

import { useEffect, useRef } from 'react';
import { useVisualizer } from './visualizer/useVisualizer';

interface VisualizerProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
}

export function Visualizer({ audioRef, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const { initAudio, analyserRef } = useVisualizer(audioRef, isPlaying);

    useEffect(() => {
        if (!audioRef.current || !canvasRef.current) return;

        let dataArray: Uint8Array;

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
                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, '#15803d');
                gradient.addColorStop(1, '#4ade80');

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
            const analyser = initAudio();
            if (analyser) {
                dataArray = new Uint8Array(analyser.frequencyBinCount);
                render();
            }
        } else {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [audioRef, isPlaying, initAudio, analyserRef]);

    return (
        <canvas
            ref={canvasRef}
            width={120}
            height={40}
            className="w-full h-full opacity-50"
        />
    );
}
