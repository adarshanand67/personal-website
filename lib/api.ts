import { promises as fs } from "fs";
import path from "path";
import { readData } from "@/lib/utils/file-ops";



import {
  ProfileSchema,
  ExperiencesSchema,
  PapersSchema,
  BooksSchema,
  BlogsSchema,
  AnimeSchema,
} from "@/lib/schemas";
import { z } from "zod";

export type Profile = z.infer<typeof ProfileSchema>;
export type Experience = z.infer<typeof ExperiencesSchema>[number];
export type Paper = z.infer<typeof PapersSchema>[number];
export type Book = z.infer<typeof BooksSchema>[number];
export type Blog = z.infer<typeof BlogsSchema>[number];
export type EntertainmentItem = z.infer<typeof AnimeSchema>[number];

export async function getProfile(): Promise<Profile> {
  return readData<Profile>("profile.json", ProfileSchema);
}

export async function getExperiences(): Promise<Experience[]> {
  return readData<Experience[]>("experiences.json", ExperiencesSchema);
}

export async function getPapers(): Promise<Paper[]> {
  return readData<Paper[]>("papers.json", PapersSchema);
}

export async function getBooks(): Promise<Book[]> {
  return readData<Book[]>("books.json", BooksSchema);
}

export async function getBlogs(): Promise<Blog[]> {
  return readData<Blog[]>("blogs.json", BlogsSchema);
}

export async function getEntertainment(): Promise<EntertainmentItem[]> {
  return readData<EntertainmentItem[]>("anime.json", AnimeSchema);
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
