import { Command, ThemeMode } from './types';
import { createCommand, createAliasCommand, addLine, addLines, parseFlags, getFlagValue, validateNumberArg, generateRange, showUsage, formatLongListing } from './helpers';
import { CONTACT_INFO, WHOAMI_INFO, SYSTEM_STATS, DIRECTORY_MAP } from '@/lib/constants';
import { getFileContent, ARCHIVE_FILES, getFileType, getDirectoryContent, SAMPLE_TEXT_CONTENT, SAMPLE_FILE_LINES, getFileMetadata } from './mockFileSystem';
import { TERMINAL_MESSAGES } from './messages';
import { siteConfig } from '@/lib/config';
import { useStore } from '@/lib/store/useStore';

// --- Utilities ---
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
    if (args[0]) {
        addLine(setLines, `/usr/bin/${args[0]}`);
    } else {
        addLine(setLines, 'Usage: which [command]');
    }
}, { category: 'utility', usage: 'which [command]' });

export const whereis: Command = createCommand('whereis', 'Locate binary', (args, { setLines }) => {
    if (args[0]) {
        addLine(setLines, `${args[0]}: /usr/bin/${args[0]}`);
    } else {
        addLine(setLines, 'Usage: whereis [command]');
    }
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
        setTheme(args[0] as ThemeMode);
        addLine(setLines, `Theme set to ${args[0]} mode.`);
    } else {
        addLine(setLines, 'Use dark, light, or system.');
    }
}, { category: 'utility', usage: 'theme [dark|light|system]' });


// --- Navigation ---
export const ls: Command = createCommand('ls', 'List directories', (args, { setLines }) => {
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['l', 'a', 'la', 'al']);
    const hasLongFormat = hasFlags.l || hasFlags.la || hasFlags.al;
    const showHidden = hasFlags.a || hasFlags.la || hasFlags.al;
    const path = nonFlagArgs[0] || '.';
    const content = getDirectoryContent(path);
    if (content.length === 0 && path !== '.' && path !== './' && path !== '~') {
        addLine(setLines, `ls: ${path}: No such file or directory`);
        return;
    }

    // Filter hidden files if not showing all
    const items = showHidden ? content : content.filter(item => !item.startsWith('.'));

    if (hasLongFormat) {
        const output: string[] = [`total ${items.length * 4}`];
        if (showHidden && (path === '.' || path === './' || path === '~')) {
            output.push(formatLongListing('.', true, 4096, 'Dec  9 22:30'));
            output.push(formatLongListing('..', true, 4096, 'Dec  9 22:30'));
        }
        items.forEach(item => {
            const meta = getFileMetadata(item);
            const isDir = item.endsWith('/') || (meta ? (meta as unknown as { type: string }).type === 'directory' : !item.includes('.'));
            const size = meta ? meta.size : (isDir ? 4096 : 1024);
            const date = meta ? meta.modified : 'Dec  9 22:30';
            output.push(formatLongListing(item, isDir, size, date));
        });
        addLines(setLines, output);
    } else {
        addLine(setLines, items.join('  '));
    }
}, { category: 'navigation', usage: 'ls [-l] [-a]' });

