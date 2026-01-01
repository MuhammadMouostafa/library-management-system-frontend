import type { Book } from "../types/book";

interface Props {
  books: Book[];
}

export default function PublicBooksGrid({ books }: Props) {
  if (books.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No books in this category 📭
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={book.imageURL}
            alt={book.title}
            className="h-48 w-full object-cover"
          />

          <div className="p-4">
            <h3 className="font-semibold text-lg line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {book.author}
            </p>

            <div className="mt-3 text-sm">
              <span
                className={`font-semibold ${
                  book.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.quantity > 0 ? "Available" : "Out of stock"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
