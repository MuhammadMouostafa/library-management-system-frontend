import { useEffect, useState } from "react";
import type { Borrower } from "../../types/borrower";

interface Props {
  initialData?: Borrower | null;
  onSubmit: (data: Omit<Borrower, "id">) => void;
  onCancel: () => void;
}

const emptyBorrower = {
  name: "",
  email: "",
};

export default function BorrowerForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState(emptyBorrower);

  useEffect(() => {
    if (initialData) {
      const { id, registeredDate, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(emptyBorrower);
    }
  }, [initialData]);

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Borrower" : "Add Borrower"}
      </h2>

      <input
        className="input mb-3"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input mb-4"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={() => onSubmit(form)}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
}