export const cd: Command = createCommand('cd', 'Change directory', (args, { setLines, router }) => {
    if (args.length === 0) {
        showUsage(setLines, 'cd [directory]');
        return;
    }
    const dir = (args[0] || '').replace(/^\.\//, '').replace(/\/$/, '').replace('shelf', '');
    if (DIRECTORY_MAP[dir]) {
        addLine(setLines, `Navigating to ${DIRECTORY_MAP[dir]}...`);
        router.push(DIRECTORY_MAP[dir]!);
    } else {
        addLine(setLines, `Directory not found: ${args[0] || ''} `);
    }
}, { category: 'navigation', usage: 'cd [directory]' });

export const pwd: Command = createCommand('pwd', 'Print working directory', (_, { setLines }) => {
    addLine(setLines, '/home/adarsh');
}, { category: 'navigation', usage: 'pwd' });

export const tree: Command = createCommand('tree', 'List directory tree', (_, { setLines }) => {
    addLines(setLines, ['.', '├── blogshelf/', '├── papershelf/', '├── bookshelf/', '├── animeshelf/', '└── hobby/']);
}, { category: 'navigation', usage: 'tree' });

export const open: Command = createAliasCommand('open', 'Open directory', () => cd);


// --- System ---
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


// --- File Ops ---
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
        addLines(setLines, verbose ? [(extract ? 'Extracting' : 'Creating') + ` ${filename}...`, ...ARCHIVE_FILES.map(f => `${extract ? 'x' : 'a'} ${f}`), TERMINAL_MESSAGES.FILE_OPS.UNZIP_DONE] : [(extract ? 'Extracted' : 'Created') + ` ${filename}`]);
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


// --- Text Processing ---
export const grep: Command = createCommand('grep', 'Search for patterns', (args, { setLines }, input) => {
    if (args.length < 1) { showUsage(setLines, 'grep [options] pattern [file]'); return; }
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['i', 'n', 'v', 'r']);
    const pattern = nonFlagArgs[0];
    let linesToSearch = SAMPLE_TEXT_CONTENT;
    if (input && !nonFlagArgs[1]) linesToSearch = input.split('\n');
    const regex = new RegExp(pattern, hasFlags.i ? 'i' : '');
    const matches: string[] = [];
    linesToSearch.forEach((line, index) => {
        const isMatch = regex.test(line);
        if ((isMatch && !hasFlags.v) || (!isMatch && hasFlags.v)) matches.push(hasFlags.n ? `${index + 1}:${line}` : line);
    });
    if (matches.length > 0) addLines(setLines, matches);
    else if (!input) addLine(setLines, `grep: no matches found for '${pattern}'`);
}, { category: 'text', usage: 'grep [options] pattern [file]' });

export const head: Command = createCommand('head', 'Output first part of files', (args, { setLines }) => {
    let numLines = 10;
    const nValue = getFlagValue(args, 'n');
    if (nValue) { const parsed = validateNumberArg(nValue, 'head', setLines); if (parsed !== null) numLines = parsed; }
    const file = parseFlags(args, ['n']).nonFlagArgs.filter(arg => arg !== nValue)[0] || 'file';
    addLines(setLines, [`==> ${file} <==`, ...SAMPLE_FILE_LINES.head.slice(0, numLines)]);
}, { category: 'text', usage: 'head [-n lines] [file]' });

export const tail: Command = createCommand('tail', 'Output last part of files', (args, { setLines }) => {
    let numLines = 10;
    const nValue = getFlagValue(args, 'n');
    if (nValue) { const parsed = validateNumberArg(nValue, 'tail', setLines); if (parsed !== null) numLines = parsed; }
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['n', 'f']);
    const file = nonFlagArgs.filter(arg => arg !== nValue)[0] || 'file';
    addLines(setLines, [`==> ${file} <==`, ...SAMPLE_FILE_LINES.tail.slice(-numLines), ...(hasFlags.f ? ['', 'tail: following file...'] : [])]);
}, { category: 'text', usage: 'tail [-n lines] [-f] [file]' });

export const wc: Command = createCommand('wc', 'Word count', (args, { setLines }) => {
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['l', 'w', 'c', 'm']);
    const file = nonFlagArgs[0] || 'file';
    const output = hasFlags.l ? `  10 ${file}` : (hasFlags.w ? `  50 ${file}` : (hasFlags.c || hasFlags.m ? `  300 ${file}` : `  10  50  300 ${file}`));
    addLine(setLines, output);
}, { category: 'text', usage: 'wc [-l|-w|-c] [file]' });

export const diff: Command = createCommand('diff', 'Compare files', (args, { setLines }) => {
    addLine(setLines, args.length < 2 ? 'Usage: diff [file1] [file2]' : `Files ${args[0]} and ${args[1]} are identical (probably) ✓`);
}, { category: 'text', usage: 'diff [file1] [file2]' });


