import { useEffect, useState } from "react";
import { getBooks } from "../api/books.api";
import type { Book } from "../types/book";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await getBooks();

      console.log("RAW API RESPONSE:", res);
      console.log("TYPE:", typeof res);
      console.log("IS ARRAY:", Array.isArray(res));

      // API returns a paginated object (e.g. { totalBooks, pageNumber, books: [...] })
      // Ensure we always set an array to `books` so `.map` is safe.
      const booksArray = Array.isArray(res) ? res : res?.books ?? res?.data ?? [];
      setBooks(booksArray);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);


  if (loading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 Books</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">✍️ {book.author}</p>
            <p className="text-sm mt-2">ISBN: {book.isbn}</p>
            <p className="mt-2">
              Quantity:{" "}
              <span
                className={`font-bold ${
                  book.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.quantity}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Shelf: {book.shelfLocation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
