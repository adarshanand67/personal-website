/**
 * Mock file system for terminal commands
 * Provides realistic file metadata and content
 */

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

/**
 * Mock files available in the terminal
 */
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
    }
};

/**
 * Sample content for text processing commands
 */
export const SAMPLE_TEXT_CONTENT = [
    'Welcome to my portfolio',
    'Built with Next.js and TypeScript',
    'Featuring a terminal interface',
    "Type 'help' for available commands",
    'Enjoy exploring!'
];

/**
 * Sample content for head/tail commands
 */
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

/**
 * Archive file contents for tar/zip commands
 */
export const ARCHIVE_FILES = [
    'portfolio.html',
    'styles.css',
    'script.js',
    'README.md'
];

/**
 * Gets file content by filename (case-insensitive)
 */
export const getFileContent = (filename: string): string[] | null => {
    const normalizedName = filename.toLowerCase();
    const file = MOCK_FILES[normalizedName];
    return file?.content || null;
};

/**
 * Gets file metadata
 */
export const getFileMetadata = (filename: string): MockFile | null => {
    const normalizedName = filename.toLowerCase();
    return MOCK_FILES[normalizedName] || null;
};

/**
 * Checks if a file exists
 */
export const fileExists = (filename: string): boolean => {
    const normalizedName = filename.toLowerCase();
    return normalizedName in MOCK_FILES;
};

/**
 * Gets file type description for the 'file' command
 */
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
