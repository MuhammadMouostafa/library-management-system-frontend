import axios from "axios";
import type { Category, CategoryPayload } from "../types/category";

const API_BASE = "http://localhost:3000/api/v1/categories";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createCategory = async (payload: CategoryPayload) => {
  const res = await axios.post(API_BASE, payload);
  return res.data;
};

export const updateCategory = async (
  id: number,
  payload: CategoryPayload
) => {
  const res = await axios.put(`${API_BASE}/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
