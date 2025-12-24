export const directories = ["blogs", "papers", "books", "anime", "hobby"] as const;

export const routes = {
    home: "/",
    articleShelf: "/articleshelf",
    bookShelf: "/bookshelf",
    animeShelf: "/animeshelf",
    hobbyShelf: "/hobbyshelf",
} as const;

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
