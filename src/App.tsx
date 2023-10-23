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
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col items-center justify-center space-y-4 px-5">
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
  // Get the day of the week for the first day of the current month (0 is Sunday, 6 is Saturday).
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  console.log("first day in month", firstDayOfMonth);
  // Adjust the starting day of the week for a Monday-start calendar.
  // If the month starts on Sunday, adjust it to be considered as 6 (last day of the week).
  // For other days, subtract 1 to fit a Monday-start week (0 is Monday, 6 is Sunday).
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Get the day of the week for the last day of the current month.
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

  // Adjust the ending day of the week similar to the starting day adjustment.
  const adjustedLastDay = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

  // Calculate the number of inactive cells needed at the end of the calendar grid
  // to complete the last week of the month.
  const inactiveEndDays = 6 - adjustedLastDay;

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
