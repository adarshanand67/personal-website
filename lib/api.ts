import { promises as fs } from "fs";
import path from "path";
import { readData } from "@/lib/utils/file-ops";

const DATA_DIR = path.join(process.cwd(), "data");

return JSON.parse(fileContent);
}

export interface Profile {
  name: string;
  title: string;
  pronouns: string;
  location: string;
  education: {
    university: string;
    degree: string;
    years: string;
    grade: string;
  };
  socials: {
    linkedin: string;
    github: string;
  };
  bio: {
    short: string;
    paragraphs: string[];
  };
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Paper {
  title: string;
  url: string;
}

export interface Book {
  title: string;
  author: string;
  notes?: boolean;
}

export interface Blog {
  date: string;
  title: string;
  slug: string;
}

export interface EntertainmentItem {
  title: string;
  type: "Anime" | "Movie" | "Web Series";
  status: "Watching" | "Completed" | "Planning";
  notes?: string;
  image?: string;
}

export async function getProfile(): Promise<Profile> {
  return readData<Profile>("profile.json");
}

export async function getExperiences(): Promise<Experience[]> {
  return readData<Experience[]>("experiences.json");
}

export async function getPapers(): Promise<Paper[]> {
  return readData<Paper[]>("papers.json");
}

export async function getBooks(): Promise<Book[]> {
  return readData<Book[]>("books.json");
}

export async function getBlogs(): Promise<Blog[]> {
  return readData<Blog[]>("blogs.json");
}

export async function getEntertainment(): Promise<EntertainmentItem[]> {
  return readData<EntertainmentItem[]>("entertainment.json");
}

export async function getPost(slug: string): Promise<string | null> {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    return fileContents;
  } catch (error) {
    return null;
  }
}
