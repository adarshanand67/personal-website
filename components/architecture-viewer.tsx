"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { architectureNodes, architectureConnections, ArchNode } from '@/data/architecture';

export function ArchitectureViewer() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Calculate dynamic styles based on hover state
    const isConnectionActive = (source: string, target: string) => {
        if (!hoveredNode) return false;
        return hoveredNode === source || hoveredNode === target;
    };

    const isNodeActive = (nodeId: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode === nodeId) return true;
        // Check if connected
        return architectureConnections.some(
            conn => (conn.source === hoveredNode && conn.target === nodeId) ||
                (conn.target === hoveredNode && conn.source === nodeId)
        );
    };

    const getTypeColor = (type: ArchNode['type']) => {
        switch (type) {
            case 'frontend': return '#22d3ee'; // Cyan-400
            case 'backend': return '#a78bfa'; // Violet-400
            case 'database': return '#fbbf24'; // Amber-400
            case 'devops': return '#f87171'; // Red-400
            case 'core': return '#ffffff'; // White
            default: return '#9ca3af';
        }
    };

    return (
        <section className="py-12 relative overflow-hidden bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">System Architecture</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm">
                        Hover over nodes to visualize dependencies and data flow across the stack.
                    </p>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] max-w-5xl mx-auto bg-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-8">

                    {/* SVG Layer for Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {architectureConnections.map((conn, i) => {
                            const source = architectureNodes.find(n => n.id === conn.source);
                            const target = architectureNodes.find(n => n.id === conn.target);
                            if (!source || !target) return null;

                            const active = isConnectionActive(conn.source, conn.target);

                            // Convert % to pixels roughly for drawing (simplified relative coords)
                            return (
                                <g key={i}>
                                    <line
                                        x1={`${source.x}%`} y1={`${source.y}%`}
                                        x2={`${target.x}%`} y2={`${target.y}%`}
                                        stroke={active ? getTypeColor(source.type) : '#334155'}
                                        strokeWidth={active ? 2 : 1}
                                        strokeDasharray={active ? "none" : "5,5"}
                                        className="transition-all duration-300"
                                    />
                                    {active && (
                                        <circle r="3" fill="white">
                                            <animateMotion
                                                dur="1.5s"
                                                repeatCount="indefinite"
                                                path={`M ${source.x * 10},${source.y * 5} L ${target.x * 10},${target.y * 5}`} // SVG coords are huge pain in responsive % div, keeping simple line for now
                                            />
                                        </circle>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Nodes Layer */}
                    {architectureNodes.map((node) => {
                        const active = isNodeActive(node.id);
                        const hovered = hoveredNode === node.id;
                        const color = getTypeColor(node.type);

                        return (
                            <motion.div
                                key={node.id}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                                          flex flex-col items-center justify-center
                                          transition-all duration-300 z-10 group`}
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                whileHover={{ scale: 1.1 }}
                            >
                                <div
                                    className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center
                                              border-2 shadow-lg backdrop-blur-md transition-colors
                                              ${active || hovered ? 'bg-slate-800' : 'bg-slate-900/80'}`}
                                    style={{
                                        borderColor: active || hovered ? color : '#334155',
                                        boxShadow: active || hovered ? `0 0 20px ${color}40` : 'none'
                                    }}
                                >
                                    {/* Simple letter or icon placeholder for now */}
                                    <span
                                        className="text-lg md:text-xl font-bold font-mono"
                                        style={{ color: color }}
                                    >
                                        {node.label.charAt(0)}
                                    </span>
                                </div>

                                <div className={`mt-2 px-3 py-1 rounded bg-black/80 border border-slate-700 text-xs text-white font-mono
                                              transition-opacity duration-300 whitespace-nowrap
                                              ${active || hovered ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                    {node.label}
                                </div>

                                {hovered && node.description && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute top-full mt-4 w-48 p-3 rounded-lg bg-slate-800/95 border border-slate-600 text-xs text-slate-300 shadow-xl z-50 pointer-events-none"
                                    >
                                        {node.description}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
