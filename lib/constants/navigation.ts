/**
 * @fileoverview Navigation constants - routes and directory mappings.
 */

/** Valid directory names for content shelves. */
export const directories = ["blogs", "papers", "books", "anime", "hobby"] as const;

/**
 * Application route paths.
 * @constant
 */
export const routes = {
    home: "/",
    articleShelf: "/articleshelf",
    papers: "/articleshelf/papers",
    blogs: "/articleshelf/blogs",
    bookShelf: "/bookshelf",
    animeShelf: "/animeshelf",
    hobbyShelf: "/hobbyshelf",
    music: "/music",
} as const;

/**
 * Directory name to route path mapping.
 * Supports aliases and plural/singular variations.
 * @constant
 */
export const directoryMap: Record<string, string> = {
    blog: routes.articleShelf,
    blogs: routes.articleShelf,
    paper: routes.articleShelf,
    papers: routes.articleShelf,
    article: routes.articleShelf,
    articles: routes.articleShelf,
    book: routes.bookShelf,
    books: routes.bookShelf,
    anime: routes.animeShelf,
    animes: routes.animeShelf,
    hobby: routes.hobbyShelf,
    hobbies: routes.hobbyShelf,
    hobbyshelf: routes.hobbyShelf,
    home: routes.home,
    "~": routes.home,
    ".": routes.home,
};
