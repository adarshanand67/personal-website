import { createCommand, addLines, addLine } from './helpers';
import { Command } from './types';
import { contactInfo, whoamiInfo, systemStats } from '@/lib/constants';
import { getFileContent } from '../mockFileSystem';

export const whoami: Command = createCommand('whoami', 'Display profile info', (_, { setLines }) => {
    addLines(setLines, [...whoamiInfo] as string[]);
}, { category: 'utility', usage: 'whoami' });

export const cat: Command = createCommand('cat', 'Read file', (args, { setLines }) => {
    const filename = args[0];
    if (!filename) {
        addLine(setLines, 'Usage: cat [filename]');
        return;
    }
    const content = getFileContent(filename);
    if (content) {
        addLines(setLines, content.split('\n'));
    } else {
        addLine(setLines, `cat: ${filename}: No such file`);
    }
}, { category: 'utility', usage: 'cat [file]' });

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
    addLines(setLines, [...contactInfo] as string[]);
}, { category: 'utility', usage: 'contact' });

export const github: Command = createCommand('github', 'Show GitHub statistics', async (_, { setLines }) => {
    addLine(setLines, 'Fetching GitHub stats for adarshanand67...');
    try {
        const res = await fetch('https://api.github.com/users/adarshanand67');
        const data = await res.json();
        addLines(setLines, [
            `User:       ${data.login}`,
            `Repos:      ${data.public_repos}`,
            `Gists:      ${data.public_gists}`,
            `Followers:  ${data.followers}`,
            `Following:  ${data.following}`,
            `Bio:        ${data.bio || 'N/A'}`
        ]);
    } catch {
        addLine(setLines, 'Error: Unable to fetch GitHub profile.');
    }
}, { category: 'utility', usage: 'github' });

export const neofetch: Command = createCommand('neofetch', 'Display system information', (_, { setLines }) => {
    addLines(setLines, [...systemStats()] as string[]);
}, { category: 'utility', usage: 'neofetch' });
