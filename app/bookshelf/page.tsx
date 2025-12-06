import { getBooks } from "@/lib/api";

export default async function Bookshelf() {
    const books = await getBooks();

    return (
        <div className="section container mx-auto px-4 mt-12 mb-12">
            <h1 className="title text-4xl font-bold font-serif mb-2">
                Bookshelf <span className="text-gray-400 text-2xl">({books.length})</span>
            </h1>

            <ul className="space-y-3 mt-8">
                {books.map((book, index) => (
                    <li key={index} className="flex items-baseline">
                        <span className="mr-2 text-gray-400">•</span>
                        {book.notes && <span className="text-red-600 mr-2">[notes]</span>}
                        <span className="text-blue-600 font-medium">{book.title}</span>
                        <span className="text-gray-500 ml-1">by {book.author}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
