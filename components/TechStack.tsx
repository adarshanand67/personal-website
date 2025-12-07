import {
    Code2,
    Terminal,
    Database,
    Cpu,
    Globe,
    GitBranch,
    Container,
    ShieldCheck,
    Layers
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

const techs = [
    {
        name: "C++",
        icon: <Code2 className="w-6 h-6" />,
        description: "Modern & Secure",
    },
    {
        name: "Internal SGX/TDX",
        icon: <ShieldCheck className="w-6 h-6" />,
        description: "Confidential Computing",
    },
    {
        name: "Fuzzing",
        icon: <Terminal className="w-6 h-6" />,
        description: "libFuzzer & Sanitizers",
    },
    {
        name: "Rust",
        icon: <Cpu className="w-6 h-6" />,
        description: "Memory Safety",
    },
    {
        name: "Windows Internals",
        icon: <Layers className="w-6 h-6" />,
        description: "DLP & Kernel",
    },
    {
        name: "Cryptography",
        icon: <ShieldCheck className="w-6 h-6" />,
        description: "PQC & OpenSSL",
    },
    {
        name: "Python",
        icon: <Terminal className="w-6 h-6" />,
        description: "Automation & AI",
    },
    {
        name: "Linux Drivers",
        icon: <Container className="w-6 h-6" />,
        description: "Gramine & Virtualization",
    },
];

export default function TechStack() {
    return (
        <section className="section container mx-auto px-4 mb-24">
            <FadeIn>
                <h2 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Tech Stack
                </h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techs.map((tech, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 group">
                            <div className="mb-3 p-3 rounded-full bg-white dark:bg-zinc-700 shadow-sm group-hover:scale-110 transition-transform text-primary">
                                {tech.icon}
                            </div>
                            <span className="font-bold text-sm mb-1 text-gray-900 dark:text-gray-100">{tech.name}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-mono text-center">
                                {tech.description}
                            </span>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
