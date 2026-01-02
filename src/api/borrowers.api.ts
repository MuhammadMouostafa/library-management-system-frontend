import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import type { Borrower } from "../types/borrower";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getBorrowers = async ()=> {
  const res = await api.get("/borrowers");
  return res.data;
};

export const createBorrower = async (data: Omit<Borrower, "id">) => {
  const res = await api.post("/borrowers", data);
  return res.data;
};

export const updateBorrower = async (
  id: number,
  data: Omit<Borrower, "id">
) => {
  const res = await api.put(`/borrowers/${id}`, data);
  return res.data;
};

export const deleteBorrower = async (id: number) => {
  await api.delete(`/borrowers/${id}`);
};
