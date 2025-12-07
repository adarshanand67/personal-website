import { Repository } from "./repository";
import booksData from "@/data/books.json";
import papersData from "@/data/papers.json";
import entertainmentData from "@/data/entertainment.json";
import { Book, Paper, EntertainmentItem } from "@/types";
import { BookSchema, PaperSchema, EntertainmentItemSchema } from "@/lib/validation";
import { z } from "zod";

export class JsonRepository<T> implements Repository<T> {
  constructor(private data: T[]) {}

  getAll(): T[] {
    return this.data;
  }

  find(query: string): T[] {
    // Basic implementation, subclasses might override or we use Strategy for search
    return this.data;
  }
}

export class BookRepository extends JsonRepository<Book> {
  constructor() {
    // Validate data on initialization
    const validatedData = z.array(BookSchema).parse(booksData);
    super(validatedData as Book[]);
  }
}

export class PaperRepository extends JsonRepository<Paper> {
  constructor() {
    const validatedData = z.array(PaperSchema).parse(papersData);
    super(validatedData as Paper[]);
  }
}

export class AnimeRepository extends JsonRepository<EntertainmentItem> {
  constructor() {
    // The schema allows optional image/notes, matching the type
    // Convert JSON data to match schema if necessary or trust Zod to parse/strip extras
    const validatedData = z.array(EntertainmentItemSchema).parse(entertainmentData);
    super(validatedData as EntertainmentItem[]);
  }
}
