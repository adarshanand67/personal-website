import { ShelfType } from "@/types/definitions";
export interface ShelfConfig {
  title: string;
  description: string;
  command: string;
  searchPlaceholder: string;
  type: ShelfType;
}
export const shelfConfigs: Record<string, ShelfConfig> = {
  books: {
    title: "Bookshelf",
    description: "A curated collection of books I've read and recommend.",
    command: "ls ~/books",
    searchPlaceholder: "Search books...",
    type: ShelfType.Book,
  },
  articles: {
    title: "Articles",
    description: "Research papers and thoughts on technology.",
    command: "ls ~/articles",
    searchPlaceholder: "Search articles...",
    type: ShelfType.Article,
  },
  anime: {
    title: "Animeshelf",
    description: "Anime series I've watched and enjoyed.",
    command: "ls ~/entertainment",
    searchPlaceholder: "Search anime & movies...",
    type: ShelfType.Anime,
  },
  blogs: {
    title: "Blogshelf",
    description: "Thoughts, tutorials, and insights on technology.",
    command: 'find ~/blog -type f -name "*.md"',
    searchPlaceholder: "Search blogs...",
    type: ShelfType.Blog,
  },
  projects: {
    title: "Projects",
    description: "Things I've built and worked on.",
    command: "ls -la ~/projects",
    searchPlaceholder: "Search projects...",
    type: ShelfType.Project,
  },
  hobby: {
    title: "HobbyShelf",
    description: "What I do when I'm not coding.",
    command: "ls -la ~/freetime",
    searchPlaceholder: "Search hobby...",
    type: ShelfType.Hobby,
  },
};
