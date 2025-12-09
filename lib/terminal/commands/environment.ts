import { Command } from '../types';
import { createCommand, addLine, addLines, showUsage } from '../helpers';

/**
 * Environment commands: env, export, printenv, alias
 */

export const env: Command = createCommand(
    'env',
    'Display environment',
    (_, { setLines }) => {
        const envVars = [
            'USER=adarsh',
            'HOME=/home/adarsh',
            'SHELL=/bin/zsh',
            'PATH=/usr/local/bin:/usr/bin:/bin',
            'LANG=en_US.UTF-8',
            'PORTFOLIO=awesome'
        ];
        addLines(setLines, envVars);
    },
    {
        category: 'environment',
        usage: 'env'
    }
);

export const exportCmd: Command = createCommand(
    'export',
    'Set environment variable',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'export VAR=value');
        } else {
            addLine(setLines, `export: ${args[0]} - Variable set (temporarily)`);
        }
    },
    {
        category: 'environment',
        usage: 'export VAR=value',
        examples: [
            'export PATH=/usr/bin    # Set PATH variable'
        ]
    }
);

export const printenv: Command = createCommand(
    'printenv',
    'Print environment',
    (args, { setLines }) => {
        const varName = args[0] || 'PATH';
        addLine(setLines, '/usr/local/bin:/usr/bin:/bin');
    },
    {
        category: 'environment',
        usage: 'printenv [variable]'
    }
);

export const alias: Command = createCommand(
    'alias',
    'Create command alias',
    (args, { setLines }) => {
        if (args.length === 0) {
            const aliases = [
                "alias ll='ls -la'",
                "alias ..='cd ..'",
                "alias please='sudo'"
            ];
            addLines(setLines, aliases);
        } else {
            addLine(setLines, `alias: ${args.join(' ')} - Aliases are temporary in this session`);
        }
    },
    {
        category: 'environment',
        usage: 'alias [name=value]',
        examples: [
            'alias               # List aliases',
            "alias ll='ls -la'   # Create alias"
        ]
    }
);

export const environmentCommands = {
    env,
    export: exportCmd,
    printenv,
    alias
};
