export interface Book {
  id: number;
  categoryId: number;
  isbn: string;
  title: string;
  author: string;
  quantity: number;
  shelfLocation: string;
  imageURL: string;
}
