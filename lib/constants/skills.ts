/**
 * @fileoverview Skills categories mapping for tech stack display.
 * Organizes technical skills into categorized groups.
 */
import { SkillCategoryName } from "@/data/enums";

/**
 * Skill categories object mapping category names to skill arrays.
 * Each category contains an array of technology/skill names.
 * @constant
 */
export const skillCategories = {
    [SkillCategoryName.Languages]: ["C", "C++", "Python", "JavaScript", "TypeScript", "Bash"],
    [SkillCategoryName.SystemKernel]: [
        "Intel SGX/TDX",
        "Gramine",
        "System Programming",
        "Windows Internals",
        "Ubuntu",
        "CentOS",
        "RHEL",
    ],
    [SkillCategoryName.SecurityPrivacy]: [
        "Data Loss Prevention",
        "Trellix ePO",
        "Endpoint Security",
        "EDR",
        "XDR",
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
        "Address Sanitizer",
        "Memory Sanitizer",
        "FIDO Device Onboarding",
    ],
    [SkillCategoryName.AIML]: [
        "vLLM",
        "PyTorch",
        "OpenVINO",
        "NumPy",
        "Pandas",
        "Jupyter",
        "CUDA",
        "ONNX",
        "MLflow",
    ],
    [SkillCategoryName.DatabasesTools]: ["Redis", "MySQL"],
    [SkillCategoryName.FrontendWeb]: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
        "Zustand",
        "TypeScript",
    ],
    [SkillCategoryName.DevOpsInfra]: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Jenkins"],
};
