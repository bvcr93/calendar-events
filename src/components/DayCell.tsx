import { Holiday } from "../App";
interface DayCellProps {
  day: number;
  date: Date; // change here
  holidays: Holiday[];
}

export function DayCell({ day, date, holidays }: DayCellProps) {
  const cellDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // Check if the current cell date is a holiday
  const holiday = holidays.find((h) => h.date === cellDate);

  return (
    <div
      className={`border border-emerald-400 h-16 w-24 flex flex-col justify-end px-2`}
    >
      {day}
      {holiday && (
        <span className="text-xs text-red-600 mt-2">{holiday.name}</span>
      )}
    </div>
  );
}
