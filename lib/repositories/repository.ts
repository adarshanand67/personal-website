export interface Repository<T> {
  getAll(): T[];
  find(query: string): T[];
}
