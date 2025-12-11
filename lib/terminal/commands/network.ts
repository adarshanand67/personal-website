import { Command } from '../types';
import { createCommand, addLine, addLines, showUsage } from '../helpers';

/**
 * Network commands: ping, curl, wget, ssh
 */

export const ping: Command = createCommand(
    'ping',
    'Ping a host',
    (args, { setLines }) => {
        const host = args[0] || 'localhost';
        const output = [
            `PING ${host} (127.0.0.1): 56 data bytes`,
            `64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.042 ms`,
            `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.037 ms`,
            `--- ${host} ping statistics ---`,
            '2 packets transmitted, 2 packets received, 0.0% packet loss'
        ];
        addLines(setLines, output);
    },
    {
        category: 'network',
        usage: 'ping [host]',
        examples: [
            'ping localhost       # Ping localhost',
            'ping google.com      # Ping remote host'
        ]
    }
);

export const curl: Command = createCommand(
    'curl',
    'Transfer data from URL',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'curl [url]');
        } else {
            const output = [
                `Fetching ${args[0]}...`,
                '200 OK - Portfolio loaded successfully!'
            ];
            addLines(setLines, output);
        }
    },
    {
        category: 'network',
        usage: 'curl [url]',
        examples: [
            'curl https://example.com    # Fetch URL'
        ]
    }
);

export const wget: Command = createCommand(
    'wget',
    'Download files',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'wget [url]');
        } else {
            const output = [
                `--2024-12-09 22:16:00--  ${args[0]}`,
                `Resolving ${args[0]}... done.`,
                `Connecting to ${args[0]}... connected.`,
                'HTTP request sent, awaiting response... 200 OK',
                'Download complete! (Just kidding, this is a portfolio 😉)'
            ];
            addLines(setLines, output);
        }
    },
    {
        category: 'network',
        usage: 'wget [url]',
        examples: [
            'wget https://example.com/file.zip    # Download file'
        ]
    }
);

export const ssh: Command = createCommand(
    'ssh',
    'Connect via SSH',
    (args, { setLines }) => {
        const host = args[0] || 'localhost';
        const output = [
            `ssh: connect to host ${host} port 22: Connection refused`,
            '(This is a web portfolio, not a real SSH client! 🔒)'
        ];
        addLines(setLines, output);
    },
    {
        category: 'network',
        usage: 'ssh [user@]host',
        examples: [
            'ssh user@example.com    # Connect to remote host'
        ]
    }
);

export const networkCommands = {
    ping,
    curl,
    wget,
    ssh
};
