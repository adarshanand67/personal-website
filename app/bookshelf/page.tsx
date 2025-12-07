import { getBooks } from "@/lib/api";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Bookshelf() {
  const books = await getBooks();

  return (
    <div className="section container mx-auto px-4 mt-12 mb-12">
      <h1 className="title text-4xl font-bold font-serif mb-2">
        Bookshelf{" "}
        <span className="text-gray-400 text-2xl">({books.length})</span>
      </h1>

      <ul className="space-y-3 mt-8">
        {books.map((book, index) => (
          <li key={index} className="flex items-baseline gap-2">
            <span className="mr-2 text-gray-400">•</span>
            <div className="flex-1 flex items-baseline flex-wrap gap-x-2">
              {book.notes && <span className="text-red-600">[notes]</span>}
              <span className="text-blue-600 font-medium">{book.title}</span>
              <span className="text-gray-500">by {book.author}</span>
              {book.amazonUrl && (
                <Link
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors"
                  title="Buy on Amazon"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Amazon</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
}
