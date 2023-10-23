import format from "date-fns/format";
import { Holiday } from "../App";

interface DayCellProps {
  day: number;
  date: Date;
  holidays: Holiday[];
  onClick: (holiday: Holiday | undefined) => void;
}

export function DayCell({ day, date, holidays, onClick }: DayCellProps) {
  const cellDate = format(date, "yyyy-MM-dd");

  const holiday = holidays.find((h) => h.date === cellDate);
  
  return (
    <div
      className="flex-grow border border-slate-200 h-20 flex flex-col items-end justify-start px-2 overflow-hidden"
      onClick={() => onClick(holiday)}
    >
      <span className="day-number text-base sm:text-sm text-neutral-600 mt-1">{day}</span>
      {holiday && (
        <span className="text-xs font-semibold text-emerald-600 bg-slate-200 px-2 py-1 mt-2 rounded-md cursor-pointer w-full text-center truncate sm:whitespace-normal sm:text-2xs holiday-name">
          {holiday.name}
        </span>
      )}
    </div>
  );
}
