import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function readJson(filename: string) {
  const filePath = path.join(process.cwd(), "data", filename);
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function main() {
  console.log("Start seeding...");

  // Seed Profile
  const profileData = await readJson("profile.json");
  await prisma.profile.deleteMany(); // Clear existing
  await prisma.profile.create({
    data: {
      name: profileData.name,
      title: profileData.title,
      pronouns: profileData.pronouns,
      location: profileData.location,
      education: profileData.education,
      linkedin: profileData.socials.linkedin,
      github: profileData.socials.github,
      email: profileData.socials.email,
      shortBio: profileData.bio.short,
      bioParagraphs: profileData.bio.paragraphs,
    },
  });
  console.log("Seeded Profile");

  // Seed Experience
  const experiences = await readJson("experiences.json");
  await prisma.experience.deleteMany();
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("Seeded Experience");

  // Seed Books
  const books = await readJson("books.json");
  await prisma.book.deleteMany();
  for (const book of books) {
    await prisma.book.create({ data: book });
  }
  console.log("Seeded Books");

  // Seed Papers
  const papers = await readJson("papers.json");
  await prisma.paper.deleteMany();
  for (const paper of papers) {
    await prisma.paper.create({ data: paper });
  }
  console.log("Seeded Papers");

  // Seed Blogs (Metadata)
  const blogs = await readJson("blogs.json");
  await prisma.blog.deleteMany();
  for (const blog of blogs) {
    await prisma.blog.create({ data: blog });
  }
  console.log("Seeded Blogs");

  // Seed Entertainment
  const entertainment = await readJson("entertainment.json");
  await prisma.entertainment.deleteMany();
  for (const item of entertainment) {
    // Map JSON string enums to Prisma enums if needed, or let Prisma handle if strings match
    await prisma.entertainment.create({
      data: {
        title: item.title,
        type: item.type === "Web Series" ? "Web_Series" : item.type,
        status: item.status,
        notes: item.notes,
        image: item.image,
        recommended: item.recommended || false,
      },
    });
  }
  console.log("Seeded Entertainment");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
