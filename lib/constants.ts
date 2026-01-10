import { siteConfig, basePath as configBasePath } from "@/lib/config";
import { SkillCategoryName } from "@/types/definitions";

export const basePath = configBasePath;

export interface Track {
  title: string;
  artist: string;
  image: string;
  src: string;
}

export const tracks: Track[] = [
  {
    title: "The World",
    artist: "Death Note",
    image: "https://cdn.myanimelist.net/images/anime/1079/138100l.jpg",
    src: `${basePath}/assets/music/theWorld.mp3`,
  },
  {
    title: "A Cruel Angel's Thesis",
    artist: "Neon Genesis Evangelion",
    image: "https://cdn.myanimelist.net/images/anime/1314/108941l.jpg",
    src: `${basePath}/assets/music/cruelAngelsThesis.mp3`,
  },
  {
    title: "THE HERO!!",
    artist: "One Punch Man",
    image: "https://cdn.myanimelist.net/images/anime/12/76049l.jpg",
    src: `${basePath}/assets/music/onePunchMan.mp3`,
  },
  {
    title: "Pokemon Theme",
    artist: "Pokémon",
    image: "https://cdn.myanimelist.net/images/anime/1405/117456l.jpg",
    src: `${basePath}/assets/music/pokemonTheme.mp3`,
  },
  {
    title: "Tank!",
    artist: "Cowboy Bebop",
    image: "https://cdn.myanimelist.net/images/anime/4/19644l.jpg",
    src: `${basePath}/assets/music/tank.mp3`,
  },
  {
    title: "Unravel",
    artist: "Tokyo Ghoul",
    image: "https://cdn.myanimelist.net/images/anime/1498/134443l.jpg",
    src: `${basePath}/assets/music/unravel.mp3`,
  },
  {
    title: "Blue Bird",
    artist: "Naruto Shippuden",
    image: "https://cdn.myanimelist.net/images/anime/1141/142503l.jpg",
    src: `${basePath}/assets/music/blueBird.mp3`,
  },
  {
    title: "Guren no Yumiya",
    artist: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    src: `${basePath}/assets/music/gurenNoYumiya.mp3`,
  },
];

// Legacy exports for backward compatibility
export const playlist = tracks.map((t) => t.src);
export const trackNames = tracks.map((t) => t.title);
export const trackImages = tracks.map((t) => t.image);

export const skillCategories = {
  [SkillCategoryName.Languages]: [
    "C",
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "Bash",
  ],
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
  [SkillCategoryName.DevOpsInfra]: [
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "AWS",
    "Jenkins",
  ],
};

export const systemStats = () =>
  [
    "                    \x1b[32m'c.\x1b[0m          \x1b[1madarsh_anand@Adarshs-MacBook-Air.local\x1b[0m",
    "                 \x1b[33m,xNMM.\x1b[0m          ",
    "               \x1b[31m.OMMMMo\x1b[0m           \x1b[36mOS:\x1b[0m macOS 27.0 26A5289h arm64",
    "               \x1b[31mOMMM0,\x1b[0m            \x1b[36mHost:\x1b[0m Mac16,13",
    "     \x1b[31m.;loddo:'\x1b[0m \x1b[33mloolloddol;.\x1b[0m      \x1b[36mKernel:\x1b[0m 27.0.0",
    "   \x1b[33mcKMMMMMMMMMMNWMMMMMMMMMM0:\x1b[0m    \x1b[36mUptime:\x1b[0m 3 days, 16 hours, 14 mins",
    " \x1b[33m.KMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mPackages:\x1b[0m 295 (brew)",
    " \x1b[32mXMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mShell:\x1b[0m zsh 5.9",
    "\x1b[32m;MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mResolution:\x1b[0m 1440x932",
    "\x1b[34m:MMMMMMMMMMMMMMMMMMMMMMMM:\x1b[0m       \x1b[36mDE:\x1b[0m Aqua",
    "\x1b[34m.MMMMMMMMMMMMMMMMMMMMMMMMX.\x1b[0m      \x1b[36mWM:\x1b[0m Quartz Compositor",
    " \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMMWd.\x1b[0m    \x1b[36mWM Theme:\x1b[0m Blue (Light)",
    " \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMMMk\x1b[0m   \x1b[36mTerminal:\x1b[0m Apple_Terminal",
    "  \x1b[35m.XMMMMMMMMMMMMMMMMMMMMMMMMK.\x1b[0m   \x1b[36mTerminal Font:\x1b[0m SFMonoTerminal-Regular",
    "    \x1b[35mkMMMMMMMMMMMMMMMMMMMMMMd\x1b[0m     \x1b[36mCPU:\x1b[0m Apple M4 (10-core)",
    "     \x1b[35m;KMMMMMMMWXXWMMMMMMMk.\x1b[0m      \x1b[36mGPU:\x1b[0m Apple M4 Integrated",
    "       \x1b[35m.cooc,.\x1b[0m    \x1b[35m.,coo:.\x1b[0m        \x1b[36mMemory:\x1b[0m 3226MiB / 16384MiB",
  ] as const;

