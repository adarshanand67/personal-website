export interface MockFile {
    type: 'file';
    size: number;
    permissions: string;
    owner: string;
    group: string;
    modified: string;
    content: string[];
}
export interface MockDirectory {
    type: 'directory';
    size: number;
    permissions: string;
    owner: string;
    group: string;
    modified: string;
}
export type MockFileSystemEntry = MockFile | MockDirectory;
export const MOCK_FILES: Record<string, MockFile> = {
    'readme.md': {
        type: 'file',
        size: 2048,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            '# Adarsh Anand - Portfolio',
            '',
            'Software Development Engineer @Trellix',
            'Specializing in C++, Data Security, and System Programming',
            '',
            "Type 'help' for available commands"
        ]
    },
    'skills.txt': {
        type: 'file',
        size: 1024,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            'Languages: C++, Python, JavaScript, TypeScript, Rust',
            'Technologies: Next.js, React, Node.js, Docker',
            'Security: Intel SGX, TDX, Cryptography, DLP',
            'Tools: Git, Linux, LLVM, Fuzzing'
        ]
    },
    'package.json': {
        type: 'file',
        size: 1024,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            '{',
            '  "name": "personal-website",',
            '  "version": "1.0.0",',
            '  "description": "Personal portfolio website",',
            '  "scripts": {',
            '    "dev": "next dev",',
            '    "build": "next build"',
            '  }',
            '}'
        ]
    },
    '.gitignore': {
        type: 'file',
        size: 128,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            'node_modules/',
            '.next/',
            'out/',
            '.DS_Store'
        ]
    },
    '.env.example': {
        type: 'file',
        size: 256,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            'NEXT_PUBLIC_SITE_URL=https://example.com',
            'NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X'
        ]
    },
    '.secret': {
        type: 'file',
        size: 64,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec  9 22:30',
        content: [
            'ZmxhZ3tIMWRkM25fVDNybTFuNGxfTTQ1dDNyfQ=='
        ]
    },
    'footer.txt': {
        type: 'file',
        size: 256,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec 10 18:57',
        content: [
            '© 2025 Adarsh Anand',
            '',
            'Links:',
            '→ GitHub: https://github.com/adarshanand67',
            '→ LinkedIn: https://linkedin.com/in/adarshanand67',
            '',
            'Inspired by arpitbhayani.me'
        ]
    },
    'work/history.log': {
        type: 'file',
        size: 512,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec 10 19:00',
        content: [
            '[2025-07] Joined Trellix as Software Development Engineer',
            '          Team: Data Loss Prevention (Windows)',
            '          Focus: Data Security, C++, Endpoint Protection',
            '',
            '[2024-06] Promoted to SDE at Intel Corporation',
            '          Team: Confidential Computing (Intel SGX/TDX)',
            '          Focus: Security, Fuzzing, Cryptography',
            '',
            '[2023-06] Started as Graduate Technical Intern at Intel',
            '          Team: Device Onboarding',
            '          Focus: FIDO, OpenSSL, Security Validation'
        ]
    },
    '.skills': {
        type: 'file',
        size: 384,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec 10 19:00',
        content: [
            'Primary Focus:',
            '  • C++',
            '  • Intel SGX/TDX',
            '  • Kernel Development',
            '  • System Programming',
            '',
            'Other Skills:',
            '  • Data Loss Prevention',
            '  • Trellix ePO',
            '  • Endpoint Security',
            '  • Windows Internals',
            '  • PowerShell',
            '  • Full-Disk Encryption',
            '  • Hashicorp Vault',
            '  • OpenSSL',
            '  • Post-Quantum Cryptography',
            '  • libFuzzer',
            '  • RESTler',
            '  • vLLM',
            '  • PyTorch',
            '  • OpenVINO'
        ]
    },
    'setup.json': {
        type: 'file',
        size: 1024,
        permissions: '-rw-r--r--',
        owner: 'adarsh',
        group: 'adarsh',
        modified: 'Dec 10 19:00',
        content: [
            '{',
            '  "hardware": {',
            '    "laptop": "MacBook Air M4",',
            '    "monitor": "LG UltraWide",',
            '    "keyboard": "Mechanical RGB",',
            '    "mouse": "Logitech MX Master"',
            '  },',
            '  "software": {',
            '    "editor": "VS Code",',
            '    "terminal": "iTerm2",',
            '    "browser": "Chrome",',
            '    "tools": ["Docker", "Git", "LLVM"]',
            '  }',
            '}'
        ]
    }
};
export const SAMPLE_TEXT_CONTENT = [
    'Welcome to my portfolio',
    'Built with Next.js and TypeScript',
    'Featuring a terminal interface',
    "Type 'help' for available commands",
    'Enjoy exploring!'
];
export const SAMPLE_FILE_LINES = {
    head: [
        'Line 1: Welcome to my portfolio!',
        'Line 2: Built with Next.js and TypeScript',
        'Line 3: Featuring a terminal interface',
        'Line 4: Type \'help\' for available commands',
        'Line 5: Enjoy exploring! 🚀',
        'Line 6: Check out my projects',
        'Line 7: View my experience',
        'Line 8: Read my blog posts',
        'Line 9: See my papers',
        'Line 10: Contact me anytime'
    ],
    tail: [
        'Line 91: Almost at the end...',
        'Line 92: Just a few more lines',
        'Line 93: Getting closer',
        'Line 94: Nearly there',
        'Line 95: So close now',
        'Line 96: Just about done',
        'Line 97: Final lines approaching',
        'Line 98: Second to last',
        'Line 99: Last line: Thanks for visiting!',
        'Line 100: EOF'
    ]
};
export const ARCHIVE_FILES = [
    'portfolio.html',
    'styles.css',
    'script.js',
    'README.md'
];
export const getFileContent = (filename: string): string[] | null => {
    const normalizedName = filename.toLowerCase();
    const file = MOCK_FILES[normalizedName];
    return file?.content || null;
};
export const getFileMetadata = (filename: string): MockFile | null => {
    const normalizedName = filename.toLowerCase();
    return MOCK_FILES[normalizedName] || null;
};
export const fileExists = (filename: string): boolean => {
    const normalizedName = filename.toLowerCase();
    return normalizedName in MOCK_FILES;
};
export const getFileType = (filename: string): string => {
    if (filename.endsWith('.md')) {
        return 'Markdown document, UTF-8 Unicode text';
    } else if (filename.endsWith('.json')) {
        return 'JSON data';
    } else if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
        return 'TypeScript source, UTF-8 Unicode text';
    } else if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
        return 'JavaScript source, UTF-8 Unicode text';
    } else if (filename.endsWith('.css')) {
        return 'CSS stylesheet, UTF-8 Unicode text';
    } else if (filename.endsWith('.html')) {
        return 'HTML document, UTF-8 Unicode text';
    } else if (filename.startsWith('.')) {
        return 'ASCII text';
    }
    return 'data';
};
export const getDirectoryContent = (path: string): string[] => {
    const normalizedPath = path.toLowerCase().replace(/\/$/, '').replace(/^~\//, '');
    if (normalizedPath === '' || normalizedPath === '.' || normalizedPath === '~') {
        return Object.keys(MOCK_FILES).sort();
    }
    switch (normalizedPath) {
        case 'blogs':
            return ['optimizing-react.md', 'security-best-practices.md', 'understanding-sgx.md'];
        case 'papers':
            return ['confidential-computing-review.pdf', 'sgx-vulnerabilities.pdf', 'tdx-architecture.pdf'];
        case 'books':
            return ['clean-code.epub', 'pragmatic-programmer.pdf', 'designing-data-intensive-apps.mobi'];
        case 'anime':
            return ['evangelion/', 'cowboy-bebop/', 'naruto/'];
        case 'hobby':
            return ['photography/', 'gaming/', 'reading/'];
        default:
            return [];
    }
};
