"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { skillCategories } from "@/lib/constants/skills";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-[500px] w-full bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
    ),
});

/** Graph node representing a skill or technology. */
interface GraphNode {
    id: string;
    group: number;
    val: number;
    label?: string;
    color?: string;
}

/** Graph link connecting two skills. */
interface GraphLink {
    source: string;
    target: string;
}

/**
 * Skills Graph Component - force-directed graph visualization of technical skills.
 * Uses react-force-graph-2d for interactive skill relationship visualization.
 * @component
 */
export function SkillsGraph() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const graphData = useMemo(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];

        // Central Node
        nodes.push({
            id: "root",
            group: 0,
            val: 20,
            label: "Me",
            color: "#22c55e", // green-500
        });

        Object.entries(skillCategories).forEach(([category, skills]) => {
            // Category Nodes
            nodes.push({
                id: category,
                group: 1,
                val: 10,
                label: category,
                color: isDark ? "#ffffff" : "#1f2937",
            });

            links.push({
                source: "root",
                target: category,
            });

            // Skill Nodes
            skills.forEach((skill) => {
                nodes.push({
                    id: skill,
                    group: 2,
                    val: 5,
                    label: skill,
                    color: isDark ? "#a1a1aa" : "#4b5563", // zinc-400 / gray-600
                });

                links.push({
                    source: category,
                    target: skill,
                });
            });
        });

        return { nodes, links };
    }, [isDark]);

    const handleNodeClick = (node: any) => {
        if (node.group === 0) return; // Don't do anything for root

        // For categories (group 1), maybe we expand/collapse? But simpler to just do nothing or zoom.
        // For skills (group 2), open link.
        const label = node.label;
        if (node.group === 2) {
            import("@/lib/techLinks").then(({ techLinks }) => {
                const url =
                    techLinks[label] ||
                    `https://www.google.com/search?q=${encodeURIComponent(label)}`;
                window.open(url, "_blank");
            });
        }
    };

    return (
        <div className="w-full h-[600px] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
            <ForceGraph2D
                graphData={graphData}
                nodeLabel="label"
                nodeRelSize={6}
                backgroundColor="rgba(0,0,0,0)"
                linkColor={() => (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;

                    // Draw Node
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
                    ctx.fillStyle = node.color;
                    ctx.fill();

                    // Draw Text
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = isDark
                        ? node.group === 0
                            ? "#000"
                            : "#fff"
                        : node.group === 0
                          ? "#fff"
                          : "#000";

                    // Only show text if node is large enough or zoomed in enough
                    if (globalScale > 0.7 || node.group <= 1) {
                        ctx.fillText(label, node.x, node.y + node.val + fontSize);
                    }
                }}
                onNodeClick={handleNodeClick}
                cooldownTicks={100}
                d3VelocityDecay={0.3}
                d3AlphaDecay={0.02}
                onNodeHover={(node: any) => {
                    document.body.style.cursor = node ? "pointer" : "default";
                }}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 pointer-events-none">
                Scroll to zoom • Drag to pan • Click to visit
            </div>
        </div>
    );
}
