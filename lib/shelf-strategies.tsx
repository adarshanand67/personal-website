import { Book, Paper, Blog, EntertainmentItem, Project, Hobby, EntertainmentType, WatchStatus, ShelfType } from "@/types";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star, Check, Camera, BookOpen, Gamepad2, Activity, Dumbbell, Flower2, Bike, Mountain, ChefHat, Plane, Dices, Tv, Mic, Palette, Shapes, Trophy, Waves, Coffee } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

// Union type for all shelf items
export type ShelfItem = Book | Paper | EntertainmentItem | Blog | Project | Hobby;

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
          <div className="w-full aspect-[2/3] mb-4 overflow-hidden rounded-md relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center p-4">
            <span className="text-gray-400 text-sm text-center">{item.title}</span>
          </div>
        )}
        <h3 className="font-bold text-lg leading-tight mb-2 flex items-center gap-2">
          {item.title}
          {item.status === WatchStatus.Completed && (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
              <Check className="w-3 h-3 text-green-600 dark:text-green-400" strokeWidth={3} />
            </div>
          )}
          {item.recommended && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
        </h3>
        {item.notes && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-auto font-mono break-words">{item.notes}</p>
        )}
      </SpotlightCard>
    );
  }

  renderList(items: EntertainmentItem[]): ReactNode {
    const filterItems = (
      items: EntertainmentItem[],
      type: EntertainmentType,
      status: WatchStatus
    ) => {
      return items.filter((item) => item.type === type && item.status === status);
    };

    const animeCompleted = filterItems(items, EntertainmentType.Anime, WatchStatus.Completed);
    const animePlanning = filterItems(items, EntertainmentType.Anime, WatchStatus.Planning);
    const movieCompleted = filterItems(items, EntertainmentType.Movie, WatchStatus.Completed);
    const moviePlanning = filterItems(items, EntertainmentType.Movie, WatchStatus.Planning);

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
  renderItem(blog: Blog, _index: number): ReactNode {
    return (
      <div
        key={blog.slug}
        className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 hover:border-green-500 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
          <span className="text-gray-500 text-xs min-w-[80px]">{blog.date}</span>
          <Link
            href={`/blogshelf/${blog.slug}`}
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
              <span className="text-gray-500">##</span> {year}
            </h2>
            <div className="space-y-2">
              {blogsByYear[year]!.map((post, index) => this.renderItem(post, index))}
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

// Concrete Strategy: Project List Item
export class ProjectListStrategy implements ShelfItemStrategy<Project> {
  renderItem(project: Project, index: number): ReactNode {
    return (
      <div
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

// Concrete Strategy: Hobby List Item
export class HobbyListStrategy implements ShelfItemStrategy<Hobby> {
  private getIcon(iconName: string): ReactNode {
    const props = { className: "w-6 h-6 text-green-600 dark:text-green-400" };
    switch (iconName) {
      case "Camera":
        return <Camera {...props} />;
      case "BookOpen":
        return <BookOpen {...props} />;
      case "Gamepad2":
        return <Gamepad2 {...props} />;
      case "Dumbbell":
        return <Dumbbell {...props} />;
      case "Flower2":
        return <Flower2 {...props} />;
      case "Bike":
        return <Bike {...props} />;
      case "Mountain":
        return <Mountain {...props} />;
      case "ChefHat":
        return <ChefHat {...props} />;
      case "Plane":
        return <Plane {...props} />;
      case "Dices":
        return <Dices {...props} />;
      case "Tv":
        return <Tv {...props} />;
      case "Mic":
        return <Mic {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Shapes":
        return <Shapes {...props} />;
      case "Trophy":
        return <Trophy {...props} />;
      case "Waves":
        return <Waves {...props} />;
      case "Coffee":
        return <Coffee {...props} />;
      default:
        return <Activity {...props} />;
    }
  }

  renderItem(hobby: Hobby, index: number): ReactNode {
    return (
      <div
        key={index}
        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="shrink-0 p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm">
          {this.getIcon(hobby.icon)}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{hobby.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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


// Factory to create strategies
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
      default:
        throw new Error(`Unknown shelf type: ${type}`);
    }
  }
}
