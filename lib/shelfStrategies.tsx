"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Star, ExternalLink, Dumbbell, Tv, Trophy, Bike, Mountain, Dices, Plane, Coffee, Users, Mic } from "lucide-react";
import { useStore } from "@/lib/store/useStore";
import { Book, Paper, Blog, AnimeItem, Project, Hobby, ShelfType } from "@/types/definitions";
import { AnimeShelf } from "@/components/shelves";

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
    const getAmazonSearchUrl = (title: string, author: string) => {
      const searchQuery = encodeURIComponent(`${title} ${author}`);
      return `https://www.amazon.in/s?k=${searchQuery}`;
    };

    // Procedural cover style
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
          {/* Book Spine (Left) */}
          <div className={`
             absolute top-1 left-0 w-4 h-[98%] -translate-x-3 translate-z-[-2px] rotate-y-[-90deg] origin-right
             ${coverColor} brightness-75 rounded-l-sm
           `}></div>

          {/* Book Cover (Front) */}
          <div className={`
             absolute inset-0 flex flex-col p-4 ${coverColor} 
             bg-gradient-to-br from-white/10 to-black/20
             border-r-2 border-white/10 rounded-r-md rounded-l-sm
           `}>
            {/* Title */}
            <div className="flex-1 border-2 border-white/20 p-2 flex flex-col items-center justify-center text-center">
              <h3 className="font-serif font-bold text-white text-lg leading-tight line-clamp-4 drop-shadow-md">
                {book.title}
              </h3>
            </div>

            {/* Author */}
            <div className="mt-4 text-center">
              <p className="text-xs text-white/80 font-mono uppercase tracking-widest truncate max-w-full">
                {book.author}
              </p>
            </div>

            {/* Recommended Badge */}
            {book.recommended && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                <Star size={12} fill="currentColor" />
              </div>
            )}

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>

            {/* Spine Crease Effect */}
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
      <div className="space-y-2">{items.map((paper, index) => this.renderItem(paper, index))}</div>
    );
  }
  filter(items: Paper[], query: string): Paper[] {
    if (!query) return items;
    return items.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase()));
  }
}
export class AnimeCardStrategy implements ShelfItemStrategy<AnimeItem> {
  renderItem(_item: AnimeItem, _index: number): ReactNode {
    return null;
  }
  renderList(items: AnimeItem[]): ReactNode {
    return <AnimeShelf items={items} />;
  }
  filter(items: AnimeItem[], query: string): AnimeItem[] {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))) ||
        (item.notes && item.notes.toLowerCase().includes(lowerQuery))
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
      <>
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {year}
            </h2>
            <div className="space-y-2">
              {blogsByYear[year]!.map((post) => this.renderItem(post))}
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
export class ProjectListStrategy implements ShelfItemStrategy<Project> {
  renderItem(project: Project, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${project.title}`}
        key={index}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <Link
          href={project.link}
          target="_blank"
          className="text-xl font-bold text-green-700 dark:text-green-400 hover:underline block mb-2"
        >
          {project.title}
        </Link>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
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
      <div className="space-y-8">
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
      return <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />;
    }
    return <span className="text-2xl">🎮</span>;
  }
  renderItem(hobby: Hobby, index: number): ReactNode {
    return (
      <div
        id={`shelf-item-${hobby.name}`}
        key={index}
        onClick={() => useStore.getState().setHobbySelectedItem(hobby)}
        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <div className="shrink-0 p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
          {this.getIcon(hobby.icon)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{hobby.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
            {hobby.description}
          </p>
        </div>
      </div>
    );
  }
  renderList(items: Hobby[]): ReactNode {
    if (items.length === 0) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="space-y-12">
        {papers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono">
              <span className="text-green-600">01.</span> Research Papers
            </h2>
            {new PaperListStrategy().renderList(papers)}
          </div>
        )}
        {blogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono">
              <span className="text-green-600">{papers.length > 0 ? '02.' : '01.'}</span> Blogs
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
