/**
 * @fileoverview Technology links mapping and linkification utility.
 * Maps technology names to their official documentation and provides
 * a function to replace plain-text mentions with HTML anchor tags.
 */

/**
 * Mapping of technology names to their official documentation URLs.
 * @constant
 */
export const techLinks: Record<string, string> = {
  // Languages
  "C": "https://en.cppreference.com/w/c",
  "C++": "https://isocpp.org/",
  "Java": "https://www.java.com/",
  "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "Python": "https://www.python.org/",
  "TypeScript": "https://www.typescriptlang.org/",
  "Rust": "https://www.rust-lang.org/",
  "Go": "https://go.dev/",
  "Bash": "https://www.gnu.org/software/bash/",
  "SQL": "https://www.iso.org/standard/63555.html",

  // System & Kernel
  "Intel SGX/TDX": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-trust-domain-extensions.html",
  "Intel SGX": "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
  "Intel TDX": "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
  "Kernel Development": "https://www.kernel.org/",
  "System Programming": "https://man7.org/linux/man-pages/",
  "Windows Internals": "https://learn.microsoft.com/en-us/sysinternals/",
  "Ubuntu": "https://ubuntu.com/",
  "CentOS": "https://www.centos.org/",
  "RHEL": "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
  "Debian": "https://www.debian.org/",
  "Arch Linux": "https://archlinux.org/",
  "Linux Kernel": "https://www.kernel.org/",
  "UEFI": "https://uefi.org/",
  "BIOS": "https://en.wikipedia.org/wiki/BIOS",

  // Security
  "Data Loss Prevention": "https://www.trellix.com/products/dlp-endpoint/",
  "Trellix ePO": "https://www.trellix.com/platform/epolicy-orchestrator/",
  "Endpoint Security": "https://www.trellix.com/products/endpoint-security/",
  "EDR": "https://www.crowdstrike.com/what-is-edr/",
  "XDR": "https://www.trellix.com/platform/xdr/",
  "PowerShell": "https://learn.microsoft.com/en-us/powershell/",
  "Boldon James": "https://www.boldonjames.com/",
  "Full-Disk Encryption": "https://en.wikipedia.org/wiki/Hardware-based_full_disk_encryption",
  "Hashicorp Vault": "https://www.vaultproject.io/",
  "OpenSSL": "https://www.openssl.org/",
  "Post-Quantum Cryptography": "https://csrc.nist.gov/projects/post-quantum-cryptography",
  "libFuzzer": "https://llvm.org/docs/LibFuzzer.html",
  "RESTler": "https://github.com/microsoft/restler-fuzzer",
  "SIEM": "https://www.ibm.com/topics/siem",
  "Threat Intelligence": "https://www.trellix.com/threat-intelligence/",
  "SELinux": "https://github.com/SELinuxProject",
  "AppArmor": "https://apparmor.net/",
  "Wireshark": "https://www.wireshark.org/",
  "Nmap": "https://nmap.org/",
  "Metasploit": "https://www.metasploit.com/",
  "Burp Suite": "https://portswigger.net/burp",
  "OWASP": "https://owasp.org/",
  "Zero Trust": "https://www.nist.gov/publications/zero-trust-architecture",
  "IAM": "https://aws.amazon.com/iam/",

  // AI & Machine Learning
  "vLLM": "https://vllm.ai/",
  "PyTorch": "https://pytorch.org/",
  "OpenVINO": "https://docs.openvino.ai/",
  "TensorFlow": "https://www.tensorflow.org/",
  "Scikit-learn": "https://scikit-learn.org/",
  "Hugging Face": "https://huggingface.co/",
  "LangChain": "https://www.langchain.com/",
  "NumPy": "https://numpy.org/",
  "Pandas": "https://pandas.pydata.org/",
  "Jupyter": "https://jupyter.org/",
  "CUDA": "https://developer.nvidia.com/cuda-toolkit",
  "ONNX": "https://onnx.ai/",
  "MLflow": "https://mlflow.org/",

  // Databases & Tools
  "Redis": "https://redis.io/",
  "MySQL": "https://www.mysql.com/",
  "PostgreSQL": "https://www.postgresql.org/",
  "MongoDB": "https://www.mongodb.com/",
  "SQLite": "https://www.sqlite.org/",
  "Elasticsearch": "https://www.elastic.co/elasticsearch",
  "DynamoDB": "https://aws.amazon.com/dynamodb/",
  "Cassandra": "https://cassandra.apache.org/",
  "Neo4j": "https://neo4j.com/",
  "Docker": "https://www.docker.com/",
  "Kubernetes": "https://kubernetes.io/",
  "GitHub Actions": "https://github.com/features/actions",
  "AWS": "https://aws.amazon.com/",
  "Azure": "https://azure.microsoft.com/",
  "GCP": "https://cloud.google.com/",
  "Terraform": "https://www.terraform.io/",
  "Ansible": "https://www.ansible.com/",
  "Jenkins": "https://www.jenkins.io/",
  "GitLab CI": "https://docs.gitlab.com/ee/ci/",
  "Prometheus": "https://prometheus.io/",
  "Grafana": "https://grafana.com/",
  "ELK Stack": "https://www.elastic.co/elastic-stack",
  "Nginx": "https://nginx.org/",
  "Apache": "https://httpd.apache.org/",
  "Helm": "https://helm.sh/",
  "ArgoCD": "https://argo-cd.readthedocs.io/",
  "Istio": "https://istio.io/",

  // Frontend & Web
  "Next.js": "https://nextjs.org/",
  "React": "https://react.dev/",
  "Tailwind CSS": "https://tailwindcss.com/",
  "Framer Motion": "https://www.framer.com/motion/",
  "Three.js": "https://threejs.org/",
  "Zustand": "https://zustand-demo.pmnd.rs/",
  "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "Webpack": "https://webpack.js.org/",
  "Vite": "https://vitejs.dev/",
  "shadcn/ui": "https://ui.shadcn.com/",
  "Radix UI": "https://www.radix-ui.com/",
  "React Query": "https://tanstack.com/query/latest",

  // Misc
  "Gramine": "https://gramineproject.io/",
  "Intel Xeon": "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html",
  "Chrome": "https://www.google.com/chrome/",
  "Edge": "https://www.microsoft.com/en-us/edge",
  "Trellix DLP Endpoint": "https://www.trellix.com/products/dlp-endpoint/",
  "McAfee ePO": "https://www.trellix.com/platform/epolicy-orchestrator/",
};

/**
 * Replaces technology mentions in a string with HTML anchor tags.
 * Uses the techLinks mapping and sorts keys by length to avoid partial matches.
 * 
 * @param {string} text - The input text to linkify
 * @returns {string} The linkified HTML string
 */
export function linkifyTech(text: string): string {
  let result = text;
  const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);
  for (const tech of sortedTechs) {
    const url = techLinks[tech];
    const escapedTech = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${escapedTech})\\b(?![^<]*<\\/a>)`, "gi");
    result = result.replace(
      regex,
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-green-500 font-bold hover:underline group/link">${tech}<span class="inline-block transform transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-70"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></span></a>`
    );
  }
  return result;
}
