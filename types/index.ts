export interface Book {
  title: string;
  author: string;
  image?: string;
  notes?: string;
  recommended?: boolean;
  status?: string;
  rating?: number;
}

export interface Paper {
  title: string;
  url: string;
}

export interface Blog {
  date: string;
  title: string;
  slug: string;
}

export type EntertainmentType = "Anime" | "Movie" | "Web Series";
export type WatchStatus = "Watching" | "Completed" | "Planning";

export interface EntertainmentItem {
  title: string;
  type: EntertainmentType;
  status: WatchStatus;
  notes?: string;
  image?: string;
  recommended?: boolean;
}
