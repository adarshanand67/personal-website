import { Command } from '../types';
import { createCommand, createAliasCommand, addLine, addLines, showUsage, parseFlags } from '../helpers';
import { CONTACT_INFO } from '@/lib/constants';

/**
 * Utility commands: date, clear, echo, history, skills, contact, which, whereis, find, man
 */

export const date: Command = createCommand(
    'date',
    'Show current date/time',
    (args, { setLines }) => {
        const now = new Date();
        const { hasFlags } = parseFlags(args, ['u', 'utc', 'I', 'iso-8601', 'R', 'rfc-email']);

        if (hasFlags.u || hasFlags.utc) {
            addLine(setLines, now.toUTCString());
        } else if (hasFlags.I || hasFlags['iso-8601']) {
            addLine(setLines, now.toISOString().split('T')[0]);
        } else if (hasFlags.R || hasFlags['rfc-email']) {
            addLine(setLines, now.toUTCString());
        } else if (args[0]?.startsWith('+')) {
            // Custom format (simplified)
            const format = args[0];
            let output = format
                .replace(/%Y/g, now.getFullYear().toString())
                .replace(/%m/g, (now.getMonth() + 1).toString().padStart(2, '0'))
                .replace(/%d/g, now.getDate().toString().padStart(2, '0'))
                .replace(/%H/g, now.getHours().toString().padStart(2, '0'))
                .replace(/%M/g, now.getMinutes().toString().padStart(2, '0'))
                .replace(/%S/g, now.getSeconds().toString().padStart(2, '0'))
                .replace(/^\+/, '');
            addLine(setLines, output);
        } else {
            addLine(setLines, now.toString());
        }
    },
    {
        category: 'utility',
        usage: 'date [-u|-I|-R] [+format]',
        examples: [
            'date              # Current date/time',
            'date -u           # UTC time',
            'date +%Y-%m-%d    # Custom format'
        ]
    }
);

export const clear: Command = createCommand(
    'clear',
    'Clear terminal',
    (_, { setLines, setInput }) => {
        setLines([]);
        setInput('');
    },
    {
        category: 'utility',
        usage: 'clear'
    }
);

export const echo: Command = createCommand(
    'echo',
    'Print text to terminal',
    (args, { setLines }) => {
        const { hasFlags, nonFlagArgs } = parseFlags(args, ['n']);
        const text = nonFlagArgs.join(' ');

        // Handle special variables
        let output = text
            .replace(/\$HOME/g, '/home/adarsh')
            .replace(/\$USER/g, 'adarsh')
            .replace(/\$PWD/g, '/home/adarsh')
            .replace(/\$PATH/g, '/usr/local/bin:/usr/bin:/bin');

        addLine(setLines, output);
    },
    {
        category: 'utility',
        usage: 'echo [-n] [text]',
        examples: [
            'echo Hello World     # Print text',
            'echo $HOME           # Print variable'
        ]
    }
);

export const history: Command = createCommand(
    'history',
    'Show command history',
    (_, { setLines, commandHistory }) => {
        if (commandHistory && commandHistory.length > 0) {
            const historyLines = commandHistory.map((cmd, index) => `  ${index + 1}  ${cmd}`);
            addLines(setLines, historyLines);
        } else {
            addLine(setLines, 'No command history yet.');
        }
    },
    {
        category: 'utility',
        usage: 'history'
    }
);

export const skills: Command = createCommand(
    'skills',
    'Display technical skills',
    (_, { setLines }) => {
        const output = [
            'Technical Skills:',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            'Languages:    C++ | Python | Rust | TypeScript',
            'Security:     Intel SGX/TDX | Cryptography | DLP',
            'Systems:      Linux | Docker | LLVM | Fuzzing',
            'Web:          Next.js | React | Node.js',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
        ];
        addLines(setLines, output);
    },
    {
        category: 'utility',
        usage: 'skills'
    }
);

export const contact: Command = createCommand(
    'contact',
    'Show contact info',
    (_, { setLines }) => {
        addLines(setLines, CONTACT_INFO as unknown as string[]);
    },
    {
        category: 'utility',
        usage: 'contact'
    }
);

export const which: Command = createCommand(
    'which',
    'Locate command',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'which [command]');
        } else {
            const cmd = args[0];
            if (['ls', 'cd', 'pwd', 'cat', 'echo'].includes(cmd)) {
                addLine(setLines, `/usr/bin/${cmd}`);
            } else {
                addLine(setLines, `${cmd} not found`);
            }
        }
    },
    {
        category: 'utility',
        usage: 'which [command]'
    }
);

export const whereis: Command = createCommand(
    'whereis',
    'Locate binary, source, and manual',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'whereis [command]');
        } else {
            const cmd = args[0];
            addLine(setLines, `${cmd}: /usr/bin/${cmd} /usr/share/man/man1/${cmd}.1.gz`);
        }
    },
    {
        category: 'utility',
        usage: 'whereis [command]'
    }
);

export const find: Command = createCommand(
    'find',
    'Search for files',
    (args, { setLines }) => {
        const nameIndex = args.indexOf('-name');
        const typeIndex = args.indexOf('-type');

        let pattern = '*';
        let fileType = 'all';

        if (nameIndex !== -1 && args[nameIndex + 1]) {
            pattern = args[nameIndex + 1].replace(/[*]/g, '');
        }

        if (typeIndex !== -1 && args[typeIndex + 1]) {
            fileType = args[typeIndex + 1]; // f for file, d for directory
        }

        const results: string[] = [];
        const directories = ['blogs', 'papers', 'books', 'anime', 'HobbyShelf'];
        const files = ['README.md', 'package.json', '.gitignore', '.env.example'];

        if (fileType === 'd' || fileType === 'all') {
            directories.forEach(dir => {
                if (pattern === '' || dir.toLowerCase().includes(pattern.toLowerCase())) {
                    results.push(`./${dir}`);
                }
            });
        }

        if (fileType === 'f' || fileType === 'all') {
            files.forEach(file => {
                if (pattern === '' || file.toLowerCase().includes(pattern.toLowerCase())) {
                    results.push(`./${file}`);
                }
            });
        }

        if (results.length > 0) {
            addLines(setLines, results);
        } else {
            addLine(setLines, `find: no files matching '${pattern}'`);
        }
    },
    {
        category: 'utility',
        usage: 'find [-name pattern] [-type f|d]',
        examples: [
            'find -name "*.md"     # Find markdown files',
            'find -type d          # Find directories'
        ]
    }
);

export const man: Command = createCommand(
    'man',
    'Display manual pages',
    (args, { setLines }) => {
        const cmd = args[0] || 'help';
        const output = [
            'MAN(1)                    User Commands                    MAN(1)',
            '',
            'NAME',
            `       ${cmd} - try typing 'help' instead!`,
            '',
            'DESCRIPTION',
            '       This is a portfolio website, not a real terminal 😄'
        ];
        addLines(setLines, output);
    },
    {
        category: 'utility',
        usage: 'man [command]'
    }
);

// Alias: cls -> clear
export const cls: Command = createAliasCommand(
    'cls',
    'Clear screen (alias)',
    () => clear
);

export const utilityCommands = {
    date,
    clear,
    cls,
    echo,
    history,
    skills,
    contact,
    which,
    whereis,
    find,
    man
};
