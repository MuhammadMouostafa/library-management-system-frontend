import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export type BorrowState = "all" | "active" | "returned" | "overdue";

export interface BorrowPayload {
  borrowerId: number;
  bookId: number;
  dueDate: string;
}

export interface GetBorrowsParams {
  state?: BorrowState;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export async function getBorrows(params: GetBorrowsParams) {
  const res = await api.get("/borrows", { params });
  return res.data;
}

export const borrowBook = async (payload: BorrowPayload) => {
  const res = await api.post("/borrows", payload);
  return res.data;
};

export const returnBook = async (borrowId: number) => {
  const res = await api.put(`/borrows/return/${borrowId}`);
  return res.data;
};



export const getBorrowedBooksByBorrower = async (borrowerId: number) => {
  const res = await api.get(`/borrows/borrower/${borrowerId}`);
  return res.data;
};
