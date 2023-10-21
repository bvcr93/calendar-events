import { useEffect, useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface Holiday {
  date: string;
  name: string;
}

export default function App() {
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }); //from the docs

  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  console.log(selectedDate);

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

  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges["selection"] as Range;

    setSelectionRange(range);
    console.log("range: ", range);
  };

  function dayCellContent(date: Date) {
    const dateString = date.toLocaleDateString("en-CA");
    const holiday = holidays.find((h) => h.date === dateString);
    const holidayName = holiday?.name;

    return (
      <div
        className="w-full h-full mt-12"
        style={{ textAlign: "center", lineHeight: "normal" }}
        onClick={() => setSelectedDate(dateString)}
      >
        <div>{date.getDate()}</div>
        {holidayName && (
          <div className="text-green-700 font-semibold text-xs bg-slate-200 rounded px-2 mx-1 h-[40px] flex items-center justify-center">
            {holidayName}
          </div>
        )}
      </div>
    );
  }
  const selectedHoliday = holidays.find((h) => h.date === selectedDate);

  return (
    <div className="">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        // @ts-ignore
        dayContentRenderer={dayCellContent}
        rangeColors={["transparent"]}
        weekStartsOn={1}
      />
      {selectedHoliday && (
        <div className="w-full text-center text-2xl text-green-700">
          {selectedHoliday.name}
        </div>
      )}
    </div>
  );
}
