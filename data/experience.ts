import { Company, Role, Location } from "@/types/definitions";

export const experiencesData = [
  {
    company: Company.Trellix,
    role: Role.SDE,
    duration: "Jul 2025 - Present",
    location: Location.Bengaluru,
    logo: "/images/logos/trellix.png",
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
    logo: "/images/logos/intel.png",
    description:
      "Confidential Computing (Intel SGX/TDX) || Platform Engineering Group",
    highlights: [
      "Contributed to Intel SGX Gramine to secure confidential computing workloads (PyTorch, OpenVINO, MySQL, Redis), addressing memory faults and expanding distro support (Ubuntu 24.04, CentOS Stream 9, RHEL 9, and SUSE).",
      "Implemented Intel SGX fuzzing framework by CPU ID fuzzing harnesses with LLVM's clang libFuzzer and Address/Memory Sanitizers and building test automation with LLVM coverage tools (llvm-profdata, llvm-cov), resulting in 8+ vulnerability discoveries in Intel SGX TCB with 97% branch coverage with patches merged upstream.",
      "Engineered Intel TDX full-disk encryption (FDE) solution supporting multi-VM launch scenarios, implementing secure key retrieval through Hashicorp Vault and ITA Key Broker Service, optimizing .qcow2 encrypted image sizes by 30% and resolving 20+ critical validation bugs in Rust.",
      "Led creation of CentOS Virtualization SIG attestation guides for Intel TDX implementation, updating RHEL packages and fixing 10+ validation bugs that accelerated secure TD deployments across 4th Gen Intel Xeon.",
      "Integrated Post-Quantum Cryptography (PQC) with Intel SGX via Crypto API Toolkit (CTK), implementing 8+ NIST-approved algorithms for key encapsulation and digital signatures while maintaining PKCS11 compliance, creating a flexible alternative to hardware HSMs.",
      "Enhanced LLM Adversarial Robustness Toolkit for evaluating LLM robustness by integrating uv package manager, implementing automatic batch size detection, customizable filtering policies, storage of best attack tokens, and building an automated test runner that achieved 40% reduced build times.",
      "Conducted comprehensive vLLM benchmarking comparing legacy VMs vs Intel TDX Trusted Domains with Deepseek-7B/Llama-2-70B models, quantifying ITL latency and TPS throughput across 20K+ test runs on Intel 5th Gen Xeon (Emerald Rapids) processors.",
    ],
  },
  {
    company: Company.Intel,
    role: Role.Intern,
    duration: "Jun 2023 - Dec 2023",
    location: Location.Bengaluru,
    logo: "/images/logos/intel.png",
    description: "Device Onboarding || Intel Product Security",
    highlights: [
      "Strengthened Intel Edge Device security by implementing Zero-Touch Provisioning (ZTP) protocols in collaboration with the FIDO Device Onboarding (FDO) team, automating secure device identity assignment and eliminating manual configuration vulnerabilities.",
      "Optimized cryptographic architecture through a strategic OpenSSL 3.0 migration for Service Info (SVI) modules, leveraging the new provider model to streamline dependencies and achieve a 15% reduction in the Client SDK codebase size.",
      "Architected a comprehensive Bare Metal Onboarding (BMO) POC, featuring a React-based real-time monitoring dashboard for device telemetry and a scalable backend infrastructure utilizing CBOR/JSON REST APIs for high-efficiency data exchange.",
    ],
  },
];
