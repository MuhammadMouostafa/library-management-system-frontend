import PublicBookCard from "./PublicBookCard";
import type { Book } from "../types/book";

export default function PublicBooksGrid({
  books,
  onBorrowSuccess,
}: {
  books: Book[];
  onBorrowSuccess: () => void;
}) {
  if (!Array.isArray(books)) return null;

  return (
    <div
      className="
        grid gap-6
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
    >
      {books.map(book => (
        <PublicBookCard
          key={book.id}
          book={book}
          onBorrowSuccess={onBorrowSuccess}
        />
      ))}
    </div>
  );
}
