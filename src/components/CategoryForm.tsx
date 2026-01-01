import { useEffect, useState } from "react";
import type { Category, CategoryPayload } from "../types/category";

interface Props {
  initialData?: Category | null;
  onSubmit: (data: CategoryPayload) => Promise<void>;
  onCancel: () => void;
}

const emptyCategory: CategoryPayload = {
  name: "",
  order: 0,
};

export default function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<CategoryPayload>(emptyCategory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        order: initialData.order,
      });
    } else {
      setForm(emptyCategory);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Category" : "Add Category"}
      </h2>

      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Category name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        className="w-full border rounded px-3 py-2"
        placeholder="Order"
        value={form.order}
        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
