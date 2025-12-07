import { Book, Paper, Blog, EntertainmentItem } from "@/types";
import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

// Abstract Strategy Interface
export interface ShelfItemStrategy<T> {
  renderItem(item: T, index: number): ReactNode;
  renderList(items: T[]): ReactNode; // Polymorphic List Rendering
  filter(items: T[], query: string): T[];
}

// Concrete Strategy: Book List Item
export class BookListStrategy implements ShelfItemStrategy<Book> {
  renderItem(book: Book, index: number): ReactNode {
    const getAmazonSearchUrl = (title: string, author: string) => {
      const searchQuery = encodeURIComponent(`${title} ${author}`);
      return `https://www.amazon.in/s?k=${searchQuery}`;
    };

    return (
      <div
        key={index}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
          <Link
            href={getAmazonSearchUrl(book.title, book.author)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 dark:text-green-400 hover:underline flex items-center gap-2 group"
          >
            {book.title}
            {book.recommended && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
            )}
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <span className="text-gray-500 text-sm italic">by {book.author}</span>
        </div>
      </div>
    );
  }

  renderList(items: Book[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">{items.map((book, index) => this.renderItem(book, index))}</div>
    );
  }

  filter(items: Book[], query: string): Book[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    );
  }
}

// Concrete Strategy: Paper List Item
export class PaperListStrategy implements ShelfItemStrategy<Paper> {
  renderItem(paper: Paper, index: number): ReactNode {
    return (
      <div
        key={index}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <Link
          href={paper.url}
          target="_blank"
          className="text-green-700 dark:text-green-400 hover:underline"
        >
          {paper.title}
        </Link>
      </div>
    );
  }

  renderList(items: Paper[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">{items.map((paper, index) => this.renderItem(paper, index))}</div>
    );
  }

  filter(items: Paper[], query: string): Paper[] {
    if (!query) return items;
    return items.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase()));
  }
}

// Concrete Strategy: Anime Card Item
export class AnimeCardStrategy implements ShelfItemStrategy<EntertainmentItem> {
  renderItem(item: EntertainmentItem, index: number): ReactNode {
    return (
      <SpotlightCard key={index} className="h-full flex flex-col p-4">
        {item.image ? (
          <div className="w-full aspect-[2/3] mb-4 overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center p-4">
            <span className="text-gray-400 text-sm text-center">{item.title}</span>
          </div>
        )}
        <h3 className="font-bold text-lg leading-tight mb-2">{item.title}</h3>
        {item.notes && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto font-mono">{item.notes}</p>
        )}
      </SpotlightCard>
    );
  }

  renderList(items: EntertainmentItem[]): ReactNode {
    const filterItems = (
      items: EntertainmentItem[],
      type: "Anime" | "Movie",
      status: "Completed" | "Planning"
    ) => {
      return items.filter((item) => item.type === type && item.status === status);
    };

    const animeCompleted = filterItems(items, "Anime", "Completed");
    const animePlanning = filterItems(items, "Anime", "Planning");
    const movieCompleted = filterItems(items, "Movie", "Completed");
    const moviePlanning = filterItems(items, "Movie", "Planning");

    const Section = ({
      title,
      sectionItems,
    }: {
      title: string;
      sectionItems: EntertainmentItem[];
    }) => {
      if (sectionItems.length === 0) return null;
      return (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-mono">
            <span className="text-gray-500">##</span> {title}
            <span className="text-gray-500 text-sm ml-2">({sectionItems.length})</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectionItems.map((item, index) => this.renderItem(item, index))}
          </div>
        </div>
      );
    };

    return (
      <>
        <Section title="Anime - Watched" sectionItems={animeCompleted} />
        <Section title="Anime - Planning" sectionItems={animePlanning} />
        <Section title="Movies - Watched" sectionItems={movieCompleted} />
        <Section title="Movies - Planning" sectionItems={moviePlanning} />
      </>
    );
  }

  filter(items: EntertainmentItem[], query: string): EntertainmentItem[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.notes && item.notes.toLowerCase().includes(lowerQuery))
    );
  }
}

// Concrete Strategy: Blog List Item
export class BlogListStrategy implements ShelfItemStrategy<Blog> {
  renderItem(blog: Blog, index: number): ReactNode {
    return (
      <div
        key={blog.slug}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
          <span className="text-gray-500 text-xs min-w-[80px]">{blog.date}</span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-green-700 dark:text-green-400 hover:underline"
          >
            {blog.title}
          </Link>
        </div>
      </div>
    );
  }

  renderList(items: Blog[]): ReactNode {
    const blogsByYear = items.reduce(
      (acc: Record<string, Blog[]>, blog: Blog) => {
        const year = blog.date.split("-")[0];
        if (!acc[year]) acc[year] = [];
        acc[year].push(blog);
        return acc;
      },
      {} as Record<string, Blog[]>
    );

    const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));

    return (
      <>
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-gray-500">##</span> {year}
            </h2>
            <div className="space-y-2">
              {blogsByYear[year].map((post, index) => this.renderItem(post, index))}
            </div>
          </div>
        ))}
      </>
    );
  }

  filter(items: Blog[], query: string): Blog[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (blog) => blog.title.toLowerCase().includes(lowerQuery) || blog.date.includes(lowerQuery)
    );
  }
}

// Factory to create strategies
export class ShelfStrategyFactory {
  static getStrategy(type: string): ShelfItemStrategy<any> {
    switch (type) {
      case "book":
        return new BookListStrategy();
      case "paper":
        return new PaperListStrategy();
      case "anime":
        return new AnimeCardStrategy();
      case "blog":
        return new BlogListStrategy();
      default:
        throw new Error(`Unknown shelf type: ${type}`);
    }
  }
}
