export interface ArchNode {
  id: string;
  label: string;
  type:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "core"
    | "security"
    | "language"
    | "system"
    | "ai";
  x: number;
  y: number;
  description?: string;
}

export interface ArchConnection {
  source: string;
  target: string;
  description?: string;
}

export const architectureNodes: ArchNode[] = [
  {
    id: "nextjs",
    label: "Next.js",
    type: "frontend",
    x: 20,
    y: 20,
    description: "App Router framework.",
  },
  {
    id: "react",
    label: "React",
    type: "frontend",
    x: 20,
    y: 30,
    description: "UI Library.",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    type: "frontend",
    x: 20,
    y: 40,
    description: "Styling.",
  },
  {
    id: "framer",
    label: "Framer",
    type: "frontend",
    x: 20,
    y: 50,
    description: "Motion.",
  },
  {
    id: "threejs",
    label: "Three.js",
    type: "frontend",
    x: 20,
    y: 60,
    description: "3D Visuals.",
  },
  {
    id: "zustand",
    label: "Zustand",
    type: "frontend",
    x: 20,
    y: 70,
    description: "State.",
  },
  {
    id: "python",
    label: "Python",
    type: "language",
    x: 45,
    y: 20,
    description: "Scripting & AI.",
  },
  {
    id: "cpp",
    label: "C++",
    type: "language",
    x: 45,
    y: 30,
    description: "Systems & Performance.",
  },
  {
    id: "c",
    label: "C",
    type: "language",
    x: 45,
    y: 40,
    description: "Low-level dev.",
  },
  {
    id: "java",
    label: "Java",
    type: "language",
    x: 45,
    y: 50,
    description: "Enterprise.",
  },
  {
    id: "js",
    label: "JS/TS",
    type: "language",
    x: 45,
    y: 60,
    description: "Web High-level.",
  },
  {
    id: "torch",
    label: "PyTorch",
    type: "ai",
    x: 45,
    y: 75,
    description: "Deep Learning.",
  },
  {
    id: "vllm",
    label: "vLLM",
    type: "ai",
    x: 55,
    y: 75,
    description: "LLM Inference.",
  },
  {
    id: "openvino",
    label: "OpenVINO",
    type: "ai",
    x: 50,
    y: 85,
    description: "AI Optimization.",
  },
  {
    id: "kernel",
    label: "Kernel",
    type: "system",
    x: 70,
    y: 20,
    description: "Linux Dev.",
  },
  {
    id: "sgx",
    label: "Intel SGX",
    type: "system",
    x: 70,
    y: 30,
    description: "Confidential Compute.",
  },
  {
    id: "win",
    label: "Windows",
    type: "system",
    x: 70,
    y: 40,
    description: "Internals.",
  },
  {
    id: "linux",
    label: "Linux",
    type: "system",
    x: 70,
    y: 50,
    description: "RHEL/CentOS/Ubuntu.",
  },
  {
    id: "redis",
    label: "Redis",
    type: "database",
    x: 85,
    y: 20,
    description: "Cache.",
  },
  {
    id: "sql",
    label: "SQL",
    type: "database",
    x: 85,
    y: 30,
    description: "Postgres/MySQL.",
  },
  {
    id: "docker",
    label: "Docker",
    type: "devops",
    x: 85,
    y: 50,
    description: "Containers.",
  },
  {
    id: "k8s",
    label: "K8s",
    type: "devops",
    x: 85,
    y: 60,
    description: "Orchestration.",
  },
  {
    id: "aws",
    label: "AWS",
    type: "devops",
    x: 85,
    y: 70,
    description: "Cloud.",
  },
  {
    id: "gh",
    label: "GitHub",
    type: "devops",
    x: 85,
    y: 80,
    description: "CI/CD.",
  },
  {
    id: "edr",
    label: "EDR/XDR",
    type: "security",
    x: 70,
    y: 65,
    description: "Endpoint Security.",
  },
  {
    id: "security",
    label: "Security",
    type: "security",
    x: 70,
    y: 75,
    description: "DLP / Encryption.",
  },
  {
    id: "threat",
    label: "Intel",
    type: "security",
    x: 70,
    y: 85,
    description: "Threat Intelligence.",
  },
];

export const architectureConnections: ArchConnection[] = [
  { source: "nextjs", target: "react" },
  { source: "nextjs", target: "js" },
  { source: "threejs", target: "react" },
  { source: "c", target: "kernel" },
  { source: "cpp", target: "win" },
  { source: "python", target: "torch" },
  { source: "kernel", target: "security" },
  { source: "win", target: "edr" },
  { source: "linux", target: "docker" },
  { source: "docker", target: "k8s" },
  { source: "gh", target: "nextjs" },
];
