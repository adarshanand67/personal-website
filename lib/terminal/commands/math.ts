import { Command } from '../types';
import { createCommand, addLine, addLines, showUsage, validateNumberArg, generateRange } from '../helpers';

/**
 * Math and sequence commands: bc, factor, seq, yes, banner, figlet, cal
 */

export const bc: Command = createCommand(
    'bc',
    'Calculator',
    (args, { setLines }) => {
        if (args.length === 0) {
            const output = [
                'bc: arbitrary precision calculator',
                "Type 'echo \"2+2\" | bc' to calculate"
            ];
            addLines(setLines, output);
        } else {
            try {
                const expr = args.join(' ');
                // Simple eval for basic math (sanitized)
                if (/^[\d\s+\-*/().]+$/.test(expr)) {
                    const result = eval(expr);
                    addLine(setLines, String(result));
                } else {
                    addLine(setLines, 'bc: syntax error');
                }
            } catch {
                addLine(setLines, 'bc: syntax error');
            }
        }
    },
    {
        category: 'math',
        usage: 'bc [expression]',
        examples: [
            'bc 2+2          # Calculate 2+2',
            'bc "10*5"       # Calculate 10*5'
        ]
    }
);

export const factor: Command = createCommand(
    'factor',
    'Prime factorization',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'factor [number]');
        } else {
            const num = validateNumberArg(args[0], 'factor', setLines);
            if (num !== null) {
                addLine(setLines, `${num}: ${num} (prime factorization not implemented 😅)`);
            }
        }
    },
    {
        category: 'math',
        usage: 'factor [number]'
    }
);

export const seq: Command = createCommand(
    'seq',
    'Print sequence of numbers',
    (args, { setLines }) => {
        if (args.length === 0) {
            showUsage(setLines, 'seq [last] or seq [first] [last]');
        } else {
            const start = args.length === 1 ? 1 : parseInt(args[0], 10);
            const end = parseInt(args[args.length - 1], 10);

            if (isNaN(start) || isNaN(end)) {
                addLine(setLines, 'seq: invalid number');
            } else {
                const nums = generateRange(start, end, 20);
                addLines(setLines, nums);
            }
        }
    },
    {
        category: 'math',
        usage: 'seq [first] [last]',
        examples: [
            'seq 10          # Print 1 to 10',
            'seq 5 15        # Print 5 to 15'
        ]
    }
);

export const yes: Command = createCommand(
    'yes',
    'Output string repeatedly',
    (args, { setLines }) => {
        const text = args.join(' ') || 'y';
        const repeated = Array(10).fill(text);
        addLines(setLines, [...repeated, '... (stopped after 10 lines)']);
    },
    {
        category: 'math',
        usage: 'yes [string]',
        examples: [
            'yes             # Print "y" repeatedly',
            'yes hello       # Print "hello" repeatedly'
        ]
    }
);

export const banner: Command = createCommand(
    'banner',
    'Print large banner',
    (args, { setLines }) => {
        const text = args.join(' ') || 'HI';
        const output = [
            '╔═══════════════════════════╗',
            `║   ${text.toUpperCase().padEnd(21)}  ║`,
            '╚═══════════════════════════╝'
        ];
        addLines(setLines, output);
    },
    {
        category: 'math',
        usage: 'banner [text]',
        examples: [
            'banner HELLO    # Print banner with "HELLO"'
        ]
    }
);

export const figlet: Command = createCommand(
    'figlet',
    'ASCII art text',
    (args, { setLines }) => {
        const text = args.join(' ') || 'HELLO';
        const output = [
            ' _   _  _____ _     _     ___  ',
            '| | | || ____| |   | |   / _ \\ ',
            '| |_| ||  _| | |   | |  | | | |',
            '|  _  || |___| |___| |__| |_| |',
            '|_| |_||_____|_____|_____\\___/ ',
            '',
            `(Showing default - input was: ${text})`
        ];
        addLines(setLines, output);
    },
    {
        category: 'math',
        usage: 'figlet [text]'
    }
);

export const cal: Command = createCommand(
    'cal',
    'Display calendar',
    (_, { setLines }) => {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const output = [
            `      ${month} ${year}`,
            'Su Mo Tu We Th Fr Sa',
            ' 1  2  3  4  5  6  7',
            ' 8  9 10 11 12 13 14',
            '15 16 17 18 19 20 21',
            '22 23 24 25 26 27 28',
            '29 30 31'
        ];
        addLines(setLines, output);
    },
    {
        category: 'math',
        usage: 'cal'
    }
);

export const mathCommands = {
    bc,
    factor,
    seq,
    yes,
    banner,
    figlet,
    cal
};
