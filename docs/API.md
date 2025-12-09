# API Documentation

## Overview
This document describes the API functions used for data fetching in the application.

## Data Fetching Functions

### Profile

#### `getProfile()`
Fetches user profile data.

**Returns:** `Promise<Profile>`

```typescript
const profile = await getProfile();
```

**Profile Type:**
```typescript
interface Profile {
  name: string;
  title: string;
  pronouns: string;
  location: string;
  avatar?: string;
  education: {
    university: string;
    degree: string;
    years: string;
    grade: string;
  };
  socials: {
    linkedin: string;
    github: string;
    email: string;
  };
  bio: {
    short: string;
    paragraphs: string[];
  };
}
```

---

### Experiences

#### `getExperiences()`
Fetches work experience data.

**Returns:** `Promise<Experience[]>`

```typescript
const experiences = await getExperiences();
```

**Experience Type:**
```typescript
interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  logo?: string;
  description?: string;
  highlights: string[];
}
```

---

### Blogs

#### `getBlogs()`
Fetches all blog posts sorted by date.

**Returns:** `Promise<Blog[]>`

```typescript
const blogs = await getBlogs();
```

#### `getBlogBySlug(slug: string)`
Fetches a single blog post by slug.

**Parameters:**
- `slug` (string): Blog post slug

**Returns:** `Promise<Blog | null>`

```typescript
const blog = await getBlogBySlug('hello-world');
```

**Blog Type:**
```typescript
interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
}
```

---

### Books

#### `getBooks()`
Fetches reading list.

**Returns:** `Promise<Book[]>`

```typescript
const books = await getBooks();
```

**Book Type:**
```typescript
interface Book {
  title: string;
  author: string;
  year?: number;
  rating?: number;
  review?: string;
}
```

---

### Papers

#### `getPapers()`
Fetches research papers.

**Returns:** `Promise<Paper[]>`

```typescript
const papers = await getPapers();
```

**Paper Type:**
```typescript
interface Paper {
  title: string;
  authors: string[];
  year: number;
  url?: string;
  notes?: string;
}
```

---

### Entertainment

#### `getEntertainment()`
Fetches anime/movies watchlist.

**Returns:** `Promise<EntertainmentItem[]>`

```typescript
const entertainment = await getEntertainment();
```

**EntertainmentItem Type:**
```typescript
interface EntertainmentItem {
  title: string;
  type: 'anime' | 'movie';
  year?: number;
  rating?: number;
  status: 'watching' | 'completed' | 'plan-to-watch';
}
```

---

### Hobbies

#### `getHobbies()`
Fetches hobbies list.

**Returns:** `Promise<Hobby[]>`

```typescript
const hobbies = await getHobbies();
```

**Hobby Type:**
```typescript
interface Hobby {
  name: string;
  description: string;
  icon?: string;
}
```

---

## Utility Functions

### Frontmatter Parsing

#### `parseFrontmatter(fileContent: string)`
Parses frontmatter from markdown files.

**Parameters:**
- `fileContent` (string): Markdown file content

**Returns:** `{ data: Record<string, string>, content: string }`

```typescript
const { data, content } = parseFrontmatter(markdownContent);
```

---

## Error Handling

All API functions handle errors gracefully:

```typescript
try {
  const data = await getProfile();
} catch (error) {
  console.error('Failed to fetch profile:', error);
  // Returns empty/default data
}
```

---

## Caching

Data is fetched at build time and cached:
- Static generation for all pages
- Revalidation every hour (ISR)
- No runtime data fetching

---

## File Structure

```
data/
├── profile.json
├── experiences.json
├── books.json
├── papers.json
├── entertainment.json
├── hobbies.json
├── projects.json
├── uses.json
└── blogs/
    └── *.md
```

---

## Examples

### Fetching Multiple Data Sources

```typescript
export default async function HomePage() {
  const [profile, experiences, blogs] = await Promise.all([
    getProfile(),
    getExperiences(),
    getBlogs(),
  ]);

  return (
    <div>
      <Hero profile={profile} />
      <Experience items={experiences} />
      <BlogList blogs={blogs} />
    </div>
  );
}
```

### Using with Suspense

```typescript
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataComponent />
    </Suspense>
  );
}
```
