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
    <section className="section container mx-auto px-4 mb-16 font-mono">
      <h2 className="text-2xl font-bold mb-2">
        <span className="text-gray-500">##</span> Tech Stack
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">$ cat ~/.skills</p>

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
