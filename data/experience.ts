

import { Company, Location, Role } from "./enums";

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
            "Designing and orchestrating CppUnit test automation frameworks to improve code quality and regression testing coverage."
        ]
    },
    {
        company: Company.Toastmasters,
        role: Role.Secretary,
        duration: "Dec 2025 - Present",
        location: Location.Bengaluru,
        description: "Rock The Talk Club",
        highlights: [
            "Secretary (Dec 2025 - Present)",
            "Member (Jul 2025 - Dec 2025)"
        ]
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
            "Conducted comprehensive vLLM benchmarking comparing legacy VMs vs Intel TDX Trusted Domains with Deepseek-7B/Llama-2-70B models."
        ]
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
            "Designed and implemented a Bare Metal Onboarding (BMO) POC with real-time status monitoring in React and scalable backend with CBOR/JSON REST APIs."
        ]
    }
];
