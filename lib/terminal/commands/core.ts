import { createCommand, addLines, addLine } from './helpers';
import { Command } from './types';

export const clear: Command = createCommand('clear', 'Clear terminal', (_, { setLines, setInput }) => {
    setLines([]); setInput('');
}, { category: 'utility', usage: 'clear' });

export const help: Command = createCommand('help', 'Show available commands', (_, { setLines }) => {
    addLines(setLines, [
        'Available Commands:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Navigation:',
        '  cd [dir]      - Navigate to directory',
        '  ls            - List directory contents',
        '  pwd           - Show current directory',
        '  open [link]   - Open URL or directory',
        '',
        'Information:',
        '  whoami        - Display profile info',
        '  cat [file]    - Read file content',
        '  contact       - Show contact information',
        '  skills        - Display technical skills',
        '  history       - Show command history',
        '  todo [cmd]    - Simple todo list manager',
        '',
        'Utility:',
        '  clear         - Clear terminal',
        '  github        - Show GitHub statistics',
        '  haiku         - Generate a tech haiku',
        '  calc [expr]   - Evaluate math expression',
        '  uptime        - Show system uptime',
        '  fortune       - Your daily tech fortune',
        '  quote         - Get a daily tech quote',
        '  joke          - Random programmer joke',
        '  echo [text]   - Print text to terminal',
        '  help          - Show this help message',
        '  theme [mode]  - Set theme (light/dark/system)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
}, { category: 'utility', usage: 'help' });

export const theme: Command = createCommand('theme', 'Switch color theme', (args, { setLines, setTheme }) => {
    const mode = args[0]?.toLowerCase();
    if (!mode || !['light', 'dark', 'system'].includes(mode)) {
        addLine(setLines, `Invalid theme: ${mode}. Use dark, light, or system.`);
        return;
    }
    setTheme?.(mode as 'light' | 'dark' | 'system');
    addLine(setLines, `Theme set to ${mode} mode.`);
}, { category: 'utility', usage: 'theme [light|dark|system]' });


