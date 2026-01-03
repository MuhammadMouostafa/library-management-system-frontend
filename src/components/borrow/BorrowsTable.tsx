import type { Borrow } from "../../types/borrow";

export default function BorrowsTable({ borrows }: { borrows: Borrow[] }) {
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
          </tr>
        </thead>
        <tbody>
          {borrows.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.bookTitle}</td>
              <td className="p-3">{b.borrowerName}</td>
              <td className="p-3">{new Date(b.borrowDate).toLocaleString()}</td>
              <td className="p-3">{new Date(b.dueDate).toLocaleString()}</td>
              <td className="p-3">
                {b.returnDate
                  ? new Date(b.returnDate).toLocaleString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
