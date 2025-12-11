/**
 * Terminal Commands Index
 * 
 * This file aggregates all terminal commands from categorized modules
 * and exports them as a single commands object.
 */

import { Command } from '../types';
import { helpCommand } from './help';
import { navigationCommands } from './navigation';
import { systemCommands } from './system';
import { fileCommands } from './fileOps';
import { textCommands } from './textProcessing';
import { utilityCommands } from './utilities';
import { networkCommands } from './network';
import { developmentCommands } from './development';
import { environmentCommands } from './environment';
import { mathCommands } from './math';
import { funCommands } from './fun';
import { ctfCommands } from './ctf';
import { personalCommands } from './personal';

/**
 * All available terminal commands
 * Organized by category for better maintainability
 */
export const commands: Record<string, Command> = {
    // Help
    ...helpCommand,

    // Navigation
    ...navigationCommands,

    // System Information
    ...systemCommands,

    // File Operations
    ...fileCommands,

    // Text Processing
    ...textCommands,

    // Utilities
    ...utilityCommands,

    // Network
    ...networkCommands,

    // Development
    ...developmentCommands,

    // Environment
    ...environmentCommands,

    // Math & Sequences
    ...mathCommands,

    // Fun & Interactive
    ...funCommands,

    // CTF Challenge (Hidden)
    ...ctfCommands,

    // Personal Branding
    ...personalCommands,
};

/**
 * Get all command names
 */
export const getCommandNames = (): string[] => {
    return Object.keys(commands);
};

/**
 * Get commands by category
 */
export const getCommandsByCategory = (category: Command['category']): Command[] => {
    return Object.values(commands).filter(cmd => cmd.category === category);
};

/**
 * Check if a command exists
 */
export const commandExists = (name: string): boolean => {
    return name in commands;
};

/**
 * Get command by name (case-insensitive)
 */
export const getCommand = (name: string): Command | undefined => {
    const normalizedName = name.toLowerCase();
    return commands[normalizedName];
};

/**
 * Get all categories
 */
export const getCategories = (): Array<Command['category']> => {
    const categories = new Set<Command['category']>();
    Object.values(commands).forEach(cmd => {
        if (cmd.category) {
            categories.add(cmd.category);
        }
    });
    return Array.from(categories);
};
