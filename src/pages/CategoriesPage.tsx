import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories.api";
import type { Category, CategoryPayload } from "../types/category";
import CategoryForm from "../components/CategoryForm";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data.sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (payload: CategoryPayload) => {
    await createCategory(payload);
    setShowForm(false);
    loadCategories();
  };

  const handleUpdate = async (payload: CategoryPayload) => {
    if (!selected) return;
    await updateCategory(selected.id, payload);
    setSelected(null);
    setShowForm(false);
    loadCategories();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📂 Categories</h1>
        <button
          onClick={() => {
            setSelected(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          initialData={selected}
          onSubmit={selected ? handleUpdate : handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-sm text-gray-500">Order: {cat.order}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelected(cat);
                  setShowForm(true);
                }}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="px-3 py-1 border border-red-500 text-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
