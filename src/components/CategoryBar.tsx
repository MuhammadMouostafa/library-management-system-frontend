import type { Category } from "../types/category";

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function CategoryBar({
  categories,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="bg-blue-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition
              ${
                selectedId === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
