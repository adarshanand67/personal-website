export interface ShelfConfig {
  title: string;
  description: string;
  command: string; // CLI command like "ls ~/books"
  searchPlaceholder: string;
  type: "book" | "paper" | "anime" | "blog";
}

export const shelfConfigs: Record<string, ShelfConfig> = {
  books: {
    title: "Bookshelf",
    description: "A curated collection of books I've read and recommend.",
    command: "ls ~/books",
    searchPlaceholder: "Search books...",
    type: "book",
  },
  papers: {
    title: "Papershelf",
    description: "Research papers that have shaped my understanding.",
    command: 'find ~/papers -name "*.pdf"',
    searchPlaceholder: "Search papers...",
    type: "paper",
  },
  anime: {
    title: "Animeshelf",
    description: "Anime series I've watched and enjoyed.",
    command: "ls ~/entertainment",
    searchPlaceholder: "Search anime & movies...",
    type: "anime",
  },
  blogs: {
    title: "Blogshelf",
    description: "Thoughts, tutorials, and insights on technology.",
    command: 'find ~/blog -type f -name "*.md"',
    searchPlaceholder: "Search blogs...",
    type: "blog",
  }
};
