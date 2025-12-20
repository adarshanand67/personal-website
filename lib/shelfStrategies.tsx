"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Star, ExternalLink, Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic, Check } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { Book, Paper, Blog, AnimeItem, Project, Hobby, ShelfType, WatchStatus, AnimeType } from "@/types/definitions";
import Image from "next/image";

const iconMap: Record<string, React.ElementType> = {
  Dumbbell, Tv, Book: Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic
};

export type ShelfItem = Book | Paper | AnimeItem | Blog | Project | Hobby;

export interface ShelfItemStrategy<T> {
  renderItem(item: T, index: number): ReactNode;
  renderList(items: T[]): ReactNode;
  filter(items: T[], query: string): T[];
}

// Helper to generate consistent book cover styles from title
const bookPatterns = [
  'bg-red-900', 'bg-blue-900', 'bg-green-900', 'bg-amber-900',
  'bg-slate-800', 'bg-purple-900', 'bg-indigo-900', 'bg-rose-900'
];

const getBookStyle = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash);
  const colorIndex = Math.abs(hash) % bookPatterns.length;
  return bookPatterns[colorIndex];
};

export class BookListStrategy implements ShelfItemStrategy<Book> {
  renderItem(book: Book, index: number): ReactNode {
    const coverColor = getBookStyle(book.title);
    return (
      <div
        id={`shelf-item-${book.title}`}
        key={index}
        onClick={() => useStore.getState().setBookSelectedItem(book)}
        className="group relative block w-full aspect-[2/3] perspective-1000 cursor-pointer"
      >
        <div className={`
          relative w-full h-full transition-all duration-500 transform-style-3d 
          group-hover:rotate-y-[-20deg] group-hover:translate-x-2 group-hover:-translate-y-2
          shadow-lg group-hover:shadow-2xl
        `}>
          <div className={`
             absolute top-1 left-0 w-4 h-[98%] -translate-x-3 translate-z-[-2px] rotate-y-[-90deg] origin-right
             ${coverColor} brightness-75 rounded-l-sm
           `}></div>

          <div className={`
             absolute inset-0 flex flex-col p-4 ${coverColor} 
             bg-gradient-to-br from-white/10 to-black/20
             border-r-2 border-white/10 rounded-r-md rounded-l-sm
           `}>
            <div className="flex-1 border-2 border-white/20 p-2 flex flex-col items-center justify-center text-center">
              <h3 className="font-serif font-bold text-white text-lg leading-tight line-clamp-4 drop-shadow-md">
                {book.title}
              </h3>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate max-w-full">
                {book.author}
              </p>
            </div>
            {book.recommended && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                <Star size={12} fill="currentColor" />
              </div>
            )}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 left-2 bottom-0 w-1 bg-black/20 blur-[1px]"></div>
          </div>
        </div>
      </div>
    );
  }

  renderList(items: Book[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 px-4 py-8">
        {items.map((book, index) => this.renderItem(book, index))}
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

export class PaperListStrategy implements ShelfItemStrategy<Paper> {
  renderItem(paper: Paper, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${paper.title}`}
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
      <div className="space-y-4">{items.map((paper, index) => this.renderItem(paper, index))}</div>
    );
  }
  filter(items: Paper[], query: string): Paper[] {
    if (!query) return items;
    return items.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase()));
  }
}

export class AnimeCardStrategy implements ShelfItemStrategy<AnimeItem> {
  renderItem(anime: AnimeItem, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${anime.title}`}
        key={index}
        onClick={() => useStore.getState().setAnimeSelectedItem(anime)}
        className="group flex flex-col gap-3 cursor-pointer relative"
      >
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
          {anime.image ? (
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Tv size={48} />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-xs font-bold uppercase tracking-wider bg-green-500 px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </div>
          </div>
        </div>

        <div className="px-1">
          <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight group-hover:text-green-500 transition-colors line-clamp-2 mb-1.5 flex items-center gap-1.5">
            {anime.title}
            {anime.status === WatchStatus.Completed && (
              <Check size={12} className="text-green-500 flex-shrink-0" />
            )}
            {anime.recommended && (
              <Star size={12} fill="currentColor" className="text-amber-400 flex-shrink-0" />
            )}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            <span className="text-[9px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded">
              {anime.type}
            </span>
            {anime.tags?.slice(0, 3).map((tag, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  useStore.getState().setAnimeSelectedTag(tag);
                }}
                className="text-[9px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded hover:bg-green-500 hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  renderList(items: AnimeItem[]): ReactNode {
    if (items.length === 0) return null;

    // Separate anime series from movies
    const series = items.filter(item => item.type === AnimeType.Anime || item.type === AnimeType.WebSeries);
    const movies = items.filter(item => item.type === AnimeType.Movie);

    return (
      <div className="space-y-16">
        {series.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
              <span className="text-green-500/20 text-3xl font-mono">/</span>
              Anime Series
              <span className="text-gray-400 text-sm font-normal">({series.length})</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {series.map((anime, index) => this.renderItem(anime, index))}
            </div>
          </div>
        )}

        {movies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-4">
              <span className="text-green-500/20 text-3xl font-mono">/</span>
              Anime Movies
              <span className="text-gray-400 text-sm font-normal">({movies.length})</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {movies.map((anime, index) => this.renderItem(anime, index))}
            </div>
          </div>
        )}
      </div>
    );
  }

  filter(items: AnimeItem[], query: string): AnimeItem[] {
    // Only return completed (watched) animes
    const watchedItems = items.filter(item => item.status === WatchStatus.Completed);

    if (!query) return watchedItems;
    const lowerQuery = query.toLowerCase();
    return watchedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
    );
  }
}

export class BlogListStrategy implements ShelfItemStrategy<Blog> {
  renderItem(blog: Blog): ReactNode {
    return (
      <div
        id={`shelf-item-${blog.title}`}
        key={blog.slug}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
          <span className="text-gray-500 text-xs min-w-[80px]">{blog.date}</span>
          <Link
            href={`/articleshelf/${blog.slug}`}
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
        const year = blog.date.split("-")[0] || 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year]!.push(blog);
        return acc;
      },
      {} as Record<string, Blog[]>
    );
    const years = Object.keys(blogsByYear).sort((a, b) => Number(b) - Number(a));
    return (
      <div className="space-y-12 py-8">
        {years.map((year) => (
          <div key={year}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-4">
              <span className="text-green-500/20 text-3xl font-mono">/</span>
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
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (blog) => blog.title.toLowerCase().includes(lowerQuery) || blog.date.includes(lowerQuery)
    );
  }
}

export class ProjectListStrategy implements ShelfItemStrategy<Project> {
  renderItem(project: Project, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${project.title}`}
        key={index}
        className="group relative glass p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors">
            {project.title}
          </h3>
          <Link
            href={project.link}
            target="_blank"
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-green-500 transition-colors"
          >
            <ExternalLink size={20} />
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }
  renderList(items: Project[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        {items.map((project, index) => this.renderItem(project, index))}
      </div>
    );
  }
  filter(items: Project[], query: string): Project[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.tech.some((t) => t.toLowerCase().includes(lowerQuery))
    );
  }
}

export class HobbyListStrategy implements ShelfItemStrategy<Hobby> {
  private getIcon(iconName: string): ReactNode {
    const IconComponent = iconMap[iconName] as any;
    if (IconComponent) {
      return <IconComponent className="w-8 h-8 text-green-600 dark:text-green-400" />;
    }
    return <span className="text-3xl">🎮</span>;
  }
  renderItem(hobby: Hobby, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${hobby.name}`}
        key={index}
        onClick={() => useStore.getState().setHobbySelectedItem(hobby)}
        className="group p-8 glass rounded-3xl border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500 cursor-pointer overflow-hidden relative"
      >
        <div className="relative z-10">
          <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 w-fit">
            {this.getIcon(hobby.icon)}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{hobby.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
            {hobby.description}
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 scale-150 rotate-12">
          {this.getIcon(hobby.icon)}
        </div>
      </div>
    );
  }
  renderList(items: Hobby[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        {items.map((hobby, index) => this.renderItem(hobby, index))}
      </div>
    );
  }
  filter(items: Hobby[], query: string): Hobby[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (hobby) =>
        hobby.name.toLowerCase().includes(lowerQuery) ||
        hobby.description.toLowerCase().includes(lowerQuery)
    );
  }
}

