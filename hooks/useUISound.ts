"use client";

import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'success' | 'error' | 'typing';

export const useUISound = (enabled: boolean = true) => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction to bypass autoplay policy
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });

        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
            audioContextRef.current?.close();
        };
    }, []);

    const playSound = useCallback((type: SoundType) => {
        if (!enabled || !audioContextRef.current) return;
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                // High pitched short blip
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, now);
                oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                oscillator.start(now);
                oscillator.stop(now + 0.05);
                break;

            case 'click':
                // Lower pitched confirmation
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(600, now);
                oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'success':
                // Ascending chime
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, now);
                oscillator.frequency.setValueAtTime(554, now + 0.1); // C#
                oscillator.frequency.setValueAtTime(659, now + 0.2); // E
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                oscillator.start(now);
                oscillator.stop(now + 0.4);
                break;

            case 'error':
                // Low buzz
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(150, now);
                oscillator.frequency.linearRampToValueAtTime(100, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                oscillator.start(now);
                oscillator.stop(now + 0.15);
                break;

            case 'typing':
                // Very soft click
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(800, now);
                gainNode.gain.setValueAtTime(0.02, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                oscillator.start(now);
                oscillator.stop(now + 0.03);
                break;
        }
    }, [enabled]);

    return { playSound };
};
