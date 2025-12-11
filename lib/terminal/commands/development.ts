import { Command } from '../types';
import { createCommand, addLine, addLines, parseFlags } from '../helpers';

/**
 * Development commands: git, npm, docker
 */

export const git: Command = createCommand(
    'git',
    'Version control',
    (args, { setLines }) => {
        const subcommand = args[0] || 'status';

        switch (subcommand) {
            case 'status':
                const statusOutput = [
                    'On branch main',
                    "Your branch is up to date with 'origin/main'.",
                    '',
                    'nothing to commit, working tree clean ✨'
                ];
                addLines(setLines, statusOutput);
                break;

            case 'log':
                const { hasFlags } = parseFlags(args, ['oneline', 'n']);
                const oneline = hasFlags.oneline;

                if (oneline) {
                    const logOutput = [
                        '2c91128 feat: enhance cat, grep, find commands',
                        '9485061 feat: enhance ls, echo, date commands',
                        'd8e7d15 feat: implement proper history command',
                        'a9223b7 revert: fix syntax errors',
                        '3675873 feat: add more commands'
                    ];
                    addLines(setLines, logOutput);
                } else {
                    const logOutput = [
                        'commit 2c91128 (HEAD -> main, origin/main)',
                        'Author: Adarsh Anand <adarsh@example.com>',
                        'Date:   Mon Dec 9 22:31:00 2024',
                        '',
                        '    feat: enhance cat, grep, find commands',
                        ''
                    ];
                    addLines(setLines, logOutput);
                }
                break;

            case 'branch':
                const showAll = args.includes('-a');
                const branchOutput = [
                    '* main',
                    ...(showAll ? ['  remotes/origin/main', '  remotes/origin/HEAD -> origin/main'] : [])
                ];
                addLines(setLines, branchOutput);
                break;

            case 'diff':
                const diffOutput = [
                    'diff --git a/lib/terminal/commands.ts b/lib/terminal/commands.ts',
                    'index 614c91d..859ce83 100644',
                    '--- a/lib/terminal/commands.ts',
                    '+++ b/lib/terminal/commands.ts',
                    '@@ -49,7 +49,36 @@',
                    ' (showing sample diff output)'
                ];
                addLines(setLines, diffOutput);
                break;

            case 'remote':
                if (args[1] === '-v') {
                    const remoteOutput = [
                        'origin  https://github.com/adarshanand67/adarshanand67.github.io.git (fetch)',
                        'origin  https://github.com/adarshanand67/adarshanand67.github.io.git (push)'
                    ];
                    addLines(setLines, remoteOutput);
                } else {
                    addLine(setLines, 'origin');
                }
                break;

            default:
                addLine(setLines, `git ${subcommand}: Check out the real repo on GitHub! 🚀`);
        }
    },
    {
        category: 'dev',
        usage: 'git [subcommand]',
        examples: [
            'git status          # Show status',
            'git log --oneline   # Show commit log',
            'git branch          # List branches'
        ]
    }
);

export const npm: Command = createCommand(
    'npm',
    'Node package manager',
    (args, { setLines }) => {
        const cmd = args[0] || 'help';
        addLine(setLines, `npm ${cmd} - This portfolio uses pnpm actually! 📦`);
    },
    {
        category: 'dev',
        usage: 'npm [command]'
    }
);

export const docker: Command = createCommand(
    'docker',
    'Container management',
    (args, { setLines }) => {
        const output = [
            'CONTAINER ID   IMAGE              STATUS',
            'a1b2c3d4e5f6   portfolio:latest   Up 42 minutes',
            '🐳 Containers running smoothly!'
        ];
        addLines(setLines, output);
    },
    {
        category: 'dev',
        usage: 'docker [command]',
        examples: [
            'docker ps       # List containers',
            'docker images   # List images'
        ]
    }
);

export const developmentCommands = {
    git,
    npm,
    docker
};