export class ArticleListStrategy implements ShelfItemStrategy<Blog | Paper> {
  renderItem(item: Blog | Paper, index: number): ReactNode {
    if ('url' in item) {
      return new PaperListStrategy().renderItem(item as Paper, index);
    }
    return new BlogListStrategy().renderItem(item as Blog);
  }

  renderList(items: (Blog | Paper)[]): ReactNode {
    const papers = items.filter((i): i is Paper => 'url' in i);
    const blogs = items.filter((i): i is Blog => 'slug' in i);

    return (
      <div className="space-y-24 py-8">
        {papers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
              <span className="text-green-500/20 text-4xl font-mono">01</span>
              Research Papers
            </h2>
            <div className="space-y-4">
              {new PaperListStrategy().renderList(papers)}
            </div>
          </div>
        )}
        {blogs.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
              <span className="text-green-500/20 text-4xl font-mono">{papers.length > 0 ? '02' : '01'}</span>
              Blogs & Articles
            </h2>
            {new BlogListStrategy().renderList(blogs)}
          </div>
        )}
      </div>
    );
  }

  filter(items: (Blog | Paper)[], query: string): (Blog | Paper)[] {
    if (!query) return items;
    const papers = items.filter((i): i is Paper => 'url' in i);
    const blogs = items.filter((i): i is Blog => 'slug' in i);

    return [
      ...new PaperListStrategy().filter(papers, query),
      ...new BlogListStrategy().filter(blogs, query)
    ];
  }
}

export class ShelfStrategyFactory {
  static getStrategy(type: ShelfType): ShelfItemStrategy<ShelfItem> {
    switch (type) {
      case ShelfType.Book:
        return new BookListStrategy();
      case ShelfType.Paper:
        return new PaperListStrategy();
      case ShelfType.Anime:
        return new AnimeCardStrategy();
      case ShelfType.Blog:
        return new BlogListStrategy();
      case ShelfType.Project:
        return new ProjectListStrategy();
      case ShelfType.Hobby:
        return new HobbyListStrategy();
      case ShelfType.Article:
        return new ArticleListStrategy();
      default:
        throw new Error(`Unknown shelf type: ${type}`);
    }
  }
}
