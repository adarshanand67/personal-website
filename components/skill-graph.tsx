"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { skillCategories } from '@/lib/constants';
import { techLinks } from '@/lib/techLinks';

// Dynamically import map to avoid SSR issues with canvas
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-green-500/5 rounded-xl flex items-center justify-center text-green-500 font-mono">Loading Neural Net...</div>
});

export function SkillGraph() {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
    const graphRef = useRef<any>(null);

    useEffect(() => {
        const updateDims = () => {
            if (containerRef.current) {
                setDimensions({
                    w: containerRef.current.clientWidth,
                    h: 600
                });
            }
        };

        window.addEventListener('resize', updateDims);
        updateDims();

        return () => window.removeEventListener('resize', updateDims);
    }, []);

    const data = {
        nodes: [
            { id: 'root', name: 'Adarsh', val: 20, color: '#22c55e', url: 'https://github.com/adarshanand67' },
            ...Object.keys(skillCategories).map(cat => ({
                id: cat,
                name: cat,
                val: 10,
                color: '#4ade80',
                url: null
            })),
            ...Object.values(skillCategories).flat().map(skill => ({
                id: skill,
                name: skill,
                val: 5,
                color: theme === 'dark' ? '#86efac' : '#16a34a',
                url: techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`
            }))
        ],
        links: [
            ...Object.keys(skillCategories).map(cat => ({
                source: 'root',
                target: cat
            })),
            ...Object.entries(skillCategories).flatMap(([cat, skills]) =>
                skills.map(skill => ({
                    source: cat,
                    target: skill
                }))
            )
        ]
    };

    const paintRing = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px monospace`;
        const textWidth = ctx.measureText(node.name).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

        if (node.id === 'root') {
            ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
            ctx.fill();
        }

        ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        if (node.id !== 'root') {
            // @ts-ignore
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;

        ctx.fillText(node.name, node.x, node.y);
    }, [theme]);

    return (
        <div ref={containerRef} className="w-full h-[600px] border border-green-500/20 rounded-xl overflow-hidden bg-black/5 dark:bg-black/40 backdrop-blur-sm relative group">
            <div className="absolute top-2 left-3 z-10 text-[10px] text-green-500 font-mono opacity-50 select-none pointer-events-none">
                $ netstat -graph --skills
            </div>
            {dimensions.w > 0 && (
                <ForceGraph2D
                    ref={graphRef}
                    width={dimensions.w}
                    height={dimensions.h}
                    graphData={data}
                    nodeLabel="name"
                    nodeCanvasObject={paintRing}
                    linkColor={() => theme === 'dark' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(22, 163, 74, 0.2)'}
                    backgroundColor="rgba(0,0,0,0)"
                    enableNodeDrag={true}
                    d3AlphaDecay={0.02}
                    d3VelocityDecay={0.08}
                    cooldownTicks={100}
                    onEngineStop={() => graphRef.current?.zoomToFit(400)}
                    onNodeClick={node => {
                        if (node.url) {
                            window.open(node.url, '_blank');
                        }
                    }}
                    onNodeHover={(node: any) => {
                        if (containerRef.current) {
                            containerRef.current.style.cursor = node && node.url ? 'pointer' : 'default';
                        }
                    }}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                    }}
                />
            )}
        </div>
    );
}
