"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store/useStore";

export function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMatrixEnabled } = useStore();

    useEffect(() => {
        if (!isMatrixEnabled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*";
        const fontSize = 16;
        const columns = Math.ceil(width / fontSize);
        const drops: number[] = new Array(columns).fill(1);

        let animationFrameId: number;

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0F0";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const newColumns = Math.ceil(width / fontSize);
            if (newColumns > drops.length) {
                const additional = new Array(newColumns - drops.length).fill(1);
                drops.push(...additional);
            }
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMatrixEnabled]);

    if (!isMatrixEnabled) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.15] dark:opacity-[0.08]"
        />
    );
}
