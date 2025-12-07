export interface ShelfConfig {
  title: string;
  command: string; // CLI command like "ls ~/books"
  searchPlaceholder: string;
  type: "book" | "paper" | "anime" | "blog";
}

export const shelfConfigs: Record<string, ShelfConfig> = {
  books: {
    title: "Bookshelf",
    command: "ls ~/books",
    searchPlaceholder: "Search books...",
    type: "book",
  },
  papers: {
    title: "Papershelf",
    command: 'find ~/papers -name "*.pdf"',
    searchPlaceholder: "Search papers...",
    type: "paper",
  },
  anime: {
    title: "Animeshelf",
    command: "ls ~/entertainment",
    searchPlaceholder: "Search anime & movies...",
    type: "anime",
  },
  blogs: {
    title: "Blogshelf",
    command: 'find ~/blog -type f -name "*.md"',
    searchPlaceholder: "Search blogs...",
    type: "blog",
  },
};
