/**
 * @fileoverview Markdown parser - extracts frontmatter from markdown files.
 */

/**
 * Parses frontmatter from markdown content.
 * Extracts YAML frontmatter between --- delimiters and returns data + content.
 *
 * @param {string} content - Raw markdown content with frontmatter
 * @returns {Object} Parsed frontmatter data and remaining content
 * @returns {Record<string, string>} returns.data - Frontmatter key-value pairs
 * @returns {string} returns.content - Markdown content without frontmatter
 *
 * @example
 * ```ts
 * const { data, content } = parseFrontmatter(`---
 * title: My Post
 * date: 2024-01-01
 * ---
 * # Content here`);
 * // data = { title: "My Post", date: "2024-01-01" }
 * // content = "# Content here"
 * ```
 */
export const parseFrontmatter = (content: string) => {
    const match = /---\s*([\s\S]*?)\s*---/.exec(content);
    if (!match) return { data: {}, content };
    const data: Record<string, string> = {};
    match[1]?.split("\n").forEach((line) => {
        const [k, ...v] = line.split(": ");
        if (k)
            data[k.trim()] = v
                .join(": ")
                .trim()
                .replace(/^['"](.*)['"]\$/, "$1");
    });
    return { data, content: content.replace(/---\s*([\s\S]*?)\s*---/, "").trim() };
};
