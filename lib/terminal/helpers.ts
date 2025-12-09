import {
    Command,
    CommandFn,
    CommandArgs,
    CommandContext,
    FlagParseResult,
    NumberValidationResult,
    FilePermissions
} from './types';

/**
 * Creates a command object with the given properties
 */
export const createCommand = (
    name: string,
    description: string,
    execute: CommandFn,
    options?: {
        category?: Command['category'];
        aliases?: readonly string[];
        usage?: string;
        examples?: readonly string[];
    }
): Command => ({
    name,
    description,
    execute,
    ...options,
} as const);

/**
 * Creates an alias command that points to another command
 */
export const createAliasCommand = (
    name: string,
    description: string,
    targetCommandGetter: () => Command
): Command => ({
    name,
    description,
    execute: (args: CommandArgs, ctx: CommandContext): void => {
        targetCommandGetter().execute(args, ctx);
    },
} as const);

/**
 * Parses command line flags and separates them from arguments
 */
export const parseFlags = (
    args: CommandArgs,
    flags: readonly string[]
): FlagParseResult => {
    const hasFlags: Record<string, boolean> = {};

    flags.forEach((flag: string) => {
        hasFlags[flag] = args.some((arg: string) =>
            arg === `-${flag}` || arg === `--${flag}` || arg === flag
        );
    });

    const nonFlagArgs = args.filter((arg: string) => !arg.startsWith('-'));

    return { hasFlags, nonFlagArgs } as const;
};

/**
 * Finds a flag value (e.g., -n 10 returns "10")
 */
export const getFlagValue = (args: CommandArgs, flag: string): string | null => {
    const index = args.findIndex((arg: string) => arg === `-${flag}` || arg === `--${flag}`);
    if (index !== -1 && args[index + 1] && !args[index + 1].startsWith('-')) {
        return args[index + 1];
    }
    return null;
};

/**
 * Adds multiple lines to the terminal output
 */
export const addLines = (
    setLines: CommandContext['setLines'],
    newLines: readonly string[]
): void => {
    setLines((prev: readonly string[]) => [...prev, ...newLines]);
};

/**
 * Adds a single line to the terminal output
 */
export const addLine = (
    setLines: CommandContext['setLines'],
    line: string
): void => {
    setLines((prev: readonly string[]) => [...prev, line]);
};

/**
 * Shows a usage message
 */
export const showUsage = (
    setLines: CommandContext['setLines'],
    usage: string
): void => {
    addLine(setLines, `usage: ${usage}`);
};

/**
 * Shows an error message
 */
export const showError = (
    setLines: CommandContext['setLines'],
    message: string
): void => {
    addLine(setLines, message);
};

/**
 * Shows a permission denied error
 */
export const showPermissionDenied = (
    setLines: CommandContext['setLines'],
    operation: string,
    file?: string
): void => {
    const msg: string = file
        ? `${operation}: cannot ${operation} '${file}': Permission denied`
        : `${operation}: Operation not permitted`;
    addLine(setLines, msg);
};

/**
 * Shows a file not found error
 */
export const showFileNotFound = (
    setLines: CommandContext['setLines'],
    command: string,
    file: string
): void => {
    addLine(setLines, `${command}: ${file}: No such file or directory`);
};

/**
 * Validates and parses a number argument
 */
export const validateNumberArg = (
    arg: string,
    commandName: string,
    setLines: CommandContext['setLines']
): NumberValidationResult => {
    const num: number = parseInt(arg, 10);
    if (isNaN(num)) {
        showError(setLines, `${commandName}: invalid number`);
        return null;
    }
    return num;
};

/**
 * Validates that minimum arguments are provided
 */
export const validateMinArgs = (
    args: CommandArgs,
    minArgs: number,
    setLines: CommandContext['setLines'],
    usage: string
): boolean => {
    if (args.length < minArgs) {
        showUsage(setLines, usage);
        return false;
    }
    return true;
};

/**
 * Formats file listing in long format
 */
export const formatLongListing = (
    name: string,
    isDirectory: boolean,
    size: number = 4096,
    date: string = 'Dec  9 22:30'
): string => {
    const permissions: FilePermissions = isDirectory ? 'drwxr-xr-x' : '-rw-r--r--';
    const displayName: string = isDirectory ? `${name}/` : name;
    return `${permissions}  2 adarsh adarsh ${size.toString().padStart(4)} ${date} ${displayName}`;
};

/**
 * Truncates output if it exceeds a maximum length
 */
export const truncateOutput = (
    items: readonly string[],
    maxItems: number,
    truncateMessage: string = '... (truncated)'
): readonly string[] => {
    if (items.length > maxItems) {
        return [...items.slice(0, maxItems), truncateMessage] as const;
    }
    return items;
};

/**
 * Generates a range of numbers
 */
export const generateRange = (
    start: number,
    end: number,
    maxItems: number = 20
): readonly string[] => {
    const nums: string[] = [];
    const actualEnd: number = Math.min(end, start + maxItems);

    for (let i = start; i <= actualEnd; i++) {
        nums.push(String(i));
    }

    if (end > actualEnd) {
        nums.push('... (truncated)');
    }

    return nums;
};
