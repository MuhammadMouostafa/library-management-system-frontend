import { useEffect, useState } from "react";
import {
  getBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
} from "../api/borrowers.api";
import type { Borrower } from "../types/borrower";
import BorrowerForm from "../components/admin/BorrowerForm";

export default function BorrowersPage() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [editing, setEditing] = useState<Borrower | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadBorrowers = async () => {
    const data = await getBorrowers();
    // setBorrowers(data);
    setBorrowers(data.borrowers ?? data);
  };

  useEffect(() => {
    loadBorrowers();
  }, []);

  const handleSave = async (data: Omit<Borrower, "id">) => {
    if (editing) {
      await updateBorrower(editing.id, data);
    } else {
      await createBorrower(data);
    }
    setShowForm(false);
    setEditing(null);
    loadBorrowers();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this borrower?")) {
      await deleteBorrower(id);
      loadBorrowers();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Borrowers</h1>
        <button
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Borrower
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowers.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.email}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setEditing(b);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <BorrowerForm
            initialData={editing}
            onSubmit={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
