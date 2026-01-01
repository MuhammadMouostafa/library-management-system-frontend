import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import BooksPage from "./pages/BooksPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId/books" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
