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
        const booksArray = Array.isArray(res)
          ? res
          : res?.books ?? res?.data ?? [];
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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading books…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            📚 Library Books
          </h1>
          <span className="text-sm text-gray-500">
            {books.length} books
          </span>
        </div>

        {/* Books Grid */}
        <div className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        ">
          {books.map((book) => (
            <div
              key={book.id}
              className="
                group bg-white rounded-2xl shadow-sm
                hover:shadow-xl transition-all duration-300
                overflow-hidden
              "
            >
              {/* Book Image */}
              <div className="relative h-56 bg-gray-100">
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="
                    h-full w-full object-cover
                    group-hover:scale-105 transition-transform duration-300
                  "
                />

                {/* Availability Badge */}
                <span
                  className={`
                    absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      book.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {book.quantity > 0 ? "Available" : "Out of stock"}
                </span>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h2 className="
                  text-lg font-semibold text-gray-800
                  line-clamp-2
                ">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  ✍️ {book.author}
                </p>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    ISBN: {book.isbn}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Qty:{" "}
                    <span
                      className={`font-semibold ${
                        book.quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {book.quantity}
                    </span>
                  </span>

                  <span className="
                    text-xs px-2 py-1 rounded-full
                    bg-gray-100 text-gray-600
                  ">
                    Shelf {book.shelfLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No books found 📭
          </div>
        )}
      </div>
    </div>
  );
}
