import { promises as fs } from "fs";
import path from "path";
// Shared Types
import profileData from "@/data/profile.json";
import experiencesData from "@/data/experiences.json";
import papersData from "@/data/papers.json";
import booksData from "@/data/books.json";
import entertainmentData from "@/data/entertainment.json";
import hobbiesData from "@/data/hobbies.json";
// projectsData import removed
import usesData from "@/data/uses.json";

// Shared Types
import type { EntertainmentItem } from "@/types";
import { parseEntertainmentType, parseWatchStatus } from "@/lib/type-guards";

// Wrapper to match existing async API
export async function getProfile() {
  return profileData;
}

export async function getExperiences() {
  return experiencesData;
}

export async function getPapers() {
  return papersData;
}

export async function getBooks() {
  return booksData;
}

export async function getProjects() {
  return [];
}

export async function getUses() {
  return usesData;
}

export async function getHobbies() {
  return hobbiesData;
}

export async function getEntertainment(): Promise<EntertainmentItem[]> {
  return entertainmentData.map((item: any) => {
    const result: EntertainmentItem = {
      title: item.title,
      type: parseEntertainmentType(item.type),
      status: parseWatchStatus(item.status),
    };

    if (item.image) result.image = item.image;
    if (item.notes) result.notes = item.notes;
    if (item.recommended !== undefined) result.recommended = item.recommended;
    if (item.description) result.description = item.description;
    if (item.tags) result.tags = item.tags;
    if (item.year) result.year = item.year;
    if (item.rating) result.rating = item.rating;

    return result;
  });
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontMatterBlock = match[1] || '';
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Record<string, string> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key?.trim() || ''] = value;
  });

  return { data: metadata, content };
}

export async function getBlogs() {
  try {
    const postsDirectory = path.join(process.cwd(), "data", "blogs");

    // Check if directory exists
    try {
      await fs.access(postsDirectory);
    } catch {
      return [];
    }

    const filenames = await fs.readdir(postsDirectory);

    const blogs = await Promise.all(
      filenames
        .filter((f) => f.endsWith(".md"))
        .map(async (filename) => {
          const filePath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = parseFrontmatter(fileContents);

          return {
            // Mock ID for list keys
            id: filename,
            slug: filename.replace(/\.md$/, ""),
            title: data.title || filename.replace(/\.md$/, ""),
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "2024-01-01",
            excerpt: data.excerpt || "",
          };
        })
    );

    return blogs.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
  } catch (error) {
    console.error("[API] Error fetching blogs:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<string | null> {
  try {
    const postsDirectory = path.join(process.cwd(), "data", "blogs");
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { content } = parseFrontmatter(fileContents);
    return content;
  } catch (error) {
    return null;
  }
}
