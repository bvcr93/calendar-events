import { useEffect, useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface DateRange extends Range {
  key: string;
}

export default function App() {
  const [selectionRange, setSelectionRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }); //from the docs

  const [holidays, setHolidays] = useState<Map<string, string>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log(selectedDate);
  const handleSelect = (ranges: RangeKeyDict) => {
    const range = ranges["selection"] as DateRange;
    if (range) {
      range.endDate = range.startDate;
      setSelectionRange(range);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://date.nager.at/api/v3/publicholidays/2023/AT";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "6a2c45b0c7msh9003a768797bbe7p19e221jsna0f7ed43603d",
          "X-RapidAPI-Host": "public-holidays7.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("result data: ", result);
        if (result && Array.isArray(result)) {
          const holidayMap = new Map(
            result.map((holiday) => [holiday.date, holiday.name])
          );
          console.log("holidayMap: ", holidayMap);
          setHolidays(holidayMap);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  function renderDateContent(date: Date) {
    const dateString = date.toLocaleDateString("en-CA");
    const holidayName = holidays.get(dateString);

    return (
      <div
        className=" w-full h-full mt-14"
        style={{ textAlign: "center", lineHeight: "normal" }}
        onClick={() => setSelectedDate(dateString)}
      >
        <div>{date.getDate()}</div>
        {holidayName && (
          <div className="text-blue-500 font-bold text-sm">{holidayName}</div>
        )}
      </div>
    );
  }

  return (
    <div className="">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        // @ts-ignore
        dayContentRenderer={renderDateContent}
        rangeColors={["transparent"]}
      />
      {selectedDate && holidays.get(selectedDate) && (
        <div className="w-full text-center text-2xl text-blue-500">
          {holidays.get(selectedDate)}
        </div>
      )}
    </div>
  );
}
