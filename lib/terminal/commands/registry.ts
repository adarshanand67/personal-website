import { Command } from '../types';
import { helpCommand } from './help';
import { navigationCommands } from './navigation';
import { systemCommands } from './system';
import { fileCommands } from './fileOps';
import { utilityCommands } from './utilities';
import { funCommands } from './fun';
import { personalCommands } from './personal';
export const commands: Record<string, Command> = {
    ...helpCommand,
    ...navigationCommands,
    ...systemCommands,
    ...fileCommands,
    ...utilityCommands,
    ...funCommands,
    ...personalCommands,
};
export const getCommandNames = (): string[] => Object.keys(commands);
export const getCommandsByCategory = (category: Command['category']): Command[] =>
    Object.values(commands).filter(cmd => cmd.category === category);
export const commandExists = (name: string): boolean => name in commands;
export const getCommand = (name: string): Command | undefined => commands[name.toLowerCase()];
export const getCategories = (): Array<Command['category']> => {
    const categories = new Set<Command['category']>();
    Object.values(commands).forEach(cmd => {
        if (cmd.category) categories.add(cmd.category);
    });
    return Array.from(categories);
};
