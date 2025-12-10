/**
 * CTF (Capture The Flag) Commands
 * Hidden easter egg challenge - No hints, figure it out!
 */

import { Command } from '../types';
import { createCommand, addLine, addLines } from '../helpers';

// The secret flag (base64 encoded)
const DECODED_FLAG = 'flag{H1dd3n_T3rm1n4l_M45t3r}';

export const base64: Command = createCommand(
    'base64',
    'Encode or decode base64 strings',
    (args, { setLines }) => {
        if (args.length === 0) {
            addLines(setLines, [
                '',
                'Usage: base64 [-d] <string>',
                '  -d    Decode base64 string',
                '',
                'Examples:',
                '  base64 "Hello World"      # Encode',
                '  base64 -d SGVsbG8gV29ybGQ=  # Decode',
                ''
            ]);
            return;
        }

        const isDecode = args[0] === '-d' || args[0] === '--decode';
        const text = isDecode ? args.slice(1).join(' ') : args.join(' ');

        if (!text) {
            addLine(setLines, '');
            addLine(setLines, 'Error: No input provided');
            addLine(setLines, '');
            return;
        }

        try {
            if (isDecode) {
                // Decode base64
                const decoded = atob(text);
                addLine(setLines, '');
                addLine(setLines, decoded);
                addLine(setLines, '');

                // Check if they decoded the flag
                if (decoded === DECODED_FLAG) {
                    setTimeout(() => {
                        addLines(setLines, [
                            '',
                            '🎉🎉🎉 CONGRATULATIONS! 🎉🎉🎉',
                            '═══════════════════════════════════',
                            '',
                            '🏆 You found the hidden flag!',
                            '',
                            `✨ Flag: ${DECODED_FLAG}`,
                            '',
                            '🎁 Your Rewards:',
                            '   • Terminal Master Achievement Unlocked! 🚀',
                            '   • Secret Resource: System Design Primer',
                            '   • https://youtu.be/dQw4w9WgXcQ',
                            '',
                            '💡 Pro Tip: Check out these resources:',
                            '   • System Design: https://github.com/donnemartin/system-design-primer',
                            '   • CTF Practice: https://overthewire.org/wargames/',
                            '   • Linux Commands: https://explainshell.com/',
                            '',
                            '📧 DM me on LinkedIn with this flag!',
                            '   I might have more challenges for you 😉',
                            '',
                            '═══════════════════════════════════',
                            ''
                        ]);
                    }, 100);
                }
            } else {
                // Encode to base64
                const encoded = btoa(text);
                addLine(setLines, '');
                addLine(setLines, encoded);
                addLine(setLines, '');
            }
        } catch (e) {
            addLines(setLines, [
                '',
                'Error: Invalid input',
                ''
            ]);
        }
    },
    {
        category: 'file',
        usage: 'base64 [-d] <string>',
        examples: [
            'base64 "Hello World"      # Encode to base64',
            'base64 -d SGVsbG8gV29ybGQ=  # Decode from base64'
        ]
    }
);

// Keep decode as an alias for convenience
export const decode: Command = createCommand(
    'decode',
    'Decode base64 strings (alias for base64 -d)',
    (args, { setLines }) => {
        // Just call base64 with -d flag
        base64.execute(['-d', ...args], { setLines } as any);
    },
    {
        category: 'file',
        usage: 'decode <base64-string>',
        examples: [
            'decode SGVsbG8gV29ybGQ=   # Decode base64 string'
        ]
    }
);

export const ctfCommands = {
    base64,
    decode
};
