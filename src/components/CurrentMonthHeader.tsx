import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CurrentMonthHeaderProps {
  currentMonth: number;
  currentYear?: number;
  months: string[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}
export function CurrentMonthHeader({
  currentMonth,
  months,
  currentYear,
  handleNextMonth,
  handlePrevMonth,
}: CurrentMonthHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between h-12">
      <div className="current-month">
        {months[currentMonth]} {currentYear}
      </div>
      <div className="flex items-center gap-5">
        <div className="cursor-pointer border p-2" onClick={handlePrevMonth}>
          <FaArrowLeft style={{ color: "#47bf99" }} />
        </div>
        <div className="cursor-pointer border p-2" onClick={handleNextMonth}>
          {" "}
          <FaArrowRight style={{ color: "#47bf99" }} />
        </div>
      </div>
    </div>
  );
}
