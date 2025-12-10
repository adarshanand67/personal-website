"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { techLinks } from "@/lib/tech-links";
import SectionHeader from "@/components/ui/SectionHeader";
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
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="font-mono">
      <SectionHeader
        title="Tech Stack"
        command="cat ~/.skills"
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      <div
        className={`space-y-6 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="glass p-6 rounded-xl space-y-6 shadow-sm">
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
      </div>
    </div>
  );
}
