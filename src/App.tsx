import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import BooksPage from "./pages/BooksPage";
import BorrowersPage from "./pages/BorrowersPage";
import BorrowsPage from "./pages/BorrowsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />

        {/* Admin */}
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/categories/:categoryId/books" element={<BooksPage />} />
        <Route path="/admin/borrowers" element={<BorrowersPage />} />
        <Route path="/admin/borrows" element={<BorrowsPage />} />

      </Routes>
    </BrowserRouter>
  );
}
