import { createCommand, addLines, addLine } from "./helpers";
import { Command } from "./types";

export const sudo: Command = createCommand(
    "sudo",
    "Execute as superuser",
    (args, { setLines }) => {
        const password = args[0];
        if (password === "ANTIGRAVITY") {
            setTimeout(() => {
                addLines(setLines, [
                    "\x1b[32m[ACCESS GRANTED]\x1b[0m",
                    "Root privileges escalated successfully.",
                    "You are now the master of this universe.",
                    "",
                    "Try: cat .root_flag",
                ]);
            }, 800);
        } else {
            setTimeout(() => {
                addLines(setLines, [
                    "sudo: effective uid is not 0, is /usr/bin/sudo on a file system with the 'nosuid' option set or an NFS file system without root privileges?",
                    "Just kidding. You have no power here.",
                ]);
            }, 500);
        }
    },
    { category: "utility", usage: "sudo [password]" }
);

export const rm: Command = createCommand(
    "rm",
    "Remove files",
    (args, { setLines }) => {
        if (args.includes("/")) {
            setTimeout(() => {
                setLines([]);
                setTimeout(() => {
                    addLine(setLines, "Kernel panic - not syncing: Fatal exception in interrupt");
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }, 1000);
            }, 500);
        } else {
            addLine(setLines, "rm: Permission denied. Try asking nicer.");
        }
    },
    { category: "utility", usage: "rm [file]" }
);

export const todo: Command = createCommand(
    "todo",
    "Simple todo list manager",
    (args, { setLines, todos, addTodo, toggleTodo, removeTodo, clearTodos }) => {
        const sub = args[0]?.toLowerCase();
        if (!sub || sub === "ls" || sub === "list") {
            if (todos.length === 0) {
                addLine(setLines, "Todo list is empty. Use: todo add [task]");
            } else {
                addLines(setLines, [
                    "Todo List:",
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    ...todos.map(
                        (t, i) => `${i + 1}. [${t.completed ? "x" : " "}] ${t.text} (${t.id})`
                    ),
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                ]);
            }
        } else if (sub === "add") {
            const text = args.slice(1).join(" ");
            if (!text) addLine(setLines, "Usage: todo add [task text]");
            else {
                addTodo(text);
                addLine(setLines, `Added: ${text}`);
            }
        } else if (sub === "done" || sub === "toggle") {
            const id = args[1];
            if (!id) addLine(setLines, "Usage: todo done [id]");
            else {
                toggleTodo(id);
                addLine(setLines, `Toggled todo: ${id}`);
            }
        } else if (sub === "rm" || sub === "remove") {
            const id = args[1];
            if (!id) addLine(setLines, "Usage: todo rm [id]");
            else {
                removeTodo(id);
                addLine(setLines, `Removed todo: ${id}`);
            }
        } else if (sub === "clear") {
            clearTodos();
            addLine(setLines, "Cleared all todos.");
        } else {
            addLine(setLines, "Usage: todo [list|add|done|rm|clear]");
        }
    },
    { category: "utility", usage: "todo [ls|add|done|rm|clear]" }
);
