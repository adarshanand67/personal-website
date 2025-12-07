import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

// Export types from Prisma
export type { Profile, Experience, Book, Paper, Blog, Entertainment as EntertainmentItem } from "@prisma/client";

export async function getProfile() {
    try {
        const profile = await prisma.profile.findFirst();

        if (!profile) {
            console.error("[API] Profile not found in database");
            throw new Error("Profile not found in database");
        }

        return {
            name: profile.name,
            title: profile.title,
            pronouns: profile.pronouns,
            location: profile.location,
            education: profile.education as any,
            socials: {
                linkedin: profile.linkedin,
                github: profile.github,
                email: profile.email,
            },
            bio: {
                short: profile.shortBio,
                paragraphs: profile.bioParagraphs,
            },
        };
    } catch (error) {
        console.error("[API] Error fetching profile:", error);
        throw new Error("Failed to fetch profile data");
    }
}

export async function getExperiences() {
    try {
        return await prisma.experience.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error("[API] Error fetching experiences:", error);
        return []; // Return empty array as fallback
    }
}

export async function getPapers() {
    try {
        return await prisma.paper.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error("[API] Error fetching papers:", error);
        return [];
    }
}

export async function getBooks() {
    try {
        return await prisma.book.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error("[API] Error fetching books:", error);
        return [];
    }
}

export async function getBlogs() {
    try {
        return await prisma.blog.findMany({
            orderBy: { date: 'desc' }
        });
    } catch (error) {
        console.error("[API] Error fetching blogs:", error);
        return [];
    }
}

export async function getEntertainment() {
    try {
        const items = await prisma.entertainment.findMany({
            orderBy: { id: 'asc' }
        });

        return items.map(item => ({
            ...item,
            type: item.type === 'Web_Series' ? 'Web Series' : item.type,
        }));
    } catch (error) {
        console.error("[API] Error fetching entertainment:", error);
        return [];
    }
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
