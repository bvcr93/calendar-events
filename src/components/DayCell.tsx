import format from "date-fns/format";
import { Holiday } from "../App";

interface DayCellProps {
  day: number;
  date: Date;
  holidays: Holiday[];
  onClick: (holiday: Holiday) => void;
}

export function DayCell({ day, date, holidays, onClick }: DayCellProps) {
  const cellDate = format(date, "yyyy-MM-dd");

  const holiday = holidays.find((h) => h.date === cellDate);

  const handleHolidayClick = () => {
    if (holiday) {
      onClick(holiday);
    }
  };

  return (
    <div
      className="flex-grow border border-slate-200 h-20 flex flex-col items-end justify-start px-2"
      onClick={handleHolidayClick}
    >
      {day}
      {holiday && (
        <span className="text-xs font-semibold text-emerald-600 bg-slate-200 px-2 py-2 rounded-md cursor-pointer w-full text-center">
          {holiday.name}
        </span>
      )}
    </div>
  );
}
