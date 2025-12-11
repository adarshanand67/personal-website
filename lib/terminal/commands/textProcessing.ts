import { Command } from '../types';
import { createCommand, addLine, addLines, showUsage, parseFlags, getFlagValue, validateNumberArg } from '../helpers';
import { SAMPLE_TEXT_CONTENT, SAMPLE_FILE_LINES } from '../mockFileSystem';

/**
 * Text processing commands: grep, head, tail, wc, diff
 */

export const grep: Command = createCommand(
    'grep',
    'Search for patterns',
    (args, { setLines }, input) => {
        if (args.length < 1) { // Changed to 1 because pattern is required, file is optional (stdin)
            showUsage(setLines, 'grep [options] pattern [file]');
            return;
        }

        const { hasFlags, nonFlagArgs } = parseFlags(args, ['i', 'n', 'v', 'r']);
        const caseInsensitive = hasFlags.i;
        const showLineNumbers = hasFlags.n;
        const invertMatch = hasFlags.v;

        const pattern = nonFlagArgs[0];
        const fileName = nonFlagArgs[1];

        // Determine content source
        let linesToSearch = SAMPLE_TEXT_CONTENT; // Default fallback
        let sourceName = 'stdin';

        if (input && !fileName) {
            linesToSearch = input.split('\n');
            sourceName = 'stdin';
        } else if (fileName) {
            // Since we can't easily import getFileContent here without modifying imports (and potentially causing cycles if not careful),
            // we will stick to SAMPLE_TEXT_CONTENT if file not found, OR simpler: just support input vs sample.
            // But wait, getFileContent is in mockFileSystem.ts, safe to import.
            // I'll skip importing getFileContent to avoid breaking import list if replace_file_content is partial.
            // Wait, I can see line 3 imports from '../mockFileSystem'.
            // I'll stick to 'stdin' support which is the goal.
            sourceName = fileName;
        }

        const regex = new RegExp(pattern, caseInsensitive ? 'i' : '');
        const matches: string[] = [];

        linesToSearch.forEach((line, index) => {
            const isMatch = regex.test(line);
            if ((isMatch && !invertMatch) || (!isMatch && invertMatch)) {
                if (showLineNumbers) {
                    matches.push(`${index + 1}:${line}`);
                } else {
                    matches.push(line);
                }
            }
        });

        if (matches.length > 0) {
            addLines(setLines, matches);
        } else {
            // Only show 'no matches' if we explicitly searched something specific, usually grep is silent on no match in scripts, but for user feedback it's okay.
            if (!input) addLine(setLines, `grep: no matches found for '${pattern}'`);
        }
    },
    {
        category: 'text',
        usage: 'grep [options] pattern [file]',
        examples: [
            'grep terminal file.txt      # Search for "terminal"',
            'grep -i TERMINAL file.txt   # Case-insensitive search',
            'grep -n terminal file.txt   # Show line numbers'
        ]
    }
);

export const head: Command = createCommand(
    'head',
    'Output first part of files',
    (args, { setLines }) => {
        let numLines = 10;
        const nValue = getFlagValue(args, 'n');

        if (nValue) {
            const parsed = validateNumberArg(nValue, 'head', setLines);
            if (parsed !== null) {
                numLines = parsed;
            }
        }

        const { nonFlagArgs } = parseFlags(args, ['n']);
        const file = nonFlagArgs.filter(arg => arg !== nValue)[0] || 'file';

        const output = [
            `==> ${file} <==`,
            ...SAMPLE_FILE_LINES.head.slice(0, numLines)
        ];

        addLines(setLines, output);
    },
    {
        category: 'text',
        usage: 'head [-n lines] [file]',
        examples: [
            'head file.txt       # First 10 lines',
            'head -n 5 file.txt  # First 5 lines'
        ]
    }
);

export const tail: Command = createCommand(
    'tail',
    'Output last part of files',
    (args, { setLines }) => {
        let numLines = 10;
        const nValue = getFlagValue(args, 'n');

        if (nValue) {
            const parsed = validateNumberArg(nValue, 'tail', setLines);
            if (parsed !== null) {
                numLines = parsed;
            }
        }

        const { hasFlags, nonFlagArgs } = parseFlags(args, ['n', 'f']);
        const follow = hasFlags.f;
        const file = nonFlagArgs.filter(arg => arg !== nValue)[0] || 'file';

        const output = [
            `==> ${file} <==`,
            ...SAMPLE_FILE_LINES.tail.slice(-numLines),
            ...(follow ? ['', 'tail: following file (press Ctrl+C to stop... just kidding!)'] : [])
        ];

        addLines(setLines, output);
    },
    {
        category: 'text',
        usage: 'tail [-n lines] [-f] [file]',
        examples: [
            'tail file.txt       # Last 10 lines',
            'tail -n 5 file.txt  # Last 5 lines',
            'tail -f file.txt    # Follow file'
        ]
    }
);

export const wc: Command = createCommand(
    'wc',
    'Word count',
    (args, { setLines }) => {
        const { hasFlags, nonFlagArgs } = parseFlags(args, ['l', 'w', 'c', 'm']);
        const linesOnly = hasFlags.l;
        const wordsOnly = hasFlags.w;
        const charsOnly = hasFlags.c || hasFlags.m;

        const file = nonFlagArgs[0] || 'file';

        const lineCount = 42;
        const wordCount = 256;
        const charCount = 1337;

        let output = '';
        if (linesOnly) {
            output = `  ${lineCount} ${file}`;
        } else if (wordsOnly) {
            output = `  ${wordCount} ${file}`;
        } else if (charsOnly) {
            output = `  ${charCount} ${file}`;
        } else {
            output = `  ${lineCount}  ${wordCount}  ${charCount} ${file}`;
        }

        addLine(setLines, output);
    },
    {
        category: 'text',
        usage: 'wc [-l|-w|-c] [file]',
        examples: [
            'wc file.txt     # Lines, words, chars',
            'wc -l file.txt  # Count lines only',
            'wc -w file.txt  # Count words only'
        ]
    }
);

export const diff: Command = createCommand(
    'diff',
    'Compare files',
    (args, { setLines }) => {
        if (args.length < 2) {
            showUsage(setLines, 'diff [file1] [file2]');
        } else {
            addLine(setLines, `Files ${args[0]} and ${args[1]} are identical (probably) ✓`);
        }
    },
    {
        category: 'text',
        usage: 'diff [file1] [file2]'
    }
);

export const textCommands = {
    grep,
    head,
    tail,
    wc,
    diff
};
