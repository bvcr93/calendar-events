import getDaysInMonth from "date-fns/getDaysInMonth";
import { useEffect, useState } from "react";
import { CurrentMonthHeader } from "./components/CurrentMonthHeader";
import { DayCell } from "./components/DayCell";
import { WeekHeader } from "./components/WeekHeader";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
export interface Holiday {
  date: string;
  name: string;
  localName?: string;
}
export default function App() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  useEffect(() => {
    const fetchHolidays = async () => {
      const url = "https://date.nager.at/api/v3/publicholidays/2023/AT";

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("result data: ", result);
        setHolidays(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col items-center justify-center space-y-4 px-5 title">
      <Routes>
        <Route path="/:date" element={<Calendar holidays={holidays} />} />
        <Route path="/" element={<Calendar holidays={holidays} />} />
      </Routes>
    </div>
  );
}
interface CalendarProps {
  holidays: Holiday[];
}
function Calendar({ holidays }: CalendarProps) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const navigate = useNavigate();
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
  console.log("first day in month", firstDayOfMonth);

  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

  const adjustedLastDay = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

  const inactiveEndDays = 6 - adjustedLastDay;

  return (
    <>
      <div className="w-full h-[700px]">
        <h1 className="w-full text-center text-4xl mb-20">
          Holidays in 2023 (Austria)
        </h1>
        <div className="w-full text-center my-10">
          {selectedHoliday && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md">
              <span className="text-gray-700 text-base mr-1">
                Selected holiday:{" "}
              </span>
              <span className="text-emerald-500 text-lg font-semibold">
                {selectedHoliday.name}
              </span>
              <div>
                <span className="text-gray-700 text-base mr-1">
                  Local name:{" "}
                </span>
                <span className="text-emerald-500 text-lg font-semibold">
                  {selectedHoliday.localName}
                </span>
              </div>
            </div>
          )}
        </div>

        <CurrentMonthHeader
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          months={months}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />

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
          {Array(daysThisMonth)
            .fill(null)
            .map((_, day) => (
              <DayCell
                onClick={(holiday) => {
                  setSelectedHoliday(holiday || null);
                  // holiday is possibly null if we click somewhere where it doesnt exist
                  if (holiday) {
                    navigate(`/${holiday.date}`);
                  }
                }}
                day={day + 1}
                key={day + 1}
                date={new Date(currentYear, currentMonth, day + 1)}
                holidays={holidays}
              />
            ))}
          {Array(inactiveEndDays)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex-grow border border-slate-200 h-20"
              ></div>
            ))}
        </div>
      </div>
    </>
  );
}
