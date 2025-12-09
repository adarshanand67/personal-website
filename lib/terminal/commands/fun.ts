import { Command } from '../types';
import { createCommand, addLine, addLines } from '../helpers';

/**
 * Fun commands: hack, fortune, cowsay, exit, reboot, shutdown, theme, sudo, matrix, music
 */

export const hack: Command = createCommand(
    'hack',
    'Initiate hacking sequence',
    (_, { setLines, toggleMatrix }) => {
        const output = [
            'Initializing hacking sequence...',
            'Bypassing firewall... ✓',
            'Cracking encryption... ✓',
            'Accessing mainframe... ✓',
            'Just kidding! Try \'sudo\' for real power 😄'
        ];
        addLines(setLines, output);
        setTimeout(() => toggleMatrix(), 1000);
    },
    {
        category: 'fun',
        usage: 'hack'
    }
);

export const fortune: Command = createCommand(
    'fortune',
    'Display random quote',
    (_, { setLines }) => {
        const fortunes = [
            'Code is like humor. When you have to explain it, it\'s bad.',
            'The best error message is the one that never shows up.',
            'Debugging is twice as hard as writing the code in the first place.',
            'Talk is cheap. Show me the code. - Linus Torvalds',
            'First, solve the problem. Then, write the code.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        addLine(setLines, `💭 ${fortune}`);
    },
    {
        category: 'fun',
        usage: 'fortune'
    }
);

export const cowsay: Command = createCommand(
    'cowsay',
    'ASCII cow says something',
    (args, { setLines }) => {
        const message = args.join(' ') || 'Hello!';
        const output = [
            ` ${'_'.repeat(message.length + 2)}`,
            `< ${message} >`,
            ` ${'-'.repeat(message.length + 2)}`,
            '        \\   ^__^',
            '         \\  (oo)\\_______',
            '            (__)\\       )\\/\\',
            '                ||----w |',
            '                ||     ||'
        ];
        addLines(setLines, output);
    },
    {
        category: 'fun',
        usage: 'cowsay [message]',
        examples: [
            'cowsay Hello World    # Cow says "Hello World"'
        ]
    }
);

export const exit: Command = createCommand(
    'exit',
    'Close terminal (just kidding)',
    (_, { setLines }) => {
        addLine(setLines, 'Nice try! This terminal is here to stay 😎');
    },
    {
        category: 'fun',
        usage: 'exit'
    }
);

export const reboot: Command = createCommand(
    'reboot',
    'Reboot system',
    (_, { setLines }) => {
        const output = [
            'Broadcast message from adarsh@portfolio',
            'The system is going down for reboot NOW!',
            'Just kidding! This is a web portfolio 😄'
        ];
        addLines(setLines, output);
    },
    {
        category: 'fun',
        usage: 'reboot'
    }
);

export const shutdown: Command = createCommand(
    'shutdown',
    'Shutdown system',
    (args, { setLines }) => {
        const time = args[0] || 'now';
        const output = [
            `Shutdown scheduled for ${time}`,
            'Nice try, but this portfolio stays online! 💪'
        ];
        addLines(setLines, output);
    },
    {
        category: 'fun',
        usage: 'shutdown [time]'
    }
);

export const theme: Command = createCommand(
    'theme',
    'Set theme (light/dark/system)',
    (args, { setLines, setTheme }) => {
        if (args.length === 0) {
            addLine(setLines, 'usage: theme [light|dark|system]');
        } else {
            const mode = (args[0] || '').toLowerCase();
            if (['light', 'dark', 'system'].includes(mode)) {
                setTheme(mode as 'light' | 'dark' | 'system');
                addLine(setLines, `Theme set to ${mode}`);
            } else {
                addLine(setLines, `Invalid theme: ${mode}. Use light, dark, or system.`);
            }
        }
    },
    {
        category: 'fun',
        usage: 'theme [light|dark|system]',
        examples: [
            'theme dark      # Set dark theme',
            'theme light     # Set light theme',
            'theme system    # Use system theme'
        ]
    }
);

export const sudo: Command = createCommand(
    'sudo',
    'Execute with superuser privileges',
    (_, { setPasswordMode, setLines }) => {
        setPasswordMode(true);
        addLine(setLines, 'Password:');
    },
    {
        category: 'fun',
        usage: 'sudo [command]'
    }
);

export const matrix: Command = createCommand(
    'matrix',
    'Toggle Matrix Rain effect',
    (_, { toggleMatrix }) => {
        toggleMatrix();
    },
    {
        category: 'fun',
        usage: 'matrix'
    }
);

export const music: Command = createCommand(
    'music',
    'Control music',
    (args, { setLines, setIsPlaying, nextTrack, prevTrack, toggleMute }) => {
        if (args.length === 0) {
            addLine(setLines, 'usage: music [play|pause|next|prev|mute]');
        } else {
            const action = (args[0] || '').toLowerCase();
            switch (action) {
                case 'play':
                    setIsPlaying(true);
                    addLine(setLines, 'Music: Playing');
                    break;
                case 'pause':
                    setIsPlaying(false);
                    addLine(setLines, 'Music: Paused');
                    break;
                case 'next':
                    nextTrack();
                    addLine(setLines, 'Music: Next Track');
                    break;
                case 'prev':
                    prevTrack();
                    addLine(setLines, 'Music: Previous Track');
                    break;
                case 'mute':
                    toggleMute();
                    addLine(setLines, 'Music: Mute Toggled');
                    break;
                default:
                    addLine(setLines, `Invalid music command: ${action}`);
            }
        }
    },
    {
        category: 'fun',
        usage: 'music [play|pause|next|prev|mute]',
        examples: [
            'music play      # Play music',
            'music pause     # Pause music',
            'music next      # Next track'
        ]
    }
);

export const funCommands = {
    hack,
    fortune,
    cowsay,
    exit,
    reboot,
    shutdown,
    theme,
    sudo,
    matrix,
    music
};
