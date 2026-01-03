import { useState } from "react";
import type { Book } from "../types/book";
import BorrowModal from "./borrow/BorrowModal";

export default function PublicBookCard({
  book,
  onBorrowSuccess,
}: {
  book: Book;
  onBorrowSuccess: () => void;
}) {
  const [showBorrow, setShowBorrow] = useState(false);

  return (
    <div
      className="
        bg-white rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl transition
        group
      "
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={book.imageURL}
          alt={book.title}
          className="
            h-full w-full object-cover
            group-hover:scale-105 transition duration-300
          "
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>

        <div className="flex justify-between items-center pt-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full
              ${
                book.availableQuantity > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {book.availableQuantity > 0 ? "Available" : "Out of stock"}
          </span>

          <span className="text-xs text-gray-400">
            Shelf {book.shelfLocation}
          </span>
        </div>
        <p className="text-sm text-gray-500"> Quantity {book.quantity}</p>
        <p className="text-sm text-gray-500">Available Quantity {book.availableQuantity}</p>
        <p className="text-sm text-gray-500">Active Borrows {book.activeBorrows}</p>

        <button
          disabled={book.availableQuantity === 0}
          className="btn-primary w-full mt-3 disabled:opacity-50"
          onClick={() => setShowBorrow(true)}
        >
          Borrow
        </button>
      </div>

      {showBorrow && (
        <BorrowModal
          bookId={book.id}
          onClose={() => setShowBorrow(false)}
          onSuccess={onBorrowSuccess}
        />
      )}
    </div>
  );
}