// --- Network ---
export const ping: Command = createCommand('ping', 'Ping a host', (args, { setLines }) => {
    const host = args[0] || 'localhost';
    addLines(setLines, [`PING ${host} (127.0.0.1): 56 data bytes`, `64 bytes from ${host}: icmp_seq = 0 ttl = 64 time = 0.042 ms`, '...']);
}, { category: 'network', usage: 'ping [host]' });

export const curl: Command = createCommand('curl', 'Transfer data from URL', (args, { setLines }) => {
    addLines(setLines, args.length === 0 ? ['Usage: curl [url]'] : [`Fetching ${args[0]}...`, '200 OK - Portfolio loaded successfully!']);
}, { category: 'network', usage: 'curl [url]' });

export const wget: Command = createCommand('wget', 'Download files', (args, { setLines }) => {
    addLines(setLines, args.length === 0 ? ['Usage: wget [url]'] : [`Resolving ${args[0]}... failed: Connection refused.`]);
}, { category: 'network', usage: 'wget [url]' });

export const ssh: Command = createCommand('ssh', 'Connect via SSH', (args, { setLines }) => {
    addLines(setLines, [`ssh: connect to host ${args[0] || 'localhost'} port 22: Connection refused`]);
}, { category: 'network', usage: 'ssh [user@]host' });

// --- Development ---
export const git: Command = createCommand('git', 'Version control', (args, { setLines }) => {
    const subcommand = args[0] || 'status';
    if (subcommand === 'status') addLines(setLines, ['On branch main', 'nothing to commit, working tree clean']);
    else if (subcommand === 'log') addLines(setLines, ['commit 2c91128', 'Author: Adarsh Anand', 'feat: initial commit']);
    else if (subcommand === 'branch') addLines(setLines, ['* main']);
    else if (subcommand === 'diff') addLines(setLines, []);
    else if (subcommand === 'remote') addLines(setLines, ['origin https://github.com/adarshanand67/adarshanand67.github.io.git']);
    else addLine(setLines, `git ${subcommand}: Command not found`);
}, { category: 'dev', usage: 'git [subcommand]' });

export const npm: Command = createCommand('npm', 'Node package manager', (args, { setLines }) => {
    addLine(setLines, `npm ${args[0] || 'help'}`);
}, { category: 'dev', usage: 'npm [command]' });

