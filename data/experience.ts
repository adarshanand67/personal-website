/**
 * @fileoverview Professional experience data for the portfolio.
 * Contains detailed work history including roles, responsibilities, and achievements.
 */

import { Company, Location, Role } from "./enums";

/**
 * Professional experience entries array.
 *
 * @type {Array<{
 *   company: Company,
 *   role: Role,
 *   duration: string,
 *   location: Location,
 *   logo: string,
 *   description: string,
 *   highlights: string[]
 * }>}
 *
 * @description
 * Each experience object contains:
 * - `company`: Company name from Company enum
 * - `role`: Job title from Role enum
 * - `duration`: Time period in format "MMM YYYY - MMM YYYY" or "MMM YYYY - Present"
 * - `location`: Geographic location from Location enum
 * - `logo`: Path to company logo image in /assets/logos/
 * - `description`: Brief role description or team/focus area
 * - `highlights`: Array of key achievements and responsibilities
 *
 * @example
 * ```tsx
 * import { experiencesData } from '@/data/experience';
 *
 * <Experience items={experiencesData} />
 * ```
 */
export const experiencesData = [
    {
        company: Company.Trellix,
        role: Role.SDE,
        duration: "Jul 2025 - Present",
        location: Location.Bengaluru,
        logo: "/assets/logos/trellix.png",
        description: "Data Loss Prevention, Windows || Endpoint Security",
        highlights: [
            "Developing native registry management modules for Chrome/Edge to ensure injection-free web protection.",
            "Integrating classification support (Boldon James) into endpoint solutions to enhance data security policies.",
            "Designing and orchestrating CppUnit test automation frameworks to improve code quality and regression testing coverage.",
        ],
    },

    {
        company: Company.Intel,
        role: Role.SDE,
        duration: "Jun 2024 - Jul 2025",
        location: Location.Bengaluru,
        logo: "/assets/logos/intel.png",
        description: "Confidential Computing (Intel SGX/TDX) || Platform Engineering Group",
        highlights: [
            "Contributed to Intel SGX Gramine to secure confidential workloads (PyTorch, OpenVINO, MySQL, Redis), addressing memory faults and expanding distro support.",
            "Implemented Intel SGX fuzzing framework with LLVM's clang libFuzzer and Address/Memory Sanitizers, resulting in 8+ vulnerability discoveries in Intel SGX TCB.",
            "Engineered Intel TDX full-disk encryption (FDE) solution supporting multi-VM launch scenarios and optimizing .qcow2 encrypted image sizes by 30%.",
            "Led creation of CentOS Virtualization SIG attestation guides for Intel TDX implementation, updating RHEL packages and fixing 10+ validation bugs.",
            "Integrated Post-Quantum Cryptography (PQC) with Intel SGX via Crypto API Toolkit (CTK), implementing 8+ NIST-approved algorithms.",
            "Enhanced LLM Adversarial Robustness Toolkit by integrating uv package manager and building an automated test runner that achieved 40% reduced build times.",
            "Conducted comprehensive vLLM benchmarking comparing legacy VMs vs Intel TDX Trusted Domains with Deepseek-7B/Llama-2-70B models.",
        ],
    },
    {
        company: Company.Intel,
        role: Role.Intern,
        duration: "Jun 2023 - Dec 2023",
        location: Location.Bengaluru,
        logo: "/assets/logos/intel.png",
        description: "Device Onboarding || Intel Product Security",
        highlights: [
            "Collaborated with FIDO Device Onboarding (FDO) team to implement robust security measures for Zero-Touch Provisioning (ZTP) of Intel Edge Devices.",
            "Modernized cryptographic security architecture by implementing OpenSSL 3.0 migration for Service Info (SVI) modules, reducing Client SDK codebase by 15%.",
            "Designed and implemented a Bare Metal Onboarding (BMO) POC with real-time status monitoring in React and scalable backend with CBOR/JSON REST APIs.",
        ],
    },
];
