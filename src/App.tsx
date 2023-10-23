import { Route, Routes } from "react-router-dom";
import { Calendar } from "./components/Calendar";
import { useFetchHolidays } from "./hooks/useFetchHolidays";

export interface Holiday {
  date: string;
  name: string;
  localName: string;
}
export default function App() {
  const { holidays } = useFetchHolidays(
    "https://date.nager.at/api/v3/publicholidays/2023/AT"
  );

  return (
    <div className="max-w-6xl mx-auto h-screen flex flex-col items-center justify-center space-y-4 px-5 title">
      <Routes>
        <Route path="/:date" element={<Calendar holidays={holidays} />} />
        <Route path="/" element={<Calendar holidays={holidays} />} />
      </Routes>
    </div>
  );
}
