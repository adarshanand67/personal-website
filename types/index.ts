export interface Profile {
  name: string;
  title: string;
  pronouns: string;
  location: string;
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

export type EntertainmentType = "Anime" | "Movie" | "Web Series";
export type WatchStatus = "Completed" | "Planning" | "Watching";

export interface EntertainmentItem {
  title: string;
  type: EntertainmentType;
  status: WatchStatus;
  notes?: string;
  image?: string;
  recommended?: boolean;
}

export interface Volunteering {
  organization: string;
  role: string;
  additionalInfo?: string;
}