export const docker: Command = createCommand('docker', 'Container management', (_, { setLines }) => {
    addLine(setLines, 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?');
}, { category: 'dev', usage: 'docker [command]' });

// --- Environment ---
export const env: Command = createCommand('env', 'Display environment', (_, { setLines }) => {
    addLines(setLines, ['USER=adarsh', 'SHELL=/bin/zsh', 'LANG=en_US.UTF-8']);
}, { category: 'environment', usage: 'env' });

export const exportCmd: Command = createCommand('export', 'Set environment variable', (args, { setLines }) => {
    addLine(setLines, args.length === 0 ? 'Usage: export VAR=value' : `export: ${args[0]} - Variable set`);
}, { category: 'environment', usage: 'export VAR=value' });

export const printenv: Command = createCommand('printenv', 'Print environment', (args, { setLines }) => {
    addLine(setLines, args[0] && args[0] !== 'PATH' ? '' : '/usr/local/bin:/usr/bin:/bin');
}, { category: 'environment', usage: 'printenv [variable]' });

export const alias: Command = createCommand('alias', 'Create command alias', (args, { setLines }) => {
    addLines(setLines, args.length === 0 ? ["alias ll='ls -la'"] : [`alias: ${args.join(' ')}`]);
}, { category: 'environment', usage: 'alias [name=value]' });


// --- Math & Fun ---
export const bc: Command = createCommand('bc', 'Calculator', (args, { setLines }) => {
    try {
        if (/^[\d\s+\-*/().]+$/.test(args.join(' '))) addLine(setLines, String(eval(args.join(' '))));
        else addLine(setLines, 'bc: syntax error');
    } catch { addLine(setLines, 'bc: syntax error'); }
}, { category: 'math', usage: 'bc [expression]' });

export const factor: Command = createCommand('factor', 'Prime factorization', (args, { setLines }) => {
    const num = validateNumberArg(args[0], 'factor', setLines);
    if (num !== null) addLine(setLines, `${num}: ${num} (prime factorization not implemented)`);
}, { category: 'math', usage: 'factor [number]' });

export const seq: Command = createCommand('seq', 'Print sequence', (args, { setLines }) => {
    const start = args.length === 1 ? 1 : parseInt(args[0], 10);
    const end = parseInt(args[args.length - 1], 10);
    if (isNaN(start) || isNaN(end)) addLine(setLines, 'seq: invalid number');
    else addLines(setLines, generateRange(start, end, 20));
}, { category: 'math', usage: 'seq [first] [last]' });

export const yes: Command = createCommand('yes', 'Output string repeatedly', (args, { setLines }) => {
    addLines(setLines, [...Array(10).fill(args.join(' ') || 'y'), '... (stopped after 10 lines)']);
}, { category: 'math', usage: 'yes [string]' });

export const banner: Command = createCommand('banner', 'Print banner', (args, { setLines }) => {
    const text = args.join(' ') || 'HI';
    addLines(setLines, ['╔═══════════════════════════╗', `║   ${text.toUpperCase().padEnd(21)}  ║`, '╚═══════════════════════════╝']);
}, { category: 'math', usage: 'banner [text]' });

export const figlet: Command = createCommand('figlet', 'ASCII art text', (args, { setLines }) => {
    const text = args.join(' ') || 'HELLO';
    addLines(setLines, [' _   _  _____ _    ', '| | | || ____| |   ', `(Showing default - input: ${text})`]);
}, { category: 'math', usage: 'figlet [text]' });

export const cal: Command = createCommand('cal', 'Display calendar', (_, { setLines }) => {
    const now = new Date();
    addLines(setLines, [`      ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`, 'Su Mo Tu We Th Fr Sa', ' 1  2  3  4  5  6  7', '...']);
}, { category: 'math', usage: 'cal' });

export const hack: Command = createCommand('hack', 'Initiate hack', (_, { setLines, toggleMatrix }) => {
    addLines(setLines, ['System breach initiated...', 'Access granted.']);
    setTimeout(() => toggleMatrix(), 1000);
}, { category: 'fun', usage: 'hack' });

export const fortune: Command = createCommand('fortune', 'Random quote', (_, { setLines }) => {
    const q = ['Code is easy.', 'Talk is cheap.', 'Keep it simple.'];
    addLine(setLines, `💭 ${q[Math.floor(Math.random() * q.length)]}`);
}, { category: 'fun', usage: 'fortune' });

export const cowsay: Command = createCommand('cowsay', 'Cow says', (args, { setLines }) => {
    addLines(setLines, [` < ${args.join(' ') || 'Moo'} >`, '        \\   ^__^', '         \\  (oo)\\_______']);
}, { category: 'fun', usage: 'cowsay [text]' });

export const matrix: Command = createCommand('matrix', 'Toggle rain', (_, { toggleMatrix }) => {
    toggleMatrix();
}, { category: 'fun', usage: 'matrix' });

export const sudo: Command = createCommand('sudo', 'Superuser do', (args, { setLines }) => {
    addLine(setLines, args.length ? `sudo: ${args[0]}: command not found` : 'usage: sudo [command]');
}, { category: 'fun', usage: 'sudo [command]' });

export const sl: Command = createCommand('sl', 'Steam locomotive', (_, { setLines }) => {
    addLines(setLines, ['    ====        ________                ___________ ', ' _D _|  |_______/        \\__I_I_____===__|_________|']);
}, { category: 'fun', usage: 'sl' });


// --- Hidden (CTF) ---
const DECODED_FLAG = 'flag{Hidden_Terminal_Master}';
export const base64: Command = createCommand('base64', 'Encode/decode base64', (args, { setLines }, input) => {
    const isDecode = args[0] === '-d';
    const text = isDecode ? args.slice(1).join(' ') : args.join(' ');
    const txt = text || (input ? input.trim() : '');
    if (!txt) { addLine(setLines, 'Error: No input'); return; }
    try {
        const res = isDecode ? atob(txt) : btoa(txt);
        addLine(setLines, res);
        if (isDecode && res === DECODED_FLAG) {
            setTimeout(() => addLines(setLines, ['CONGRATULATIONS!', `Flag: ${DECODED_FLAG}`, 'Reward unlocked!']), 100);
        }
    } catch { addLine(setLines, 'Error: Invalid input'); }
}, { category: 'file', usage: 'base64 [-d] <string>' });

export const decode: Command = createCommand('decode', 'Decode alias', (args, context) => {
    base64.execute(['-d', ...args], context);
}, { category: 'file', usage: 'decode <string>' });


// --- Resume ---
export const resume: Command = createCommand('resume', 'Display resume', (_, { setLines }) => {
    addLines(setLines, ['', `📄 ${siteConfig.author.name.toUpperCase()} - RESUME`, '──────────────────────────────────────────────────', 'Software Engineer @ Trellix', 'July 2022 - Present', '']);
}, { category: 'utility', usage: 'resume' });

export const hobbies: Command = createCommand('hobbies', 'Open Hobbies Modal', (_, { setLines }) => {
    useStore.getState().toggleHobbiesModal();
    addLine(setLines, 'Opening hobbies modal...');
}, { category: 'fun', usage: 'hobbies' });


// --- Help ---
export const help: Command = createCommand('help', 'List commands', (_, { setLines }) => {
    addLines(setLines, [
        'Available commands:',
        'Navigation: ls, cd, open, pwd, tree',
        'System: whoami, fetch, uname, uptime, df, top, ps, free, hostname',
        'Utilities: date, clear, echo, cat, grep, find, man, theme, contact, skills',
        'File Ops: mkdir, touch, mv, cp, rm, chmod, chown, ln, tar, zip',
        'Text: head, tail, grep, cat, wc, diff',
        'Env: env, export, printenv, alias',
        'Network: ping, curl, wget, ssh',
        'Dev: git, npm, docker',
        'Math: bc, factor, seq, yes, banner, figlet',
        'Fun: hack, fortune, cowsay, matrix, sudo, sl',
        "Type 'help' for more info."
    ]);
}, { category: 'utility', usage: 'help' });


// --- Registry ---
export const commands: Record<string, Command> = {
    help,
    ls, cd, pwd, tree, open,
    whoami, fetch, neofetch, uname, uptime, df, top, ps, free, hostname, kill,
    cat, mkdir, touch, rm, mv, cp, chmod, chown, ln, tar, zip, unzip, file,
    grep, head, tail, wc, diff,
    date, clear, cls, echo, history, skills, contact, which, whereis, find, man, theme,
    ping, curl, wget, ssh,
    git, npm, docker,
    env, export: exportCmd, printenv, alias,
    bc, factor, seq, yes, banner, figlet, cal,
    hack, fortune, cowsay, matrix, sudo, sl,
    base64, decode,
    resume, hobbies
};

export const getCommandNames = (): string[] => Object.keys(commands);
export const getCommandsByCategory = (category: Command['category']): Command[] => Object.values(commands).filter(cmd => cmd.category === category);
export const commandExists = (name: string): boolean => name in commands;
export const getCommand = (name: string): Command | undefined => commands[name.toLowerCase()];
export const getCategories = (): Array<Command['category']> => Array.from(new Set(Object.values(commands).map(c => c.category!).filter(Boolean)));
