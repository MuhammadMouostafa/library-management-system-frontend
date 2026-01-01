import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();


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
            onClick={() => navigate(`/admin/categories/${cat.id}/books`)}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg hover:cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-sm text-gray-500">Order: {cat.order}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(cat);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(cat.id);
                }}
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
