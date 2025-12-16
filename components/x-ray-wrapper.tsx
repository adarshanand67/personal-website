'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';
import { sourceMap } from '@/lib/source-map';
import { motion, AnimatePresence } from 'framer-motion';

export function XRayWrapper({
    children,
    name,
    className = ''
}: {
    children: React.ReactNode;
    name: string;
    className?: string;
}) {
    const { isXRayEnabled } = useStore();
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isXRayEnabled || !tooltipRef.current) return;

        const x = e.clientX + 15;
        const y = e.clientY + 15;

        // Basic boundary checking to flip tooltip if near edge
        const winsWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const winsHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;

        const finalX = x + 300 > winsWidth ? e.clientX - 310 : x;
        const finalY = y + 300 > winsHeight ? e.clientY - 310 : y;

        tooltipRef.current.style.transform = `translate(${finalX}px, ${finalY}px)`;
    };

    if (!isXRayEnabled) {
        return <div className={className}>{children}</div>;
    }

    const codeSnippet = sourceMap[name] || '// Source not available';

    return (
        <div
            className={`relative group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Main Content */}
            <div className={`transition-all duration-300 ${isHovered ? 'opacity-50 blur-[1px]' : ''}`}>
                {children}
            </div>

            {/* Wireframe Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200 border-2 border-dashed border-green-500/50 bg-green-500/5 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500"></div>

                {/* Label */}
                <div className="absolute top-0 left-0 bg-green-500 text-black text-[10px] font-mono px-1 py-0.5">
                    &lt;{name} /&gt;
                </div>
            </div>

            {/* Floating Inspector Panel - Fixed Position + Translate for Performance */}
            <div
                ref={tooltipRef}
                className="fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-150 will-change-transform"
                style={{
                    opacity: isHovered ? 1 : 0,
                    // Start off-screen or at 0,0, moved by transform
                }}
            >
                <div className="w-[300px] bg-black/90 border border-green-500/50 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden text-left">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 bg-green-500/10 border-b border-green-500/20">
                        <span className="font-mono text-xs text-green-400 font-bold">{name}.tsx</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-px bg-green-500/20 border-b border-green-500/20">
                        <div className="bg-black/80 px-3 py-1.5 flex flex-col">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider">Render Time</span>
                            <span className="text-xs font-mono text-green-300">{(Math.random() * 2 + 0.1).toFixed(2)}ms</span>
                        </div>
                        <div className="bg-black/80 px-3 py-1.5 flex flex-col">
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider">Memory</span>
                            <span className="text-xs font-mono text-green-300">{(Math.random() * 50 + 10).toFixed(1)}KB</span>
                        </div>
                    </div>

                    {/* Code Preview */}
                    <div className="p-3 bg-[#0d1117] font-mono text-[10px] leading-relaxed overflow-x-hidden">
                        <pre className="text-gray-300 whitespace-pre-wrap break-all line-clamp-[12]">
                            {codeSnippet}
                        </pre>
                    </div>

                    {/* Footer */}
                    <div className="px-3 py-1.5 bg-green-500/10 border-t border-green-500/20 text-[9px] text-green-500/60 font-mono text-center">
                        // DEBUG_MODE :: ACTIVE
                    </div>
                </div>
            </div>
        </div>
    );
}
