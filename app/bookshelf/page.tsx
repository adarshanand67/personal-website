"use client";

import booksData from "@/data/books.json";
import Link from "next/link";
import { ExternalLink, Star, Search } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useState, useMemo } from "react";

interface Book {
  title: string;
  author: string;
  image?: string;
  notes?: string;
  recommended?: boolean;
  status?: string;
  rating?: number;
}

export default function Bookshelf() {
  const books: Book[] = booksData;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    if (searchQuery.trim() === "") return books;
    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
  }, [searchQuery, books]);

  const getAmazonSearchUrl = (title: string, author: string) => {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    return `https://www.amazon.in/s?k=${searchQuery}`;
  };

  const BookCard = ({ book }: { book: Book }) => {
    const coverUrl =
      book.image ||
      `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`;

    return (
      <SpotlightCard className="h-full flex flex-col p-0">
        <div className="relative w-full aspect-[2/3] bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1 gap-1">
            <h3 className="font-bold text-xs leading-tight flex items-start gap-1">
              <span className="line-clamp-2">{book.title}</span>
              {book.recommended && (
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
              )}
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">by {book.author}</p>
          <div className="mt-auto">
            <Link
              href={getAmazonSearchUrl(book.title, book.author)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 dark:text-orange-500 text-xs transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Amazon
            </Link>
          </div>
        </div>
      </SpotlightCard>
    );
  };

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-2">
        Bookshelf <span className="text-gray-400 text-2xl">({filteredBooks.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        A collection of books I&apos;ve read and recommend.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books by title or author..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No books found matching &quot;{searchQuery}&quot;
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
