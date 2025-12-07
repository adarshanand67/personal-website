import { prismaMock } from "../mocks/prisma.mock";
import {
    getProfile,
    getExperiences,
    getPapers,
    getBooks,
    getBlogs,
    getEntertainment,
} from "@/lib/api";

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
    prisma: prismaMock,
}));

describe("API Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getProfile", () => {
        it("should return transformed profile data", async () => {
            const mockProfile = {
                id: 1,
                name: "Test User",
                title: "Software Engineer",
                pronouns: "he/him",
                location: "San Francisco",
                education: { degree: "BS Computer Science" },
                linkedin: "https://linkedin.com/in/test",
                github: "https://github.com/test",
                email: "test@example.com",
                shortBio: "Test bio",
                bioParagraphs: ["Paragraph 1", "Paragraph 2"],
            };

            prismaMock.profile.findFirst.mockResolvedValue(mockProfile);

            const result = await getProfile();

            expect(result).toEqual({
                name: "Test User",
                title: "Software Engineer",
                pronouns: "he/him",
                location: "San Francisco",
                education: { degree: "BS Computer Science" },
                socials: {
                    linkedin: "https://linkedin.com/in/test",
                    github: "https://github.com/test",
                    email: "test@example.com",
                },
                bio: {
                    short: "Test bio",
                    paragraphs: ["Paragraph 1", "Paragraph 2"],
                },
            });
        });

        it("should throw error when profile not found", async () => {
            prismaMock.profile.findFirst.mockResolvedValue(null);

            await expect(getProfile()).rejects.toThrow("Failed to fetch profile data");
        });

        it("should handle database errors", async () => {
            prismaMock.profile.findFirst.mockRejectedValue(new Error("DB Error"));

            await expect(getProfile()).rejects.toThrow("Failed to fetch profile data");
        });
    });

    describe("getExperiences", () => {
        it("should return list of experiences", async () => {
            const mockExperiences = [
                {
                    id: 1,
                    company: "Test Corp",
                    role: "Engineer",
                    duration: "2020-2023",
                    location: "Remote",
                    description: "Test description",
                    highlights: ["Achievement 1"],
                    logo: null,
                },
            ];

            prismaMock.experience.findMany.mockResolvedValue(mockExperiences);

            const result = await getExperiences();

            expect(result).toEqual(mockExperiences);
            expect(prismaMock.experience.findMany).toHaveBeenCalledWith({
                orderBy: { id: "asc" },
            });
        });

        it("should return empty array on error", async () => {
            prismaMock.experience.findMany.mockRejectedValue(new Error("DB Error"));

            const result = await getExperiences();

            expect(result).toEqual([]);
        });
    });

    describe("getBooks", () => {
        it("should return list of books", async () => {
            const mockBooks = [
                {
                    id: 1,
                    title: "Test Book",
                    author: "Test Author",
                    notes: false,
                },
            ];

            prismaMock.book.findMany.mockResolvedValue(mockBooks);

            const result = await getBooks();

            expect(result).toEqual(mockBooks);
        });

        it("should return empty array on error", async () => {
            prismaMock.book.findMany.mockRejectedValue(new Error("DB Error"));

            const result = await getBooks();

            expect(result).toEqual([]);
        });
    });

    describe("getEntertainment", () => {
        it("should transform Web_Series to Web Series", async () => {
            const mockItems = [
                {
                    id: 1,
                    title: "Test Show",
                    type: "Web_Series" as any,
                    status: "Completed" as any,
                    notes: null,
                    image: null,
                    recommended: false,
                },
            ];

            prismaMock.entertainment.findMany.mockResolvedValue(mockItems);

            const result = await getEntertainment();

            expect(result[0].type).toBe("Web Series");
        });

        it("should keep other types unchanged", async () => {
            const mockItems = [
                {
                    id: 1,
                    title: "Test Anime",
                    type: "Anime" as any,
                    status: "Completed" as any,
                    notes: null,
                    image: null,
                    recommended: true,
                },
            ];

            prismaMock.entertainment.findMany.mockResolvedValue(mockItems);

            const result = await getEntertainment();

            expect(result[0].type).toBe("Anime");
        });

        it("should return empty array on error", async () => {
            prismaMock.entertainment.findMany.mockRejectedValue(new Error("DB Error"));

            const result = await getEntertainment();

            expect(result).toEqual([]);
        });
    });
});
