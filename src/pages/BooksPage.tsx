import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBooksByCategory,
  createBook,
  updateBook,
  deleteBook,
} from "../api/books.api";
import type { Book } from "../types/book";
import BookModal from "../components/BookModal";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (!categoryId) return;

    const fetchBooks = async () => {
      try {
        const data = await getBooksByCategory(Number(categoryId));
        setBooks(data.books ?? data);
      } catch (err) {
        console.error("API ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId]);


  const handleAdd = async (data: Omit<Book, "id">) => {
    await createBook(data);
    setModalOpen(false);
    loadBooks();
  };

  const handleEdit = async (data: Omit<Book, "id">) => {
    if (!editingBook) return;
    await updateBook(editingBook.id, data);
    setEditingBook(null);
    loadBooks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this book?")) return;
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Books</h1>
        <button
          onClick={() => navigate("/admin/categories")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Categories
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Book
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={book.imageURL}
              alt={book.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditingBook(book);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookModal
        open={modalOpen}
        initialData={editingBook}
        onClose={() => {
          setModalOpen(false);
          setEditingBook(null);
        }}
        onSubmit={editingBook ? handleEdit : handleAdd}
      />
    </div>
  );
}