export const introLines = () => ["$ neofetch", ...systemStats(), ""];

export const contactInfo = [
  `Email: ${siteConfig.contact.email}`,
  `LinkedIn: ${siteConfig.contact.linkedin}`,
  `GitHub: ${siteConfig.contact.github}`,
] as const;

export const whoamiInfo = [
  `User: ${siteConfig.whoami.user}`,
  `Role: ${siteConfig.whoami.role}`,
  `Expertise: ${siteConfig.whoami.expertise}`,
  `Status: ${siteConfig.whoami.status}`,
] as const;

export const directories = [
  "blogs",
  "papers",
  "books",
  "anime",
  "hobby",
] as const;

export const routes = {
  home: "/",
  articles: "/articles",
  books: "/books",
  anime: "/anime",
  hobbies: "/hobbies",
  music: "/music",
} as const;

export const NAV_ITEMS = [
  { label: "Home", path: routes.home },
  { label: "Articles", path: routes.articles },
  { label: "Books", path: routes.books },
  { label: "Anime", path: routes.anime },
  { label: "Hobbies", path: routes.hobbies },
] as const;

export const directoryMap: Record<string, string> = {
  blog: routes.articles,
  blogs: routes.articles,
  paper: routes.articles,
  papers: routes.articles,
  article: routes.articles,
  articles: routes.articles,
  book: routes.books,
  books: routes.books,
  anime: routes.anime,
  animes: routes.anime,
  hobby: routes.hobbies,
  hobbies: routes.hobbies,
  home: routes.home,
  ".": routes.home,
};

