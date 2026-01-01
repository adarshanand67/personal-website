import { promises as fs } from "fs";
import path from "path";
import {
  profileData,
  experiencesData,
  papersData,
  booksData,
  anime,
  movies,
  hobbyData,
} from "@/data";
import { AnimeItem, WatchStatus } from "@/types/definitions";
import { logError, AppError, safeAsync } from "@/lib/utils";

// ============================================================================
// Markdown Parser
// ============================================================================

export const parseFrontmatter = (content: string) => {
  try {
    if (!content || typeof content !== "string") {
      logError(new Error("Invalid content provided to parseFrontmatter"), {
        contentType: typeof content,
      });
      return { data: {}, content: "" };
    }

    const match = /---\s*([\s\S]*?)\s*---/.exec(content);
    if (!match) return { data: {}, content };

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
              .replace(/^['"](.*)['"']$/, "$1");
          }
        } catch (error) {
          logError(error as Error, { line, function: "parseFrontmatter.line" });
        }
      });
    }

    return {
      data,
      content: content.replace(/---\s*([\s\S]*?)\s*---/, "").trim(),
    };
  } catch (error) {
    logError(error as Error, { function: "parseFrontmatter" });
    return { data: {}, content };
  }
};

// ============================================================================
// Blog Functions
// ============================================================================

export async function getBlogs() {
  try {
    const dir = path.join(process.cwd(), "data", "blogs");
    const [, dirError] = await safeAsync(fs.access(dir));
    if (dirError) {
      logError(
        new AppError("Blogs directory not found", "BLOGS_DIR_NOT_FOUND"),
        { dir },
      );
      return [];
    }

    const [files, readError] = await safeAsync(fs.readdir(dir));
    if (readError || !files) {
      logError(readError || new Error("Failed to read blogs directory"), {
        dir,
      });
      return [];
    }

    const markdownFiles = files.filter(
      (f) => f && typeof f === "string" && f.endsWith(".md"),
    );
    if (markdownFiles.length === 0) return [];

    const blogs = await Promise.all(
      markdownFiles.map(async (f) => {
        try {
          const [fileContent, fileError] = await safeAsync(
            fs.readFile(path.join(dir, f), "utf8"),
          );
          if (fileError || !fileContent) return null;

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
          logError(error as Error, { file: f });
          return null;
        }
      }),
    );

    return blogs
      .filter((blog) => blog !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    logError(error as Error, { function: "getBlogs" });
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    if (!slug || typeof slug !== "string")
      throw new AppError("Invalid slug provided", "INVALID_SLUG");

    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
    if (sanitizedSlug !== slug) return null;

    const [fileContent, fileError] = await safeAsync(
      fs.readFile(
        path.join(process.cwd(), "data", "blogs", `${sanitizedSlug}.md`),
        "utf8",
      ),
    );
    if (fileError || !fileContent) return null;

    const { content } = parseFrontmatter(fileContent);
    return content || null;
  } catch (error) {
    logError(error as Error, { function: "getPost", slug });
    return null;
  }
}

// ============================================================================
// Content Functions
// ============================================================================

export const getProfile = async () => {
  if (!profileData)
    throw new AppError("Profile data not found", "PROFILE_NOT_FOUND");
  return profileData;
};

export const getExperiences = async () => {
  if (!experiencesData || !Array.isArray(experiencesData))
    throw new AppError("Experience data not found", "EXPERIENCE_NOT_FOUND");
  return experiencesData;
};

export const getPapers = async () => {
  if (!papersData || !Array.isArray(papersData))
    throw new AppError("Papers data not found", "PAPERS_NOT_FOUND");
  return papersData;
};

export const getBooks = async () => {
  if (!booksData || !Array.isArray(booksData))
    throw new AppError("Books data not found", "BOOKS_NOT_FOUND");
  return booksData;
};

export const getProjects = async () => [];

export const getHobby = async () => {
  if (!hobbyData || !Array.isArray(hobbyData))
    throw new AppError("Hobby data not found", "HOBBY_NOT_FOUND");
  return hobbyData;
};

export const getAnime = async (): Promise<AnimeItem[]> => {
  const animeData = (anime || []).map((item) => ({ ...item, isMovie: false }));
  const movieData = (movies || []).map((item) => ({ ...item, isMovie: true }));
  const allAnime = [...animeData, ...movieData] as unknown as AnimeItem[];

  if (!allAnime || allAnime.length === 0)
    throw new AppError("Anime data not found", "ANIME_NOT_FOUND");

  return allAnime.map((item, index) => {
    if (!item || typeof item !== "object")
      throw new AppError(
        `Invalid anime item at index ${index}`,
        "INVALID_ANIME_ITEM",
      );
    return {
      ...item,
      status: item.status as WatchStatus,
      image: item.image || "/placeholder.png",
      seasons: item.seasons,
      recommended: item.recommended ?? false,
      description: item.description || "",
      tags: item.tags || [],
      year: item.year,
      rating: item.rating,
      isMovie: item.isMovie,
    };
  });
};

export const getArticles = async () => {
  const [blogs, papers] = await Promise.all([
    getBlogs().catch(() => []),
    getPapers().catch(() => []),
  ]);
  return [...papers, ...blogs];
};
