import { linkifyTech } from "@/lib/tech-links";

interface ExperienceItem {
    company: string;
    role: string;
    duration: string;
    location: string;
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

                <div className="space-y-8">
                    {items.map((exp, index) => (
                        <div key={index} className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                            <div className="mb-2">
                                <h3 className="text-xl font-bold">{exp.company}</h3>
                                <p className="text-gray-800 dark:text-white font-medium">{exp.role}</p>
                                <p className="text-gray-500 text-sm font-mono mt-1">
                                    {exp.duration} • {exp.location}
                                </p>
                            </div>

                            {exp.description && (
                                <div className="mb-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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
                                <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-400">
                                    {exp.highlights.map((highlight: string, idx: number) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: linkifyTech(highlight) }} />
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
