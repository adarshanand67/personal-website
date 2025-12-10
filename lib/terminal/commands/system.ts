import { Command } from '../types';
import { createCommand, createAliasCommand, parseFlags, addLines, addLine } from '../helpers';
import { WHOAMI_INFO, SYSTEM_STATS } from '@/lib/constants';
export const whoami: Command = createCommand('whoami', 'Display profile info', (_, { setLines }) => {
    addLines(setLines, WHOAMI_INFO as unknown as string[]);
}, { category: 'system', usage: 'whoami' });
export const fetch: Command = createCommand('fetch', 'Display system information', (_, { setLines, isMatrixEnabled }) => {
    addLines(setLines, SYSTEM_STATS(isMatrixEnabled) as unknown as string[]);
}, { category: 'system', usage: 'fetch', aliases: ['neofetch'] });
export const uname: Command = createCommand('uname', 'Print system information', (_, { setLines }) => {
    addLine(setLines, 'Portfolio OS 1.0.0 (Next.js 16.0.7)');
}, { category: 'system', usage: 'uname' });
export const uptime: Command = createCommand('uptime', 'Show system uptime', (_, { setLines }) => {
    const u = Math.floor(performance.now() / 1000);
    addLine(setLines, `up ${Math.floor(u / 3600)}h ${Math.floor((u % 3600) / 60)}m`);
}, { category: 'system', usage: 'uptime' });
export const df: Command = createCommand('df', 'Display disk space', (_, { setLines }) => {
    addLines(setLines, ['Filesystem Size Used Avail Use%', '/dev/sda1 100G 42G 58G 42%']);
}, { category: 'system', usage: 'df' });
export const top: Command = createCommand('top', 'Display running processes', (_, { setLines }) => {
    addLines(setLines, ['PID COMMAND %CPU %MEM', '1 next-server 12.3 256M']);
}, { category: 'system', usage: 'top' });
export const ps: Command = createCommand('ps', 'List processes', (args, { setLines }) => {
    addLines(setLines, ['PID TTY TIME CMD', '1 pts/0 00:00:01 portfolio']);
}, { category: 'system', usage: 'ps' });
export const free: Command = createCommand('free', 'Memory usage', (_, { setLines }) => {
    addLines(setLines, [' total used free', 'Mem: 16384 8192 4096']);
}, { category: 'system', usage: 'free' });
export const hostname: Command = createCommand('hostname', 'Show system hostname', (_, { setLines }) => {
    addLine(setLines, 'adarsh-portfolio.local');
}, { category: 'system', usage: 'hostname' });
export const kill: Command = createCommand('kill', 'Terminate process', (args, { setLines }) => {
    addLine(setLines, args[0] ? `kill: (${args[0]}) - Operation not permitted` : 'usage: kill [pid]');
}, { category: 'system', usage: 'kill [pid]' });
export const neofetch: Command = createAliasCommand('neofetch', 'System info alias', () => fetch);
export const systemCommands = { whoami, fetch, neofetch, uname, uptime, df, top, ps, free, hostname, kill };
