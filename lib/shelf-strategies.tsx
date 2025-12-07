import { Book, Paper, Blog, EntertainmentItem } from "@/types";
import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

// Abstract Strategy Interface
export interface ShelfItemStrategy<T> {
  renderItem(item: T, index: number): ReactNode;
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
