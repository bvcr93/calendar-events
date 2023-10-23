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
    <div className="w-full flex items-center justify-between h-12 px-10">
      <div className="cursor-pointer" onClick={handlePrevMonth}>
        <FaArrowLeft />
      </div>
      <div className="w-full text-center">
        {months[currentMonth]} {currentYear}
      </div>
      <div className="cursor-pointer">
        {" "}
        <FaArrowRight onClick={handleNextMonth} />
      </div>
    </div>
  );
}
