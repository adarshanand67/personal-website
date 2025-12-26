"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types/definitions";
import { ShelfItemStrategy } from "./types";

export class ProjectListStrategy implements ShelfItemStrategy<Project> {
    renderItem(project: Project, index: number): ReactNode {
        return (
            <div
                id={`shelf-item-${project.title}`}
                key={index}
                className="group relative glass p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500"
            >
                <div className="flex justify-between items-start mb-4">
                    <Link
                        href={project.link}
                        target="_blank"
                        className="group/title flex items-center gap-2"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover/title:text-green-500 transition-colors">
                            {project.title}
                        </h3>
                        <ExternalLink
                            size={18}
                            className="text-gray-400 opacity-0 group-hover/title:opacity-100 transition-all transform group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5"
                        />
                    </Link>
                    <Link
                        href={project.link}
                        target="_blank"
                        className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-green-500 transition-colors shrink-0"
                    >
                        <ExternalLink size={20} />
                    </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
    renderList(items: Project[]): ReactNode {
        if (items.length === 0) return null;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                {items.map((project, index) => this.renderItem(project, index))}
            </div>
        );
    }
    filter(items: Project[], query: string): Project[] {
        if (!query) return items;
        const lowerQuery = query.toLowerCase();
        return items.filter(
            (project) =>
                project.title.toLowerCase().includes(lowerQuery) ||
                project.description.toLowerCase().includes(lowerQuery) ||
                project.tech.some((t) => t.toLowerCase().includes(lowerQuery))
        );
    }
}
