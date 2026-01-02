import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoriesBar from "../components/CategoriesBar";
import PublicBooksGrid from "../components/PublicBooksGrid";
import { getCategories } from "../api/categories.api";
import { getBooksByCategory, searchBooks } from "../api/books.api";
import { useDebounce } from "../hooks/useDebounce";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  // Load categories
  useEffect(() => {
    getCategories().then(res => {
      setCategories(res);
      if (res.length) setSelectedCategory(res[0].id);
    });
  }, []);

  // Search OR category books
  useEffect(() => {
    if (debouncedSearch.trim()) {
      searchBooks(debouncedSearch).then(res => {
        setBooks(res.books ?? res);
      });
    } else if (selectedCategory) {
      getBooksByCategory(selectedCategory).then(res => {
        setBooks(res.books ?? res);
      });
    }
  }, [debouncedSearch, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} onSearchChange={setSearch} />

      {/* Hide categories when searching */}
      {!search && (
        <CategoriesBar
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {books.length === 0 ? (
          <p className="text-center text-gray-500">
            No books found 📭
          </p>
        ) : (
          <PublicBooksGrid books={books} />
        )}
      </main>
    </div>
  );
}
