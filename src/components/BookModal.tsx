import { useEffect, useState } from "react";
import type { Book } from "../types/book";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Book, "id">) => void;
  initialData?: Book | null;
};

const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  quantity: 0,
  shelfLocation: "",
  imageURL: "",
  categoryId: 0,
  activeBorrows: 0,
  availableQuantity: 0
};

export default function BookModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState(emptyBook);

    useEffect(() => {
    if (initialData) {
        setForm({
        title: initialData.title,
        author: initialData.author,
        isbn: initialData.isbn,
        quantity: initialData.quantity,
        shelfLocation: initialData.shelfLocation,
        imageURL: initialData.imageURL,
        categoryId: initialData.categoryId,
        activeBorrows: initialData.activeBorrows,
        availableQuantity: initialData.availableQuantity
        });
    } else {
        setForm(emptyBook);
    }
    }, [initialData]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Book" : "Add Book"}
        </h2>

        <div className="grid gap-3">
            {Object.entries(form).map(([key, value]) => (
            <input
                key={key}
                className="border rounded p-2"
                placeholder={key}
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                onChange={(e) =>
                setForm({
                    ...form,
                    [key]:
                    typeof value === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                })
                }
            />
            ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => onSubmit(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
