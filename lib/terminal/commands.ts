import { Command } from "./commands/types";
import { clear, help, theme } from "./commands/core";
import { ls, cd, pwd, open } from "./commands/navigation";
import { whoami, cat, skills, contact, github, neofetch } from "./commands/info";
import { quote, joke, echo, haiku, history, calc, uptime, fortune } from "./commands/utils";
import { sudo, rm, todo } from "./commands/system";
import {
    date,
    uname,
    top,
    curl,
    matrix,
    man,
    exit,
    banner,
    cowsay,
    df,
    free,
    who,
    id,
    ping,
    tree,
    welcome,
} from "./commands/emulator";
import { createAliasCommand } from "./commands/helpers";

export * from "./commands/types";
export * from "./commands/helpers";
export * from "./commands/core";
export * from "./commands/navigation";
export * from "./commands/info";
export * from "./commands/utils";
export * from "./commands/system";
export * from "./commands/emulator";

export const cls: Command = createAliasCommand("cls", "Clear screen (alias)", () => clear);

export const commands: Record<string, Command> = {
    clear,
    help,
    skills,
    contact,
    theme,
    ls,
    cd,
    pwd,
    whoami,
    cat,
    sudo,
    rm,
    open,
    neofetch,
    github,
    haiku,
    history,
    calc,
    uptime,
    fortune,
    todo,
    joke,
    quote,
    echo,
    cls,
    date,
    uname,
    top,
    curl,
    matrix,
    man,
    exit,
    banner,
    cowsay,
    df,
    free,
    who,
    id,
    ping,
    tree,
    welcome,
};
