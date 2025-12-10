import Link from "next/link";
import { techLinks } from "@/lib/tech-links";

const skillCategories = {
  "Languages": [
    "C",
    "C++",
    "Python",
    "Java",
    "JavaScript",
  ],
  "System & Kernel": [
    "Intel SGX/TDX",
    "Kernel Development",
    "System Programming",
    "Windows Internals",
    "Ubuntu",
    "CentOS",
    "RHEL",
  ],
  "Security & Privacy": [
    "Data Loss Prevention",
    "Trellix ePO",
    "Endpoint Security",
    "Metrelic CPU",
    "EDR (Endpoint Detection & Response)",
    "XDR (Extended Detection & Response)",
    "PowerShell",
    "Boldon James",
    "Full-Disk Encryption",
    "Hashicorp Vault",
    "OpenSSL",
    "Post-Quantum Cryptography",
    "libFuzzer",
    "RESTler",
    "SIEM",
    "Threat Intelligence",
  ],
  "AI & Machine Learning": [
    "vLLM",
    "PyTorch",
    "OpenVINO",
  ],
  "Databases & Tools": [
    "Redis",
    "MySQL",
  ],
};

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

      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const url =
                  techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
                return (
                  <Link
                    key={skill}
                    href={url}
                    target="_blank"
                    className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded text-sm hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-400 hover:border-green-500/50 transition-all duration-200"
                  >
                    {skill}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
