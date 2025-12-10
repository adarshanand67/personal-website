export const techLinks: Record<string, string> = {
  "C++": "https://isocpp.org/",
  Rust: "https://www.rust-lang.org/",
  Python: "https://www.python.org/",
  TypeScript: "https://www.typescriptlang.org/",
  "Intel SGX":
    "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
  "Intel TDX":
    "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
  Gramine: "https://gramineproject.io/",
  "Intel Xeon": "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html",
  libFuzzer: "https://llvm.org/docs/LibFuzzer.html",
  RESTler: "https://github.com/microsoft/restler-fuzzer",
  OpenSSL: "https://www.openssl.org/",
  PyTorch: "https://pytorch.org/",
  OpenVINO: "https://docs.openvino.ai/",
  vLLM: "https://vllm.ai/",
  MySQL: "https://www.mysql.com/",
  Redis: "https://redis.io/",
  Docker: "https://www.docker.com/",
  "Hashicorp Vault": "https://www.vaultproject.io/",
  React: "https://react.dev/",
  Ubuntu: "https://ubuntu.com/",
  CentOS: "https://www.centos.org/",
  RHEL: "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
  SUSE: "https://www.suse.com/",
  PowerShell: "https://learn.microsoft.com/en-us/powershell/",
  Chrome: "https://www.google.com/chrome/",
  Edge: "https://www.microsoft.com/en-us/edge",
  "Trellix DLP Endpoint": "https://www.trellix.com/products/dlp-endpoint/",
  "McAfee ePO": "https://www.trellix.com/platform/epolicy-orchestrator/",
  "Google Content Analysis Connector": "https://support.google.com/chrome/a/answer/9355153",
  "Google SDK": "https://support.google.com/chrome/a/answer/9355153",
};
export function linkifyTech(text: string): string {
  let result = text;
  const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);
  for (const tech of sortedTechs) {
    const url = techLinks[tech];
    const escapedTech = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${escapedTech})\\b(?![^<]*<\\/a>)`, "gi");
    result = result.replace(
      regex,
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-green-700 dark:text-green-400 hover:underline">${tech}</a>`
    );
  }
  return result;
}
