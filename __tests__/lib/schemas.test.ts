import {
    ProfileSchema,
    ExperiencesSchema,
    BooksSchema,
    PapersSchema,
    BlogsSchema,
    AnimeSchema,
} from "@/lib/schemas";

describe("Zod Schema Validation", () => {
    describe("ProfileSchema", () => {
        it("should validate correct profile data", () => {
            const validProfile = {
                name: "Test User",
                title: "Engineer",
                pronouns: "he/him",
                location: "SF",
                education: {
                    university: "Test University",
                    degree: "BS Computer Science",
                    years: "2020-2024",
                    grade: "3.8 GPA",
                },
                socials: {
                    linkedin: "https://linkedin.com",
                    github: "https://github.com",
                    email: "test@example.com",
                },
                bio: {
                    short: "Bio",
                    paragraphs: ["Para 1"],
                },
            };

            const result = ProfileSchema.safeParse(validProfile);
            expect(result.success).toBe(true);
        });

        it("should reject invalid profile data", () => {
            const invalidProfile = {
                name: "Test",
                // missing required fields
            };

            const result = ProfileSchema.safeParse(invalidProfile);
            expect(result.success).toBe(false);
        });
    });

    describe("BooksSchema", () => {
        it("should validate array of books", () => {
            const validBooks = [
                {
                    title: "Book 1",
                    author: "Author 1",
                    notes: false,
                },
                {
                    title: "Book 2",
                    author: "Author 2",
                    notes: true,
                },
            ];

            const result = BooksSchema.safeParse(validBooks);
            expect(result.success).toBe(true);
        });

        it("should reject books without required fields", () => {
            const invalidBooks = [
                {
                    title: "Book 1",
                    // missing author
                },
            ];

            const result = BooksSchema.safeParse(invalidBooks);
            expect(result.success).toBe(false);
        });
    });

    describe("AnimeSchema", () => {
        it("should validate entertainment items", () => {
            const validAnime = [
                {
                    title: "Test Anime",
                    type: "Anime",
                    status: "Completed",
                    notes: "Great show",
                    image: "https://example.com/image.jpg",
                    recommended: true,
                },
            ];

            const result = AnimeSchema.safeParse(validAnime);
            expect(result.success).toBe(true);
        });

        it("should accept optional fields", () => {
            const minimalAnime = [
                {
                    title: "Test",
                    type: "Anime",
                    status: "Watching",
                },
            ];

            const result = AnimeSchema.safeParse(minimalAnime);
            expect(result.success).toBe(true);
        });
    });
});
