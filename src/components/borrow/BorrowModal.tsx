import { useState } from "react";
import { borrowBook } from "../../api/borrow.api";

interface Props {
  bookId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BorrowModal({ bookId, onClose, onSuccess }: Props) {
  const [borrowerId, setBorrowerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await borrowBook({
        bookId,
        borrowerId: Number(borrowerId),
        dueDate,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.[0]?.message ||
        "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="number"
          placeholder="Borrower ID"
          className="input w-full mb-3"
          value={borrowerId}
          onChange={(e) => setBorrowerId(e.target.value)}
        />

        <input
          type="datetime-local"
          className="input w-full mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit}>
            Confirm Borrow
          </button>
        </div>
      </div>
    </div>
  );
}