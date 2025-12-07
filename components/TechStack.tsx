import Link from "next/link";
import { techLinks } from "@/lib/tech-links";

const skills = [
  "C++",
  "Rust",
  "Python",
  "TypeScript",
  "Intel SGX",
  "Intel TDX",
  "Gramine",
  "libFuzzer",
  "RESTler",
  "OpenSSL",
  "Data Loss Prevention",
  "Full-Disk Encryption",
  "Hashicorp Vault",
  "vLLM",
  "PyTorch",
  "OpenVINO",
  "Docker",
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
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">$ cat ~/.skills</p>

      <div className="text-sm leading-relaxed">
        {skills.map((skill, index) => {
          const url =
            techLinks[skill] || `https://www.google.com/search?q=${encodeURIComponent(skill)}`;
          return (
            <span key={index}>
              <Link
                href={url}
                target="_blank"
                className="text-green-700 dark:text-green-400 hover:underline"
              >
                {skill}
              </Link>
              {index < skills.length - 1 && <span className="text-gray-500"> • </span>}
            </span>
          );
        })}
      </div>
    </section>
  );
}
