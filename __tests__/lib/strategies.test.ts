import {
  ShelfStrategyFactory,
  BookListStrategy,
  PaperListStrategy,
  AnimeCardStrategy,
  BlogListStrategy,
} from "@/lib/shelf-strategies";
import { Book } from "@/types";

describe("ShelfStrategyFactory", () => {
  it('should return BookListStrategy for "book" type', () => {
    const strategy = ShelfStrategyFactory.getStrategy("book");
    expect(strategy).toBeInstanceOf(BookListStrategy);
  });

  it('should return PaperListStrategy for "paper" type', () => {
    const strategy = ShelfStrategyFactory.getStrategy("paper");
    expect(strategy).toBeInstanceOf(PaperListStrategy);
  });

  it('should return AnimeCardStrategy for "anime" type', () => {
    const strategy = ShelfStrategyFactory.getStrategy("anime");
    expect(strategy).toBeInstanceOf(AnimeCardStrategy);
  });

  it("should throw error for unknown type", () => {
    expect(() => ShelfStrategyFactory.getStrategy("unknown")).toThrow(
      "Unknown shelf type: unknown"
    );
  });
});

describe("BookListStrategy", () => {
  const strategy = new BookListStrategy();
  const mockBooks: Book[] = [
    { title: "The Pragmatic Programmer", author: "Andy Hunt", recommended: true },
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "Refactoring", author: "Martin Fowler" },
  ];

  it("should filter books by title case-insensitive", () => {
    const result = strategy.filter(mockBooks, "pragmatic");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("The Pragmatic Programmer");
  });

  it("should filter books by author case-insensitive", () => {
    const result = strategy.filter(mockBooks, "martin");
    expect(result).toHaveLength(2); // Robert C. Martin and Martin Fowler
  });

  it("should return all books if query is empty", () => {
    const result = strategy.filter(mockBooks, "");
    expect(result).toHaveLength(3);
  });
});
