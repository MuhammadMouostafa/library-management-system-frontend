import { useEffect, useState, useCallback } from "react";
import { getBorrows } from "../api/borrow.api";
import type { BorrowState } from "../api/borrow.api";
import type { BorrowsResponse } from "../types/borrow";
import BorrowsFilters from "../components/borrow/BorrowsFilters";
import BorrowsTable from "../components/borrow/BorrowsTable";

export default function BorrowsPage() {
  const [state, setState] = useState<BorrowState>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<BorrowsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loadBorrows = useCallback(async () => {
      const data = await getBorrows({
        state,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page,
      });
      return data;
  }, [state, startDate, endDate, page]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const data = await loadBorrows();
      if (!cancelled) {
        setData(data);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loadBorrows]);

const refetchBorrows = async () => {
  const data = await loadBorrows();
    setData(data);
};


  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Borrows</h1>

      <BorrowsFilters
        state={state}
        startDate={startDate}
        endDate={endDate}
        onStateChange={setState}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      {loading && <p className="mt-6">Loading…</p>}

      {data && (
        <>
          <BorrowsTable
            borrows={data.borrowsPage}
            onBookReturned={refetchBorrows}
          />

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page {data.pageNumber} / {data.totalPages}
            </span>

            <button
              disabled={page === data.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
