import getDaysInMonth from "date-fns/getDaysInMonth";
import { useEffect, useState } from "react";
import { CurrentMonthHeader } from "./components/CurrentMonthHeader";
import { DayCell } from "./components/DayCell";
import { WeekHeader } from "./components/WeekHeader";

export interface Holiday {
  date: string;
  name: string;
  localName?: string;
}
export default function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://date.nager.at/api/v3/publicholidays/2023/AT";

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("result data: ", result);
        setHolidays(result);

        setHolidays(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col items-center justify-center space-y-4">
      <Calendar holidays={holidays} />
    </div>
  );
}
interface CalendarProps {
  holidays: Holiday[];
}
function Calendar({ holidays }: CalendarProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(2023);
  const daysThisMonth = getDaysInMonth(new Date(currentYear, currentMonth));
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      // if current month is January, go back to December of previous year
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  // if first day of month is Sunday, set it to 6, otherwise subtract 1

  return (
    <>
      <div className="w-full h-[700px]">
        <h1 className="w-full text-center text-3xl font-mono mb-20">
          Holidays in 2023
        </h1>
        <div className="w-full text-center my-10">
          {selectedHoliday && (
            <div className="">
              <span className="">Selected Holiday: </span>
              <span className="font-semibold">{selectedHoliday.name}</span>
              <div>
                <span className="">Local name: </span>
                <span className="font-semibold">
                  {selectedHoliday.localName}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-slate-100">
          <CurrentMonthHeader
            handleNextMonth={handleNextMonth}
            handlePrevMonth={handlePrevMonth}
            months={months}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </div>
        <div className="flex rounded border">
          {daysOfWeek.map((weekDay) => (
            <WeekHeader weekDay={weekDay} key={weekDay} />
          ))}
        </div>

        <div className="grid grid-cols-7 border-b border-r">
          {Array(adjustedFirstDay)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex-grow border border-slate-200 h-20"
              ></div>
            ))}
          {/* inactive days in month */}

          {Array(daysThisMonth)
            .fill(null)
            .map((_, day) => (
              <DayCell
                onClick={(holiday) => setSelectedHoliday(holiday)}
                day={day + 1}
                key={day + 1}
                date={new Date(currentYear, currentMonth, day + 1)}
                holidays={holidays}
              />
            ))}
        </div>
      </div>
    </>
  );
}
