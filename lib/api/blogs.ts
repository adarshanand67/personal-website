/**
 * @fileoverview Blogs API - functions for reading and parsing blog posts.
 * Handles markdown file reading, frontmatter parsing, and blog listing.
 */

import { promises as fs } from "fs";
import path from "path";
import { parseFrontmatter } from "./markdown";

/**
 * Fetches all blog posts from the data/blogs directory.
 * Reads markdown files, parses frontmatter, and sorts by date (newest first).
 * @returns {Promise<Array>} Array of blog post metadata
 */
export async function getBlogs() {
    try {
        const dir = path.join(process.cwd(), "data", "blogs");
        const files = await fs.readdir(dir).catch(() => []);
        const blogs = await Promise.all(
            files
                .filter((f) => f.endsWith(".md"))
                .map(async (f) => {
                    const { data } = parseFrontmatter(await fs.readFile(path.join(dir, f), "utf8"));
                    return {
                        id: f,
                        slug: f.replace(/\.md$/, ""),
                        title: data.title || f.replace(/\.md$/, ""),
                        date: data.date
                            ? new Date(data.date).toISOString().split("T")[0]
                            : "2024-01-01",
                        excerpt: data.excerpt || "",
                    };
                })
        );
        return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
        return [];
    }
}

/**
 * Fetches a single blog post content by slug.
 * @param {string} slug - Blog post slug (filename without .md extension)
 * @returns {Promise<string|null>} Blog post markdown content or null if not found
 */
export async function getPost(slug: string) {
    try {
        const { content } = parseFrontmatter(
            await fs.readFile(path.join(process.cwd(), "data", "blogs", `${slug}.md`), "utf8")
        );
        return content;
    } catch {
        return null;
    }
}
