# Terminal Commands System

## Overview

The terminal commands system has been completely refactored into a modular, type-safe architecture. This document provides a comprehensive guide to the new structure.

## Architecture

### Directory Structure

```
lib/terminal/
├── commands/              # Command implementations by category
│   ├── index.ts          # Main export aggregating all commands
│   ├── help.ts           # Help command
│   ├── navigation.ts     # ls, cd, pwd, tree, open
│   ├── system.ts         # whoami, fetch, uname, uptime, df, top, ps, free, hostname
│   ├── fileOps.ts        # cat, mkdir, touch, rm, mv, cp, chmod, chown, ln, tar, zip
│   ├── textProcessing.ts # grep, head, tail, wc, diff
│   ├── utilities.ts      # date, clear, echo, history, skills, contact, which, find, man
│   ├── network.ts        # ping, curl, wget, ssh
│   ├── development.ts    # git, npm, docker
│   ├── environment.ts    # env, export, printenv, alias
│   ├── math.ts           # bc, factor, seq, yes, banner, figlet, cal
│   └── fun.ts            # hack, fortune, cowsay, exit, reboot, shutdown, theme, sudo, matrix, music
├── commands.ts           # Re-exports from commands/index.ts
├── types.ts              # Comprehensive type definitions
├── helpers.ts            # Utility functions for command creation
└── mockFileSystem.ts     # Mock file system data

```

## Type System

### Core Types

#### Command
```typescript
interface Command {
  readonly name: string;
  readonly description: string;
  readonly category?: CommandCategory;
  readonly aliases?: readonly string[];
  readonly usage?: string;
  readonly examples?: readonly string[];
  readonly execute: CommandFn;
}
```

#### CommandContext
```typescript
interface CommandContext {
  setLines: Dispatch<SetStateAction<string[]>>;
  setPasswordMode: (mode: boolean) => void;
  router: RouterInstance;
  setTheme: (theme: ThemeMode) => void;
  isMatrixEnabled: boolean;
  toggleMatrix: () => void;
  setIsPlaying: (playing: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleMute: () => void;
  setInput: (input: string) => void;
  commandHistory: readonly string[];
}
```

### Command Categories

- `navigation` - File system navigation
- `system` - System information
- `file` - File operations
- `text` - Text processing
- `network` - Network utilities
- `dev` - Development tools
- `fun` - Fun/interactive commands
- `utility` - General utilities
- `environment` - Environment variables
- `math` - Math and sequences

## Helper Functions

### Command Creation

```typescript
// Create a standard command
const myCommand = createCommand(
  'mycommand',
  'Description of command',
  (args, ctx) => {
    // Implementation
  },
  {
    category: 'utility',
    usage: 'mycommand [options]',
    examples: ['mycommand --help']
  }
);

// Create an alias
const alias = createAliasCommand(
  'mc',
  'Alias for mycommand',
  () => myCommand
);
```

### Argument Parsing

```typescript
// Parse flags
const { hasFlags, nonFlagArgs } = parseFlags(args, ['l', 'a', 'verbose']);

// Get flag value
const limit = getFlagValue(args, 'n'); // For -n 10

// Validate number
const num = validateNumberArg(args[0], 'mycommand', setLines);
```

### Output Functions

```typescript
// Add single line
addLine(setLines, 'Hello World');

// Add multiple lines
addLines(setLines, ['Line 1', 'Line 2', 'Line 3']);

// Show usage
showUsage(setLines, 'mycommand [options]');

// Show error
showError(setLines, 'Something went wrong');

// Show permission denied
showPermissionDenied(setLines, 'chmod', 'file.txt');

// Show file not found
showFileNotFound(setLines, 'cat', 'missing.txt');
```

## Adding New Commands

### Step 1: Choose Category

Determine which category file your command belongs to (or create a new one).

### Step 2: Implement Command

```typescript
// In lib/terminal/commands/utilities.ts

export const myNewCommand: Command = createCommand(
  'mynew',
  'Does something awesome',
  (args, { setLines }) => {
    // Validate arguments
    if (args.length === 0) {
      showUsage(setLines, 'mynew [argument]');
      return;
    }

    // Parse flags
    const { hasFlags, nonFlagArgs } = parseFlags(args, ['v', 'verbose']);

    // Execute logic
    const output = hasFlags.v 
      ? 'Verbose output'
      : 'Normal output';

    addLine(setLines, output);
  },
  {
    category: 'utility',
    usage: 'mynew [-v] [argument]',
    examples: [
      'mynew hello       # Basic usage',
      'mynew -v hello    # Verbose mode'
    ]
  }
);
```

### Step 3: Export Command

```typescript
// At the bottom of the category file
export const utilityCommands = {
  // ... existing commands
  myNewCommand
};
```

### Step 4: Update Help Text

Update `lib/terminal/commands/help.ts` to include your new command in the appropriate category.

## Mock File System

The mock file system provides realistic file data for commands like `cat`, `ls`, etc.

### Adding Files

```typescript
// In lib/terminal/mockFileSystem.ts

export const MOCK_FILES: Record<string, MockFile> = {
  'myfile.txt': {
    type: 'file',
    size: 512,
    permissions: '-rw-r--r--',
    owner: 'adarsh',
    group: 'adarsh',
    modified: 'Dec  9 22:30',
    content: [
      'Line 1 of content',
      'Line 2 of content'
    ]
  },
  // ... other files
};
```

## Best Practices

### 1. Type Safety
- Always use proper types from `types.ts`
- Avoid `any` types
- Use readonly arrays where appropriate

### 2. Error Handling
- Validate arguments before processing
- Use helper functions for consistent error messages
- Provide helpful usage information

### 3. Code Organization
- Keep commands in appropriate category files
- Extract common logic to helpers
- Use the mock file system for file operations

### 4. Documentation
- Add JSDoc comments to functions
- Provide usage and examples in command definitions
- Update this README when adding major features

### 5. Testing
- Test commands with various argument combinations
- Verify error handling
- Check edge cases

## Command Utilities

### Available Utilities

```typescript
// From commands/index.ts

getCommandNames(): string[]
// Returns all command names

getCommandsByCategory(category: CommandCategory): Command[]
// Returns commands in a specific category

commandExists(name: string): boolean
// Checks if a command exists

getCommand(name: string): Command | undefined
// Gets a command by name (case-insensitive)

getCategories(): Array<CommandCategory>
// Returns all unique categories
```

## Migration Notes

### From Old Structure

The old `commands.ts` file (1260 lines) has been split into:
- 12 category files (~100-300 lines each)
- 1 types file (comprehensive type definitions)
- 1 helpers file (utility functions)
- 1 mock file system file (data)

### Breaking Changes

None! The public API remains the same:
```typescript
import { commands } from '@/lib/terminal/commands';
```

### Benefits

1. **Better Organization** - Commands grouped by category
2. **Type Safety** - Comprehensive type system
3. **Reusability** - Shared helper functions
4. **Maintainability** - Smaller, focused files
5. **Testability** - Easier to test individual commands
6. **Documentation** - Clear structure and examples

## Performance Considerations

- Commands are loaded on-demand (tree-shaking friendly)
- Mock file system is lightweight
- No runtime overhead from modular structure

## Future Enhancements

- [ ] Add command completion hints
- [ ] Implement command piping (|)
- [ ] Add command history persistence
- [ ] Create command plugins system
- [ ] Add internationalization support
- [ ] Implement command aliases configuration

## Contributing

When adding new commands:
1. Follow the existing patterns
2. Use helper functions
3. Add proper types
4. Include usage and examples
5. Update help text
6. Test thoroughly

## License

Part of the personal portfolio project.
