import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

// Handle connection errors
prisma.$on("error" as never, (e: any) => {
    console.error("[Prisma] Database error:", e);
});

// Ensure clean disconnection on process termination
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;

    process.on("beforeExit", async () => {
        await prisma.$disconnect();
    });
}
