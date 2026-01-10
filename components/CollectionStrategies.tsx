"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tv,
  Check,
  Star,
  ArrowUpRight,
  ExternalLink,
  Play,
  Dumbbell,
  Trophy,
  Bike,
  Mountain,
  Dices,
  Plane,
  Coffee,
  Users,
  Mic,
  Calendar,
  Film,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  Book,
  Paper,
  AnimeItem,
  Blog,
  Hobby,
  WatchStatus,
  CollectionType,
} from "@/types/definitions";
import { PillTag } from "@/components/ui";
import { AppError, getBookGradient, getAssetPath } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export type CollectionItem = Book | Paper | AnimeItem | Blog | Hobby;

export interface CollectionItemStrategy<T> {
  renderItem(item: T, index: number): ReactNode;
  renderList(items: T[]): ReactNode;
  filter(items: T[], query: string, selectedTag?: string | null): T[];
}

// ============================================================================
// Anime Strategy
// ============================================================================

export class AnimeCollectionStrategy
  implements CollectionItemStrategy<AnimeItem>
{
  private renderItemWithPriority(
    anime: AnimeItem,
    index: number,
    priority: boolean,
  ): ReactNode {
    if (!anime || !anime.title) return null;

    return (
      <div
        id={`collection-item-${anime.title}`}
        key={index}
        onClick={() => useStore.getState().setAnimeSelectedItem(anime)}
        className="group flex flex-col gap-3 cursor-pointer relative"
      >
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
          {anime.image ? (
            <Image
              src={getAssetPath(anime.image)}
              alt={anime.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Tv size={48} />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-background text-xs font-bold bg-foreground px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </div>
          </div>
        </div>

        <div className="px-1 text-center">
          <h3 className="text-foreground font-black text-sm leading-tight group-hover:text-foreground transition-colors line-clamp-2 mb-1.5 flex items-center justify-center gap-1.5 tracking-tighter">
            {anime.title}
            {anime.status === WatchStatus.Completed && (
              <Check
                size={16}
                strokeWidth={3}
                className="text-foreground flex-shrink-0"
              />
            )}
            {anime.recommended && (
              <Star
                size={16}
                fill="currentColor"
                className="text-foreground/60 flex-shrink-0"
              />
            )}
          </h3>
          {anime.seasons && (
            <p className="text-[11px] text-gray-600 dark:text-gray-300 mb-1.5 font-semibold">
              {anime.seasons}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
            {anime.tags?.slice(0, 3).map((tag, i) => (
              <PillTag
                key={i}
                label={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  useStore.getState().setCollectionSelectedTag(tag);
                }}
                variant="filter"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  renderItem(anime: AnimeItem, index: number): ReactNode {
    return this.renderItemWithPriority(anime, index, false);
  }

  renderList(items: AnimeItem[]): ReactNode {
    if (!items?.length) return null;
    const watched = items.filter(
      (item) => item?.status === WatchStatus.Completed,
    );
    const watchedSeries = watched.filter((item) => !item.isMovie);
    const watchedMovies = watched.filter((item) => item.isMovie);

    let globalIndex = 0;
    return (
      <div className="space-y-16">
        {watchedSeries.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-4 tracking-tighter px-4">
              <span className="text-foreground/20 text-3xl font-mono">/</span>
              Watched Series
              <span className="text-gray-400 text-sm font-normal">
                ({watchedSeries.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
              {watchedSeries.map((anime, index) => {
                const item = this.renderItemWithPriority(
                  anime,
                  index,
                  globalIndex < 4,
                );
                globalIndex++;
                return item;
              })}
            </div>
          </div>
        )}
        {watchedMovies.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-4 tracking-tighter px-4">
              <span className="text-foreground/20 text-3xl font-mono">/</span>
              Watched Movies
              <span className="text-gray-400 text-sm font-normal">
                ({watchedMovies.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
              {watchedMovies.map((anime, index) => {
                const item = this.renderItemWithPriority(
                  anime,
                  index,
                  globalIndex < 4,
                );
                globalIndex++;
                return item;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  filter(
    items: AnimeItem[],
    query: string,
    selectedTag?: string | null,
  ): AnimeItem[] {
    let filtered = items.filter(
      (item) => item?.status === WatchStatus.Completed,
    );
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    }
    if (selectedTag === "Recommended") {
      filtered = filtered.filter((item) => item?.recommended);
    } else if (selectedTag) {
      filtered = filtered.filter((item) => item.tags?.includes(selectedTag));
    }
    return filtered;
  }
}

// ============================================================================
// Book Strategy
// ============================================================================

export class BookCollectionStrategy implements CollectionItemStrategy<Book> {
  renderItem(book: Book, index: number): ReactNode {
    const coverGradient = getBookGradient(book.title);
    const spineColor = coverGradient.split(" ")[0].replace("from-", "bg-");

    return (
      <div
        id={`collection-item-${book.title}`}
        key={index}
        onClick={() => useStore.getState().setBookSelectedItem(book)}
        className="group flex flex-col gap-4 cursor-pointer"
      >
        <div className="relative block w-full aspect-[2/3] perspective-1000">
          <div className="relative w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-[-20deg] group-hover:translate-x-2 group-hover:-translate-y-2 shadow-lg group-hover:shadow-2xl">
            <div
              className={`absolute top-1 left-0 w-4 h-[98%] -translate-x-3 translate-z-[-2px] rotate-y-[-90deg] origin-right ${spineColor} brightness-75 rounded-l-sm`}
            />
            <div
              className={`absolute inset-0 flex flex-col p-3 md:p-4 bg-gradient-to-br ${coverGradient} border-r-2 border-white/10 rounded-r-md rounded-l-sm`}
            >
              <div className="flex-1 border-2 border-white/20 p-2 flex flex-col items-center justify-center text-center">
                <h3 className="font-serif font-bold text-white text-lg leading-tight line-clamp-4 drop-shadow-md">
                  {book.title}
                </h3>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-white/80 font-mono truncate max-w-full">
                  {book.author}
                </p>
              </div>
              {book.recommended && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                  <Star size={12} fill="currentColor" />
                </div>
              )}

              <div className="absolute top-0 left-2 bottom-0 w-1 bg-black/20 blur-[1px]" />
            </div>
          </div>
        </div>

        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-auto px-2">
            {book.tags.slice(0, 3).map((tag, i) => (
              <PillTag
                key={i}
                label={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  useStore.getState().setCollectionSelectedTag(tag);
                }}
                variant="filter"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  renderList(items: Book[]): ReactNode {
    if (!items.length) return null;
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-8 px-4 py-8">
        {items.map((book, index) => this.renderItem(book, index))}
      </div>
    );
  }

  filter(items: Book[], query: string, selectedTag?: string | null): Book[] {
    let filtered = items;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      );
    }
    if (selectedTag === "Recommended") {
      filtered = filtered.filter((book) => book.recommended);
    } else if (selectedTag) {
      filtered = filtered.filter((book) => book.tags?.includes(selectedTag));
    }
    return filtered;
  }
}

// ============================================================================
// Paper Strategy
// ============================================================================

export class PaperCollectionStrategy implements CollectionItemStrategy<Paper> {
  renderItem(paper: Paper, index: number): ReactNode {
    return (
      <div
        id={`collection-item-${paper.title}`}
        key={index}
        className="border-l-2 border-foreground/10 pl-4 hover:border-foreground/30 transition-colors"
      >
        <Link
          href={paper.url}
          target="_blank"
          className="group/link inline-flex items-center gap-2 text-foreground/80 hover:text-foreground font-bold hover:underline"
        >
          <span>{paper.title}</span>
          <ExternalLink
            size={14}
            className="opacity-50 group-hover/link:opacity-100 transition-opacity"
          />
        </Link>
      </div>
    );
  }
  renderList(items: Paper[]): ReactNode {
    if (!items.length) return null;
    return (
      <div className="space-y-4">
        {items.map((p, i) => this.renderItem(p, i))}
      </div>
    );
  }
  filter(items: Paper[], query: string): Paper[] {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }
}

// ============================================================================
// Blog Strategy
// ============================================================================

export class BlogCollectionStrategy implements CollectionItemStrategy<Blog> {
  renderItem(blog: Blog): ReactNode {
    return (
      <div
        id={`collection-item-${blog.title}`}
        key={blog.slug}
        className="border-l-2 border-foreground/10 pl-4 hover:border-foreground/30 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
          <span className="text-gray-500 text-xs min-w-[80px] font-mono">
            {blog.date}
          </span>
          <Link
            href={`/articles/${blog.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground font-bold hover:underline"
          >
            <span>{blog.title}</span>
            <ArrowUpRight
              size={14}
              className="opacity-50 group-hover/link:opacity-100 transition-all transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    );
  }
  renderList(items: Blog[]): ReactNode {
    const blogsByYear = items.reduce((acc: Record<string, Blog[]>, blog) => {
      const year = blog.date.split("-")[0] || "Unknown";
      if (!acc[year]) acc[year] = [];
      acc[year]!.push(blog);
      return acc;
    }, {});
    const years = Object.keys(blogsByYear).sort(
      (a, b) => Number(b) - Number(a),
    );
    return (
      <div className="space-y-12 py-8">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-4 text-foreground/80">
              <span className="text-foreground/10 text-3xl font-mono">/</span>
              {year}
            </h2>
            <div className="space-y-4">
              {blogsByYear[year]!.map((post) => this.renderItem(post))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  filter(items: Blog[], query: string): Blog[] {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (b) => b.title.toLowerCase().includes(q) || b.date.includes(q),
    );
  }
}

// ============================================================================
// Hobby Strategy
// ============================================================================

const iconMap: Record<string, any> = {
  Dumbbell,
  Tv,
  Trophy,
  Bike,
  Mountain,
  Dices,
  Plane,
  Coffee,
  Users,
  Mic,
};

export class HobbyCollectionStrategy implements CollectionItemStrategy<Hobby> {
  private getIcon(iconName: string): ReactNode {
    const Icon = iconMap[iconName] || iconMap.Tv;
    return <Icon className="w-8 h-8 text-foreground" />;
  }
  renderItem(hobby: Hobby, index: number): ReactNode {
    return (
      <div
        id={`collection-item-${hobby.name}`}
        key={index}
        onClick={() => useStore.getState().setHobbySelectedItem(hobby)}
        className="group p-5 glass rounded-2xl border border-gray-100 dark:border-white/5 hover:border-foreground/30 transition-all duration-500 cursor-pointer overflow-hidden relative flex flex-col items-center text-center"
      >
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-3 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 w-fit">
            {this.getIcon(hobby.icon)}
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {hobby.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
            {hobby.description}
          </p>
        </div>
      </div>
    );
  }
  renderList(items: Hobby[]): ReactNode {
    if (!items.length) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 max-w-4xl mx-auto">
        {items.map((hobby, index) => this.renderItem(hobby, index))}
      </div>
    );
  }
  filter(items: Hobby[], query: string): Hobby[] {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q),
    );
  }
}

// ============================================================================
// Article Strategy
// ============================================================================

export class ArticleCollectionStrategy
  implements CollectionItemStrategy<Blog | Paper>
{
  renderItem(item: Blog | Paper, index: number): ReactNode {
    if ("url" in item)
      return new PaperCollectionStrategy().renderItem(item as Paper, index);
    return new BlogCollectionStrategy().renderItem(item as Blog);
  }
  renderList(items: (Blog | Paper)[]): ReactNode {
    if (!items.length) return null;
    const papers = items.filter((i): i is Paper => "url" in i);
    const blogs = items.filter((i): i is Blog => "slug" in i);
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-8 items-start">
        {papers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-foreground/90">
              <span className="text-foreground/10 text-3xl font-mono tracking-tighter">
                01
              </span>
              Research Papers
            </h2>
            <div className="space-y-4">
              {new PaperCollectionStrategy().renderList(papers)}
            </div>
          </div>
        )}
        {blogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-foreground/90">
              <span className="text-foreground/10 text-3xl font-mono tracking-tighter">
                {papers.length > 0 ? "02" : "01"}
              </span>
              Blogs
            </h2>
            {new BlogCollectionStrategy().renderList(blogs)}
          </div>
        )}
      </div>
    );
  }
  filter(items: (Blog | Paper)[], query: string): (Blog | Paper)[] {
    if (!query) return items;
    const papers = items.filter((i): i is Paper => "url" in i);
    const blogs = items.filter((i): i is Blog => "slug" in i);
    return [
      ...new PaperCollectionStrategy().filter(papers, query),
      ...new BlogCollectionStrategy().filter(blogs, query),
    ];
  }
}

// ============================================================================
// Factory
// ============================================================================

export class CollectionStrategyFactory {
  static getStrategy(
    type: CollectionType,
  ): CollectionItemStrategy<CollectionItem> {
    if (!type)
      throw new AppError(
        "Collection type is required",
        "MISSING_COLLECTION_TYPE",
      );
    switch (type) {
      case CollectionType.Book:
        return new BookCollectionStrategy();
      case CollectionType.Paper:
        return new PaperCollectionStrategy();
      case CollectionType.Anime:
        return new AnimeCollectionStrategy();
      case CollectionType.Blog:
        return new BlogCollectionStrategy();
      case CollectionType.Hobby:
        return new HobbyCollectionStrategy();
      case CollectionType.Article:
        return new ArticleCollectionStrategy();
      default:
        throw new AppError(
          `Unknown collection type: ${type}`,
          "UNKNOWN_COLLECTION_TYPE",
        );
    }
  }
}
