import { Command } from '../types';
import { createCommand, addLine, addLines, parseFlags } from '../helpers';
import { getFileContent, ARCHIVE_FILES, getFileType } from '../mockFileSystem';
import { TERMINAL_MESSAGES } from '../messages';
export const cat: Command = createCommand('cat', 'Display file contents', (args, { setLines }) => {
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['n']);
    nonFlagArgs.forEach(file => {
        const content = getFileContent(file.replace(/^~\//, ''));
        if (content) addLines(setLines, hasFlags.n ? content.map((l, i) => `${i + 1}  ${l}`) : content);
    });
}, { category: 'file', usage: 'cat [file]' });
export const mkdir: Command = createCommand('mkdir', 'Make directory', (args, { setLines }) => {
    addLine(setLines, args[0] ? TERMINAL_MESSAGES.FILE_OPS.MKDIR_FAIL(args[0]) : 'Usage: mkdir [directory]');
}, { category: 'file', usage: 'mkdir [directory]' });
export const touch: Command = createCommand('touch', 'Create empty file', (args, { setLines }) => {
    addLine(setLines, args[0] ? TERMINAL_MESSAGES.FILE_OPS.TOUCH_FAIL(args[0]) : 'Usage: touch [file]');
}, { category: 'file', usage: 'touch [file]' });
export const rm: Command = createCommand('rm', 'Remove file', (args, { setLines }) => {
    addLine(setLines, args.includes('-rf') && args.includes('/') ? 'Nice try, but I need this website.' : 'Permission denied');
}, { category: 'file', usage: 'rm [file]' });
export const mv: Command = createCommand('mv', 'Move/rename files', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: mv [source] [destination]' : 'Permission denied');
}, { category: 'file', usage: 'mv [source] [destination]' });
export const cp: Command = createCommand('cp', 'Copy files', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: cp [source] [destination]' : 'Permission denied');
}, { category: 'file', usage: 'cp [source] [destination]' });
export const chmod: Command = createCommand('chmod', 'Change file permissions', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: chmod [mode] [file]' : 'Permission denied');
}, { category: 'file', usage: 'chmod [mode] [file]' });
export const chown: Command = createCommand('chown', 'Change file owner', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: chown [owner] [file]' : 'Permission denied');
}, { category: 'file', usage: 'chown [owner] [file]' });
export const ln: Command = createCommand('ln', 'Create links', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: ln [-s] [target] [link]' : 'Permission denied');
}, { category: 'file', usage: 'ln [-s] [target] [link]' });
export const tar: Command = createCommand('tar', 'Archive utility', (args, { setLines }) => {
    if (!args.length) return;
    const extract = args.some(a => a.includes('x'));
    const create = args.some(a => a.includes('c'));
    const verbose = args.some(a => a.includes('v'));
    const filename = args[args.findIndex(a => a.includes('f')) + 1] || 'archive.tar';
    if (extract || create) {
        const output = verbose ? [(extract ? 'Extracting' : 'Creating') + ` ${filename}...`, ...ARCHIVE_FILES.map(f => `${extract ? 'x' : 'a'} ${f}`), TERMINAL_MESSAGES.FILE_OPS.UNZIP_DONE] : [(extract ? 'Extracted' : 'Created') + ` ${filename}`];
        addLines(setLines, output);
    } else {
        addLine(setLines, TERMINAL_MESSAGES.FILE_OPS.TAR_MSG);
    }
}, { category: 'file', usage: 'tar [options] [file]' });
export const zip: Command = createCommand('zip', 'Package files', (args, { setLines }) => {
    addLine(setLines, args[0] ? TERMINAL_MESSAGES.FILE_OPS.ZIP_MSG(args[0]) : 'Usage: zip [archive] [files...]');
}, { category: 'file', usage: 'zip [archive] [files...]' });
export const unzip: Command = createCommand('unzip', 'Extract files', (args, { setLines }) => {
    if (args[0]) addLines(setLines, [`Archive:  ${args[0]}`, '  inflating: portfolio.html', '  inflating: styles.css', TERMINAL_MESSAGES.FILE_OPS.UNZIP_DONE]);
}, { category: 'file', usage: 'unzip [archive]' });
export const file: Command = createCommand('file', 'Determine file type', (args, { setLines }) => {
    if (args[0]) addLine(setLines, `${args[0]}: ${getFileType(args[0])}`);
}, { category: 'file', usage: 'file [filename]' });
export const fileCommands = { cat, mkdir, touch, rm, mv, cp, chmod, chown, ln, tar, zip, unzip, file };
