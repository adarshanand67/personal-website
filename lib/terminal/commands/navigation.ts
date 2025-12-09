import { Command } from '../types';
import { createCommand, createAliasCommand, parseFlags, addLines, addLine, showUsage, formatLongListing } from '../helpers';
import { DIRECTORIES, DIRECTORY_MAP } from '@/lib/constants';

/**
 * Navigation commands: ls, cd, pwd, tree, open
 */

export const ls: Command = createCommand(
    'ls',
    'List directories',
    (args, { setLines }) => {
        const { hasFlags } = parseFlags(args, ['l', 'a', 'la', 'al']);
        const hasLongFormat = hasFlags.l || hasFlags.la || hasFlags.al;
        const showHidden = hasFlags.a || hasFlags.la || hasFlags.al;

        const directories = [...DIRECTORIES];
        const files = ['README.md', 'package.json', '.gitignore', '.env.example'];

        if (hasLongFormat) {
            const output: string[] = ['total 42'];

            if (showHidden) {
                output.push(formatLongListing('.', true, 4096, 'Dec  9 22:30'));
                output.push(formatLongListing('..', true, 4096, 'Dec  9 22:30'));
                output.push(formatLongListing('.env.example', false, 256, 'Dec  9 22:30'));
                output.push(formatLongListing('.gitignore', false, 128, 'Dec  9 22:30'));
            }

            output.push(formatLongListing('README.md', false, 2048, 'Dec  9 22:30'));
            output.push(formatLongListing('package.json', false, 1024, 'Dec  9 22:30'));

            directories.forEach(d => {
                output.push(formatLongListing(d, true, 4096, 'Dec  9 22:30'));
            });

            addLines(setLines, output);
        } else {
            const items = [
                ...(showHidden ? ['.env.example', '.gitignore'] : []),
                'README.md',
                'package.json',
                ...directories.map(d => `${d}/`)
            ];
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
            addLine(setLines, `Directory not found: ${args[0] || ''}`);
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
            '└── HobbyShelf/'
        ];
        addLines(setLines, treeOutput);
    },
    {
        category: 'navigation',
        usage: 'tree'
    }
);

// Alias: open -> cd
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
