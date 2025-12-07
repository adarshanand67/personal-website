// Map of technologies to their official websites
export const techLinks: Record<string, string> = {
    // Languages
    "C++": "https://isocpp.org/",
    "Rust": "https://www.rust-lang.org/",
    "Python": "https://www.python.org/",
    "TypeScript": "https://www.typescriptlang.org/",

    // Intel Technologies
    "Intel SGX": "https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html",
    "Intel TDX": "https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
    "Gramine": "https://gramineproject.io/",
    "Intel Xeon": "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html",

    // Security & Fuzzing
    "libFuzzer": "https://llvm.org/docs/LibFuzzer.html",
    "RESTler": "https://github.com/microsoft/restler-fuzzer",
    "OpenSSL": "https://www.openssl.org/",

    // AI/ML
    "PyTorch": "https://pytorch.org/",
    "OpenVINO": "https://docs.openvino.ai/",
    "vLLM": "https://vllm.ai/",

    // Databases & Infrastructure
    "MySQL": "https://www.mysql.com/",
    "Redis": "https://redis.io/",
    "Docker": "https://www.docker.com/",
    "Hashicorp Vault": "https://www.vaultproject.io/",

    // Frameworks
    "React": "https://react.dev/",

    // Linux Distros
    "Ubuntu": "https://ubuntu.com/",
    "CentOS": "https://www.centos.org/",
    "RHEL": "https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux",
};

// Function to add hyperlinks to text - simplified to avoid conflicts
export function linkifyTech(text: string): string {
    let result = text;

    // Sort by length (longest first) to avoid partial matches
    const sortedTechs = Object.keys(techLinks).sort((a, b) => b.length - a.length);

    for (const tech of sortedTechs) {
        const url = techLinks[tech];
        // Only match if not already inside an anchor tag
        // Use negative lookbehind/lookahead to avoid matching inside href
        const escapedTech = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<!<a[^>]*>)\\b(${escapedTech})\\b(?![^<]*<\\/a>)`, 'gi');
        result = result.replace(regex, `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-green-700 dark:text-green-400 hover:underline">${tech}</a>`);
    }

    return result;
}
