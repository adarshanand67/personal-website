import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default async function Bookshelf() {
  const books = await getBooks();

  // Generate Amazon search URL from book title and author
  const getAmazonSearchUrl = (title: string, author: string) => {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    return `https://www.amazon.in/s?k=${searchQuery}`;
  };

  // Generate Open Library cover URL from book title
  const getBookCoverUrl = (title: string) => {
    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`;
  };

  const readBooks = books.filter((book: any) => book.status === "Completed" || !book.status);
  const readingBooks = books.filter((book: any) => book.status === "Reading");
  const plannedBooks = books.filter((book: any) => book.status === "Planning");

  const BookCard = ({ book, index }: { book: any; index: number }) => {
    // Use Open Library cover API
    const coverUrl =
      book.image ||
      `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`;

    return (
      <SpotlightCard className="h-full flex flex-col p-0">
        <div className="relative w-full aspect-[2/3] bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="text-gray-400 text-sm font-mono">{book.title}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold text-base leading-tight flex items-start gap-2">
              <span className="line-clamp-2">{book.title}</span>
              {book.recommended && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5" />
              )}
            </h3>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">by {book.author}</p>

          {book.notes && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 italic">
              {book.notes}
            </p>
          )}

          <div className="mt-auto pt-2">
            <Link
              href={getAmazonSearchUrl(book.title, book.author)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors"
              title={`Search "${book.title}" on Amazon`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Amazon</span>
            </Link>
          </div>
        </div>
      </SpotlightCard>
    );
  };
  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-2">
        Bookshelf <span className="text-gray-400 text-2xl">({books.length})</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A collection of books I&apos;ve read and recommend.
      </p>

      {/* Read Books */}
      {readBooks.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            Read <span className="text-gray-400 text-lg">({readBooks.length})</span>
          </h2>

          <div className="grid grid-cols-4 gap-3">
            {readBooks.map((book: any, index: number) => (
              <BookCard key={index} book={book} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Currently Reading */}
      {readingBooks.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            Reading <span className="text-gray-400 text-lg">({readingBooks.length})</span>
          </h2>

          <div className="grid grid-cols-4 gap-3">
            {readingBooks.map((book: any, index: number) => (
              <BookCard key={index} book={book} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Planning to Read */}
      {plannedBooks.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            Planning <span className="text-gray-400 text-lg">({plannedBooks.length})</span>
          </h2>

          <div className="grid grid-cols-4 gap-3">
            {plannedBooks.map((book: any, index: number) => (
              <BookCard key={index} book={book} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
