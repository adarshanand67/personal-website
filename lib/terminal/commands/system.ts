import { Command } from '../types';
import { createCommand, createAliasCommand, parseFlags, addLines, addLine } from '../helpers';
import { WHOAMI_INFO, SYSTEM_STATS } from '@/lib/constants';

/**
 * System information commands: whoami, fetch, uname, uptime, df, top, ps, free, hostname
 */

export const whoami: Command = createCommand(
    'whoami',
    'Display profile info',
    (_, { setLines }) => {
        addLines(setLines, WHOAMI_INFO as unknown as string[]);
    },
    {
        category: 'system',
        usage: 'whoami'
    }
);

export const fetch: Command = createCommand(
    'fetch',
    'Display system information',
    (_, { setLines, isMatrixEnabled }) => {
        addLines(setLines, SYSTEM_STATS(isMatrixEnabled) as unknown as string[]);
    },
    {
        category: 'system',
        usage: 'fetch',
        aliases: ['neofetch']
    }
);

export const uname: Command = createCommand(
    'uname',
    'Print system information',
    (_, { setLines }) => {
        addLine(setLines, 'Portfolio OS 1.0.0 (Next.js 16.0.7)');
    },
    {
        category: 'system',
        usage: 'uname'
    }
);

export const uptime: Command = createCommand(
    'uptime',
    'Show system uptime',
    (_, { setLines }) => {
        const uptime = Math.floor(performance.now() / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        addLine(setLines, `up ${hours}h ${minutes}m`);
    },
    {
        category: 'system',
        usage: 'uptime'
    }
);

export const df: Command = createCommand(
    'df',
    'Display disk space',
    (_, { setLines }) => {
        const output = [
            'Filesystem     Size  Used  Avail  Use%',
            '/dev/sda1      100G   42G    58G   42%',
            'tmpfs          8.0G  1.2G   6.8G   15%'
        ];
        addLines(setLines, output);
    },
    {
        category: 'system',
        usage: 'df'
    }
);

export const top: Command = createCommand(
    'top',
    'Display running processes',
    (_, { setLines }) => {
        const output = [
            'PID    COMMAND          %CPU   %MEM',
            '1      next-server      12.3   256M',
            '42     music-player     2.1    64M',
            '69     matrix-rain      5.4    128M'
        ];
        addLines(setLines, output);
    },
    {
        category: 'system',
        usage: 'top'
    }
);

export const ps: Command = createCommand(
    'ps',
    'List processes',
    (args, { setLines }) => {
        const { hasFlags } = parseFlags(args, ['aux', 'ef']);
        const showAll = hasFlags.aux || hasFlags.ef || args.includes('aux') || args.includes('-ef');

        if (showAll) {
            const output = [
                'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
                'adarsh       1  0.5  1.2 256000 16384 pts/0    Ss   22:00   0:01 /usr/bin/portfolio',
                'adarsh      42  2.1  0.4  64000  8192 pts/0    S    22:05   0:00 music-player',
                'adarsh      69  5.4  0.8 128000 12288 pts/0    S    22:10   0:02 matrix-rain',
                'adarsh     100  0.1  0.2  32000  4096 pts/0    R    22:30   0:00 ps aux'
            ];
            addLines(setLines, output);
        } else {
            const output = [
                'PID TTY      TIME CMD',
                '  1 pts/0    00:00:01 portfolio',
                ' 42 pts/0    00:00:00 music',
                ' 69 pts/0    00:00:02 matrix'
            ];
            addLines(setLines, output);
        }
    },
    {
        category: 'system',
        usage: 'ps [aux]',
        examples: [
            'ps          # Basic process list',
            'ps aux      # Detailed process list'
        ]
    }
);

export const free: Command = createCommand(
    'free',
    'Display memory usage',
    (_, { setLines }) => {
        const output = [
            '              total        used        free      shared  buff/cache   available',
            'Mem:          16384        8192        4096         512        4096        7680',
            'Swap:          8192           0        8192'
        ];
        addLines(setLines, output);
    },
    {
        category: 'system',
        usage: 'free'
    }
);

export const hostname: Command = createCommand(
    'hostname',
    'Show system hostname',
    (_, { setLines }) => {
        addLine(setLines, 'adarsh-portfolio.local');
    },
    {
        category: 'system',
        usage: 'hostname'
    }
);

export const kill: Command = createCommand(
    'kill',
    'Terminate process',
    (args, { setLines }) => {
        if (args.length === 0) {
            addLine(setLines, 'usage: kill [pid]');
        } else {
            addLine(setLines, `kill: (${args[0]}) - Operation not permitted 😅`);
        }
    },
    {
        category: 'system',
        usage: 'kill [pid]'
    }
);

// Alias: neofetch -> fetch
export const neofetch: Command = createAliasCommand(
    'neofetch',
    'Display system info (alias for fetch)',
    () => fetch
);

export const systemCommands = {
    whoami,
    fetch,
    neofetch,
    uname,
    uptime,
    df,
    top,
    ps,
    free,
    hostname,
    kill
};
