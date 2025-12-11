
import { getFileContent, getFileType, fileExists, getDirectoryContent } from '../mockFileSystem';

describe('MockFileSystem', () => {
    describe('getFileContent', () => {
        it('returns content for existing file "README.md"', () => {
            const content = getFileContent('README.md');
            expect(content).toBeDefined();
            expect(Array.isArray(content)).toBe(true);
            expect(content!.length).toBeGreaterThan(0);
        });

        it('returns null for non-existing file', () => {
            expect(getFileContent('ghost_file.txt')).toBeNull();
        });

        it('handles paths with "./"', () => {
            const content = getFileContent('./README.md');
            expect(content).toBeDefined();
        });
    });

    describe('getFileType', () => {
        it('identifies files correctly', () => {
            expect(getFileType('README.md')).toBe('file');
            expect(getFileType('package.json')).toBe('file');
        });

        it('identifies directories correctly', () => {
            expect(getFileType('blogs')).toBe('directory');
            expect(getFileType('papers')).toBe('directory');
        });

        it('returns unknown for invalid paths', () => {
            expect(getFileType('nothing')).toBe('unknown');
        });
    });

    describe('fileExists', () => {
        it('returns true for existing files', () => {
            expect(fileExists('README.md')).toBe(true);
        });

        it('returns false for non-existing files', () => {
            expect(fileExists('fake.txt')).toBe(false);
        });
    });

    // Additional tests for directory listing if traverse logic is complex
});
