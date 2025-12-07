import { z } from "zod";

export const ProfileSchema = z.object({
    name: z.string(),
    title: z.string(),
    pronouns: z.string(),
    location: z.string(),
    education: z.object({
        university: z.string(),
        degree: z.string(),
        years: z.string(),
        grade: z.string(),
    }),
    socials: z.object({
        linkedin: z.string().url(),
        github: z.string().url(),
        email: z.string().email().optional(),
    }),
    bio: z.object({
        short: z.string(),
        paragraphs: z.array(z.string()),
    }),
});

export const ExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    location: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    logo: z.string().optional(),
});

export const PaperSchema = z.object({
    title: z.string(),
    url: z.string().url(),
});

export const BookSchema = z.object({
    title: z.string(),
    author: z.string(),
    notes: z.boolean().optional(),
    amazonUrl: z.string().url().optional(),
});

export const BlogSchema = z.object({
    date: z.string(),
    title: z.string(),
    slug: z.string(),
});

export const EntertainmentItemSchema = z.object({
    title: z.string(),
    type: z.enum(["Anime", "Movie", "Web Series"]),
    status: z.enum(["Watching", "Completed", "Planning"]),
    notes: z.string().optional(),
    image: z.string().optional(),
    recommended: z.boolean().optional(),
});

export const AnimeSchema = z.array(EntertainmentItemSchema);
export const ExperiencesSchema = z.array(ExperienceSchema);
export const PapersSchema = z.array(PaperSchema);
export const BooksSchema = z.array(BookSchema);
export const BlogsSchema = z.array(BlogSchema);
