// import { getDate } from "date-fns";
// import { useEffect, useState } from "react";

// interface Holiday {
//   date: string;
//   name: string;
// }

// export default function App() {
//   const [holidays, setHolidays] = useState<Holiday[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = "https://date.nager.at/api/v3/publicholidays/2023/AT";

//       try {
//         const response = await fetch(url);
//         const result = await response.json();
//         console.log("result data: ", result);
//         setHolidays(result);

//         setHolidays(result);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="">
//       <Calendar holidays={holidays} />
//     </div>
//   );
// }
// interface CalendarProps {
//   holidays: Holiday[];
// }
// function Calendar({ holidays }: CalendarProps) {
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(2023);

//   const daysInMonth = (month: number, year: number) =>
//     new Date(year, month + 1, 0).getDate();
//   const handlePrevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentYear((prev) => prev - 1);
//       setCurrentMonth(11);
//     } else {
//       setCurrentMonth((prev) => prev - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentYear((prev) => prev + 1);
//       setCurrentMonth(0);
//     } else {
//       setCurrentMonth((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="p-6 w-2/3 rounded-md shadow-md mx-auto">
//       {/* Calendar Header */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={handlePrevMonth}
//           className="bg-gray-200 p-2 rounded-md"
//         >
//           ←
//         </button>
//         <span className="text-xl font-semibold text-red-500">
//           {months[currentMonth]} {currentYear}
//         </span>
//         <button
//           onClick={handleNextMonth}
//           className="bg-gray-200 p-2 rounded-md"
//         >
//           →
//         </button>
//       </div>

//       {/* Days of the week */}
//       <div className="grid grid-cols-7 gap-2 mb-4">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="text-center font-medium text-green-500">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Days */}
//       <div className="grid grid-cols-7 gap-2">
//         {Array(daysInMonth(currentMonth, currentYear))
//           .fill(null)
//           .map((_, day) => {
//             const date = new Date(currentYear, currentMonth, day + 1);
//             const dateString = date.toLocaleDateString("en-CA");
//             const holiday = holidays.find((h) => h.date === dateString);

//             return (
//               <div
//                 key={day}
//                 className="flex flex-col h-24 items-center p-2 border rounded-md hover:bg-green-100 transition"
//               >
//                 <span className="text-lg">{day + 1}</span>
//                 {/*  so the days start from 1, not 0*/}
//                 {holiday && (
//                   <div className="mt-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
//                     {holiday.name}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { DayCell } from "./components/DayCell";
import { WeekHeader } from "./components/WeekHeader";
import { CurrentMonthHeader } from "./components/CurrentMonthHeader";
import startOfMonth from "date-fns/startOfMonth";
export interface Holiday {
  date: string;
  name: string;
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
    <div className="max-w-2xl mx-auto h-screen flex flex-col items-center justify-center">
      <Calendar holidays={holidays} />
    </div>
  );
}
interface CalendarProps {
  holidays: Holiday[];
}
function Calendar({ holidays }: CalendarProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(2023);
  const startDate = startOfMonth(new Date(currentYear, currentMonth, 1));

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
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
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
    <div className="w-full h-[500px] border bg-slate-800 text-white rounded-xl">
      <div>
        <CurrentMonthHeader
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          months={months}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
      <div className="flex">
        {daysOfWeek.map((weekDay) => (
          <WeekHeader weekDay={weekDay} key={weekDay} />
        ))}
      </div>

      <div className="grid grid-cols-7">
        {Array(adjustedFirstDay)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className="border border-emerald-400 h-16 w-24"
            ></div>
          ))}

        {Array(daysInMonth(currentMonth, currentYear))
          .fill(null)
          .map((_, day) => (
            <DayCell
              day={day + 1}
              key={day + 1}
              date={new Date(currentYear, currentMonth, day + 1)}
              holidays={holidays}
            />
          ))}
      </div>
    </div>
  );
}
