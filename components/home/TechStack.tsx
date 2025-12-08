import Link from "next/link";
import { techLinks } from "@/lib/tech-links";

const primarySkills = [
  "C++",
  "Intel SGX",
  "Intel TDX",
  "Gramine",
  "OS Internals",
  "Kernel Development",
  "System Programming",
];

const otherSkills = [
  "Rust",
  "Python",
  "TypeScript",
  "libFuzzer",
  "RESTler",
  "OpenSSL",
  "Data Loss Prevention",
  "Full-Disk Encryption",
  "Hashicorp Vault",
  "vLLM",
  "PyTorch",
  "OpenVINO",
  "Redis",
  "MySQL",
  "Ubuntu",
  "CentOS",
  "RHEL",
  "React",
];

export default function TechStack() {
  return (
    <section className="section max-w-4xl mx-auto px-4 mb-16 font-mono">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <span className="text-primary">##</span> Tech Stack
      </h2>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 text-sm">
        <span className="text-green-500 font-bold">$</span>
        <span>cat ~/.skills</span>
        <span className="animate-pulse inline-block w-2 h-4 bg-green-500 align-middle"></span>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Primary Focus</h3>
        <div className="flex flex-wrap gap-2">
          {primarySkills.map((skill) => {
            const url =
              techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
            return (
              <Link
                key={skill}
                href={url}
                target="_blank"
                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                {skill}
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Other Skills</h3>
        <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {otherSkills.map((skill, index) => {
            const url =
              techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
            return (
              <span key={index}>
                <Link
                  href={url}
                  target="_blank"
                  className="hover:text-green-600 transition-colors"
                >
                  {skill}
                </Link>
                {index < otherSkills.length - 1 && <span className="text-gray-400 mx-2">•</span>}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
