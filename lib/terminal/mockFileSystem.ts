export const mockFiles: Record<string, string> = {
    "README.md": "# Portfolio\nWelcome to my interactive portfolio!",
    "about.txt": "Software Development Engineer @Trellix\nFocusing on data security and C++",
    ".secret.txt": "WW91IGZvdW5kIHRoZSBoaWRkZW4gdGV4dCBmaWxlISBZb3UgYXJlIHBlcnNpc3RlbnQu",
    ".config": '{"theme": "terminal", "autoInit": true, "secretMode": false}',
    ".ctf_hint.txt":
        "VGhlIHBhc3N3b3JkIHlvdSBzZWVrIGlzIHRoZSBuYW1lIG9mIHRoaXMgYXNzaXN0YW50OiAiQU5USUJSQVZJVFki",
    ".root_flag": "RkxBR3tZMFVfNFIzX1RIM19NNVNUMVJfMEZfVEgzX1VOMVYzUlMzfQ==",
};

export const getFileContent = (path: string): string | null => {
    return mockFiles[path] || null;
};

export const getFileType = (path: string): string => {
    if (mockFiles[path]) return "file";
    return "unknown";
};

export const getDirectoryContent = (): string[] => {
    return Object.keys(mockFiles);
};

export const getFileMetadata = (path: string) => {
    if (!mockFiles[path]) return null;
    return {
        size: mockFiles[path].length,
        modified: new Date().toISOString(),
        permissions: "-rw-r--r--",
    };
};
