export interface Borrow {
  id: number;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  bookId: number;
  bookTitle: string;
  borrowerId: number;
  borrowerName: string;
}

export interface BorrowsResponse {
  totalBorrows: number;
  limitPerPage: number;
  totalPages: number;
  pageNumber: number;
  borrowsInPageCount: number;
  borrowsPage: Borrow[];
}
