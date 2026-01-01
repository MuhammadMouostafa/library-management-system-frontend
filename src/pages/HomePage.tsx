import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import PublicBooksGrid from "../components/PublicBooksGrid";
import { getCategories } from "../api/categories.api";
import { getBooksByCategory } from "../api/books.api";
import type { Category } from "../types/category";
import type { Book } from "../types/book";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const cats = await getCategories();
      setCategories(cats);

      if (cats.length > 0) {
        setSelectedCategory(cats[0].id);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadBooks = async () => {
      setLoading(true);
      const data = await getBooksByCategory(selectedCategory);
      setBooks(data.books ?? data);
      setLoading(false);
    };

    loadBooks();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <CategoryBar
        categories={categories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center">Loading books...</p>
        ) : (
          <PublicBooksGrid books={books} />
        )}
      </main>
    </div>
  );
}
