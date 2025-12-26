import { createCommand, addLines, addLine } from "./helpers";
import { Command } from "./types";

export const quote: Command = createCommand(
    "quote",
    "Get a daily tech quote",
    async (_, { setLines }) => {
        try {
            const res = await fetch("https://api.quotable.io/random?tags=technology,famous-quotes");
            if (!res.ok) throw new Error();
            const data = await res.json();
            addLines(setLines, ["", `"${data.content}"`, `— ${data.author}`, ""]);
        } catch {
            addLines(setLines, [
                "",
                '"The best way to predict the future is to invent it."',
                "— Alan Kay",
                "",
            ]);
        }
    },
    { category: "utility", usage: "quote" }
);

export const joke: Command = createCommand(
    "joke",
    "Random programmer joke",
    async (_, { setLines }) => {
        try {
            const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
            const data = await res.json();
            addLines(setLines, [
                "",
                data.joke || "Why did the programmer quit his job? Because he didn't get arrays.",
                "",
            ]);
        } catch {
            addLine(setLines, "Why do programmers prefer dark mode? Because light attracts bugs.");
        }
    },
    { category: "utility", usage: "joke" }
);

export const echo: Command = createCommand(
    "echo",
    "Print text",
    (args, { setLines }) => {
        addLine(setLines, args.join(" "));
    },
    { category: "utility", usage: "echo [text]" }
);

export const haiku: Command = createCommand(
    "haiku",
    "Generate a tech haiku",
    (_, { setLines }) => {
        const haikus = [
            ["Code flows like a stream,", "Bugs hide in the shadows deep,", "Logic finds the way."],
            [
                "Screens glow in the night,",
                "Coffee turns to lines of light,",
                "Sleeping can wait now.",
            ],
            ["Zeroes and ones dance,", "Building worlds with just a thought,", "Silicon dreaming."],
            ["Infinite feedback,", "Stack overflow saves the day,", "Deploy is success."],
        ];
        const pick = haikus[Math.floor(Math.random() * haikus.length)];
        addLines(setLines, ["", ...pick, ""]);
    },
    { category: "utility", usage: "haiku" }
);

export const history: Command = createCommand(
    "history",
    "Show command history",
    (_, { setLines, history }) => {
        if (history.length === 0) {
            addLine(setLines, "No history found.");
            return;
        }
        addLines(
            setLines,
            [...history]
                .slice(0)
                .reverse()
                .map((cmd, i) => `${i + 1}  ${cmd}`)
        );
    },
    { category: "utility", usage: "history" }
);

export const calc: Command = createCommand(
    "calc",
    "Evaluate math expression",
    (args, { setLines }) => {
        const expr = args.join(" ");
        if (!expr) {
            addLine(setLines, "Usage: calc [expression]");
            return;
        }
        try {
            if (/[^0-9+\-*/().\s]/.test(expr)) throw new Error("Invalid characters");
            const result = new Function(`return ${expr}`)();
            addLine(setLines, `${expr} = ${result}`);
        } catch {
            addLine(setLines, "Error: Invalid expression");
        }
    },
    { category: "utility", usage: "calc [expression]" }
);

export const uptime: Command = createCommand(
    "uptime",
    "Show system uptime",
    (_, { setLines }) => {
        const startTime =
            (globalThis as unknown as { _terminalStartTime: number })._terminalStartTime ||
            Date.now();
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(diff / 60);
        const secs = diff % 60;
        addLine(setLines, `up ${mins} min, ${secs} sec`);
    },
    { category: "utility", usage: "uptime" }
);

export const fortune: Command = createCommand(
    "fortune",
    "Your daily tech fortune",
    (_, { setLines }) => {
        const fortunes = [
            "A bug you found today will be fixed by a library update tomorrow.",
            "Your code will compile on the first try (in a parallel universe).",
            "Coffee is the input, code is the output.",
            "A project manager will change the requirements mid-sprint.",
            "You will find the answer on Stack Overflow, but it will be for a different language.",
            "A legacy codebase will whisper your name tonight.",
            "Your PR will be approved with zero comments.",
            "A dangling pointer will point you towards your destiny.",
            "The documentation you seek does not exist. Be the change.",
        ];
        addLine(setLines, fortunes[Math.floor(Math.random() * fortunes.length)]!);
    },
    { category: "utility", usage: "fortune" }
);
