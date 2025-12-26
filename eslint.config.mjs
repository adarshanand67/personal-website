import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin from "eslint-plugin-sonarjs";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            "@typescript-eslint": tsPlugin,
            prettier: prettierPlugin,
            security: securityPlugin,
            sonarjs: sonarjsPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            ...tsPlugin.configs.recommended.rules,
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            // Security rules
            "security/detect-object-injection": "warn",
            "security/detect-non-literal-regexp": "warn",
            "security/detect-unsafe-regex": "warn",
            // Code quality rules
            "sonarjs/cognitive-complexity": ["warn", 50],
            "sonarjs/no-duplicate-string": "warn",
            "sonarjs/no-identical-functions": "warn",
        },
    },
    prettierConfig,
    {
        ignores: [".next/", "node_modules/", "out/", "build/", "dist/"],
    },
];
