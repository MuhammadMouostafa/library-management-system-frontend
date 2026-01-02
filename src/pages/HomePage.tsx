import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoriesBar from "../components/CategoriesBar";
import PublicBooksGrid from "../components/PublicBooksGrid";
import { getCategories } from "../api/categories.api";
import { getBooksByCategory, searchBooks } from "../api/books.api";
import { useDebounce } from "../hooks/useDebounce";
import { Link } from "react-router-dom";

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

      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Library Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Admin Quick Actions */}
          <Link
            to="/admin/categories"
            className="group bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-semibold group-hover:text-amber-600">
              Manage Categories
            </h3>
            <p className="text-gray-600 mt-1">
              Create, edit and organize book categories
            </p>
          </Link>

          {/* Borrowers */}
          <Link
            to="/admin/borrowers"
            className="group bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">🧑‍💼</div>
            <h3 className="text-lg font-semibold group-hover:text-amber-600">
              Manage Borrowers
            </h3>
            <p className="text-gray-600 mt-1">
              Add, update and manage library members
            </p>
          </Link>

          {/* Books (optional but recommended) */}
          <Link
            to="/admin/books"
            className="group bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-lg font-semibold group-hover:text-amber-600">
              Manage Books
            </h3>
            <p className="text-gray-600 mt-1">
              Control inventory and book details
            </p>
          </Link>

        </div>
      </section>


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
