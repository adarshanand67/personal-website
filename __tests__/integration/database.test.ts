import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Database Integration Tests", () => {
    beforeAll(async () => {
        // Ensure we're connected
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("Profile", () => {
        it("should fetch profile from database", async () => {
            const profile = await prisma.profile.findFirst();

            expect(profile).toBeDefined();
            expect(profile?.name).toBeTruthy();
            expect(profile?.title).toBeTruthy();
        });
    });

    describe("Books", () => {
        it("should fetch all books", async () => {
            const books = await prisma.book.findMany();

            expect(Array.isArray(books)).toBe(true);
            expect(books.length).toBeGreaterThan(0);
        });

        it("should have required fields", async () => {
            const book = await prisma.book.findFirst();

            expect(book).toHaveProperty("title");
            expect(book).toHaveProperty("author");
            expect(book).toHaveProperty("notes");
        });
    });

    describe("Entertainment", () => {
        it("should fetch all entertainment items", async () => {
            const items = await prisma.entertainment.findMany();

            expect(Array.isArray(items)).toBe(true);
            expect(items.length).toBeGreaterThan(0);
        });

        it("should filter by type", async () => {
            const anime = await prisma.entertainment.findMany({
                where: { type: "Anime" },
            });

            anime.forEach((item) => {
                expect(item.type).toBe("Anime");
            });
        });

        it("should filter by recommended", async () => {
            const recommended = await prisma.entertainment.findMany({
                where: { recommended: true },
            });

            recommended.forEach((item) => {
                expect(item.recommended).toBe(true);
            });
        });
    });

    describe("Experiences", () => {
        it("should fetch all experiences", async () => {
            const experiences = await prisma.experience.findMany();

            expect(Array.isArray(experiences)).toBe(true);
        });

        it("should have required fields", async () => {
            const experience = await prisma.experience.findFirst();

            if (experience) {
                expect(experience).toHaveProperty("company");
                expect(experience).toHaveProperty("role");
                expect(experience).toHaveProperty("duration");
            }
        });
    });

    describe("CRUD Operations", () => {
        it("should create and delete a test book", async () => {
            // Create
            const newBook = await prisma.book.create({
                data: {
                    title: "Test Book",
                    author: "Test Author",
                    notes: false,
                },
            });

            expect(newBook.title).toBe("Test Book");
            expect(newBook.id).toBeDefined();

            // Delete
            await prisma.book.delete({
                where: { id: newBook.id },
            });

            // Verify deletion
            const deleted = await prisma.book.findUnique({
                where: { id: newBook.id },
            });

            expect(deleted).toBeNull();
        });

        it("should update a book", async () => {
            // Create
            const book = await prisma.book.create({
                data: {
                    title: "Update Test",
                    author: "Test Author",
                    notes: false,
                },
            });

            // Update
            const updated = await prisma.book.update({
                where: { id: book.id },
                data: { notes: true },
            });

            expect(updated.notes).toBe(true);

            // Cleanup
            await prisma.book.delete({
                where: { id: book.id },
            });
        });
    });
});
