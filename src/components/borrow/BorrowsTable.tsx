import type { Borrow } from "../../types/borrow";
import { returnBook } from "../../api/borrow.api";

export default function BorrowsTable({
  borrows,
  onBookReturned,
}: {
  borrows: Borrow[];
  onBookReturned: () => void;
}) {
  const handleReturn = async (id: number) => {
    if (!confirm("Mark this book as returned?")) return;

    await returnBook(id);
    onBookReturned();
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Book</th>
            <th className="p-3">Borrower</th>
            <th className="p-3">Borrow Date</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Return Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {borrows.map(b => {
            const returned = Boolean(b.returnDate);

            return (
              <tr
                key={b.id}
                className={`border-t ${
                  returned ? "bg-green-50" : ""
                }`}
              >
                <td className="p-3">{b.bookTitle}</td>
                <td className="p-3">{b.borrowerName}</td>
                <td className="p-3">
                  {new Date(b.borrowDate).toLocaleString()}
                </td>
                <td className="p-3">
                  {new Date(b.dueDate).toLocaleString()}
                </td>
                <td className="p-3">
                  {returned
                    ? new Date(b.returnDate!).toLocaleString()
                    : "—"}
                </td>

                <td className="p-3 text-center">
                  {!returned ? (
                    <button
                      onClick={() => handleReturn(b.id)}
                      className="px-3 py-1 text-sm rounded bg-amber-600 text-white hover:bg-amber-700"
                    >
                      Return
                    </button>
                  ) : (
                    <span className="text-green-700 text-sm font-medium">
                      Returned
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
