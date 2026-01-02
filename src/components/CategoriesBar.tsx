import type { Category } from "../types/category";

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function CategoriesBar({ categories, selectedId, onSelect }: Props) {
  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium
              transition
              ${selectedId === cat.id
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border hover:bg-indigo-50"}
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
