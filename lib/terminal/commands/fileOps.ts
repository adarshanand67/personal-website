import { Command } from '../types';
import { createCommand, addLine, addLines, showUsage, showPermissionDenied, showFileNotFound, parseFlags, getFlagValue } from '../helpers';
import { getFileContent, fileExists, SAMPLE_FILE_LINES, ARCHIVE_FILES, getFileType } from '../mockFileSystem';

/**
 * File operation commands: cat, mkdir, touch, rm, mv, cp, chmod, chown, ln, tar, zip, unzip, file
 */

export const cat: Command = createCommand(
    'cat',
    'Display file contents',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'cat [file]');
            return;
        }

        const { hasFlags, nonFlagArgs } = parseFlags(args, ['n']);
        const showLineNumbers = hasFlags.n;
        const files = nonFlagArgs;

        files.forEach(file => {
            const content = getFileContent(file);

            if (content) {
                if (showLineNumbers) {
                    const numberedContent = content.map((line, i) => `     ${i + 1}  ${line}`);
                    addLines(setLines, numberedContent);
                } else {
                    addLines(setLines, content);
                }
            } else {
                showFileNotFound(setLines, 'cat', file);
            }
        });
    },
    {
        category: 'file',
        usage: 'cat [-n] [file]',
        examples: [
            'cat README.md       # Display file',
            'cat -n skills.txt   # Display with line numbers'
        ]
    }
);

export const mkdir: Command = createCommand(
    'mkdir',
    'Make directory',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'mkdir [directory]');
        } else {
            addLine(setLines, `mkdir: cannot create directory '${args[0]}': Read-only file system 😅`);
        }
    },
    {
        category: 'file',
        usage: 'mkdir [directory]'
    }
);

export const touch: Command = createCommand(
    'touch',
    'Create empty file',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'touch [file]');
        } else {
            addLine(setLines, `touch: cannot touch '${args[0]}': Read-only file system`);
        }
    },
    {
        category: 'file',
        usage: 'touch [file]'
    }
);

export const rm: Command = createCommand(
    'rm',
    'Remove file',
    (args, { setLines }) => {
        if (args.includes('-rf') && args.includes('/')) {
            addLine(setLines, 'Nice try, but I need this website.');
        } else {
            showPermissionDenied(setLines, 'rm');
        }
    },
    {
        category: 'file',
        usage: 'rm [file]'
    }
);

export const mv: Command = createCommand(
    'mv',
    'Move/rename files',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'mv [source] [destination]');
        } else {
            showPermissionDenied(setLines, 'mv', args[0]);
        }
    },
    {
        category: 'file',
        usage: 'mv [source] [destination]'
    }
);

export const cp: Command = createCommand(
    'cp',
    'Copy files',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'cp [source] [destination]');
        } else {
            addLine(setLines, `cp: cannot create regular file '${args[1]}': Permission denied`);
        }
    },
    {
        category: 'file',
        usage: 'cp [source] [destination]'
    }
);

export const chmod: Command = createCommand(
    'chmod',
    'Change file permissions',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'chmod [mode] [file]');
        } else {
            addLine(setLines, `chmod: changing permissions of '${args[1]}': Operation not permitted`);
        }
    },
    {
        category: 'file',
        usage: 'chmod [mode] [file]'
    }
);

export const chown: Command = createCommand(
    'chown',
    'Change file owner',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'chown [owner] [file]');
        } else {
            addLine(setLines, `chown: changing ownership of '${args[1]}': Operation not permitted`);
        }
    },
    {
        category: 'file',
        usage: 'chown [owner] [file]'
    }
);

export const ln: Command = createCommand(
    'ln',
    'Create links',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'ln [-s] [target] [link]');
        } else {
            addLine(setLines, 'ln: failed to create link: Operation not permitted');
        }
    },
    {
        category: 'file',
        usage: 'ln [-s] [target] [link]'
    }
);

export const tar: Command = createCommand(
    'tar',
    'Archive utility',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'tar [options] [file]');
            return;
        }

        const extract = args.some(arg => arg.includes('x'));
        const create = args.some(arg => arg.includes('c'));
        const verbose = args.some(arg => arg.includes('v'));
        const fIndex = args.findIndex(arg => arg.includes('f'));

        let filename = 'archive.tar';
        if (fIndex !== -1 && args[fIndex + 1]) {
            filename = args[fIndex + 1];
        }

        if (extract) {
            if (verbose) {
                const output = [
                    `Extracting ${filename}...`,
                    ...ARCHIVE_FILES.map(f => `x ${f}`),
                    'Done!'
                ];
                addLines(setLines, output);
            } else {
                addLine(setLines, `Extracted ${filename}`);
            }
        } else if (create) {
            if (verbose) {
                const output = [
                    `Creating ${filename}...`,
                    ...ARCHIVE_FILES.map(f => `a ${f}`),
                    'Done!'
                ];
                addLines(setLines, output);
            } else {
                addLine(setLines, `Created ${filename}`);
            }
        } else {
            addLine(setLines, 'tar: This is a web portfolio, not a real filesystem! 📦');
        }
    },
    {
        category: 'file',
        usage: 'tar [options] [file]',
        examples: [
            'tar -czf archive.tar.gz files   # Create archive',
            'tar -xzf archive.tar.gz         # Extract archive'
        ]
    }
);

export const zip: Command = createCommand(
    'zip',
    'Package files',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'zip [archive] [files...]');
        } else {
            addLine(setLines, `  adding: ${args[0]} (deflated 42%)`);
        }
    },
    {
        category: 'file',
        usage: 'zip [archive] [files...]'
    }
);

export const unzip: Command = createCommand(
    'unzip',
    'Extract files',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'unzip [archive]');
        } else {
            const output = [
                `Archive:  ${args[0]}`,
                '  inflating: portfolio.html',
                '  inflating: styles.css',
                'Done! 📂'
            ];
            addLines(setLines, output);
        }
    },
    {
        category: 'file',
        usage: 'unzip [archive]'
    }
);

export const file: Command = createCommand(
    'file',
    'Determine file type',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'file [filename]');
        } else {
            const filename = args[0];
            const fileType = getFileType(filename);
            addLine(setLines, `${filename}: ${fileType}`);
        }
    },
    {
        category: 'file',
        usage: 'file [filename]'
    }
);

export const fileCommands = {
    cat,
    mkdir,
    touch,
    rm,
    mv,
    cp,
    chmod,
    chown,
    ln,
    tar,
    zip,
    unzip,
    file
};
