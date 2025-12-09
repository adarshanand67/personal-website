import { Command } from '../types';
import { createCommand, addLines } from '../helpers';

/**
 * Help command - displays available commands organized by category
 */

export const help: Command = createCommand(
    'help',
    'List available commands',
    (_, { setLines }) => {
        const helpText = [
            'Available commands:',
            'Navigation:',
            '  ls, cd, open, pwd, tree',
            '',
            'System Info:',
            '  whoami, fetch, uname, uptime, df, top, ps, free, hostname',
            '',
            'Utilities:',
            '  date, clear, echo, cat, grep, find, man, wc, diff, file, which',
            '',
            'File Operations:',
            '  mkdir, touch, mv, cp, rm, chmod, chown, ln, tar, zip',
            '',
            'Text Processing:',
            '  head, tail, grep, cat, wc',
            '',
            'Environment:',
            '  env, export, printenv, alias',
            '',
            'Network:',
            '  ping, curl, wget, ssh',
            '',
            'Development:',
            '  git, npm, docker',
            '',
            'Math & Text:',
            '  bc, factor, seq, yes, banner, figlet',
            '',
            'Fun:',
            '  hack, fortune, cowsay, exit, reboot, shutdown, cal',
            '',
            'Other:',
            '  theme, sudo, matrix, music, contact, skills',
            '',
            "Type 'help' anytime to see this list again!"
        ];
        addLines(setLines, helpText);
    },
    {
        category: 'utility',
        usage: 'help'
    }
);

export const helpCommand = {
    help
};
