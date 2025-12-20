"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export const NeuralNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 150;
        const mouse = { x: 0, y: 0, radius: 200 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = theme === "dark" ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.1)";
                ctx.fill();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i]!.update();
                particles[i]!.draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i]!.x - particles[j]!.x;
                    const dy = particles[i]!.y - particles[j]!.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = theme === "dark"
                            ? `rgba(34, 197, 94, ${0.1 * (1 - distance / connectionDistance)})`
                            : `rgba(34, 197, 94, ${0.05 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i]!.x, particles[i]!.y);
                        ctx.lineTo(particles[j]!.x, particles[j]!.y);
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                const mDx = particles[i]!.x - mouse.x;
                const mDy = particles[i]!.y - mouse.y;
                const mDistance = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDistance < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 * (1 - mDistance / mouse.radius)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i]!.x, particles[i]!.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-5] opacity-50 dark:opacity-30"
        />
    );
};
