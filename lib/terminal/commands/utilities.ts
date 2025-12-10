import { Command } from '../types';
import { createCommand, createAliasCommand, addLine, addLines, parseFlags } from '../helpers';
import { CONTACT_INFO } from '@/lib/constants';
export const date: Command = createCommand('date', 'Show current date/time', (args, { setLines }) => {
    addLine(setLines, new Date().toString());
}, { category: 'utility', usage: 'date' });
export const clear: Command = createCommand('clear', 'Clear terminal', (_, { setLines, setInput }) => {
    setLines([]); setInput('');
}, { category: 'utility', usage: 'clear' });
export const echo: Command = createCommand('echo', 'Print text to terminal', (args, { setLines }) => {
    const { nonFlagArgs } = parseFlags(args, ['n']);
    addLine(setLines, nonFlagArgs.join(' '));
}, { category: 'utility', usage: 'echo [-n] [text]' });
export const history: Command = createCommand('history', 'Show command history', (_, { setLines, commandHistory }) => {
    addLines(setLines, (commandHistory || []).map((cmd, i) => `  ${i + 1}  ${cmd}`));
}, { category: 'utility', usage: 'history' });
export const skills: Command = createCommand('skills', 'Display technical skills', (_, { setLines }) => {
    addLines(setLines, [
        'Technical Skills:',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Languages:    C++ | Python | Rust | TypeScript',
        'Security:     Intel SGX/TDX | Cryptography | DLP',
        'Systems:      Linux | Docker | LLVM | Fuzzing',
        'Web:          Next.js | React | Node.js',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    ]);
}, { category: 'utility', usage: 'skills' });
export const contact: Command = createCommand('contact', 'Show contact info', (_, { setLines }) => {
    addLines(setLines, CONTACT_INFO as unknown as string[]);
}, { category: 'utility', usage: 'contact' });
export const which: Command = createCommand('which', 'Locate command', (args, { setLines }) => {
    args[0] ? addLine(setLines, `/usr/bin/${args[0]}`) : addLine(setLines, 'Usage: which [command]');
}, { category: 'utility', usage: 'which [command]' });
export const whereis: Command = createCommand('whereis', 'Locate binary', (args, { setLines }) => {
    args[0] ? addLine(setLines, `${args[0]}: /usr/bin/${args[0]}`) : addLine(setLines, 'Usage: whereis [command]');
}, { category: 'utility', usage: 'whereis [command]' });
export const find: Command = createCommand('find', 'Search for files', (args, { setLines }) => {
    addLines(setLines, ['./blogs', './papers', './books', './README.md', './package.json']);
}, { category: 'utility', usage: 'find [-name pattern]' });
export const man: Command = createCommand('man', 'Display manual pages', (args, { setLines }) => {
    addLines(setLines, ['MAN(1)', 'NAME', `       ${args[0] || 'help'} - This is a portfolio website`]);
}, { category: 'utility', usage: 'man [command]' });
export const cls: Command = createAliasCommand('cls', 'Clear screen (alias)', () => clear);
export const theme: Command = createCommand('theme', 'Switch color theme', (args, { setLines, setTheme }) => {
    if (['dark', 'light', 'system'].includes(args[0])) {
        setTheme(args[0] as any);
        addLine(setLines, `Theme set to ${args[0]} mode.`);
    } else {
        addLine(setLines, 'Use dark, light, or system.');
    }
}, { category: 'utility', usage: 'theme [dark|light|system]' });
export const utilityCommands = { date, clear, cls, echo, history, skills, contact, which, whereis, find, man, theme };
