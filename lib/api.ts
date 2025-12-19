import { promises as fs } from "fs";
import path from "path";
import {
  profileData,
  experiencesData,
  papersData,
  booksData,
  animeData,
  hobbyData,

} from "@/data";
import { AnimeItem, AnimeType, WatchStatus } from "@/types/definitions";

export const getProfile = async () => profileData;
export const getExperiences = async () => experiencesData;
export const getPapers = async () => papersData;
export const getBooks = async () => booksData;
export const getProjects = async () => [];

export const getHobby = async () => hobbyData;
export const getArticles = async () => {
  const blogs = await getBlogs();
  const papers = await getPapers();
  return [...papers, ...blogs];
};

export const getAnime = async (): Promise<AnimeItem[]> =>
  (animeData as AnimeItem[]).map((item) => ({
    ...item,
    type: item.type as AnimeType,
    status: item.status as WatchStatus,
    image: item.image,
    notes: item.notes,
    recommended: item.recommended,
    description: item.description,
    tags: item.tags,
    year: item.year,
    rating: item.rating
  }));

const parseFrontmatter = (content: string) => {
  const match = /---\s*([\s\S]*?)\s*---/.exec(content);
  if (!match) return { data: {}, content };
  const data: Record<string, string> = {};
  match[1].split("\n").forEach(line => {
    const [k, ...v] = line.split(": ");
    if (k) data[k.trim()] = v.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");
  });
  return { data, content: content.replace(/---\s*([\s\S]*?)\s*---/, "").trim() };
};

export async function getBlogs() {
  try {
    const dir = path.join(process.cwd(), "data", "blogs");
    const files = await fs.readdir(dir).catch(() => []);
    const blogs = await Promise.all(files.filter(f => f.endsWith(".md")).map(async f => {
      const { data } = parseFrontmatter(await fs.readFile(path.join(dir, f), "utf8"));
      return {
        id: f,
        slug: f.replace(/\.md$/, ""),
        title: data.title || f.replace(/\.md$/, ""),
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "2024-01-01",
        excerpt: data.excerpt || ""
      };
    }));
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch { return []; }
}

export async function getPost(slug: string) {
  try {
    const { content } = parseFrontmatter(await fs.readFile(path.join(process.cwd(), "data", "blogs", `${slug}.md`), "utf8"));
    return content;
  } catch { return null; }
}
