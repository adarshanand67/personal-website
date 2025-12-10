import Image from "next/image";
import { linkifyTech } from "@/lib/tech-links";
import { getAssetPath } from "@/lib/utils/asset-path";

interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
    logo?: string;
    description?: string;
    highlights: string[];
}

interface ExperienceProps {
    items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
    return (
        <div className="section max-w-4xl mx-auto px-4 mb-24">
            <div className="mb-16 font-mono" id="experience">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-primary">##</span> Experience
                </h2>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-8 text-sm">
                    <span className="text-green-500 font-bold">$</span>
                    <span>cat ~/work/history.log</span>
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
                </div>

                {/* Timeline Container */}
                <div className="relative pl-8">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-green-500"></div>

                    <div className="space-y-12">
                        {items.map((exp, index) => (
                            <div key={index} className="relative">
                                {/* Logo on the Timeline */}
                                <div className="absolute -left-12 top-0 bg-gray-50 dark:bg-[#0a0a0a] py-2">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-800 border-2 border-green-500 shadow-lg shadow-green-500/20 z-10">
                                        {exp.logo && (
                                            <Image
                                                src={getAssetPath(exp.logo)}
                                                alt={`${exp.company} logo`}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Content Card attached to timeline */}
                                <div className="ml-8 relative">
                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg rounded-tl-none p-6 border-l-4 border-green-500 border-t border-r border-b border-gray-200 dark:border-t-gray-800 dark:border-r-gray-800 dark:border-b-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                                        <div className="mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.company}</h3>
                                            <p className="text-gray-800 dark:text-gray-200 font-medium">{exp.role}</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-mono mt-1">
                                                {exp.duration} • {exp.location}
                                            </p>
                                        </div>

                                        {exp.description && (
                                            <div className="mb-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {exp.description.includes("||") ? (
                                                    exp.description.split("||").map((part, i) => (
                                                        <span key={i}>
                                                            {i > 0 && <span className="mx-2 text-gray-400">•</span>}
                                                            <span dangerouslySetInnerHTML={{ __html: linkifyTech(part.trim()) }} />
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: linkifyTech(exp.description) }} />
                                                )}
                                            </div>
                                        )}

                                        {exp.highlights.length > 0 && (
                                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                                                {exp.highlights.map((highlight: string, idx: number) => (
                                                    <li key={idx} dangerouslySetInnerHTML={{ __html: linkifyTech(highlight) }} />
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
