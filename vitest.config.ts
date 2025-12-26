import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./test/setup.ts"],
        globals: true,
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/test/e2e/**",
            "**/.{idea,git,cache,output,temp}/**",
        ],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["node_modules/", "test/setup.ts", "test/e2e/"],
        },
    },
});
