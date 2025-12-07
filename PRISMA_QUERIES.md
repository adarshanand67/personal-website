# Prisma Query Examples

This guide shows how to query your PostgreSQL database using Prisma.

## Basic Queries

### Get All Records
```typescript
// Get all books
const books = await prisma.book.findMany();

// Get all anime
const anime = await prisma.entertainment.findMany();
```

### Get One Record
```typescript
// Get first profile
const profile = await prisma.profile.findFirst();

// Get book by ID
const book = await prisma.book.findUnique({
  where: { id: 1 }
});
```

### Filter Records
```typescript
// Get only recommended anime
const recommended = await prisma.entertainment.findMany({
  where: {
    recommended: true
  }
});

// Get completed anime
const completed = await prisma.entertainment.findMany({
  where: {
    status: 'Completed'
  }
});

// Get books with notes
const booksWithNotes = await prisma.book.findMany({
  where: {
    notes: true
  }
});
```

### Sort Records
```typescript
// Get blogs sorted by date (newest first)
const blogs = await prisma.blog.findMany({
  orderBy: {
    date: 'desc'
  }
});

// Get books sorted by title
const books = await prisma.book.findMany({
  orderBy: {
    title: 'asc'
  }
});
```

### Limit Results
```typescript
// Get first 5 books
const books = await prisma.book.findMany({
  take: 5
});

// Get books 6-10 (pagination)
const books = await prisma.book.findMany({
  skip: 5,
  take: 5
});
```

### Complex Queries
```typescript
// Get recommended anime that are completed
const anime = await prisma.entertainment.findMany({
  where: {
    AND: [
      { recommended: true },
      { status: 'Completed' }
    ]
  }
});

// Search books by title
const books = await prisma.book.findMany({
  where: {
    title: {
      contains: 'Design',
      mode: 'insensitive' // case-insensitive
    }
  }
});
```

## Create Records
```typescript
// Add a new book
const newBook = await prisma.book.create({
  data: {
    title: "Clean Code",
    author: "Robert C. Martin",
    notes: false
  }
});

// Add a new anime
const newAnime = await prisma.entertainment.create({
  data: {
    title: "Attack on Titan",
    type: "Anime",
    status: "Completed",
    recommended: true,
    image: "https://..."
  }
});
```

## Update Records
```typescript
// Update a book
const updated = await prisma.book.update({
  where: { id: 1 },
  data: {
    notes: true
  }
});

// Mark anime as completed
const completed = await prisma.entertainment.update({
  where: { id: 5 },
  data: {
    status: 'Completed'
  }
});
```

## Delete Records
```typescript
// Delete a book
await prisma.book.delete({
  where: { id: 1 }
});

// Delete all planning anime
await prisma.entertainment.deleteMany({
  where: {
    status: 'Planning'
  }
});
```

## Count Records
```typescript
// Count total books
const count = await prisma.book.count();

// Count recommended anime
const recommendedCount = await prisma.entertainment.count({
  where: {
    recommended: true
  }
});
```

## Raw SQL (if needed)
```typescript
// Execute raw SQL
const result = await prisma.$queryRaw`
  SELECT * FROM "Book" WHERE "author" LIKE '%Martin%'
`;
```

## Using Prisma in Your Code

In `lib/api.ts`, we use Prisma like this:

```typescript
import { prisma } from "@/lib/prisma";

export async function getBooks() {
  return prisma.book.findMany({
    orderBy: { id: 'asc' }
  });
}

export async function getRecommendedAnime() {
  return prisma.entertainment.findMany({
    where: {
      recommended: true,
      type: 'Anime'
    }
  });
}
```

## Prisma Studio (GUI)

To view and edit your database visually:
```bash
npx prisma studio
```

Opens at http://localhost:5555

## More Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Query Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
