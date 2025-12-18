export const mockFiles: Record<string, string> = {
    'README.md': '# Portfolio\nWelcome to my interactive portfolio!',
    'about.txt': 'Software Development Engineer @Trellix\nFocusing on data security and C++',
    '.secret.txt': 'You found the hidden text file! You are persistent.',
    '.config': '{"theme": "terminal", "autoInit": true, "secretMode": false}',
    '.ctf_hint.txt': 'The password you seek is the name of this assistant: "ANTIGRAVITY"',
    '.root_flag': 'FLAG{Y0U_4R3_TH3_M4ST3R_0F_TH3_UN1V3RS3}',
};

export const getFileContent = (path: string): string | null => {
    return mockFiles[path] || null;
};

export const getFileType = (path: string): string => {
    if (mockFiles[path]) return 'file';
    return 'unknown';
};

export const getDirectoryContent = (): string[] => {
    return Object.keys(mockFiles);
};

export const getFileMetadata = (path: string) => {
    if (!mockFiles[path]) return null;
    return {
        size: mockFiles[path].length,
        modified: new Date().toISOString(),
        permissions: '-rw-r--r--'
    };
};
