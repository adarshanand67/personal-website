/** Markdown parser - extracts frontmatter from markdown files. */

import { logError } from "@/lib/utils/errorHandling";

/** Parses frontmatter from markdown content. */
export const parseFrontmatter = (content: string) => {
    try {
        // Validate input
        if (!content || typeof content !== "string") {
            logError(new Error("Invalid content provided to parseFrontmatter"), {
                contentType: typeof content,
            });
            return { data: {}, content: "" };
        }

        const match = /---\s*([\s\S]*?)\s*---/.exec(content);

        if (!match) {
            // No frontmatter found, return content as-is
            return { data: {}, content };
        }

        const data: Record<string, string> = {};
        const frontmatterContent = match[1];

        if (frontmatterContent) {
            frontmatterContent.split("\n").forEach((line) => {
                try {
                    const [k, ...v] = line.split(": ");
                    if (k && k.trim()) {
                        data[k.trim()] = v
                            .join(": ")
                            .trim()
                            .replace(/^['"](.*)['"]$/, "$1");
                    }
                } catch (error) {
                    // Skip invalid lines
                    logError(error as Error, { line, function: "parseFrontmatter.line" });
                }
            });
        }

        const contentWithoutFrontmatter = content.replace(/---\s*([\s\S]*?)\s*---/, "").trim();

        return { data, content: contentWithoutFrontmatter };
    } catch (error) {
        logError(error as Error, { function: "parseFrontmatter" });
        return { data: {}, content };
    }
};
