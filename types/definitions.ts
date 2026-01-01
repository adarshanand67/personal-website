export interface Profile {
  name: string;
  title: string;
  pronouns: string;
  location: string;
  avatar?: string;
  education: {
    university: string;
    degree: string;
    years: string;
    grade: string;
  };
  socials: {
    linkedin: string;
    github: string;
    email: string;
  };
  bio: {
    short: string;
    paragraphs: string[];
  };
}
export interface Hobby {
  name: string;
  description: string;
  icon: string;
}
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  logo?: string | null;
  description?: string;
  highlights: string[];
}
export interface Book {
  title: string;
  author: string;
  image?: string;
  notes?: string;
  recommended?: boolean;
  description?: string;
  keyTakeaways?: string[];
  amazonLink?: string;
  tags?: string[];
}
export interface Paper {
  title: string;
  url: string;
}
export interface Blog {
  date: string;
  title: string;
  slug: string;
  excerpt?: string;
}
export enum WatchStatus {
  Completed = "Completed",
  Planning = "Planning",
}
export enum CollectionType {
  Book = "book",
  Paper = "paper",
  Anime = "anime",
  Blog = "blog",
  Hobby = "hobby",
  Article = "article",
}
export interface AnimeItem {
  title: string;
  isMovie?: boolean;
  status: WatchStatus;
  seasons?: string;
  image?: string;
  recommended?: boolean;
  description?: string;
  tags?: string[];
  year?: string;
  rating?: string;
  keyLearnings?: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  val: number;
  color: string;
  url: string | null;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}
