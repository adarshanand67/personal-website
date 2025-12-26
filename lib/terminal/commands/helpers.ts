import { Dispatch, SetStateAction } from "react";
import { Command, CommandFn, CommandCategory } from "./types";

export const addLine = (setLines: Dispatch<SetStateAction<string[]>>, line: string) => {
    setLines((prev) => [...prev, line]);
};

export const addLines = (setLines: Dispatch<SetStateAction<string[]>>, lines: string[]) => {
    setLines((prev) => [...prev, ...lines]);
};

export const createCommand = (
    name: string,
    description: string,
    execute: CommandFn,
    options?: { category?: CommandCategory; usage?: string }
): Command => ({
    name,
    description,
    execute,
    category: options?.category,
    usage: options?.usage || name,
});

export const createAliasCommand = (
    name: string,
    description: string,
    getTarget: () => Command
): Command => ({
    name,
    description,
    execute: (args, context) => getTarget().execute(args, context),
    category: "utility",
    usage: name,
});
