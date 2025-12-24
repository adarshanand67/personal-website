import { SkillCategoryName } from "@/data/enums";

export const skillCategories = {
    [SkillCategoryName.Languages]: [
        "C", "C++", "Python", "Java", "JavaScript",
    ],
    [SkillCategoryName.SystemKernel]: [
        "Intel SGX/TDX", "Kernel Development", "System Programming",
        "Windows Internals", "Ubuntu", "CentOS", "RHEL",
    ],
    [SkillCategoryName.SecurityPrivacy]: [
        "Data Loss Prevention", "Trellix ePO", "Endpoint Security",
        "EDR", "XDR", "PowerShell", "Boldon James", "Full-Disk Encryption",
        "Hashicorp Vault", "OpenSSL", "Post-Quantum Cryptography",
        "libFuzzer", "RESTler", "SIEM", "Threat Intelligence",
    ],
    [SkillCategoryName.AIML]: [
        "vLLM", "PyTorch", "OpenVINO",
    ],
    [SkillCategoryName.DatabasesTools]: [
        "Redis", "MySQL", "PostgreSQL",
    ],
    [SkillCategoryName.FrontendWeb]: [
        "Next.js", "React", "Tailwind CSS", "Framer Motion",
        "Three.js", "Zustand",
    ],
    [SkillCategoryName.DevOpsInfra]: [
        "Docker", "Kubernetes", "GitHub Actions", "AWS",
    ],
};
