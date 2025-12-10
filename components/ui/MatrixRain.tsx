import { useEffect, useRef } from "react";
import { useGlobalState } from "@/components/common/GlobalProvider";
import { useTheme } from "next-themes";

export const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isMatrixEnabled } = useGlobalState();
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (!isMatrixEnabled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Configuration
        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = new Array(columns).fill(1);
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z";
        const isDark = resolvedTheme === "dark";

        // Drawing loop
        let animationId: number;
        const draw = () => {
            // Fade trail: Black for dark mode, White for light mode
            ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Text color: Bright green for dark, Darker green for light
            ctx.fillStyle = isDark ? "#0F0" : "#15803d";
            ctx.font = "15px monospace";

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // x = column index * font size, y = drop value * font size
                ctx.fillText(text || '', i * 20, drops[i]! * 20);

                // Reset drop to top randomly or increment y
                if (drops[i]! * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]!++;
                }
            }
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [isMatrixEnabled, resolvedTheme]); // Re-run when theme/state changes

    if (!isMatrixEnabled) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.1] dark:opacity-[0.4] transition-opacity duration-500"
            aria-hidden="true"
        />
    );
};