export const techLinks: Record<string, string> = {
  // Languages
  C: "https://en.cppreference.com/w/c",
  "C++": "https://isocpp.org/",
  Java: "https://www.java.com/",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  Python: "https://www.python.org/",
  TypeScript: "https://www.typescriptlang.org/",
  Rust: "https://www.rust-lang.org/",
  Go: "https://go.dev/",
  Bash: "https://www.gnu.org/software/bash/",
  SQL: "https://www.iso.org/standard/63555.html",

  // System & Kernel
  "Intel SGX/TDX":
    "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-trust-domain-extensions.html",
  "Intel SGX":
    "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
  "Intel TDX":
    "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
  "Kernel Development": "https://www.kernel.org/",
  "System Programming": "https://man7.org/linux/man-pages/",
  "Windows Internals": "https://learn.microsoft.com/en-us/sysinternals/",
  Ubuntu: "https://ubuntu.com/",
  CentOS: "https://www.centos.org/",
  RHEL: "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
  Debian: "https://www.debian.org/",
  "Arch Linux": "https://archlinux.org/",
  "Linux Kernel": "https://www.kernel.org/",
  UEFI: "https://uefi.org/",
  BIOS: "https://en.wikipedia.org/wiki/BIOS",

  // Security
  "Data Loss Prevention": "https://www.trellix.com/products/dlp-endpoint/",
  "Trellix ePO": "https://www.trellix.com/platform/epolicy-orchestrator/",
  "Endpoint Security": "https://www.trellix.com/products/endpoint-security/",
  EDR: "https://www.crowdstrike.com/what-is-edr/",
  XDR: "https://www.trellix.com/platform/xdr/",
  PowerShell: "https://learn.microsoft.com/en-us/powershell/",
  "Boldon James": "https://www.boldonjames.com/",
  "Full-Disk Encryption":
    "https://en.wikipedia.org/wiki/Hardware-based_full_disk_encryption",
  "Hashicorp Vault": "https://www.vaultproject.io/",
  OpenSSL: "https://www.openssl.org/",
  "Post-Quantum Cryptography":
    "https://csrc.nist.gov/projects/post-quantum-cryptography",
  libFuzzer: "https://llvm.org/docs/LibFuzzer.html",
  RESTler: "https://github.com/microsoft/restler-fuzzer",
  SIEM: "https://www.ibm.com/topics/siem",
  "Threat Intelligence": "https://www.trellix.com/threat-intelligence/",
  SELinux: "https://github.com/SELinuxProject",
  AppArmor: "https://apparmor.net/",
  Wireshark: "https://www.wireshark.org/",
  Nmap: "https://nmap.org/",
  Metasploit: "https://www.metasploit.com/",
  "Burp Suite": "https://portswigger.net/burp",
  OWASP: "https://owasp.org/",
  "Zero Trust": "https://www.nist.gov/publications/zero-trust-architecture",
  IAM: "https://aws.amazon.com/iam/",

  // AI & Machine Learning
  vLLM: "https://vllm.ai/",
  PyTorch: "https://pytorch.org/",
  OpenVINO: "https://docs.openvino.ai/",
  TensorFlow: "https://www.tensorflow.org/",
  "Scikit-learn": "https://scikit-learn.org/",
  "Hugging Face": "https://huggingface.co/",
  LangChain: "https://www.langchain.com/",
  NumPy: "https://numpy.org/",
  Pandas: "https://pandas.pydata.org/",
  Jupyter: "https://jupyter.org/",
  CUDA: "https://developer.nvidia.com/cuda-toolkit",
  ONNX: "https://onnx.ai/",
  MLflow: "https://mlflow.org/",

  // Databases & Tools
  Redis: "https://redis.io/",
  MySQL: "https://www.mysql.com/",
  PostgreSQL: "https://www.postgresql.org/",
  MongoDB: "https://www.mongodb.com/",
  SQLite: "https://www.sqlite.org/",
  Elasticsearch: "https://www.elastic.co/elasticsearch",
  DynamoDB: "https://aws.amazon.com/dynamodb/",
  Cassandra: "https://cassandra.apache.org/",
  Neo4j: "https://neo4j.com/",
  Docker: "https://www.docker.com/",
  Kubernetes: "https://kubernetes.io/",
  "GitHub Actions": "https://github.com/features/actions",
  AWS: "https://aws.amazon.com/",
  Azure: "https://azure.microsoft.com/",
  GCP: "https://cloud.google.com/",
  Terraform: "https://www.terraform.io/",
  Ansible: "https://www.ansible.com/",
  Jenkins: "https://www.jenkins.io/",
  "GitLab CI": "https://docs.gitlab.com/ee/ci/",
  Prometheus: "https://prometheus.io/",
  Grafana: "https://grafana.com/",
  "ELK Stack": "https://www.elastic.co/elastic-stack",
  Nginx: "https://nginx.org/",
  Apache: "https://httpd.apache.org/",
  Helm: "https://helm.sh/",
  ArgoCD: "https://argo-cd.readthedocs.io/",
  Istio: "https://istio.io/",

  // Frontend & Web
  "Next.js": "https://nextjs.org/",
  React: "https://react.dev/",
  "Tailwind CSS": "https://tailwindcss.com/",
  "Framer Motion": "https://www.framer.com/motion/",
  "Three.js": "https://threejs.org/",
  Zustand: "https://zustand-demo.pmnd.rs/",
  HTML5: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  CSS3: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  Webpack: "https://webpack.js.org/",
  Vite: "https://vitejs.dev/",
  "shadcn/ui": "https://ui.shadcn.com/",
  "Radix UI": "https://www.radix-ui.com/",
  "React Query": "https://tanstack.com/query/latest",

  // Misc
  Gramine: "https://gramineproject.io/",
  "Intel Xeon":
    "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html",
  Chrome: "https://www.google.com/chrome/",
  Edge: "https://www.microsoft.com/en-us/edge",
  "Trellix DLP Endpoint": "https://www.trellix.com/products/dlp-endpoint/",
  "McAfee ePO": "https://www.trellix.com/platform/epolicy-orchestrator/",
};
