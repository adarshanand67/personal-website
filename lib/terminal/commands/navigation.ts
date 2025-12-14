import { Command } from '../types';
import { createCommand, createAliasCommand, parseFlags, addLines, addLine, showUsage, formatLongListing } from '../helpers';
import { DIRECTORY_MAP } from '@/lib/constants';
import { getDirectoryContent } from '../mockFileSystem';
export const ls: Command = createCommand(
    'ls',
    'List directories',
    (args, { setLines }) => {
        const { hasFlags, nonFlagArgs } = parseFlags(args, ['l', 'a', 'la', 'al']);
        const hasLongFormat = hasFlags.l || hasFlags.la || hasFlags.al;
        const showHidden = hasFlags.a || hasFlags.la || hasFlags.al;
        const path = nonFlagArgs[0] || '.';
        const content = getDirectoryContent(path);
        if (content.length === 0 && path !== '.' && path !== './' && path !== '~') {
            addLine(setLines, `ls: ${path}: No such file or directory`);
            return;
        }
        if (hasLongFormat) {
            const output: string[] = [`total ${content.length * 4} `];
            if (showHidden && (path === '.' || path === './' || path === '~')) {
                output.push(formatLongListing('.', true, 4096, 'Dec  9 22:30'));
                output.push(formatLongListing('..', true, 4096, 'Dec  9 22:30'));
            }
            content.forEach(item => {
                const isDir = item.endsWith('/') || !item.includes('.');
                output.push(formatLongListing(item, isDir, isDir ? 4096 : 1024, 'Dec  9 22:30'));
            });
            addLines(setLines, output);
        } else {
            let items = [...content];
            if (showHidden && (path === '.' || path === './' || path === '~')) {
                items = ['.env.example', '.gitignore', '.secret', ...items];
            }
            addLine(setLines, items.join('  '));
        }
    },
    {
        category: 'navigation',
        usage: 'ls [-l] [-a]',
        examples: [
            'ls          # List files',
            'ls -l       # Long format',
            'ls -la      # Long format with hidden files'
        ]
    }
);
export const cd: Command = createCommand(
    'cd',
    'Change directory',
    (args, { setLines, router }) => {
        if (args.length === 0) {
            showUsage(setLines, 'cd [directory]');
            return;
        }
        const dir = (args[0] || '')
            .replace(/^\.\//, '')
            .replace(/\/$/, '')
            .replace('shelf', '');
        if (DIRECTORY_MAP[dir]) {
            addLine(setLines, `Navigating to ${DIRECTORY_MAP[dir]}...`);
            router.push(DIRECTORY_MAP[dir]!);
        } else {
            addLine(setLines, `Directory not found: ${args[0] || ''} `);
        }
    },
    {
        category: 'navigation',
        usage: 'cd [directory]',
        examples: [
            'cd blogs    # Navigate to blogs',
            'cd papers   # Navigate to papers',
            'cd ~        # Navigate to home'
        ]
    }
);
export const pwd: Command = createCommand(
    'pwd',
    'Print working directory',
    (_, { setLines }) => {
        addLine(setLines, '/home/adarsh');
    },
    {
        category: 'navigation',
        usage: 'pwd'
    }
);
export const tree: Command = createCommand(
    'tree',
    'List directory tree',
    (_, { setLines }) => {
        const treeOutput = [
            '.',
            '├── blogshelf/',
            '├── papershelf/',
            '├── bookshelf/',
            '├── animeshelf/',
            '└── hobby/'
        ];
        addLines(setLines, treeOutput);
    },
    {
        category: 'navigation',
        usage: 'tree'
    }
);
export const open: Command = createAliasCommand(
    'open',
    'Open directory',
    () => cd
);
export const navigationCommands = {
    ls,
    cd,
    pwd,
    tree,
    open
};
