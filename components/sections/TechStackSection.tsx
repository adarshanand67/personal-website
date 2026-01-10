"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { SectionHeader } from "@/components/layout";
import { SpotlightCard } from "@/components/ui";
import { skillCategories, techLinks } from "@/lib/constants";
import { getTechIcon } from "@/lib/icons";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export function TechStackSection() {
  const { expandedSections, toggleSectionExpanded } = useStore();
  const isExpanded = expandedSections["techstack"] ?? false;
  const [viewMode, setViewMode] = useState<"list" | "graph">("list");

  const graphData = React.useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    // Center Node
    nodes.push({ id: "Adarsh", group: 0, val: 20 });

    Object.entries(skillCategories).forEach(([category, skills], catIndex) => {
      // Category Node
      nodes.push({ id: category, group: 1, val: 10 });
      links.push({ source: "Adarsh", target: category });

      skills.forEach((skill) => {
        // Skill Node
        nodes.push({ id: skill, group: 2, val: 5 });
        links.push({ source: category, target: skill });
      });
    });

    return { nodes, links };
  }, []);

  return (
    <div className="font-mono max-w-6xl mx-auto px-4 md:px-6 mb-4">
      <SectionHeader
        title="Tech Stack"
        isExpanded={isExpanded}
        onToggle={() => toggleSectionExpanded("techstack")}
        rightElement={
          <div
            className="flex bg-foreground/5 p-0.5 rounded-lg border border-foreground/10"
            onClick={(e) => e.stopPropagation()}
          >
            {["list", "graph"].map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m as any)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${viewMode === m ? "bg-background shadow-sm" : "opacity-40"}`}
              >
                {m}
              </button>
            ))}
          </div>
        }
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {viewMode === "list" ? (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {Object.entries(skillCategories).map(([cat, skills]) => (
                  <div
                    key={cat}
                    className="group relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-foreground/20 transition-colors duration-300 overflow-hidden"
                  >
                    <div className="p-3">
                      <h3 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">
                        {cat}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => {
                          const url = techLinks[skill];
                          let domain = "";
                          try {
                            if (url) domain = new URL(url).hostname;
                          } catch (e) {
                            console.error(e);
                          }

                          const faviconUrl = domain
                            ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
                            : null;
                          const Icon = getTechIcon(skill);

                          return (
                            <Link
                              key={skill}
                              href={url || "#"}
                              target="_blank"
                              className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-full text-xs font-bold hover:bg-foreground/10 transition-all group"
                            >
                              {faviconUrl ? (
                                <Image
                                  src={faviconUrl}
                                  alt={skill}
                                  width={14}
                                  height={14}
                                  className="opacity-100 transition-opacity"
                                  unoptimized
                                />
                              ) : (
                                Icon && (
                                  <Icon size={14} className="opacity-100" />
                                )
                              )}
                              {skill}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[500px] mt-4 rounded-xl border border-foreground/10 overflow-hidden bg-black/5 dark:bg-black/20 relative">
                <ForceGraph2D
                  graphData={graphData}
                  nodeLabel="id"
                  nodeColor={(node: any) =>
                    node.group === 0
                      ? "#ff5f56"
                      : node.group === 1
                        ? "#3b82f6"
                        : "#10b981"
                  }
                  nodeVal={(node: any) => node.val}
                  linkColor={() => "rgba(100,100,100,0.2)"}
                  backgroundColor="transparent"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
