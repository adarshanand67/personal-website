import { ShelfItemStrategy, ShelfStrategyFactory } from "./shelf-strategies";
import { Repository } from "./repositories/repository";
import { BookRepository, PaperRepository, AnimeRepository } from "./repositories/json-repositories";

// Simple DI Container
class DIContainer {
  private static instance: DIContainer;
  private repositories: Map<string, Repository<unknown>> = new Map();

  private constructor() {
    // Register Repositories
    this.repositories.set("book", new BookRepository());
    this.repositories.set("paper", new PaperRepository());
    this.repositories.set("anime", new AnimeRepository());
    // For blogs, we might need a custom Repository if it's not just JSON.
    // For now, let's assume it's passed in via props or we create a Mock one.
    // The current BlogsClient takes `blogs` as a prop from Server Component.
    // So for Blogs, we might handle it differently or create a StaticRepository.
  }

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  public getRepository<T>(type: string): Repository<T> {
    return this.repositories.get(type) as Repository<T>;
  }

  public getStrategy<T>(type: string): ShelfItemStrategy<T> {
    return ShelfStrategyFactory.getStrategy(type);
  }
}

export const container = DIContainer.getInstance();
