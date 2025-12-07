import { z } from "zod";

export const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
  recommended: z.boolean().optional(),
});

export const PaperSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export const EntertainmentItemSchema = z.object({
  title: z.string(),
  type: z.enum(["Anime", "Movie"]),
  status: z.enum(["Completed", "Planning"]),
  image: z.string().optional(),
  notes: z.string().optional(),
});

export const BlogSchema = z.object({
  title: z.string(),
  date: z.string(), // ISO date string YYYY-MM-DD
  slug: z.string(),
});
