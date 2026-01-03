import type { BorrowState } from "../../api/borrow.api";

interface Props {
  state: BorrowState;
  startDate: string;
  endDate: string;
  onStateChange: (s: BorrowState) => void;
  onStartDateChange: (d: string) => void;
  onEndDateChange: (d: string) => void;
}

export default function BorrowsFilters({
  state,
  startDate,
  endDate,
  onStateChange,
  onStartDateChange,
  onEndDateChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow grid gap-4 md:grid-cols-4">
      <select
        value={state}
        onChange={e => onStateChange(e.target.value as BorrowState)}
        className="border rounded px-3 py-2"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="returned">Returned</option>
        <option value="overdue">Overdue</option>
      </select>

      <input
        type="datetime-local"
        value={startDate}
        onChange={e => onStartDateChange(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <input
        type="datetime-local"
        value={endDate}
        onChange={e => onEndDateChange(e.target.value)}
        className="border rounded px-3 py-2"
      />
    </div>
  );
}
