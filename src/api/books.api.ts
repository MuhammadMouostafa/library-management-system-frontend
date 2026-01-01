import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import type { Book } from "../types/book";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getBooksByCategory = async (categoryId = 0, page = 1, limit = 10) => {
  const res = await api.get(`/books/category?categoryId=${categoryId}&page=${page}&limit=${limit}`);
  return res.data;
};

export const searchBooks = async (q: string, page = 1) => {
  const res = await api.get(`/books/search?q=${q}&page=${page}`);
  return res.data;
};

export const createBook = async (book: Omit<Book, "id">) => {
  const res = await api.post("/books", book);
  return res.data;
};

export const updateBook = async (id: number, book: Partial<Book>) => {
  const res = await api.put(`/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id: number) => {
  const res = await api.delete(`/books/${id}`);
  return res.data;
};
