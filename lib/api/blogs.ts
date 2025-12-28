/** Blogs API - functions for reading and parsing blog posts. */

import { promises as fs } from "fs";
import path from "path";
import { parseFrontmatter } from "./markdown";
import { logError, AppError, safeAsync } from "@/lib/utils/errorHandling";

/** Fetches all blog posts from the data/blogs directory. */
export async function getBlogs() {
    try {
        const dir = path.join(process.cwd(), "data", "blogs");

        // Check if directory exists
        const [dirExists, dirError] = await safeAsync(fs.access(dir));
        if (dirError) {
            logError(new AppError("Blogs directory not found", "BLOGS_DIR_NOT_FOUND"), { dir });
            return [];
        }

        // Read directory
        const [files, readError] = await safeAsync(fs.readdir(dir));
        if (readError || !files) {
            logError(readError || new Error("Failed to read blogs directory"), { dir });
            return [];
        }

        // Filter and process markdown files
        const markdownFiles = files.filter((f) => f && typeof f === "string" && f.endsWith(".md"));

        if (markdownFiles.length === 0) {
            console.warn("No markdown files found in blogs directory");
            return [];
        }

        const blogs = await Promise.all(
            markdownFiles.map(async (f) => {
                try {
                    const filePath = path.join(dir, f);
                    const [fileContent, fileError] = await safeAsync(fs.readFile(filePath, "utf8"));

                    if (fileError || !fileContent) {
                        logError(fileError || new Error("Empty file content"), { file: f });
                        return null;
                    }

                    const { data } = parseFrontmatter(fileContent);

                    return {
                        id: f,
                        slug: f.replace(/\.md$/, ""),
                        title: data.title || f.replace(/\.md$/, ""),
                        date: data.date
                            ? new Date(data.date).toISOString().split("T")[0]
                            : "2024-01-01",
                        excerpt: data.excerpt || "",
                    };
                } catch (error) {
                    logError(error as Error, { file: f, function: "getBlogs.map" });
                    return null;
                }
            })
        );

        // Filter out null values and sort
        const validBlogs = blogs.filter((blog) => blog !== null);

        return validBlogs.sort((a, b) => {
            try {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } catch (error) {
                logError(error as Error, { function: "getBlogs.sort" });
                return 0;
            }
        });
    } catch (error) {
        logError(error as Error, { function: "getBlogs" });
        return [];
    }
}

/** Fetches a single blog post content by slug. */
export async function getPost(slug: string) {
    try {
        // Validate slug
        if (!slug || typeof slug !== "string") {
            throw new AppError("Invalid slug provided", "INVALID_SLUG");
        }

        // Sanitize slug to prevent path traversal
        const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
        if (sanitizedSlug !== slug) {
            logError(new AppError("Slug contains invalid characters", "INVALID_SLUG_CHARS"), {
                slug,
            });
            return null;
        }

        const filePath = path.join(process.cwd(), "data", "blogs", `${sanitizedSlug}.md`);

        // Read file
        const [fileContent, fileError] = await safeAsync(fs.readFile(filePath, "utf8"));

        if (fileError) {
            logError(fileError, { slug: sanitizedSlug, filePath });
            return null;
        }

        if (!fileContent) {
            logError(new AppError("Empty file content", "EMPTY_FILE"), { slug: sanitizedSlug });
            return null;
        }

        const { content } = parseFrontmatter(fileContent);

        if (!content) {
            logError(new AppError("No content after parsing frontmatter", "NO_CONTENT"), {
                slug: sanitizedSlug,
            });
            return null;
        }

        return content;
    } catch (error) {
        logError(error as Error, { function: "getPost", slug });
        return null;
    }
}
